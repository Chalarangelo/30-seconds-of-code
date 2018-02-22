__all__ = ['FFI', 'VerificationError', 'VerificationMissing', 'CDefError',
           'FFIError']

from .api import FFI
from .error import CDefError, FFIError, VerificationError, VerificationMissing

__version__ = "1.11.4"
__version_info__ = (1, 11, 4)

# The verifier module file names are based on the CRC32 of a string that
# contains the following version number.  It may be older than __version__
# if nothing is clearly incompatible.
__version_verifier_modules__ = "0.8.6"
