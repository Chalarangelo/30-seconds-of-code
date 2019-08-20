## Building LibSass with Visual Studio

### Requirements:

The minimum requirement to build LibSass with Visual Studio is "Visual Studio 2013 Express for Desktop".

Additionally, it is recommended to have `git` installed and available in `PATH`, so to deduce the `libsass` version information. For instance, if GitHub for Windows (https://windows.github.com/) is installed, the `PATH` will have an entry resembling: `X:\Users\<YOUR_NAME>\AppData\Local\GitHub\PortableGit_<SOME_GUID>\cmd\` (where `X` is the drive letter of system drive). If `git` is not available, inquiring the LibSass version will result in `[NA]`.

### Build Steps:

#### From Visual Studio:

On opening the `win\libsass.sln` solution and build (Ctrl+Shift+B) to build `libsass.dll`.

To Build LibSass as a static Library, it is recommended to set an environment variable `LIBSASS_STATIC_LIB` before launching the project:

```cmd
cd path\to\libsass
SET LIBSASS_STATIC_LIB=1
::
:: or in PowerShell:
:: $env:LIBSASS_STATIC_LIB=1
::
win\libsass.sln
```

Visual Studio will form the filtered source tree as shown below:

![image](https://cloud.githubusercontent.com/assets/3840695/9298985/aae9e072-44bf-11e5-89eb-e7995c098085.png)

`Header Files` contains the .h and .hpp files, while `Source Files` covers `.c` and `.cpp`. The other used headers/sources will appear under `External Dependencies`.

If there is a LibSass code file appearing under External Dependencies, it can be changed by altering the `win\libsass.vcxproj.filters` file or dragging in Solution Explorer.

#### From Command Prompt:

Notice that in the following commands:

* If the platform is 32-bit Windows, replace `ProgramFiles(x86)` with `ProgramFiles`.
* To build with Visual Studio 2015, replace `12.0` with `14.0` in the aforementioned command.

Open a command prompt:

To build dynamic/shared library (`libsass.dll`):

```cmd
:: debug build:
"%ProgramFiles(x86)%\MSBuild\12.0\Bin\MSBuild" win\libsass.sln

:: release build:
"%ProgramFiles(x86)%\MSBuild\12.0\Bin\MSBuild" win\libsass.sln ^
/p:Configuration=Release
```

To build static library (`libsass.lib`):

```cmd
:: debug build:
"%ProgramFiles(x86)%\MSBuild\12.0\Bin\MSBuild" win\libsass.sln ^
/p:LIBSASS_STATIC_LIB=1

:: release build:
"%ProgramFiles(x86)%\MSBuild\12.0\Bin\MSBuild" win\libsass.sln ^
/p:LIBSASS_STATIC_LIB=1 /p:Configuration=Release
```

#### From PowerShell:

To build dynamic/shared library (`libsass.dll`):

```powershell
# debug build:
&"${env:ProgramFiles(x86)}\MSBuild\12.0\Bin\MSBuild" win\libsass.sln

# release build:
&"${env:ProgramFiles(x86)}\MSBuild\12.0\Bin\MSBuild" win\libsass.sln `
/p:Configuration=Release
```

To build static library (`libsass.lib`):

```powershell
# build:
&"${env:ProgramFiles(x86)}\MSBuild\12.0\Bin\MSBuild" win\libsass.sln `
/p:LIBSASS_STATIC_LIB=1

# release build:
&"${env:ProgramFiles(x86)}\MSBuild\12.0\Bin\MSBuild" win\libsass.sln `
/p:LIBSASS_STATIC_LIB=1 /p:Configuration=Release
```
