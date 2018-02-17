Mistune
=======

The fastest markdown parser in pure Python with renderer features,
inspired by marked_.

.. image:: https://img.shields.io/badge/donate-lepture-green.svg
   :target: https://typlog.com/donate?amount=10&reason=lepture%2Fmistune
   :alt: Donate lepture
.. image:: https://img.shields.io/pypi/wheel/mistune.svg?style=flat
   :target: https://pypi.python.org/pypi/mistune/
   :alt: Wheel Status
.. image:: https://anaconda.org/conda-forge/mistune/badges/version.svg
   :target: https://anaconda.org/conda-forge/mistune
   :alt: Conda Version
.. image:: https://img.shields.io/pypi/v/mistune.svg
   :target: https://pypi.python.org/pypi/mistune/
   :alt: Latest Version
.. image:: https://travis-ci.org/lepture/mistune.svg?branch=master
   :target: https://travis-ci.org/lepture/mistune
   :alt: Travis CI Status
.. image:: https://coveralls.io/repos/lepture/mistune/badge.svg?branch=master
   :target: https://coveralls.io/r/lepture/mistune
   :alt: Coverage Status
.. image:: https://ci.appveyor.com/api/projects/status/8ai8tfwp75oela17?svg=true
   :target: https://ci.appveyor.com/project/lepture/mistune
   :alt: App Veyor CI Status

.. _marked: https://github.com/chjj/marked


Features
--------

* **Pure Python**. Tested in Python 2.6+, Python 3.3+ and PyPy.
* **Very Fast**. It is the fastest in all **pure Python** markdown parsers.
* **More Features**. Table, footnotes, autolink, fenced code etc.

View the `benchmark results <https://github.com/lepture/mistune/issues/1>`_.

Installation
------------

Installing mistune with pip::

    $ pip install mistune


Mistune can be faster, if you compile with cython::

    $ pip install cython mistune


Basic Usage
-----------

A simple API that render a markdown formatted text:

.. code:: python

    import mistune

    mistune.markdown('I am using **mistune markdown parser**')
    # output: <p>I am using <strong>mistune markdown parser</strong></p>

If you care about performance, it is better to re-use the Markdown instance:

.. code:: python

    import mistune

    markdown = mistune.Markdown()
    markdown('I am using **mistune markdown parser**')

Mistune has enabled all features by default. You don't have to configure
anything. But there are options for you to change the parser behaviors.


Options
-------

Here is a list of all options that will affect the rendering results,
configure them with ``mistune.Renderer``:

.. code:: python

    renderer = mistune.Renderer(escape=True, hard_wrap=True)
    # use this renderer instance
    markdown = mistune.Markdown(renderer=renderer)
    markdown(text)

* **escape**: if set to *False*, all raw html tags will not be escaped.
* **hard_wrap**: if set to *True*, it will has GFM line breaks feature.
  All new lines will be replaced with ``<br>`` tag
* **use_xhtml**: if set to *True*, all tags will be in xhtml, for example: ``<hr />``.
* **parse_block_html**: parse text only in block level html.
* **parse_inline_html**: parse text only in inline level html.

When using the default renderer, you can use one of the following shortcuts::

    mistune.markdown(text, escape=True, hard_wrap=True)

    markdown = mistune.Markdown(escape=True, hard_wrap=True)
    markdown(text)


Renderer
--------

Like misaka/sundown, you can influence the rendering by custom renderers.
All you need to do is subclassing a `Renderer` class.

Here is an example of code highlighting:

.. code:: python

    import mistune
    from pygments import highlight
    from pygments.lexers import get_lexer_by_name
    from pygments.formatters import html

    class HighlightRenderer(mistune.Renderer):
        def block_code(self, code, lang):
            if not lang:
                return '\n<pre><code>%s</code></pre>\n' % \
                    mistune.escape(code)
            lexer = get_lexer_by_name(lang, stripall=True)
            formatter = html.HtmlFormatter()
            return highlight(code, lexer, formatter)

    renderer = HighlightRenderer()
    markdown = mistune.Markdown(renderer=renderer)
    print(markdown('```python\nassert 1 == 1\n```'))

Find more renderers in `mistune-contrib`_.

Block Level
~~~~~~~~~~~

Here is a list of block level renderer API::

    block_code(code, language=None)
    block_quote(text)
    block_html(html)
    header(text, level, raw=None)
    hrule()
    list(body, ordered=True)
    list_item(text)
    paragraph(text)
    table(header, body)
    table_row(content)
    table_cell(content, **flags)

The *flags* tells you whether it is header with ``flags['header']``. And it
also tells you the align with ``flags['align']``.


Span Level
~~~~~~~~~~

Here is a list of span level renderer API::

    autolink(link, is_email=False)
    codespan(text)
    double_emphasis(text)
    emphasis(text)
    image(src, title, alt_text)
    linebreak()
    newline()
    link(link, title, content)
    strikethrough(text)
    text(text)
    inline_html(text)

Footnotes
~~~~~~~~~

Here is a list of renderers related to footnotes::

    footnote_ref(key, index)
    footnote_item(key, text)
    footnotes(text)

Lexers
------

Sometimes you want to add your own rules to Markdown, such as GitHub Wiki
links. You can't achieve this goal with renderers. You will need to deal
with the lexers, it would be a little difficult for the first time.

We will take an example for GitHub Wiki links: ``[[Page 2|Page 2]]``.
It is an inline grammar, which requires custom ``InlineGrammar`` and
``InlineLexer``:

.. code:: python

    import copy,re
    from mistune import Renderer, InlineGrammar, InlineLexer

    class WikiLinkRenderer(Renderer):
        def wiki_link(self, alt, link):
            return '<a href="%s">%s</a>' % (link, alt)

    class WikiLinkInlineLexer(InlineLexer):
        def enable_wiki_link(self):
            # add wiki_link rules
            self.rules.wiki_link = re.compile(
                r'\[\['                   # [[
                r'([\s\S]+?\|[\s\S]+?)'   # Page 2|Page 2
                r'\]\](?!\])'             # ]]
            )

            # Add wiki_link parser to default rules
            # you can insert it some place you like
            # but place matters, maybe 3 is not good
            self.default_rules.insert(3, 'wiki_link')

        def output_wiki_link(self, m):
            text = m.group(1)
            alt, link = text.split('|')
            # you can create an custom render
            # you can also return the html if you like
            return self.renderer.wiki_link(alt, link)

You should pass the inline lexer to ``Markdown`` parser:

.. code:: python

    renderer = WikiLinkRenderer()
    inline = WikiLinkInlineLexer(renderer)
    # enable the feature
    inline.enable_wiki_link()
    markdown = Markdown(renderer, inline=inline)
    markdown('[[Link Text|Wiki Link]]')

It is the same with block level lexer. It would take a while to understand
the whole mechanism. But you won't do the trick a lot.


Contribution & Extensions
-------------------------

Mistune itself doesn't accept any extension. It will always be a simple one
file script.

If you want to add features, you can head over to `mistune-contrib`_.

Here are some extensions already in `mistune-contrib`_:

* Math/MathJax features
* Highlight Code Renderer
* TOC table of content features
* MultiMarkdown Metadata parser

Get inspired with the contrib repository.

.. _`mistune-contrib`: https://github.com/lepture/mistune-contrib


