# This is the version of this source code.

manual_verstr = "1.9"



auto_build_num = "0.post1"



verstr = manual_verstr + "." + auto_build_num
try:
    from pyutil.version_class import Version as pyutil_Version
except (ImportError, ValueError): #pragma NO COVER
    # Maybe there is no pyutil installed.
    from distutils.version import LooseVersion as distutils_Version
    __version__ = distutils_Version(verstr)
else: #pragma NO COVER
    __version__ = pyutil_Version(verstr)
