// Copyright 2017 - Refael Ackermann
// Distributed under MIT style license
// See accompanying file LICENSE at https://github.com/node4good/windows-autoconf

// Usage:
// powershell -ExecutionPolicy Unrestricted -Version "2.0" -Command "&{Add-Type -Path Find-VS2017.cs; [VisualStudioConfiguration.Main]::Query()}"
using System;
using System.Text;
using System.Runtime.InteropServices;

namespace VisualStudioConfiguration
{
    [Flags]
    public enum InstanceState : uint
    {
        None = 0,
        Local = 1,
        Registered = 2,
        NoRebootRequired = 4,
        NoErrors = 8,
        Complete = 4294967295,
    }

    [Guid("6380BCFF-41D3-4B2E-8B2E-BF8A6810C848")]
    [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    [ComImport]
    public interface IEnumSetupInstances
    {

        void Next([MarshalAs(UnmanagedType.U4), In] int celt,
            [MarshalAs(UnmanagedType.LPArray, ArraySubType = UnmanagedType.Interface), Out] ISetupInstance[] rgelt,
            [MarshalAs(UnmanagedType.U4)] out int pceltFetched);

        void Skip([MarshalAs(UnmanagedType.U4), In] int celt);

        void Reset();

        [return: MarshalAs(UnmanagedType.Interface)]
        IEnumSetupInstances Clone();
    }

    [Guid("42843719-DB4C-46C2-8E7C-64F1816EFD5B")]
    [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    [ComImport]
    public interface ISetupConfiguration
    {
    }

    [Guid("26AAB78C-4A60-49D6-AF3B-3C35BC93365D")]
    [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    [ComImport]
    public interface ISetupConfiguration2 : ISetupConfiguration
    {

        [return: MarshalAs(UnmanagedType.Interface)]
        IEnumSetupInstances EnumInstances();

        [return: MarshalAs(UnmanagedType.Interface)]
        ISetupInstance GetInstanceForCurrentProcess();

        [return: MarshalAs(UnmanagedType.Interface)]
        ISetupInstance GetInstanceForPath([MarshalAs(UnmanagedType.LPWStr), In] string path);

        [return: MarshalAs(UnmanagedType.Interface)]
        IEnumSetupInstances EnumAllInstances();
    }

    [Guid("B41463C3-8866-43B5-BC33-2B0676F7F42E")]
    [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    [ComImport]
    public interface ISetupInstance
    {
    }

    [Guid("89143C9A-05AF-49B0-B717-72E218A2185C")]
    [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    [ComImport]
    public interface ISetupInstance2 : ISetupInstance
    {
        [return: MarshalAs(UnmanagedType.BStr)]
        string GetInstanceId();

        [return: MarshalAs(UnmanagedType.Struct)]
        System.Runtime.InteropServices.ComTypes.FILETIME GetInstallDate();

        [return: MarshalAs(UnmanagedType.BStr)]
        string GetInstallationName();

        [return: MarshalAs(UnmanagedType.BStr)]
        string GetInstallationPath();

        [return: MarshalAs(UnmanagedType.BStr)]
        string GetInstallationVersion();

        [return: MarshalAs(UnmanagedType.BStr)]
        string GetDisplayName([MarshalAs(UnmanagedType.U4), In] int lcid);

        [return: MarshalAs(UnmanagedType.BStr)]
        string GetDescription([MarshalAs(UnmanagedType.U4), In] int lcid);

        [return: MarshalAs(UnmanagedType.BStr)]
        string ResolvePath([MarshalAs(UnmanagedType.LPWStr), In] string pwszRelativePath);

        [return: MarshalAs(UnmanagedType.U4)]
        InstanceState GetState();

        [return: MarshalAs(UnmanagedType.SafeArray, SafeArraySubType = VarEnum.VT_UNKNOWN)]
        ISetupPackageReference[] GetPackages();

        ISetupPackageReference GetProduct();

        [return: MarshalAs(UnmanagedType.BStr)]
        string GetProductPath();

        [return: MarshalAs(UnmanagedType.VariantBool)]
        bool IsLaunchable();

        [return: MarshalAs(UnmanagedType.VariantBool)]
        bool IsComplete();

        [return: MarshalAs(UnmanagedType.SafeArray, SafeArraySubType = VarEnum.VT_UNKNOWN)]
        ISetupPropertyStore GetProperties();

        [return: MarshalAs(UnmanagedType.BStr)]
        string GetEnginePath();
    }

    [Guid("DA8D8A16-B2B6-4487-A2F1-594CCCCD6BF5")]
    [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    [ComImport]
    public interface ISetupPackageReference
    {

        [return: MarshalAs(UnmanagedType.BStr)]
        string GetId();

        [return: MarshalAs(UnmanagedType.BStr)]
        string GetVersion();

        [return: MarshalAs(UnmanagedType.BStr)]
        string GetChip();

        [return: MarshalAs(UnmanagedType.BStr)]
        string GetLanguage();

        [return: MarshalAs(UnmanagedType.BStr)]
        string GetBranch();

        [return: MarshalAs(UnmanagedType.BStr)]
        string GetType();

        [return: MarshalAs(UnmanagedType.BStr)]
        string GetUniqueId();

        [return: MarshalAs(UnmanagedType.VariantBool)]
        bool GetIsExtension();
    }

    [Guid("c601c175-a3be-44bc-91f6-4568d230fc83")]
    [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    [ComImport]
    public interface ISetupPropertyStore
    {

        [return: MarshalAs(UnmanagedType.SafeArray, SafeArraySubType = VarEnum.VT_BSTR)]
        string[] GetNames();

        object GetValue([MarshalAs(UnmanagedType.LPWStr), In] string pwszName);
    }

    [Guid("42843719-DB4C-46C2-8E7C-64F1816EFD5B")]
    [CoClass(typeof(SetupConfigurationClass))]
    [ComImport]
    public interface SetupConfiguration : ISetupConfiguration2, ISetupConfiguration
    {
    }

    [Guid("177F0C4A-1CD3-4DE7-A32C-71DBBB9FA36D")]
    [ClassInterface(ClassInterfaceType.None)]
    [ComImport]
    public class SetupConfigurationClass
    {
    }

    public static class Main
    {
        public static void Query()
        {
            ISetupConfiguration query = new SetupConfiguration();
            ISetupConfiguration2 query2 = (ISetupConfiguration2)query;
            IEnumSetupInstances e = query2.EnumAllInstances();

            int pceltFetched;
            ISetupInstance2[] rgelt = new ISetupInstance2[1];
            StringBuilder log = new StringBuilder();
            while (true)
            {
                e.Next(1, rgelt, out pceltFetched);
                if (pceltFetched <= 0)
                {
                    Console.WriteLine(String.Format("{{\"log\":\"{0}\"}}", log.ToString()));
                    return;
                }
                if (CheckInstance(rgelt[0], ref log))
                    return;
            }
        }

        private static bool CheckInstance(ISetupInstance2 setupInstance2, ref StringBuilder log)
        {
            // Visual Studio Community 2017 component directory:
            // https://www.visualstudio.com/en-us/productinfo/vs2017-install-product-Community.workloads

            string path = setupInstance2.GetInstallationPath().Replace("\\", "\\\\");
            log.Append(String.Format("Found installation at: {0}\\n", path));

            bool hasMSBuild = false;
            bool hasVCTools = false;
            uint Win10SDKVer = 0;
            bool hasWin8SDK = false;

            foreach (ISetupPackageReference package in setupInstance2.GetPackages())
            {
                const string Win10SDKPrefix = "Microsoft.VisualStudio.Component.Windows10SDK.";

                string id = package.GetId();
                if (id == "Microsoft.VisualStudio.VC.MSBuild.Base")
                    hasMSBuild = true;
                else if (id == "Microsoft.VisualStudio.Component.VC.Tools.x86.x64")
                    hasVCTools = true;
                else if (id.StartsWith(Win10SDKPrefix)) {
                    string[] parts = id.Substring(Win10SDKPrefix.Length).Split('.');
                    if (parts.Length > 1 && parts[1] != "Desktop")
                        continue;
                    uint foundSdkVer;
                    if (UInt32.TryParse(parts[0], out foundSdkVer))
                        Win10SDKVer = Math.Max(Win10SDKVer, foundSdkVer);
                } else if (id == "Microsoft.VisualStudio.Component.Windows81SDK")
                    hasWin8SDK = true;
                else
                    continue;

                log.Append(String.Format("  - Found {0}\\n", id));
            }

            if (!hasMSBuild)
                log.Append("  - Missing Visual Studio C++ core features (Microsoft.VisualStudio.VC.MSBuild.Base)\\n");
            if (!hasVCTools)
                log.Append("  - Missing VC++ 2017 v141 toolset (x86,x64) (Microsoft.VisualStudio.Component.VC.Tools.x86.x64)\\n");
            if ((Win10SDKVer == 0) && (!hasWin8SDK))
                log.Append("  - Missing a Windows SDK (Microsoft.VisualStudio.Component.Windows10SDK.* or Microsoft.VisualStudio.Component.Windows81SDK)\\n");

            if (hasMSBuild && hasVCTools)
            {
                if (Win10SDKVer > 0)
                {
                    log.Append("  - Using this installation with Windows 10 SDK"/*\\n*/);
                    Console.WriteLine(String.Format("{{\"log\":\"{0}\",\"path\":\"{1}\",\"sdk\":\"10.0.{2}.0\"}}", log.ToString(), path, Win10SDKVer));
                    return true;
                }
                else if (hasWin8SDK)
                {
                    log.Append("  - Using this installation with Windows 8.1 SDK"/*\\n*/);
                    Console.WriteLine(String.Format("{{\"log\":\"{0}\",\"path\":\"{1}\",\"sdk\":\"8.1\"}}", log.ToString(), path));
                    return true;
                }
            }

            log.Append("  - Some required components are missing, not using this installation\\n");
            return false;
        }
    }
}
