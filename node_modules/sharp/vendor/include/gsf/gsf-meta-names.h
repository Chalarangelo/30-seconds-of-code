/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-meta-names.h: a list of gsf-meta-names to "generically" represent
 *                   all diversly available implementation-specific
 *                   meta-names.
 *
 * Author:  Veerapuram Varadhan (vvaradhan@novell.com)
 * 	    Jody Goldberg (jody@gnome.org)
 *
 * Copyright (C) 2004-2006 Novell, Inc
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of version 2.1 of the GNU Lesser General Public
 * License as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301
 * USA
 */
#ifndef GSF_META_NAMES_H
#define GSF_META_NAMES_H

/* The namespace follow this classification:
 * "dc:" - Dublin Core tags
 * "gsf:" - Gnumeric only tags
 * "meta:" - OpenDocument tags shared with Gnumeric
 * "msole:" - OLE tags
 */

/****** Namespace - dc: ******/

/**
 * GSF_META_NAME_CREATOR:
 *
 * (String) An entity primarily responsible for making the content of the
 * resource typically a person, organization, or service.
 *
 * 1.14.0	Moved from "gsf" to "dc".
 */
#define GSF_META_NAME_CREATOR				"dc:creator"

/**
 * GSF_META_NAME_DATE_MODIFIED:
 *
 * (GsfTimestamp) The last time this document was saved.
 *
 * 1.14.0	Moved from dc:date-modified to dc:date.
 */
#define GSF_META_NAME_DATE_MODIFIED			"dc:date"

/**
 * GSF_META_NAME_DESCRIPTION:
 *
 * (String) An account of the content of the resource.
 */
#define GSF_META_NAME_DESCRIPTION			"dc:description"

/**
 * GSF_META_NAME_KEYWORDS:
 *
 * (GsfDocPropVector of String) Searchable, indexable keywords. Similar to PDF
 * keywords or HTML's meta block.
 */
#define GSF_META_NAME_KEYWORDS				"dc:keywords"

/**
 * GSF_META_NAME_LANGUAGE:
 *
 * (String) The locale language of the intellectual content of the resource
 * 	(basically xx_YY form for us).
 * 1.14.0	Clarified that this is unique from _NAME_CODEPAGE in msole
 */
#define GSF_META_NAME_LANGUAGE				"dc:language"

/**
 * GSF_META_NAME_CODEPAGE:
 *
 * (UnsignedShort) The MS codepage to encode strings for metadata
 * 1.14.0	Clarified that this is unique from _NAME_CODEPAGE in msole
 */
#define	GSF_META_NAME_CODEPAGE				"msole:codepage"

/**
 * GSF_META_NAME_SUBJECT:
 *
 * (String) The topic of the content of the resource,
 * <emphasis>typically</emphasis> including keywords.
 */
#define GSF_META_NAME_SUBJECT				"dc:subject"

/**
 * GSF_META_NAME_TITLE:
 *
 * (String) A formal name given to the resource.
 */
#define GSF_META_NAME_TITLE				"dc:title"


/****** Namespace - gsf: ******/

/**
 * GSF_META_NAME_BYTE_COUNT:
 *
 * (Integer) Count of bytes in the document.
 */
#define GSF_META_NAME_BYTE_COUNT			"gsf:byte-count"

/**
 * GSF_META_NAME_CASE_SENSITIVE:
 *
 * (Unsigned Integer) Identifier representing the case-sensitiveness.
 * <note>of what ?? why is it an integer ??</note>
 */
#define GSF_META_NAME_CASE_SENSITIVE			"gsf:case-sensitivity"

/**
 * GSF_META_NAME_CATEGORY:
 *
 * (String) Category of the document. <note>example???</note>
 */
#define GSF_META_NAME_CATEGORY				"gsf:category"

/**
 * GSF_META_NAME_CELL_COUNT:
 *
 * (Integer) Count of cells in the spread-sheet document, if appropriate.
 */
#define GSF_META_NAME_CELL_COUNT			"gsf:cell-count"

/**
 * GSF_META_NAME_CHARACTER_COUNT:
 *
 * (Integer) Count of characters in the document.
 *
 * TODO See how to sync this with ODF's document-statistic
 */
#define GSF_META_NAME_CHARACTER_COUNT			"gsf:character-count"

/**
 * GSF_META_NAME_DICTIONARY:
 *
 * (None) Reserved name (PID) for Dictionary
 */
#define GSF_META_NAME_DICTIONARY			"gsf:dictionary"

/**
 * GSF_META_NAME_DOCUMENT_PARTS:
 *
 * (Vector of strings) Names of the 'interesting' parts of the document.  In
 * spreadsheets this is a list of the sheet names, and the named expressions.
 * From MSOLE
 */
#define GSF_META_NAME_DOCUMENT_PARTS			"gsf:document-parts"

/**
 * GSF_META_NAME_HEADING_PAIRS:
 *
 * (Vector of string value pairs stored in alternating elements) Store the
 * counts of objects in the document as names 'worksheet' and count '4'
 * From MSOLE
 */
#define GSF_META_NAME_HEADING_PAIRS			"gsf:heading-pairs"

