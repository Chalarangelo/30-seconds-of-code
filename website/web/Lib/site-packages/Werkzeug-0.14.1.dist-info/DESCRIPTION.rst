Werkzeug
========

Werkzeug is a comprehensive `WSGI`_ web application library. It began as
a simple collection of various utilities for WSGI applications and has
become one of the most advanced WSGI utility libraries.

It includes:

* An interactive debugger that allows inspecting stack traces and source
  code in the browser with an interactive interpreter for any frame in
  the stack.
* A full-featured request object with objects to interact with headers,
  query args, form data, files, and cookies.
* A response object that can wrap other WSGI applications and handle
  streaming data.
* A routing system for matching URLs to endpoints and generating URLs
  for endpoints, with an extensible system for capturing variables from
  URLs.
* HTTP utilities to handle entity tags, cache control, dates, user
  agents, cookies, files, and more.
* A threaded WSGI server for use while developing applications locally.
* A test client for simulating HTTP requests during testing without
  requiring running a server.

Werkzeug is Unicode aware and doesn't enforce any dependencies. It is up
to the developer to choose a template engine, database adapter, and even
how to handle requests. It can be used to build all sorts of end user
applications such as blogs, wikis, or bulletin boards.

`Flask`_ wraps Werkzeug, using it to handle the details of WSGI while
providing more structure and patterns for defining powerful
applications.


Installing
----------

Install and update using `pip`_:

.. code-block:: text

    pip install -U Werkzeug


A Simple Example
----------------

.. code-block:: python

    from werkzeug.wrappers import Request, Response

    @Request.application
    def application(request):
        return Response('Hello, World!')

    if __name__ == '__main__':
        from werkzeug.serving import run_simple
        run_simple('localhost', 4000, application)


Links
-----

* Website: https://www.palletsprojects.com/p/werkzeug/
* Releases: https://pypi.org/project/Werkzeug/
* Code: https://github.com/pallets/werkzeug
* Issue tracker: https://github.com/pallets/werkzeug/issues
* Test status:

  * Linux, Mac: https://travis-ci.org/pallets/werkzeug
  * Windows: https://ci.appveyor.com/project/davidism/werkzeug

* Test coverage: https://codecov.io/gh/pallets/werkzeug

.. _WSGI: https://wsgi.readthedocs.io/en/latest/
.. _Flask: https://www.palletsprojects.com/p/flask/
.. _pip: https://pip.pypa.io/en/stable/quickstart/


