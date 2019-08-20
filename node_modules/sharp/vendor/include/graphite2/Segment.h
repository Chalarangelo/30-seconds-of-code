/*  GRAPHITE2 LICENSING

    Copyright 2010, SIL International
    All rights reserved.

    This library is free software; you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published
    by the Free Software Foundation; either version 2.1 of License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
    Lesser General Public License for more details.

    You should also have received a copy of the GNU Lesser General Public
    License along with this library in the file named "LICENSE".
    If not, write to the Free Software Foundation, 51 Franklin Street,
    Suite 500, Boston, MA 02110-1335, USA or visit their web page on the
    internet at http://www.fsf.org/licenses/lgpl.html.

    Alternatively, the contents of this file may be used under the terms
    of the Mozilla Public License (http://mozilla.org/MPL) or the GNU
    General Public License, as published by the Free Software Foundation,
    either version 2 of the License or (at your option) any later version.
*/
#pragma once

#include "graphite2/Types.h"
#include "graphite2/Font.h"

#ifdef __cplusplus
extern "C"
{
#endif

enum gr_break_weight {
    gr_breakNone = 0,
    /* after break weights */
    gr_breakWhitespace = 10,
    gr_breakWord = 15,
    gr_breakIntra = 20,
    gr_breakLetter = 30,
    gr_breakClip = 40,
    /* before break weights */
    gr_breakBeforeWhitespace = -10,
    gr_breakBeforeWord = -15,
    gr_breakBeforeIntra = -20,
    gr_breakBeforeLetter = -30,
    gr_breakBeforeClip = -40
};

enum gr_justFlags {
    /// Indicates that this segment is a complete line
    gr_justCompleteLine = 0,
    /// Indicates that the start of the slot list is not at the start of a line
    gr_justStartInline = 1,
    /// Indicates that the end of the slot list is not at the end of a line
    gr_justEndInline = 2
};

/** Used for looking up slot attributes. Most are already available in other functions **/
enum gr_attrCode {
    /// adjusted glyph advance in x direction in design units
    gr_slatAdvX = 0,
    /// adjusted glyph advance in y direction (usually 0) in design units
    gr_slatAdvY,
    /// returns 0. Deprecated.
    gr_slatAttTo,
    /// This slot attaches to its parent at the given design units in the x direction
    gr_slatAttX,
    /// This slot attaches to its parent at the given design units in the y direction
    gr_slatAttY,
    /// This slot attaches to its parent at the given glyph point (not implemented)
    gr_slatAttGpt,
    /// x-direction adjustment from the given glyph point (not implemented)
    gr_slatAttXOff,
    /// y-direction adjustment from the given glyph point (not implemented)
    gr_slatAttYOff,
    /// Where on this glyph should align with the attachment point on the parent glyph in the x-direction.
    gr_slatAttWithX,
    /// Where on this glyph should align with the attachment point on the parent glyph in the y-direction
    gr_slatAttWithY,
    /// Which glyph point on this glyph should align with the attachment point on the parent glyph (not implemented).
    gr_slatWithGpt,
    /// Adjustment to gr_slatWithGpt in x-direction (not implemented)
    gr_slatAttWithXOff,
    /// Adjustment to gr_slatWithGpt in y-direction (not implemented)
    gr_slatAttWithYOff,
    /// Attach at given nesting level (not implemented)
    gr_slatAttLevel,
    /// Line break breakweight for this glyph
    gr_slatBreak,
    /// Ligature component reference (not implemented)
    gr_slatCompRef,
    /// bidi directionality of this glyph (not implemented)
    gr_slatDir,
    /// Whether insertion is allowed before this glyph
    gr_slatInsert,
    /// Final positioned position of this glyph relative to its parent in x-direction in pixels
    gr_slatPosX,
    /// Final positioned position of this glyph relative to its parent in y-direction in pixels
    gr_slatPosY,
    /// Amount to shift glyph by in x-direction design units
    gr_slatShiftX,
    /// Amount to shift glyph by in y-direction design units
    gr_slatShiftY,
    /// attribute user1
    gr_slatUserDefnV1,
    /// not implemented
    gr_slatMeasureSol,
    /// not implemented
    gr_slatMeasureEol,
    /// Amount this slot can stretch (not implemented)
    gr_slatJStretch,
    /// Amount this slot can shrink (not implemented)
    gr_slatJShrink,
    /// Granularity by which this slot can stretch or shrink (not implemented)
    gr_slatJStep,
    /// Justification weight for this glyph (not implemented)
    gr_slatJWeight,
    /// Amount this slot mush shrink or stretch in design units
    gr_slatJWidth = 29,
    /// SubSegment split point
    gr_slatSegSplit = gr_slatJStretch + 29,
    /// User defined attribute, see subattr for user attr number
    gr_slatUserDefn,
    /// Bidi level
    gr_slatBidiLevel = 56,
    /// Collision flags
    gr_slatColFlags,
    /// Collision constraint rectangle left (bl.x)
    gr_slatColLimitblx,
    /// Collision constraint rectangle lower (bl.y)
    gr_slatColLimitbly,
    /// Collision constraint rectangle right (tr.x)
    gr_slatColLimittrx,
    /// Collision constraint rectangle upper (tr.y)
    gr_slatColLimittry,
    /// Collision shift x
    gr_slatColShiftx,
    /// Collision shift y
    gr_slatColShifty,
    /// Collision margin
    gr_slatColMargin,
    /// Margin cost weight
    gr_slatColMarginWt,
    // Additional glyph that excludes movement near this one:
    gr_slatColExclGlyph,
    gr_slatColExclOffx,
    gr_slatColExclOffy,
    // Collision sequence enforcing attributes:
    gr_slatSeqClass,
    gr_slatSeqProxClass,
    gr_slatSeqOrder,
    gr_slatSeqAboveXoff,
    gr_slatSeqAboveWt,
    gr_slatSeqBelowXlim,
    gr_slatSeqBelowWt,
    gr_slatSeqValignHt,
    gr_slatSeqValignWt,

    /// not implemented
    gr_slatMax,
    /// not implemented
    gr_slatNoEffect = gr_slatMax + 1
};

enum gr_bidirtl {
    /// Underlying paragraph direction is RTL
    gr_rtl = 1,
    /// Set this to not run the bidi pass internally, even if the font asks for it.
    /// This presumes that the segment is in a single direction. Most of the time
    /// this bit should be set unless you know you are passing full paragraphs of text.
    gr_nobidi = 2,
    /// Disable auto mirroring for rtl text
    gr_nomirror = 4
};

typedef struct gr_char_info     gr_char_info;
typedef struct gr_segment       gr_segment;
typedef struct gr_slot          gr_slot;

/** Returns Unicode character for a charinfo.
  *
  * @param p Pointer to charinfo to return information on.
  */
GR2_API unsigned int gr_cinfo_unicode_char(const gr_char_info* p/*not NULL*/);

/** Returns breakweight for a charinfo.
  *
  * @return Breakweight is a number between -50 and 50 indicating the cost of a
  * break before or after this character. If the value < 0, the absolute value
  * is this character's contribution to the overall breakweight before it. If the value
  * > 0, then the value is this character's contribution to the overall breakweight after it.
  * The overall breakweight between two characters is the maximum of the breakweight
  * contributions from the characters either side of it. If a character makes no
  * contribution to the breakweight on one side of it, the contribution is considered
  * to be 0.
  * @param p Pointer to charinfo to return information on.
  */
GR2_API int gr_cinfo_break_weight(const gr_char_info* p/*not NULL*/);

/** Returns the slot index that after this character is after in the slot stream
  *
  * In effect each character is associated with a set of slots and this returns
  * the index of the last slot in the segment this character is associated with.
  *
  * @return after slot index between 0 and gr_seg_n_slots()
  * @param p Pointer to charinfo to return information on.
  */
GR2_API int gr_cinfo_after(const gr_char_info* p/*not NULL*/);

/** Returns the slot index that before this character is before in the slot stream
  *
  * In effect each character is associated with a set of slots and this returns
  * the index of the first slot in the segment this character is associated with.
  *
  * @return before slot index between 0 and gr_seg_n_slots()
  * @param p Pointer to charinfo to return information on.
  */
GR2_API int gr_cinfo_before(const gr_char_info* p/*not NULL*/);

/** Returns the code unit index of this character in the input string
  *
  * @return code unit index between 0 and the end of the string
  * @param p Pointer to charinfo to return information on.
  */
GR2_API size_t gr_cinfo_base(const gr_char_info* p/*not NULL*/);

/** Returns the number of unicode characters in a string.
  *
  * @return number of characters in the string
  * @param enc Specifies the type of data in the string: utf8, utf16, utf32
  * @param buffer_begin The start of the string
  * @param buffer_end Measure up to the first nul or when end is reached, whichever is earliest.
  *            This parameter may be NULL.
  * @param pError If there is a structural fault in the string, the location is returned
  *               in this variable. If no error occurs, pError will contain NULL. NULL
  *               may be passed for pError if no such information is required.
  */
GR2_API size_t gr_count_unicode_characters(enum gr_encform enc, const void* buffer_begin, const void* buffer_end, const void** pError);

/** Creates and returns a segment.
  *
  * @return a segment that needs seg_destroy called on it. May return NULL if bad problems
  *     in segment processing.
  * @param font Gives the size of the font in pixels per em for final positioning. If
  *             NULL, positions are returned in design units, i.e. at a ppm of the upem
  *             of the face.
  * @param face The face containing all the non-size dependent information.
  * @param script This is a tag containing a script identifier that is used to choose
  *               which graphite table within the font to use. Maybe 0. Tag may be 4 chars
  *               NULL padded in LSBs or space padded in LSBs.
  * @param pFeats Pointer to a feature values to be used for the segment. Only one
  *               feature values may be used for a segment. If NULL the default features
  *               for the font will be used.
  * @param enc Specifies what encoding form the string is in (utf8, utf16, utf32)
  * @param pStart Start of the string
  * @param nChars Number of unicode characters to process in the string. The string will
  *               be processed either up to the first NULL or until nChars have been
  *               processed. nChars is also used to initialise the internal memory
  *               allocations of the segment. So it is wise not to make nChars too much
  *               greater than the actual number of characters being processed.
  * @param dir Specifies whether the segment is processed right to left (1) or left to
  *            right (0) and whether to run the internal bidi pass, if a font requests it.
  *            See enum gr_bidirtl for details.
  */
GR2_API gr_segment* gr_make_seg(const gr_font* font, const gr_face* face, gr_uint32 script, const gr_feature_val* pFeats, enum gr_encform enc, const void* pStart, size_t nChars, int dir);

/** Destroys a segment, freeing the memory.
  *
  * @param p The segment to destroy
  */
GR2_API void gr_seg_destroy(gr_segment* p);

/** Returns the advance for the whole segment.
  *
  * Returns the width of the segment up to the next glyph origin after the segment
  */
GR2_API float gr_seg_advance_X(const gr_segment* pSeg/*not NULL*/);

/** Returns the height advance for the segment. **/
GR2_API float gr_seg_advance_Y(const gr_segment* pSeg/*not NULL*/);

/** Returns the number of gr_char_infos in the segment. **/
GR2_API unsigned int gr_seg_n_cinfo(const gr_segment* pSeg/*not NULL*/);

/** Returns a gr_char_info at a given index in the segment. **/
GR2_API const gr_char_info* gr_seg_cinfo(const gr_segment* pSeg/*not NULL*/, unsigned int index/*must be <number_of_CharInfo*/);

/** Returns the number of glyph gr_slots in the segment. **/
GR2_API unsigned int gr_seg_n_slots(const gr_segment* pSeg/*not NULL*/);      //one slot per glyph

/** Returns the first gr_slot in the segment.
  *
  * The first slot in a segment has a gr_slot_prev_in_segment() of NULL. Slots are owned
  * by their segment and are destroyed along with the segment.
  */
GR2_API const gr_slot* gr_seg_first_slot(gr_segment* pSeg/*not NULL*/);    //may give a base slot or a slot which is attached to another

/** Returns the last gr_slot in the segment.
  *
  * The last slot in a segment has a gr_slot_next_in_segment() of NULL
  */
GR2_API const gr_slot* gr_seg_last_slot(gr_segment* pSeg/*not NULL*/);    //may give a base slot or a slot which is attached to another

/** Justifies a linked list of slots for a line to a given width
  *
  * Passed a pointer to the start of a linked list of slots corresponding to a line, as
  * set up by gr_slot_linebreak_before, this function will position the glyphs in the line
  * to take up the given width. It is possible to specify a subrange within the line to process.
  * This allows skipping of line initial or final whitespace, for example. While this will ensure
  * that the subrange fits width, the line will still be positioned with the first glyph of the
  * line at 0. So the resulting positions may be beyond width.
  *
  * @return float   The resulting width of the range of slots justified.
  * @param pSeg     Pointer to the segment
  * @param pStart   Pointer to the start of the line linked list (including skipped characters)
  * @param pFont    Font to use for positioning
  * @param width    Width in pixels in which to fit the line. If < 0. don't adjust natural width, just run justification passes
  *                 to handle line end contextuals, if there are any.
  * @param flags    Indicates line ending types. Default is linked list is a full line
  * @param pFirst   If not NULL, the first slot in the list to be considered part of the line (so can skip)
  * @param pLast    If not NULL, the last slot to process in the line (allow say trailing whitespace to be skipped)
  */
GR2_API float gr_seg_justify(gr_segment* pSeg/*not NULL*/, const gr_slot* pStart/*not NULL*/, const gr_font *pFont, double width, enum gr_justFlags flags, const gr_slot* pFirst, const gr_slot* pLast);

/** Returns the next slot along in the segment.
  *
  * Slots are held in a linked list. This returns the next in the linked list. The slot
  * may or may not be attached to another slot. Returns NULL at the end of the segment.
  */
GR2_API const gr_slot* gr_slot_next_in_segment(const gr_slot* p);

/** Returns the previous slot along in the segment.
  *
  * Slots are held in a doubly linked list. This returns the previos slot in the linked
  * list. This slot may or may not be attached to it. Returns NULL at the start of the
  * segment.
  */
GR2_API const gr_slot* gr_slot_prev_in_segment(const gr_slot* p);

/** Returns the attachment parent slot of this slot.
  *
  * Attached slots form a tree. This returns the parent of this slot in that tree. A
  * base glyph which is not attached to another glyph, always returns NULL.
  */
GR2_API const gr_slot* gr_slot_attached_to(const gr_slot* p);

/** Returns the first slot attached to this slot.
  *
  * Attached slots form a singly linked list from the parent. This returns the first
  * slot in that list. Note that this is a reference to another slot that is also in
  * the main segment doubly linked list.
  *
  * if gr_slot_first_attachment(p) != NULL then gr_slot_attached_to(gr_slot_first_attachment(p)) == p.
  */
GR2_API const gr_slot* gr_slot_first_attachment(const gr_slot* p);

/** Returns the next slot attached to our attachment parent.
  *
  * This returns the next slot in the singly linked list of slots attached to this
  * slot's parent. If there are no more such slots, NULL is returned. If there is
  * no parent, i.e. the passed slot is a cluster base, then the next cluster base
  * in graphical order (ltr, even for rtl text) is returned.
  *
  * if gr_slot_next_sibling_attachment(p) != NULL then gr_slot_attached_to(gr_slot_next_sibling_attachment(p)) == gr_slot_attached_to(p).
  */
GR2_API const gr_slot* gr_slot_next_sibling_attachment(const gr_slot* p);


/** Returns glyph id of the slot
  *
  * Each slot has a glyphid which is rendered at the position given by the slot. This
  * glyphid is the real glyph to be rendered and never a pseudo glyph.
  */
GR2_API unsigned short gr_slot_gid(const gr_slot* p);

/** Returns X offset of glyph from start of segment **/
GR2_API float gr_slot_origin_X(const gr_slot* p);

/** Returns Y offset of glyph from start of segment **/
GR2_API float gr_slot_origin_Y(const gr_slot* p);

/** Returns the glyph advance for this glyph as adjusted for kerning
  *
  * @param p    Slot to give results for
  * @param face gr_face of the glyphs. May be NULL if unhinted advances used
  * @param font gr_font to scale for pixel results. If NULL returns design
  *             units advance. If not NULL then returns pixel advance based
  *             on hinted or scaled glyph advances in the font. face must be
  *             passed for hinted advances to be used.
  */
GR2_API float gr_slot_advance_X(const gr_slot* p, const gr_face* face, const gr_font *font);

/** Returns the vertical advance for the glyph in the slot adjusted for kerning
  *
  * Returns design units unless font is not NULL in which case the pixel value
  * is returned scaled for the given font
  */
GR2_API float gr_slot_advance_Y(const gr_slot* p, const gr_face* face, const gr_font *font);

/** Returns the gr_char_info index before us
  *
  * Returns the index of the gr_char_info that a cursor before this slot, would put
  * an underlying cursor before. This may also be interpretted as each slot holding
  * a set of char_infos that it is associated with and this function returning the
  * index of the char_info with lowest index, from this set.
  */
GR2_API int gr_slot_before(const gr_slot* p/*not NULL*/);

/** Returns the gr_char_info index after us
  *
  * Returns the index of the gr_char_info that a cursor after this slot would put an
  * underlying cursor after. This may also be interpretted as each slot holding a set
  * of char_infos that it is associated with and this function returning the index of
  * the char_info with the highest index, from this set.
  */
GR2_API int gr_slot_after(const gr_slot* p/*not NULL*/);

/** Returns the index of this slot in the segment
  *
  * Returns the index given to this slot during final positioning. This corresponds
  * to the value returned br gr_cinfo_before() and gr_cinfo_after()
  */
GR2_API unsigned int gr_slot_index(const gr_slot* p/*not NULL*/);

/** Return a slot attribute value
  *
  * Given a slot and an attribute along with a possible subattribute, return the
  * corresponding value in the slot. See enum gr_attrCode for details of each attribute.
  */
GR2_API int gr_slot_attr(const gr_slot* p/*not NULL*/, const gr_segment* pSeg/*not NULL*/, enum gr_attrCode index, gr_uint8 subindex); //tbd - do we need to expose this?

/** Returns whether text may be inserted before this glyph.
  *
  * This indicates whether a cursor can be put before this slot. It applies to
  * base glyphs that have no parent as well as attached glyphs that have the
  * .insert attribute explicitly set to true. This is the primary mechanism
  * for identifying contiguous sequences of base plus diacritics.
  */
GR2_API int gr_slot_can_insert_before(const gr_slot* p);

/** Returns the original gr_char_info index this slot refers to.
  *
  * Each Slot has a gr_char_info that it originates from. This is that gr_char_info.
  * The index is passed to gr_seg_cinfo(). This information is useful for testing.
  */
GR2_API int gr_slot_original(const gr_slot* p/*not NULL*/);

/** Breaks a segment into lines.
  *
  * Breaks the slot linked list at the given point in the linked list. It is up
  * to the application to keep track of the first slot on each line.
  */
GR2_API void gr_slot_linebreak_before(gr_slot *p/*not NULL*/);

#ifdef __cplusplus
}
#endif