/**
 * GSF_META_NAME_HIDDEN_SLIDE_COUNT:
 *
 * (Integer) Count of hidden-slides in the presentation document.
 */
#define GSF_META_NAME_HIDDEN_SLIDE_COUNT		"gsf:hidden-slide-count"

/**
 * GSF_META_NAME_IMAGE_COUNT:
 *
 * (Integer) Count of images in the document, if appropriate.
 */
#define GSF_META_NAME_IMAGE_COUNT           		"gsf:image-count"

/**
 * GSF_META_NAME_LAST_SAVED_BY:
 *
 * (String) The entity that made the last change to the document, typically a
 * person, organization, or service.
 */
#define GSF_META_NAME_LAST_SAVED_BY         		"gsf:last-saved-by"

/**
 * GSF_META_NAME_LINKS_DIRTY:
 *
 * (Boolean) ???????
 */
#define GSF_META_NAME_LINKS_DIRTY			"gsf:links-dirty"

/**
 * GSF_META_NAME_LOCALE_SYSTEM_DEFAULT:
 *
 * (Unsigned Integer) Identifier representing the default system locale.
 */
#define GSF_META_NAME_LOCALE_SYSTEM_DEFAULT		"gsf:default-locale"

/**
 * GSF_META_NAME_MANAGER:
 *
 * (String) Name of the manager of "CREATOR" entity.
 */
#define GSF_META_NAME_MANAGER				"gsf:manager"

/**
 * GSF_META_NAME_PRESENTATION_FORMAT:
 *
 * (String) Type of presentation, like "On-screen Show", "SlideView" etc.
 */
#define GSF_META_NAME_PRESENTATION_FORMAT		"gsf:presentation-format"

/**
 * GSF_META_NAME_SCALE:
 *
 * (Boolean) ?????
 */
#define GSF_META_NAME_SCALE				"gsf:scale"

/**
 * GSF_META_NAME_SECURITY:
 *
 * (Integer) Level of security.
 *
 * <informaltable frame="none" role="params">
 * <tgroup cols="2">
 * <thead>
 * <row><entry align="left">Level</entry><entry>Value</entry></row>
 * </thead>
 * <tbody>
 * <row><entry>None</entry><entry>0</entry></row>
 * <row><entry>Password protected</entry><entry>1</entry></row>
 * <row><entry>Read-only recommended</entry><entry>2</entry></row>
 * <row><entry>Read-only enforced</entry><entry>3</entry></row>
 * <row><entry>Locked for annotations</entry><entry>4</entry></row>
 * </tbody></tgroup></informaltable>
 */
#define GSF_META_NAME_SECURITY				"gsf:security"

/**
 * GSF_META_NAME_THUMBNAIL:
 *
 * (GsfClipData) Thumbnail data of the document, typically a
 * preview image of the document.
 */
#define GSF_META_NAME_THUMBNAIL				"gsf:thumbnail"

/**
 * GSF_META_NAME_LINE_COUNT:
 *
 * (Integer) Count of liness in the document.
 */
#define GSF_META_NAME_LINE_COUNT			"gsf:line-count"

/**
 * GSF_META_NAME_MM_CLIP_COUNT:
 *
 * (Integer) Count of "multi-media" clips in the document.
 */
#define GSF_META_NAME_MM_CLIP_COUNT			"gsf:MM-clip-count"

/**
 * GSF_META_NAME_NOTE_COUNT:
 *
 * (Integer) Count of "notes" in the document.
 */
#define GSF_META_NAME_NOTE_COUNT			"gsf:note-count"

/**
 * GSF_META_NAME_OBJECT_COUNT:
 *
 * (Integer) Count of objects (OLE and other graphics) in the document, if
 * appropriate.
 */
#define GSF_META_NAME_OBJECT_COUNT			"gsf:object-count"

/**
 * GSF_META_NAME_PAGE_COUNT:
 *
 * (Integer) Count of pages in the document, if appropriate.
 */
#define GSF_META_NAME_PAGE_COUNT			"gsf:page-count"

/**
 * GSF_META_NAME_PARAGRAPH_COUNT:
 *
 * (Integer) Count of paragraphs in the document, if appropriate.
 */
#define GSF_META_NAME_PARAGRAPH_COUNT			"gsf:paragraph-count"

/**
 * GSF_META_NAME_SLIDE_COUNT:
 *
 * (Integer) Count of slides in the presentation document.
 */
#define GSF_META_NAME_SLIDE_COUNT			"gsf:slide-count"

/**
 * GSF_META_NAME_SPREADSHEET_COUNT:
 *
 * (Integer) Count of pages in the document, if appropriate.
 */
#define GSF_META_NAME_SPREADSHEET_COUNT			"gsf:spreadsheet-count"

/**
 * GSF_META_NAME_TABLE_COUNT:
 *
 * (Integer) Count of tables in the document, if appropriate.
 */
#define GSF_META_NAME_TABLE_COUNT			"gsf:table-count"

/**
 * GSF_META_NAME_WORD_COUNT:
 *
 * (Integer) Count of words in the document.
 */
#define GSF_META_NAME_WORD_COUNT			"gsf:word-count"


