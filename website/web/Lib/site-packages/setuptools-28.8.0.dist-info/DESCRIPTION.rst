===============================
Installing and Using Setuptools
===============================

.. contents:: **Table of Contents**


.. image:: https://setuptools.readthedocs.io/en/latest/?badge=latest
    :target: https://setuptools.readthedocs.io

-------------------------
Installation Instructions
-------------------------

The recommended way to bootstrap setuptools on any system is to download
`ez_setup.py`_ and run it using the target Python environment. Different
operating systems have different recommended techniques to accomplish this
basic routine, so below are some examples to get you started.

Setuptools requires Python 2.6 or later. To install setuptools
on Python 2.4 or Python 2.5, use the `bootstrap script for Setuptools 1.x
<https://raw.githubusercontent.com/pypa/setuptools/bootstrap-py24/ez_setup.py>`_.

The link provided to ez_setup.py is a bookmark to bootstrap script for the
latest known stable release.

.. _ez_setup.py: https://bootstrap.pypa.io/ez_setup.py

Windows (Powershell 3 or later)
===============================

For best results, uninstall previous versions FIRST (see `Uninstalling`_).

Using Windows 8 (which includes PowerShell 3) or earlier versions of Windows
with PowerShell 3 installed, it's possible to install with one simple
Powershell command. Start up Powershell and paste this command::

    > (Invoke-WebRequest https://bootstrap.pypa.io/ez_setup.py).Content | python -

.. image:: https://badges.gitter.im/pypa/setuptools.svg
   :alt: Join the chat at https://gitter.im/pypa/setuptools
   :target: https://gitter.im/pypa/setuptools?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge

You must start the Powershell with Administrative privileges or you may choose
to install a user-local installation::

    > (Invoke-WebRequest https://bootstrap.pypa.io/ez_setup.py).Content | python - --user

If you have Python 3.3 or later, you can use the ``py`` command to install to
different Python versions. For example, to install to Python 3.3 if you have
Python 2.7 installed::

    > (Invoke-WebRequest https://bootstrap.pypa.io/ez_setup.py).Content | py -3 -

The recommended way to install setuptools on Windows is to download
`ez_setup.py`_ and run it. The script will download the appropriate
distribution file and install it for you.

Once installation is complete, you will find an ``easy_install`` program in
your Python ``Scripts`` subdirectory. For simple invocation and best results,
add this directory to your ``PATH`` environment variable, if it is not already
present. If you did a user-local install, the ``Scripts`` subdirectory is
``$env:APPDATA\Python\Scripts``.


Windows (simplified)
====================

For Windows without PowerShell 3 or for installation without a command-line,
download `ez_setup.py`_ using your preferred web browser or other technique
and "run" that file.


Unix (wget)
===========

Most Linux distributions come with wget.

Download `ez_setup.py`_ and run it using the target Python version. The script
will download the appropriate version and install it for you::

    > wget https://bootstrap.pypa.io/ez_setup.py -O - | python

Note that you will may need to invoke the command with superuser privileges to
install to the system Python::

    > wget https://bootstrap.pypa.io/ez_setup.py -O - | sudo python

Alternatively, Setuptools may be installed to a user-local path::

    > wget https://bootstrap.pypa.io/ez_setup.py -O - | python - --user

Note that on some older systems (noted on Debian 6 and CentOS 5 installations),
`wget` may refuse to download `ez_setup.py`, complaining that the certificate common name `*.c.ssl.fastly.net`
does not match the host name `bootstrap.pypa.io`. In addition, the `ez_setup.py` script may then encounter similar problems using
`wget` internally to download `setuptools-x.y.zip`, complaining that the certificate common name of `www.python.org` does not match the
host name `pypi.python.org`. Those are known issues, related to a bug in the older versions of `wget`
(see `Issue 59 <https://bitbucket.org/pypa/pypi/issue/59#comment-5881915>`_). If you happen to encounter them,
install Setuptools as follows::

    > wget --no-check-certificate https://bootstrap.pypa.io/ez_setup.py
    > python ez_setup.py --insecure


Unix including Mac OS X (curl)
==============================

If your system has curl installed, follow the ``wget`` instructions but
replace ``wget`` with ``curl`` and ``-O`` with ``-o``. For example::

    > curl https://bootstrap.pypa.io/ez_setup.py -o - | python


Advanced Installation
=====================

For more advanced installation options, such as installing to custom
locations or prefixes, download and extract the source
tarball from `Setuptools on PyPI <https://pypi.python.org/pypi/setuptools>`_
and run setup.py with any supported distutils and Setuptools options.
For example::

    setuptools-x.x$ python setup.py install --prefix=/opt/setuptools

Use ``--help`` to get a full options list, but we recommend consulting
the `EasyInstall manual`_ for detailed instructions, especially `the section
on custom installation locations`_.

.. _EasyInstall manual: https://pythonhosted.org/setuptools/EasyInstall
.. _the section on custom installation locations: https://pythonhosted.org/setuptools/EasyInstall#custom-installation-locations


Downloads
=========

All setuptools downloads can be found at `the project's home page in the Python
Package Index`_. Scroll to the very bottom of the page to find the links.

.. _the project's home page in the Python Package Index: https://pypi.python.org/pypi/setuptools

In addition to the PyPI downloads, the development version of ``setuptools``
is available from the `Bitbucket repo`_, and in-development versions of the
`0.6 branch`_ are available as well.

.. _Bitbucket repo: https://bitbucket.org/pypa/setuptools/get/default.tar.gz#egg=setuptools-dev
.. _0.6 branch: http://svn.python.org/projects/sandbox/branches/setuptools-0.6/#egg=setuptools-dev06

Uninstalling
============

On Windows, if Setuptools was installed using an ``.exe`` or ``.msi``
installer, simply use the uninstall feature of "Add/Remove Programs" in the
Control Panel.

Otherwise, to uninstall Setuptools or Distribute, regardless of the Python
version, delete all ``setuptools*`` and ``distribute*`` files and
directories from your system's ``site-packages`` directory
(and any other ``sys.path`` directories) FIRST.

If you are upgrading or otherwise plan to re-install Setuptools or Distribute,
nothing further needs to be done. If you want to completely remove Setuptools,
you may also want to remove the 'easy_install' and 'easy_install-x.x' scripts
and associated executables installed to the Python scripts directory.

--------------------------------
Using Setuptools and EasyInstall
--------------------------------

Here are some of the available manuals, tutorials, and other resources for
learning about Setuptools, Python Eggs, and EasyInstall:

* `The EasyInstall user's guide and reference manual`_
* `The setuptools Developer's Guide`_
* `The pkg_resources API reference`_
* `The Internal Structure of Python Eggs`_

Questions, comments, and bug reports should be directed to the `distutils-sig
mailing list`_. If you have written (or know of) any tutorials, documentation,
plug-ins, or other resources for setuptools users, please let us know about
them there, so this reference list can be updated. If you have working,
*tested* patches to correct problems or add features, you may submit them to
the `setuptools bug tracker`_.

.. _setuptools bug tracker: https://github.com/pypa/setuptools/issues
.. _The Internal Structure of Python Eggs: https://setuptools.readthedocs.io/en/latest/formats.html
.. _The setuptools Developer's Guide: https://setuptools.readthedocs.io/en/latest/developer-guide.html
.. _The pkg_resources API reference: https://setuptools.readthedocs.io/en/latest/pkg_resources.html
.. _The EasyInstall user's guide and reference manual: https://setuptools.readthedocs.io/en/latest/easy_install.html
.. _distutils-sig mailing list: http://mail.python.org/pipermail/distutils-sig/


-------
Credits
-------

* The original design for the ``.egg`` format and the ``pkg_resources`` API was
  co-created by Phillip Eby and Bob Ippolito. Bob also implemented the first
  version of ``pkg_resources``, and supplied the OS X operating system version
  compatibility algorithm.

* Ian Bicking implemented many early "creature comfort" features of
  easy_install, including support for downloading via Sourceforge and
  Subversion repositories. Ian's comments on the Web-SIG about WSGI
  application deployment also inspired the concept of "entry points" in eggs,
  and he has given talks at PyCon and elsewhere to inform and educate the
  community about eggs and setuptools.

* Jim Fulton contributed time and effort to build automated tests of various
  aspects of ``easy_install``, and supplied the doctests for the command-line
  ``.exe`` wrappers on Windows.

* Phillip J. Eby is the seminal author of setuptools, and
  first proposed the idea of an importable binary distribution format for
  Python application plug-ins.

* Significant parts of the implementation of setuptools were funded by the Open
  Source Applications Foundation, to provide a plug-in infrastructure for the
  Chandler PIM application. In addition, many OSAF staffers (such as Mike
  "Code Bear" Taylor) contributed their time and stress as guinea pigs for the
  use of eggs and setuptools, even before eggs were "cool".  (Thanks, guys!)

* Tarek Ziadé is the principal author of the Distribute fork, which
  re-invigorated the community on the project, encouraged renewed innovation,
  and addressed many defects.

* Since the merge with Distribute, Jason R. Coombs is the
  maintainer of setuptools. The project is maintained in coordination with
  the Python Packaging Authority (PyPA) and the larger Python community.

.. _files:


---------------
Code of Conduct
---------------

Everyone interacting in the setuptools project's codebases, issue trackers,
chat rooms, and mailing lists is expected to follow the
`PyPA Code of Conduct`_.

.. _PyPA Code of Conduct: https://www.pypa.io/en/latest/code-of-conduct/


