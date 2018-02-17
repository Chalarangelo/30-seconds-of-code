# -*- coding: utf-8 -*-

from ._hoedown import lib, ffi
from .constants import *
from .utils import to_string


@ffi.callback('void(hoedown_buffer *ob, const hoedown_buffer *text, '
              '     const hoedown_buffer *lang, const hoedown_renderer_data *data)')
def cb_blockcode(ob, text, lang, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    text = to_string(text)
    lang = to_string(lang)

    result = renderer.blockcode(text, lang)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


@ffi.callback('void(hoedown_buffer *ob, const hoedown_buffer *content, '
              '     const hoedown_renderer_data *data)')
def cb_blockquote(ob, content, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    result = renderer.blockquote(content)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


@ffi.callback('void(hoedown_buffer *ob, const hoedown_buffer *content, '
              '     int level, const hoedown_renderer_data *data)')
def cb_header(ob, content, level, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    level = int(level)
    result = renderer.header(content, level)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


@ffi.callback('void(hoedown_buffer *ob, const hoedown_renderer_data *data)')
def cb_hrule(ob, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    result = renderer.hrule()
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


# flags: LIST_ORDERED, LI_BLOCK.
@ffi.callback('void(hoedown_buffer *ob, const hoedown_buffer *content, '
              '     hoedown_list_flags flags, const hoedown_renderer_data *data)')
def cb_list(ob, content, flags, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    flags = int(flags)
    is_ordered = flags & LIST_ORDERED != 0
    is_block = flags & LI_BLOCK != 0
    result = renderer.list(content, is_ordered, is_block)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


# flags: LIST_ORDERED, LI_BLOCK.
@ffi.callback('void(hoedown_buffer *ob, const hoedown_buffer *content, '
              '     hoedown_list_flags flags, const hoedown_renderer_data *data)')
def cb_listitem(ob, content, flags, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    flags = int(flags)
    is_ordered = flags & LIST_ORDERED != 0
    is_block = flags & LI_BLOCK != 0
    result = renderer.listitem(content, is_ordered, is_block)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


@ffi.callback('void(hoedown_buffer *ob, const hoedown_buffer *content, '
              '     const hoedown_renderer_data *data)')
def cb_paragraph(ob, content, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    result = renderer.paragraph(content)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


@ffi.callback('void(hoedown_buffer *ob, const hoedown_buffer *content, '
              '     const hoedown_renderer_data *data)')
def cb_table(ob, content, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    result = renderer.table(content)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


@ffi.callback('void(hoedown_buffer *ob, const hoedown_buffer *content, '
              '     const hoedown_renderer_data *data)')
def cb_table_header(ob, content, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    result = renderer.table_header(content)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


@ffi.callback('void(hoedown_buffer *ob, const hoedown_buffer *content, '
              '     const hoedown_renderer_data *data)')
def cb_table_body(ob, content, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    result = renderer.table_body(content)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


@ffi.callback('void(hoedown_buffer *ob, const hoedown_buffer *content, '
              '     const hoedown_renderer_data *data)')
def cb_table_row(ob, content, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    result = renderer.table_row(content)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


# flags: TABLE_ALIGNMASK, TABLE_ALIGN_LEFT, TABLE_ALIGN_RIGHT,
#        TABLE_ALIGN_CENTER, TABLE_HEADER
@ffi.callback('void(hoedown_buffer *ob, const hoedown_buffer *content, '
              '     hoedown_table_flags flags, const hoedown_renderer_data *data)')
def cb_table_cell(ob, content, flags, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    flags = int(flags)
    is_header = flags & TABLE_HEADER != 0
    align_bit = flags & TABLE_ALIGNMASK

    if align_bit == TABLE_ALIGN_CENTER:
        align = 'center'
    elif align_bit == TABLE_ALIGN_LEFT:
        align = 'left'
    elif align_bit == TABLE_ALIGN_RIGHT:
        align = 'right'
    else:
        align = ''

    result = renderer.table_cell(content, align, is_header)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


@ffi.callback('void(hoedown_buffer *ob, const hoedown_buffer *content, '
              '     const hoedown_renderer_data *data)')
def cb_footnotes(ob, content, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    result = renderer.footnotes(content)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


@ffi.callback('void(hoedown_buffer *ob, const hoedown_buffer *content, '
              '     unsigned int num, const hoedown_renderer_data *data)')
def cb_footnote_def(ob, content, num, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    num = int(num)
    result = renderer.footnote_def(content, num)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


@ffi.callback('void(hoedown_buffer *ob, const hoedown_buffer *text, '
              '     const hoedown_renderer_data *data)')
def cb_blockhtml(ob, text, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    text = ffi.string(text.data, text.size).decode('utf-8')
    result = renderer.blockhtml(text)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


@ffi.callback('int(hoedown_buffer *ob, const hoedown_buffer *link, '
              '    hoedown_autolink_type type, const hoedown_renderer_data *data)')
def cb_autolink(ob, link, type, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    link = ffi.string(link.data, link.size).decode('utf-8')
    is_email = int(type) & AUTOLINK_EMAIL != 0
    result = renderer.autolink(link, is_email)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))
        return 1
    return 0


@ffi.callback('int(hoedown_buffer *ob, const hoedown_buffer *text, '
              '    const hoedown_renderer_data *data)')
def cb_codespan(ob, text, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    text = ffi.string(text.data, text.size).decode('utf-8')
    result = renderer.codespan(text)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))
        return 1
    return 0


@ffi.callback('int(hoedown_buffer *ob, const hoedown_buffer *content, '
              '    const hoedown_renderer_data *data)')
def cb_double_emphasis(ob, content, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    result = renderer.double_emphasis(content)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))
        return 1
    return 0


@ffi.callback('int(hoedown_buffer *ob, const hoedown_buffer *content, '
              '    const hoedown_renderer_data *data)')
def cb_emphasis(ob, content, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    result = renderer.emphasis(content)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))
        return 1
    return 0


@ffi.callback('int(hoedown_buffer *ob, const hoedown_buffer *content, '
              '    const hoedown_renderer_data *data)')
def cb_underline(ob, content, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    result = renderer.underline(content)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))
        return 1
    return 0


@ffi.callback('int(hoedown_buffer *ob, const hoedown_buffer *content, '
              '    const hoedown_renderer_data *data)')
def cb_highlight(ob, content, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    result = renderer.highlight(content)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))
        return 1
    return 0


@ffi.callback('int(hoedown_buffer *ob, const hoedown_buffer *content, '
              '    const hoedown_renderer_data *data)')
def cb_quote(ob, content, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    result = renderer.quote(content)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))
        return 1
    return 0


@ffi.callback('int(hoedown_buffer *ob, const hoedown_buffer *link, '
              '    const hoedown_buffer *title, const hoedown_buffer *alt, '
              '    const hoedown_renderer_data *data)')
def cb_image(ob, link, title, alt, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    link = to_string(link)
    title = to_string(title)
    alt = to_string(alt)
    result = renderer.image(link, title, alt)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))
        return 1
    return 0


@ffi.callback('int(hoedown_buffer *ob, const hoedown_renderer_data *data)')
def cb_linebreak(ob, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    result = renderer.linebreak()
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))
        return 1
    return 0


@ffi.callback('int(hoedown_buffer *ob, const hoedown_buffer *content, '
              '    const hoedown_buffer *link, const hoedown_buffer *title, '
              '    const hoedown_renderer_data *data)')
def cb_link(ob, content, link, title, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    link = to_string(link)
    title = to_string(title)
    result = renderer.link(content, link, title)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))
        return 1
    return 0


@ffi.callback('int(hoedown_buffer *ob, const hoedown_buffer *content, '
              '    const hoedown_renderer_data *data)')
def cb_triple_emphasis(ob, content, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    result = renderer.triple_emphasis(content)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))
        return 1
    return 0


@ffi.callback('int(hoedown_buffer *ob, const hoedown_buffer *content, '
              '    const hoedown_renderer_data *data)')
def cb_strikethrough(ob, content, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    result = renderer.strikethrough(content)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))
        return 1
    return 0


@ffi.callback('int(hoedown_buffer *ob, const hoedown_buffer *content, '
              '    const hoedown_renderer_data *data)')
def cb_superscript(ob, content, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    content = to_string(content)
    result = renderer.superscript(content)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))
        return 1
    return 0


@ffi.callback('int(hoedown_buffer *ob, unsigned int num, '
              '    const hoedown_renderer_data *data)')
def cb_footnote_ref(ob, num, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    num = int(num)
    result = renderer.footnote_ref(num)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))
        return 1
    return 0


@ffi.callback('int(hoedown_buffer *ob, const hoedown_buffer *text, '
              '    int displaymode, const hoedown_renderer_data *data)')
def cb_math(ob, text, displaymode, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    text = to_string(text)
    displaymode = int(displaymode)
    result = renderer.math(text, displaymode)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))
        return 1
    return 0


