# Copyright (c) 2012 Google Inc. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.


"""Top-level presubmit script for GYP.

See http://dev.chromium.org/developers/how-tos/depottools/presubmit-scripts
for more details about the presubmit API built into gcl.
"""


PYLINT_BLACKLIST = [
    # TODO: fix me.
    # From SCons, not done in google style.
    'test/lib/TestCmd.py',
    'test/lib/TestCommon.py',
    'test/lib/TestGyp.py',
]


PYLINT_DISABLED_WARNINGS = [
    # TODO: fix me.
    # Many tests include modules they don't use.
    'W0611',
    # Possible unbalanced tuple unpacking with sequence.
    'W0632',
    # Attempting to unpack a non-sequence.
    'W0633',
    # Include order doesn't properly include local files?
    'F0401',
    # Some use of built-in names.
    'W0622',
    # Some unused variables.
    'W0612',
    # Operator not preceded/followed by space.
    'C0323',
    'C0322',
    # Unnecessary semicolon.
    'W0301',
    # Unused argument.
    'W0613',
    # String has no effect (docstring in wrong place).
    'W0105',
    # map/filter on lambda could be replaced by comprehension.
    'W0110',
    # Use of eval.
    'W0123',
    # Comma not followed by space.
    'C0324',
    # Access to a protected member.
    'W0212',
    # Bad indent.
    'W0311',
    # Line too long.
    'C0301',
    # Undefined variable.
    'E0602',
    # Not exception type specified.
    'W0702',
    # No member of that name.
    'E1101',
    # Dangerous default {}.
    'W0102',
    # Cyclic import.
    'R0401',
    # Others, too many to sort.
    'W0201', 'W0232', 'E1103', 'W0621', 'W0108', 'W0223', 'W0231',
    'R0201', 'E0101', 'C0321',
    # ************* Module copy
    # W0104:427,12:_test.odict.__setitem__: Statement seems to have no effect
    'W0104',
]


def _LicenseHeader(input_api):
  # Accept any year number from 2009 to the current year.
  current_year = int(input_api.time.strftime('%Y'))
  allowed_years = (str(s) for s in reversed(xrange(2009, current_year + 1)))

  years_re = '(' + '|'.join(allowed_years) + ')'

  # The (c) is deprecated, but tolerate it until it's removed from all files.
  return (
      r'.*? Copyright (\(c\) )?%(year)s Google Inc\. All rights reserved\.\n'
      r'.*? Use of this source code is governed by a BSD-style license that '
        r'can be\n'
      r'.*? found in the LICENSE file\.\n'
  ) % {
      'year': years_re,
  }

def CheckChangeOnUpload(input_api, output_api):
  report = []
  report.extend(input_api.canned_checks.PanProjectChecks(
      input_api, output_api, license_header=_LicenseHeader(input_api)))
  return report


def CheckChangeOnCommit(input_api, output_api):
  report = []

  report.extend(input_api.canned_checks.PanProjectChecks(
      input_api, output_api, license_header=_LicenseHeader(input_api)))
  report.extend(input_api.canned_checks.CheckTreeIsOpen(
      input_api, output_api,
      'http://gyp-status.appspot.com/status',
      'http://gyp-status.appspot.com/current'))

  import os
  import sys
  old_sys_path = sys.path
  try:
    sys.path = ['pylib', 'test/lib'] + sys.path
    blacklist = PYLINT_BLACKLIST
    if sys.platform == 'win32':
      blacklist = [os.path.normpath(x).replace('\\', '\\\\')
                   for x in PYLINT_BLACKLIST]
    report.extend(input_api.canned_checks.RunPylint(
        input_api,
        output_api,
        black_list=blacklist,
        disabled_warnings=PYLINT_DISABLED_WARNINGS))
  finally:
    sys.path = old_sys_path
  return report


TRYBOTS = [
    'linux_try',
    'mac_try',
    'win_try',
]


def GetPreferredTryMasters(_, change):
  return {
      'client.gyp': { t: set(['defaulttests']) for t in TRYBOTS },
  }