/****** Namespace - msole: ******/

/**
 * GSF_META_NAME_MSOLE_UNKNOWN_17:
 *
 * (Unknown) User-defined name
 */
#define GSF_META_NAME_MSOLE_UNKNOWN_17			"msole:unknown-doc-17"

/**
 * GSF_META_NAME_MSOLE_UNKNOWN_18:
 *
 * (Unknown) User-defined name
 */
#define GSF_META_NAME_MSOLE_UNKNOWN_18			"msole:unknown-doc-18"

/**
 * GSF_META_NAME_MSOLE_UNKNOWN_19:
 *
 * (Boolean) User-defined name
 */
#define GSF_META_NAME_MSOLE_UNKNOWN_19			"msole:unknown-doc-19"

/**
 * GSF_META_NAME_MSOLE_UNKNOWN_20:
 *
 * (Unknown) User-defined name
 */
#define GSF_META_NAME_MSOLE_UNKNOWN_20			"msole:unknown-doc-20"

/**
 * GSF_META_NAME_MSOLE_UNKNOWN_21:
 *
 * (Unknown) User-defined name
 */
#define GSF_META_NAME_MSOLE_UNKNOWN_21			"msole:unknown-doc-21"

/**
 * GSF_META_NAME_MSOLE_UNKNOWN_22:
 *
 * (Boolean) User-defined name
 */
#define GSF_META_NAME_MSOLE_UNKNOWN_22			"msole:unknown-doc-22"

/**
 * GSF_META_NAME_MSOLE_UNKNOWN_23:
 *
 * (i4) User-defined name
 */
#define GSF_META_NAME_MSOLE_UNKNOWN_23			"msole:unknown-doc-23"


/****** Namespace - meta: ******/

/**
 * GSF_META_NAME_DATE_CREATED:
 *
 * (Date as ISO String) A date associated with an event in the life cycle of
 * the resource (creation/publication date).
 * Moved from gsf:date-created to meta:creation-date. This way can be used correctly
 * by OpenDocument and Gnumeric.
 */
#define GSF_META_NAME_DATE_CREATED			"meta:creation-date"

/**
 * GSF_META_NAME_EDITING_DURATION:
 *
 * (Date as ISO String) The total-time taken until the last modification.
 * Moved from "gsf" to "meta". This way can be used correctly by OpenDocument
 * and Gnumeric.
 */
#define GSF_META_NAME_EDITING_DURATION			"meta:editing-duration"

/**
 * GSF_META_NAME_GENERATOR:
 *
 * (String) The application that generated this document. AbiWord, Gnumeric,
 * etc...
 *
 * 1.14.0 Moved from "gsf" to "meta".
 */
#define GSF_META_NAME_GENERATOR				"meta:generator"

/**
 * GSF_META_NAME_KEYWORD:
 *
 * (String) Searchable, indexable keywords. Similar to PDF keywords or HTML's
 * meta block.
 */
#define GSF_META_NAME_KEYWORD				"meta:keyword"

/**
 * GSF_META_NAME_INITIAL_CREATOR:
 *
 * (String) Specifies the name of the person who created the document
 * initially.
 * 1.14.0 Moved from "gsf" to "meta".
 */
#define GSF_META_NAME_INITIAL_CREATOR			"meta:initial-creator"

/**
 * GSF_META_NAME_COMPANY:
 *
 * (String) Name of the company/organization that the "CREATOR" entity is
 * associated with.
 *
 * 1.14.1	Moved from "gsf:company" to "dc:publisher".
 */
#define GSF_META_NAME_COMPANY				"dc:publisher"

/**
 * GSF_META_NAME_PRINT_DATE:
 *
 * (GsfTimestamp) Specifies the date and time when the document was last
 * printed.
 */
#define GSF_META_NAME_PRINT_DATE			"meta:print-date"

/**
 * GSF_META_NAME_LAST_PRINTED:
 *
 * (GSF_META_NAME_HEADING_PAIRS) The last time this document was printed.
 *
 * 1.14.0	Moved from "gsf" to "dc".
 * 1.14.1	Moved back to "gsf" from "dc".
 */
#define GSF_META_NAME_LAST_PRINTED			"gsf:last-printed"

/**
 * GSF_META_NAME_PRINTED_BY:
 *
 * (String) Specifies the name of the last person who printed the document.
 *
 * 1.14.0	Moved from "gsf" to "meta".
 */
#define GSF_META_NAME_PRINTED_BY			"meta:printed-by"

/**
 * GSF_META_NAME_REVISION_COUNT:
 *
 * (Integer) Count of revision on the document, if appropriate.
 * Moved from gsf:revision-count to meta:editing-cycles. This way can be used
 * correctly by OpenDocument and Gnumeric.
 */
#define GSF_META_NAME_REVISION_COUNT			"meta:editing-cycles"

/**
 * GSF_META_NAME_TEMPLATE:
 *
 * (String) The template file that is been used to generate this document.
 *
 * 1.14.0 Moved from "gsf" to "meta"
 */
#define GSF_META_NAME_TEMPLATE				"meta:template"

#endif /* GSF_META_NAMES_H */
