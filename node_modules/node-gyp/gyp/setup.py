#!/usr/bin/env python

# Copyright (c) 2009 Google Inc. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

from setuptools import setup

setup(
  name='gyp',
  version='0.1',
  description='Generate Your Projects',
  author='Chromium Authors',
  author_email='chromium-dev@googlegroups.com',
  url='http://code.google.com/p/gyp',
  package_dir = {'': 'pylib'},
  packages=['gyp', 'gyp.generator'],
  entry_points = {'console_scripts': ['gyp=gyp:script_main'] }
)