@ffi.callback('int(hoedown_buffer *ob, const hoedown_buffer *text, '
              '    const hoedown_renderer_data *data)')
def cb_raw_html(ob, text, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    text = to_string(text)
    result = renderer.raw_html(text)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))
        return 1
    return 0


@ffi.callback('void(hoedown_buffer *ob, const hoedown_buffer *text, '
              '     const hoedown_renderer_data *data)')
def cb_entity(ob, text, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    text = to_string(text)
    result = renderer.entity(text)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


@ffi.callback('void(hoedown_buffer *ob, const hoedown_buffer *text, '
              '     const hoedown_renderer_data *data)')
def cb_normal_text(ob, text, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    text = to_string(text)
    result = renderer.normal_text(text)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


@ffi.callback('void(hoedown_buffer *ob, int inline_render, const hoedown_renderer_data *data)')
def cb_doc_header(ob, inline_render, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    inline_render = int(inline_render)
    result = renderer.doc_header(inline_render)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


@ffi.callback('void(hoedown_buffer *ob, int inline_render, const hoedown_renderer_data *data)')
def cb_doc_footer(ob, inline_render, data):
    renderer = ffi.from_handle(lib.misaka_get_renderer(data))
    inline_render = int(inline_render)
    result = renderer.doc_footer(inline_render)
    if result:
        lib.hoedown_buffer_puts(ob, result.encode('utf-8'))


python_callbacks = {
    # block level callbacks - NULL skips the block
    'blockcode':    cb_blockcode,
    'blockquote':   cb_blockquote,
    'header':       cb_header,
    'hrule':        cb_hrule,
    'list':         cb_list,
    'listitem':     cb_listitem,
    'paragraph':    cb_paragraph,
    'table':        cb_table,
    'table_header': cb_table_header,
    'table_body':   cb_table_body,
    'table_row':    cb_table_row,
    'table_cell':   cb_table_cell,
    'footnotes':    cb_footnotes,
    'footnote_def': cb_footnote_def,
    'blockhtml':    cb_blockhtml,

    # span level callbacks - NULL or return 0 prints the span verbatim
    'autolink':        cb_autolink,
    'codespan':        cb_codespan,
    'double_emphasis': cb_double_emphasis,
    'emphasis':        cb_emphasis,
    'underline':       cb_underline,
    'highlight':       cb_highlight,
    'quote':           cb_quote,
    'image':           cb_image,
    'linebreak':       cb_linebreak,
    'link':            cb_link,
    'triple_emphasis': cb_triple_emphasis,
    'strikethrough':   cb_strikethrough,
    'superscript':     cb_superscript,
    'footnote_ref':    cb_footnote_ref,
    'math':            cb_math,
    'raw_html':        cb_raw_html,

    # low level callbacks - NULL copies input directly into the output
    'entity':      cb_entity,
    'normal_text': cb_normal_text,

    # miscellaneous callbacks
    'doc_header': cb_doc_header,
    'doc_footer': cb_doc_footer,
}
