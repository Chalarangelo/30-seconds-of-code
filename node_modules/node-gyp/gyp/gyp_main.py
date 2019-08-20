#!/usr/bin/env python

# Copyright (c) 2009 Google Inc. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

import os
import sys

# Make sure we're using the version of pylib in this repo, not one installed
# elsewhere on the system.
sys.path.insert(0, os.path.join(os.path.dirname(sys.argv[0]), 'pylib'))
import gyp

if __name__ == '__main__':
  sys.exit(gyp.script_main())
