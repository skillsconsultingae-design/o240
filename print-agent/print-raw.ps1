param(
  [Parameter(Mandatory = $true)][string]$PrinterName,
  [Parameter(Mandatory = $true)][string]$FilePath
)

# Envoie des octets BRUTS (ESC/POS deja formate par l'agent Node) a une imprimante
# Windows, via l'API native winspool. Aucune dependance, aucun module a compiler :
# on passe par le compilateur C# integre a .NET (present sur tout Windows 10/11).
# L'agent appelle ce script en "-ExecutionPolicy Bypass" -> pas de souci de policy.

$ErrorActionPreference = 'Stop'

Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;

public class RawPrinterHelper {
    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Ansi)]
    public class DOCINFOA {
        [MarshalAs(UnmanagedType.LPStr)] public string pDocName;
        [MarshalAs(UnmanagedType.LPStr)] public string pOutputFile;
        [MarshalAs(UnmanagedType.LPStr)] public string pDataType;
    }

    [DllImport("winspool.Drv", EntryPoint = "OpenPrinterA", SetLastError = true, CharSet = CharSet.Ansi, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
    public static extern bool OpenPrinter([MarshalAs(UnmanagedType.LPStr)] string szPrinter, out IntPtr hPrinter, IntPtr pd);

    [DllImport("winspool.Drv", EntryPoint = "ClosePrinter", SetLastError = true, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
    public static extern bool ClosePrinter(IntPtr hPrinter);

    [DllImport("winspool.Drv", EntryPoint = "StartDocPrinterA", SetLastError = true, CharSet = CharSet.Ansi, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
    public static extern bool StartDocPrinter(IntPtr hPrinter, Int32 level, [In, MarshalAs(UnmanagedType.LPStruct)] DOCINFOA di);

    [DllImport("winspool.Drv", EntryPoint = "EndDocPrinter", SetLastError = true, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
    public static extern bool EndDocPrinter(IntPtr hPrinter);

    [DllImport("winspool.Drv", EntryPoint = "StartPagePrinter", SetLastError = true, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
    public static extern bool StartPagePrinter(IntPtr hPrinter);

    [DllImport("winspool.Drv", EntryPoint = "EndPagePrinter", SetLastError = true, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
    public static extern bool EndPagePrinter(IntPtr hPrinter);

    [DllImport("winspool.Drv", EntryPoint = "WritePrinter", SetLastError = true, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
    public static extern bool WritePrinter(IntPtr hPrinter, IntPtr pBytes, Int32 dwCount, out Int32 dwWritten);

    // Renvoie 0 si OK, sinon le code d'erreur Win32 rencontre.
    public static int SendBytesToPrinter(string szPrinterName, byte[] bytes) {
        IntPtr hPrinter;
        DOCINFOA di = new DOCINFOA();
        di.pDocName = "Ticket resto";
        di.pDataType = "RAW";

        if (!OpenPrinter(szPrinterName, out hPrinter, IntPtr.Zero)) {
            return Marshal.GetLastWin32Error();
        }

        int err = 0;
        IntPtr pUnmanagedBytes = Marshal.AllocCoTaskMem(bytes.Length);
        Marshal.Copy(bytes, 0, pUnmanagedBytes, bytes.Length);
        try {
            if (!StartDocPrinter(hPrinter, 1, di)) { err = Marshal.GetLastWin32Error(); }
            else {
                if (!StartPagePrinter(hPrinter)) { err = Marshal.GetLastWin32Error(); }
                else {
                    int written;
                    if (!WritePrinter(hPrinter, pUnmanagedBytes, bytes.Length, out written)) {
                        err = Marshal.GetLastWin32Error();
                    }
                    EndPagePrinter(hPrinter);
                }
                EndDocPrinter(hPrinter);
            }
        } finally {
            Marshal.FreeCoTaskMem(pUnmanagedBytes);
            ClosePrinter(hPrinter);
        }
        return err;
    }
}
'@

$bytes = [System.IO.File]::ReadAllBytes($FilePath)
$code = [RawPrinterHelper]::SendBytesToPrinter($PrinterName, $bytes)

if ($code -ne 0) {
    if ($code -eq 1801) {
        throw "Imprimante introuvable : `"$PrinterName`". Verifiez le nom exact (Get-Printer | Select Name) et PRINTER_NAME dans .env."
    }
    throw "Echec de l'envoi a l'imprimante `"$PrinterName`" (erreur Windows $code)."
}

Write-Output "OK"
