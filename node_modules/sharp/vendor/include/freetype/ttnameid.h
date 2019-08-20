/***************************************************************************/
/*                                                                         */
/*  ttnameid.h                                                             */
/*                                                                         */
/*    TrueType name ID definitions (specification only).                   */
/*                                                                         */
/*  Copyright 1996-2018 by                                                 */
/*  David Turner, Robert Wilhelm, and Werner Lemberg.                      */
/*                                                                         */
/*  This file is part of the FreeType project, and may only be used,       */
/*  modified, and distributed under the terms of the FreeType project      */
/*  license, LICENSE.TXT.  By continuing to use, modify, or distribute     */
/*  this file you indicate that you have read the license and              */
/*  understand and accept it fully.                                        */
/*                                                                         */
/***************************************************************************/


#ifndef TTNAMEID_H_
#define TTNAMEID_H_


#include <ft2build.h>


FT_BEGIN_HEADER


  /*************************************************************************/
  /*                                                                       */
  /* <Section>                                                             */
  /*    truetype_tables                                                    */
  /*                                                                       */


  /*************************************************************************/
  /*                                                                       */
  /* Possible values for the `platform' identifier code in the name        */
  /* records of an SFNT `name' table.                                      */
  /*                                                                       */
  /*************************************************************************/


  /***********************************************************************
   *
   * @enum:
   *   TT_PLATFORM_XXX
   *
   * @description:
   *   A list of valid values for the `platform_id' identifier code in
   *   @FT_CharMapRec and @FT_SfntName structures.
   *
   * @values:
   *   TT_PLATFORM_APPLE_UNICODE ::
   *     Used by Apple to indicate a Unicode character map and/or name entry.
   *     See @TT_APPLE_ID_XXX for corresponding `encoding_id' values.  Note
   *     that name entries in this format are coded as big-endian UCS-2
   *     character codes _only_.
   *
   *   TT_PLATFORM_MACINTOSH ::
   *     Used by Apple to indicate a MacOS-specific charmap and/or name entry.
   *     See @TT_MAC_ID_XXX for corresponding `encoding_id' values.  Note that
   *     most TrueType fonts contain an Apple roman charmap to be usable on
   *     MacOS systems (even if they contain a Microsoft charmap as well).
   *
   *   TT_PLATFORM_ISO ::
   *     This value was used to specify ISO/IEC 10646 charmaps.  It is however
   *     now deprecated.  See @TT_ISO_ID_XXX for a list of corresponding
   *     `encoding_id' values.
   *
   *   TT_PLATFORM_MICROSOFT ::
   *     Used by Microsoft to indicate Windows-specific charmaps.  See
   *     @TT_MS_ID_XXX for a list of corresponding `encoding_id' values.
   *     Note that most fonts contain a Unicode charmap using
   *     (TT_PLATFORM_MICROSOFT, @TT_MS_ID_UNICODE_CS).
   *
   *   TT_PLATFORM_CUSTOM ::
   *     Used to indicate application-specific charmaps.
   *
   *   TT_PLATFORM_ADOBE ::
   *     This value isn't part of any font format specification, but is used
   *     by FreeType to report Adobe-specific charmaps in an @FT_CharMapRec
   *     structure.  See @TT_ADOBE_ID_XXX.
   */

#define TT_PLATFORM_APPLE_UNICODE  0
#define TT_PLATFORM_MACINTOSH      1
#define TT_PLATFORM_ISO            2 /* deprecated */
#define TT_PLATFORM_MICROSOFT      3
#define TT_PLATFORM_CUSTOM         4
#define TT_PLATFORM_ADOBE          7 /* artificial */


  /***********************************************************************
   *
   * @enum:
   *   TT_APPLE_ID_XXX
   *
   * @description:
   *   A list of valid values for the `encoding_id' for
   *   @TT_PLATFORM_APPLE_UNICODE charmaps and name entries.
   *
   * @values:
   *   TT_APPLE_ID_DEFAULT ::
   *     Unicode version 1.0.
   *
   *   TT_APPLE_ID_UNICODE_1_1 ::
   *     Unicode 1.1; specifies Hangul characters starting at U+34xx.
   *
   *   TT_APPLE_ID_ISO_10646 ::
   *     Deprecated (identical to preceding).
   *
   *   TT_APPLE_ID_UNICODE_2_0 ::
   *     Unicode 2.0 and beyond (UTF-16 BMP only).
   *
   *   TT_APPLE_ID_UNICODE_32 ::
   *     Unicode 3.1 and beyond, using UTF-32.
   *
   *   TT_APPLE_ID_VARIANT_SELECTOR ::
   *     From Adobe, not Apple.  Not a normal cmap.  Specifies variations
   *     on a real cmap.
   *
   *   TT_APPLE_ID_FULL_UNICODE ::
   *     Used for fallback fonts that provide complete Unicode coverage with
   *     a type~13 cmap.
   */

#define TT_APPLE_ID_DEFAULT           0 /* Unicode 1.0                   */
#define TT_APPLE_ID_UNICODE_1_1       1 /* specify Hangul at U+34xx      */
#define TT_APPLE_ID_ISO_10646         2 /* deprecated                    */
#define TT_APPLE_ID_UNICODE_2_0       3 /* or later                      */
#define TT_APPLE_ID_UNICODE_32        4 /* 2.0 or later, full repertoire */
#define TT_APPLE_ID_VARIANT_SELECTOR  5 /* variation selector data       */
#define TT_APPLE_ID_FULL_UNICODE      6 /* used with type 13 cmaps       */


  /***********************************************************************
   *
   * @enum:
   *   TT_MAC_ID_XXX
   *
   * @description:
   *   A list of valid values for the `encoding_id' for
   *   @TT_PLATFORM_MACINTOSH charmaps and name entries.
   */

#define TT_MAC_ID_ROMAN                 0
#define TT_MAC_ID_JAPANESE              1
#define TT_MAC_ID_TRADITIONAL_CHINESE   2
#define TT_MAC_ID_KOREAN                3
#define TT_MAC_ID_ARABIC                4
#define TT_MAC_ID_HEBREW                5
#define TT_MAC_ID_GREEK                 6
#define TT_MAC_ID_RUSSIAN               7
#define TT_MAC_ID_RSYMBOL               8
#define TT_MAC_ID_DEVANAGARI            9
#define TT_MAC_ID_GURMUKHI             10
#define TT_MAC_ID_GUJARATI             11
#define TT_MAC_ID_ORIYA                12
#define TT_MAC_ID_BENGALI              13
#define TT_MAC_ID_TAMIL                14
#define TT_MAC_ID_TELUGU               15
#define TT_MAC_ID_KANNADA              16
#define TT_MAC_ID_MALAYALAM            17
#define TT_MAC_ID_SINHALESE            18
#define TT_MAC_ID_BURMESE              19
#define TT_MAC_ID_KHMER                20
#define TT_MAC_ID_THAI                 21
#define TT_MAC_ID_LAOTIAN              22
#define TT_MAC_ID_GEORGIAN             23
#define TT_MAC_ID_ARMENIAN             24
#define TT_MAC_ID_MALDIVIAN            25
#define TT_MAC_ID_SIMPLIFIED_CHINESE   25
#define TT_MAC_ID_TIBETAN              26
#define TT_MAC_ID_MONGOLIAN            27
#define TT_MAC_ID_GEEZ                 28
#define TT_MAC_ID_SLAVIC               29
#define TT_MAC_ID_VIETNAMESE           30
#define TT_MAC_ID_SINDHI               31
#define TT_MAC_ID_UNINTERP             32


  /***********************************************************************
   *
   * @enum:
   *   TT_ISO_ID_XXX
   *
   * @description:
   *   A list of valid values for the `encoding_id' for
   *   @TT_PLATFORM_ISO charmaps and name entries.
   *
   *   Their use is now deprecated.
   *
   * @values:
   *   TT_ISO_ID_7BIT_ASCII ::
   *     ASCII.
   *   TT_ISO_ID_10646 ::
   *     ISO/10646.
   *   TT_ISO_ID_8859_1 ::
   *     Also known as Latin-1.
   */

#define TT_ISO_ID_7BIT_ASCII  0
#define TT_ISO_ID_10646       1
#define TT_ISO_ID_8859_1      2


  /***********************************************************************
   *
   * @enum:
   *   TT_MS_ID_XXX
   *
   * @description:
   *   A list of valid values for the `encoding_id' for
   *   @TT_PLATFORM_MICROSOFT charmaps and name entries.
   *
   * @values:
   *   TT_MS_ID_SYMBOL_CS ::
   *     Microsoft symbol encoding.  See @FT_ENCODING_MS_SYMBOL.
   *
   *   TT_MS_ID_UNICODE_CS ::
   *     Microsoft WGL4 charmap, matching Unicode.  See
   *     @FT_ENCODING_UNICODE.
   *
   *   TT_MS_ID_SJIS ::
   *     Shift JIS Japanese encoding.  See @FT_ENCODING_SJIS.
   *
   *   TT_MS_ID_PRC ::
   *     Chinese encodings as used in the People's Republic of China (PRC).
   *     This means the encodings GB~2312 and its supersets GBK and
   *     GB~18030.  See @FT_ENCODING_PRC.
   *
   *   TT_MS_ID_BIG_5 ::
   *     Traditional Chinese as used in Taiwan and Hong Kong.  See
   *     @FT_ENCODING_BIG5.
   *
   *   TT_MS_ID_WANSUNG ::
   *     Korean Extended Wansung encoding.  See @FT_ENCODING_WANSUNG.
   *
   *   TT_MS_ID_JOHAB ::
   *     Korean Johab encoding.  See @FT_ENCODING_JOHAB.
   *
   *   TT_MS_ID_UCS_4 ::
   *     UCS-4 or UTF-32 charmaps.  This has been added to the OpenType
   *     specification version 1.4 (mid-2001).
   */

#define TT_MS_ID_SYMBOL_CS    0
#define TT_MS_ID_UNICODE_CS   1
#define TT_MS_ID_SJIS         2
#define TT_MS_ID_PRC          3
#define TT_MS_ID_BIG_5        4
#define TT_MS_ID_WANSUNG      5
#define TT_MS_ID_JOHAB        6
#define TT_MS_ID_UCS_4       10

  /* this value is deprecated */
#define TT_MS_ID_GB2312  TT_MS_ID_PRC


  /***********************************************************************
   *
   * @enum:
   *   TT_ADOBE_ID_XXX
   *
   * @description:
   *   A list of valid values for the `encoding_id' for
   *   @TT_PLATFORM_ADOBE charmaps.  This is a FreeType-specific extension!
   *
   * @values:
   *   TT_ADOBE_ID_STANDARD ::
   *     Adobe standard encoding.
   *   TT_ADOBE_ID_EXPERT ::
   *     Adobe expert encoding.
   *   TT_ADOBE_ID_CUSTOM ::
   *     Adobe custom encoding.
   *   TT_ADOBE_ID_LATIN_1 ::
   *     Adobe Latin~1 encoding.
   */

#define TT_ADOBE_ID_STANDARD  0
#define TT_ADOBE_ID_EXPERT    1
#define TT_ADOBE_ID_CUSTOM    2
#define TT_ADOBE_ID_LATIN_1   3


  /***********************************************************************
   *
   * @enum:
   *   TT_MAC_LANGID_XXX
   *
   * @description:
   *   Possible values of the language identifier field in the name records
   *   of the SFNT `name' table if the `platform' identifier code is
   *   @TT_PLATFORM_MACINTOSH.  These values are also used as return values
   *   for function @FT_Get_CMap_Language_ID.
   *
   *   The canonical source for Apple's IDs is
   *
   *     https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6name.html
   */

#define TT_MAC_LANGID_ENGLISH                       0
#define TT_MAC_LANGID_FRENCH                        1
#define TT_MAC_LANGID_GERMAN                        2
#define TT_MAC_LANGID_ITALIAN                       3
#define TT_MAC_LANGID_DUTCH                         4
#define TT_MAC_LANGID_SWEDISH                       5
#define TT_MAC_LANGID_SPANISH                       6
#define TT_MAC_LANGID_DANISH                        7
#define TT_MAC_LANGID_PORTUGUESE                    8
#define TT_MAC_LANGID_NORWEGIAN                     9
#define TT_MAC_LANGID_HEBREW                       10
#define TT_MAC_LANGID_JAPANESE                     11
#define TT_MAC_LANGID_ARABIC                       12
#define TT_MAC_LANGID_FINNISH                      13
#define TT_MAC_LANGID_GREEK                        14
#define TT_MAC_LANGID_ICELANDIC                    15
#define TT_MAC_LANGID_MALTESE                      16
#define TT_MAC_LANGID_TURKISH                      17
#define TT_MAC_LANGID_CROATIAN                     18
#define TT_MAC_LANGID_CHINESE_TRADITIONAL          19
#define TT_MAC_LANGID_URDU                         20
#define TT_MAC_LANGID_HINDI                        21
#define TT_MAC_LANGID_THAI                         22
#define TT_MAC_LANGID_KOREAN                       23
#define TT_MAC_LANGID_LITHUANIAN                   24
#define TT_MAC_LANGID_POLISH                       25
#define TT_MAC_LANGID_HUNGARIAN                    26
#define TT_MAC_LANGID_ESTONIAN                     27
#define TT_MAC_LANGID_LETTISH                      28
#define TT_MAC_LANGID_SAAMISK                      29
#define TT_MAC_LANGID_FAEROESE                     30
#define TT_MAC_LANGID_FARSI                        31
#define TT_MAC_LANGID_RUSSIAN                      32
#define TT_MAC_LANGID_CHINESE_SIMPLIFIED           33
#define TT_MAC_LANGID_FLEMISH                      34
#define TT_MAC_LANGID_IRISH                        35
#define TT_MAC_LANGID_ALBANIAN                     36
#define TT_MAC_LANGID_ROMANIAN                     37
#define TT_MAC_LANGID_CZECH                        38
#define TT_MAC_LANGID_SLOVAK                       39
#define TT_MAC_LANGID_SLOVENIAN                    40
#define TT_MAC_LANGID_YIDDISH                      41
#define TT_MAC_LANGID_SERBIAN                      42
#define TT_MAC_LANGID_MACEDONIAN                   43
#define TT_MAC_LANGID_BULGARIAN                    44
#define TT_MAC_LANGID_UKRAINIAN                    45
#define TT_MAC_LANGID_BYELORUSSIAN                 46
#define TT_MAC_LANGID_UZBEK                        47
#define TT_MAC_LANGID_KAZAKH                       48
#define TT_MAC_LANGID_AZERBAIJANI                  49
#define TT_MAC_LANGID_AZERBAIJANI_CYRILLIC_SCRIPT  49
#define TT_MAC_LANGID_AZERBAIJANI_ARABIC_SCRIPT    50
#define TT_MAC_LANGID_ARMENIAN                     51
#define TT_MAC_LANGID_GEORGIAN                     52
#define TT_MAC_LANGID_MOLDAVIAN                    53
#define TT_MAC_LANGID_KIRGHIZ                      54
#define TT_MAC_LANGID_TAJIKI                       55
#define TT_MAC_LANGID_TURKMEN                      56
#define TT_MAC_LANGID_MONGOLIAN                    57
#define TT_MAC_LANGID_MONGOLIAN_MONGOLIAN_SCRIPT   57
#define TT_MAC_LANGID_MONGOLIAN_CYRILLIC_SCRIPT    58
#define TT_MAC_LANGID_PASHTO                       59
#define TT_MAC_LANGID_KURDISH                      60
#define TT_MAC_LANGID_KASHMIRI                     61
#define TT_MAC_LANGID_SINDHI                       62
#define TT_MAC_LANGID_TIBETAN                      63
#define TT_MAC_LANGID_NEPALI                       64
#define TT_MAC_LANGID_SANSKRIT                     65
#define TT_MAC_LANGID_MARATHI                      66
#define TT_MAC_LANGID_BENGALI                      67
#define TT_MAC_LANGID_ASSAMESE                     68
#define TT_MAC_LANGID_GUJARATI                     69
#define TT_MAC_LANGID_PUNJABI                      70
#define TT_MAC_LANGID_ORIYA                        71
#define TT_MAC_LANGID_MALAYALAM                    72
#define TT_MAC_LANGID_KANNADA                      73
#define TT_MAC_LANGID_TAMIL                        74
#define TT_MAC_LANGID_TELUGU                       75
#define TT_MAC_LANGID_SINHALESE                    76
#define TT_MAC_LANGID_BURMESE                      77
#define TT_MAC_LANGID_KHMER                        78
#define TT_MAC_LANGID_LAO                          79
#define TT_MAC_LANGID_VIETNAMESE                   80
#define TT_MAC_LANGID_INDONESIAN                   81
#define TT_MAC_LANGID_TAGALOG                      82
#define TT_MAC_LANGID_MALAY_ROMAN_SCRIPT           83
#define TT_MAC_LANGID_MALAY_ARABIC_SCRIPT          84
#define TT_MAC_LANGID_AMHARIC                      85
#define TT_MAC_LANGID_TIGRINYA                     86
#define TT_MAC_LANGID_GALLA                        87
#define TT_MAC_LANGID_SOMALI                       88
#define TT_MAC_LANGID_SWAHILI                      89
#define TT_MAC_LANGID_RUANDA                       90
#define TT_MAC_LANGID_RUNDI                        91
#define TT_MAC_LANGID_CHEWA                        92
#define TT_MAC_LANGID_MALAGASY                     93
#define TT_MAC_LANGID_ESPERANTO                    94
#define TT_MAC_LANGID_WELSH                       128
#define TT_MAC_LANGID_BASQUE                      129
#define TT_MAC_LANGID_CATALAN                     130
#define TT_MAC_LANGID_LATIN                       131
#define TT_MAC_LANGID_QUECHUA                     132
#define TT_MAC_LANGID_GUARANI                     133
#define TT_MAC_LANGID_AYMARA                      134
#define TT_MAC_LANGID_TATAR                       135
#define TT_MAC_LANGID_UIGHUR                      136
#define TT_MAC_LANGID_DZONGKHA                    137
#define TT_MAC_LANGID_JAVANESE                    138
#define TT_MAC_LANGID_SUNDANESE                   139

  /* The following codes are new as of 2000-03-10 */
#define TT_MAC_LANGID_GALICIAN                    140
#define TT_MAC_LANGID_AFRIKAANS                   141
#define TT_MAC_LANGID_BRETON                      142
#define TT_MAC_LANGID_INUKTITUT                   143
#define TT_MAC_LANGID_SCOTTISH_GAELIC             144
#define TT_MAC_LANGID_MANX_GAELIC                 145
#define TT_MAC_LANGID_IRISH_GAELIC                146
#define TT_MAC_LANGID_TONGAN                      147
#define TT_MAC_LANGID_GREEK_POLYTONIC             148
#define TT_MAC_LANGID_GREELANDIC                  149
#define TT_MAC_LANGID_AZERBAIJANI_ROMAN_SCRIPT    150


  /***********************************************************************
   *
   * @enum:
   *   TT_MS_LANGID_XXX
   *
   * @description:
   *   Possible values of the language identifier field in the name records
   *   of the SFNT `name' table if the `platform' identifier code is
   *   @TT_PLATFORM_MICROSOFT.  These values are also used as return values
   *   for function @FT_Get_CMap_Language_ID.
   *
   *   The canonical source for Microsoft's IDs is
   *
   *     https://www.microsoft.com/globaldev/reference/lcid-all.mspx ,
   *
   *   however, we only provide macros for language identifiers present in
   *   the OpenType specification: Microsoft has abandoned the concept of
   *   LCIDs (language code identifiers), and format~1 of the `name' table
   *   provides a better mechanism for languages not covered here.
   *
   *   More legacy values not listed in the reference can be found in the
   *   @FT_TRUETYPE_IDS_H header file.
   */

#define TT_MS_LANGID_ARABIC_SAUDI_ARABIA               0x0401
#define TT_MS_LANGID_ARABIC_IRAQ                       0x0801
#define TT_MS_LANGID_ARABIC_EGYPT                      0x0C01
#define TT_MS_LANGID_ARABIC_LIBYA                      0x1001
#define TT_MS_LANGID_ARABIC_ALGERIA                    0x1401
#define TT_MS_LANGID_ARABIC_MOROCCO                    0x1801
#define TT_MS_LANGID_ARABIC_TUNISIA                    0x1C01
#define TT_MS_LANGID_ARABIC_OMAN                       0x2001
#define TT_MS_LANGID_ARABIC_YEMEN                      0x2401
#define TT_MS_LANGID_ARABIC_SYRIA                      0x2801
#define TT_MS_LANGID_ARABIC_JORDAN                     0x2C01
#define TT_MS_LANGID_ARABIC_LEBANON                    0x3001
#define TT_MS_LANGID_ARABIC_KUWAIT                     0x3401
#define TT_MS_LANGID_ARABIC_UAE                        0x3801
#define TT_MS_LANGID_ARABIC_BAHRAIN                    0x3C01
#define TT_MS_LANGID_ARABIC_QATAR                      0x4001
#define TT_MS_LANGID_BULGARIAN_BULGARIA                0x0402
#define TT_MS_LANGID_CATALAN_CATALAN                   0x0403
#define TT_MS_LANGID_CHINESE_TAIWAN                    0x0404
#define TT_MS_LANGID_CHINESE_PRC                       0x0804
#define TT_MS_LANGID_CHINESE_HONG_KONG                 0x0C04
#define TT_MS_LANGID_CHINESE_SINGAPORE                 0x1004
#define TT_MS_LANGID_CHINESE_MACAO                     0x1404
#define TT_MS_LANGID_CZECH_CZECH_REPUBLIC              0x0405
#define TT_MS_LANGID_DANISH_DENMARK                    0x0406
#define TT_MS_LANGID_GERMAN_GERMANY                    0x0407
#define TT_MS_LANGID_GERMAN_SWITZERLAND                0x0807
#define TT_MS_LANGID_GERMAN_AUSTRIA                    0x0C07
#define TT_MS_LANGID_GERMAN_LUXEMBOURG                 0x1007
#define TT_MS_LANGID_GERMAN_LIECHTENSTEIN              0x1407
#define TT_MS_LANGID_GREEK_GREECE                      0x0408
#define TT_MS_LANGID_ENGLISH_UNITED_STATES             0x0409
#define TT_MS_LANGID_ENGLISH_UNITED_KINGDOM            0x0809
#define TT_MS_LANGID_ENGLISH_AUSTRALIA                 0x0C09
#define TT_MS_LANGID_ENGLISH_CANADA                    0x1009
#define TT_MS_LANGID_ENGLISH_NEW_ZEALAND               0x1409
#define TT_MS_LANGID_ENGLISH_IRELAND                   0x1809
#define TT_MS_LANGID_ENGLISH_SOUTH_AFRICA              0x1C09
#define TT_MS_LANGID_ENGLISH_JAMAICA                   0x2009
#define TT_MS_LANGID_ENGLISH_CARIBBEAN                 0x2409
#define TT_MS_LANGID_ENGLISH_BELIZE                    0x2809
#define TT_MS_LANGID_ENGLISH_TRINIDAD                  0x2C09
#define TT_MS_LANGID_ENGLISH_ZIMBABWE                  0x3009
#define TT_MS_LANGID_ENGLISH_PHILIPPINES               0x3409
#define TT_MS_LANGID_ENGLISH_INDIA                     0x4009
#define TT_MS_LANGID_ENGLISH_MALAYSIA                  0x4409
#define TT_MS_LANGID_ENGLISH_SINGAPORE                 0x4809
#define TT_MS_LANGID_SPANISH_SPAIN_TRADITIONAL_SORT    0x040A
#define TT_MS_LANGID_SPANISH_MEXICO                    0x080A
#define TT_MS_LANGID_SPANISH_SPAIN_MODERN_SORT         0x0C0A
#define TT_MS_LANGID_SPANISH_GUATEMALA                 0x100A
#define TT_MS_LANGID_SPANISH_COSTA_RICA                0x140A
#define TT_MS_LANGID_SPANISH_PANAMA                    0x180A
#define TT_MS_LANGID_SPANISH_DOMINICAN_REPUBLIC        0x1C0A
#define TT_MS_LANGID_SPANISH_VENEZUELA                 0x200A
#define TT_MS_LANGID_SPANISH_COLOMBIA                  0x240A
#define TT_MS_LANGID_SPANISH_PERU                      0x280A
#define TT_MS_LANGID_SPANISH_ARGENTINA                 0x2C0A
#define TT_MS_LANGID_SPANISH_ECUADOR                   0x300A
#define TT_MS_LANGID_SPANISH_CHILE                     0x340A
#define TT_MS_LANGID_SPANISH_URUGUAY                   0x380A
#define TT_MS_LANGID_SPANISH_PARAGUAY                  0x3C0A
#define TT_MS_LANGID_SPANISH_BOLIVIA                   0x400A
#define TT_MS_LANGID_SPANISH_EL_SALVADOR               0x440A
#define TT_MS_LANGID_SPANISH_HONDURAS                  0x480A
#define TT_MS_LANGID_SPANISH_NICARAGUA                 0x4C0A
#define TT_MS_LANGID_SPANISH_PUERTO_RICO               0x500A
#define TT_MS_LANGID_SPANISH_UNITED_STATES             0x540A
#define TT_MS_LANGID_FINNISH_FINLAND                   0x040B
#define TT_MS_LANGID_FRENCH_FRANCE                     0x040C
#define TT_MS_LANGID_FRENCH_BELGIUM                    0x080C
#define TT_MS_LANGID_FRENCH_CANADA                     0x0C0C
#define TT_MS_LANGID_FRENCH_SWITZERLAND                0x100C
#define TT_MS_LANGID_FRENCH_LUXEMBOURG                 0x140C
#define TT_MS_LANGID_FRENCH_MONACO                     0x180C
#define TT_MS_LANGID_HEBREW_ISRAEL                     0x040D
#define TT_MS_LANGID_HUNGARIAN_HUNGARY                 0x040E
#define TT_MS_LANGID_ICELANDIC_ICELAND                 0x040F
#define TT_MS_LANGID_ITALIAN_ITALY                     0x0410
#define TT_MS_LANGID_ITALIAN_SWITZERLAND               0x0810
#define TT_MS_LANGID_JAPANESE_JAPAN                    0x0411
#define TT_MS_LANGID_KOREAN_KOREA                      0x0412
#define TT_MS_LANGID_DUTCH_NETHERLANDS                 0x0413
#define TT_MS_LANGID_DUTCH_BELGIUM                     0x0813
#define TT_MS_LANGID_NORWEGIAN_NORWAY_BOKMAL           0x0414
#define TT_MS_LANGID_NORWEGIAN_NORWAY_NYNORSK          0x0814
#define TT_MS_LANGID_POLISH_POLAND                     0x0415
#define TT_MS_LANGID_PORTUGUESE_BRAZIL                 0x0416
#define TT_MS_LANGID_PORTUGUESE_PORTUGAL               0x0816
#define TT_MS_LANGID_ROMANSH_SWITZERLAND               0x0417
#define TT_MS_LANGID_ROMANIAN_ROMANIA                  0x0418
#define TT_MS_LANGID_RUSSIAN_RUSSIA                    0x0419
#define TT_MS_LANGID_CROATIAN_CROATIA                  0x041A
#define TT_MS_LANGID_SERBIAN_SERBIA_LATIN              0x081A
#define TT_MS_LANGID_SERBIAN_SERBIA_CYRILLIC           0x0C1A
#define TT_MS_LANGID_CROATIAN_BOSNIA_HERZEGOVINA       0x101A
#define TT_MS_LANGID_BOSNIAN_BOSNIA_HERZEGOVINA        0x141A
#define TT_MS_LANGID_SERBIAN_BOSNIA_HERZ_LATIN         0x181A
#define TT_MS_LANGID_SERBIAN_BOSNIA_HERZ_CYRILLIC      0x1C1A
#define TT_MS_LANGID_BOSNIAN_BOSNIA_HERZ_CYRILLIC      0x201A
#define TT_MS_LANGID_SLOVAK_SLOVAKIA                   0x041B
#define TT_MS_LANGID_ALBANIAN_ALBANIA                  0x041C
#define TT_MS_LANGID_SWEDISH_SWEDEN                    0x041D
#define TT_MS_LANGID_SWEDISH_FINLAND                   0x081D
#define TT_MS_LANGID_THAI_THAILAND                     0x041E
#define TT_MS_LANGID_TURKISH_TURKEY                    0x041F
#define TT_MS_LANGID_URDU_PAKISTAN                     0x0420
#define TT_MS_LANGID_INDONESIAN_INDONESIA              0x0421
#define TT_MS_LANGID_UKRAINIAN_UKRAINE                 0x0422
#define TT_MS_LANGID_BELARUSIAN_BELARUS                0x0423
#define TT_MS_LANGID_SLOVENIAN_SLOVENIA                0x0424
#define TT_MS_LANGID_ESTONIAN_ESTONIA                  0x0425
#define TT_MS_LANGID_LATVIAN_LATVIA                    0x0426
#define TT_MS_LANGID_LITHUANIAN_LITHUANIA              0x0427
#define TT_MS_LANGID_TAJIK_TAJIKISTAN                  0x0428
#define TT_MS_LANGID_VIETNAMESE_VIET_NAM               0x042A
#define TT_MS_LANGID_ARMENIAN_ARMENIA                  0x042B
#define TT_MS_LANGID_AZERI_AZERBAIJAN_LATIN            0x042C
#define TT_MS_LANGID_AZERI_AZERBAIJAN_CYRILLIC         0x082C
#define TT_MS_LANGID_BASQUE_BASQUE                     0x042D
#define TT_MS_LANGID_UPPER_SORBIAN_GERMANY             0x042E
#define TT_MS_LANGID_LOWER_SORBIAN_GERMANY             0x082E
#define TT_MS_LANGID_MACEDONIAN_MACEDONIA              0x042F
#define TT_MS_LANGID_SETSWANA_SOUTH_AFRICA             0x0432
#define TT_MS_LANGID_ISIXHOSA_SOUTH_AFRICA             0x0434
#define TT_MS_LANGID_ISIZULU_SOUTH_AFRICA              0x0435
#define TT_MS_LANGID_AFRIKAANS_SOUTH_AFRICA            0x0436
#define TT_MS_LANGID_GEORGIAN_GEORGIA                  0x0437
#define TT_MS_LANGID_FAEROESE_FAEROE_ISLANDS           0x0438
#define TT_MS_LANGID_HINDI_INDIA                       0x0439
#define TT_MS_LANGID_MALTESE_MALTA                     0x043A
#define TT_MS_LANGID_SAMI_NORTHERN_NORWAY              0x043B
#define TT_MS_LANGID_SAMI_NORTHERN_SWEDEN              0x083B
#define TT_MS_LANGID_SAMI_NORTHERN_FINLAND             0x0C3B
#define TT_MS_LANGID_SAMI_LULE_NORWAY                  0x103B
#define TT_MS_LANGID_SAMI_LULE_SWEDEN                  0x143B
#define TT_MS_LANGID_SAMI_SOUTHERN_NORWAY              0x183B
#define TT_MS_LANGID_SAMI_SOUTHERN_SWEDEN              0x1C3B
#define TT_MS_LANGID_SAMI_SKOLT_FINLAND                0x203B
#define TT_MS_LANGID_SAMI_INARI_FINLAND                0x243B
#define TT_MS_LANGID_IRISH_IRELAND                     0x083C
#define TT_MS_LANGID_MALAY_MALAYSIA                    0x043E
#define TT_MS_LANGID_MALAY_BRUNEI_DARUSSALAM           0x083E
#define TT_MS_LANGID_KAZAKH_KAZAKHSTAN                 0x043F
#define TT_MS_LANGID_KYRGYZ_KYRGYZSTAN /* Cyrillic*/   0x0440
#define TT_MS_LANGID_KISWAHILI_KENYA                   0x0441
#define TT_MS_LANGID_TURKMEN_TURKMENISTAN              0x0442
#define TT_MS_LANGID_UZBEK_UZBEKISTAN_LATIN            0x0443
#define TT_MS_LANGID_UZBEK_UZBEKISTAN_CYRILLIC         0x0843
#define TT_MS_LANGID_TATAR_RUSSIA                      0x0444
#define TT_MS_LANGID_BENGALI_INDIA                     0x0445
#define TT_MS_LANGID_BENGALI_BANGLADESH                0x0845
#define TT_MS_LANGID_PUNJABI_INDIA                     0x0446
#define TT_MS_LANGID_GUJARATI_INDIA                    0x0447
#define TT_MS_LANGID_ODIA_INDIA                        0x0448
#define TT_MS_LANGID_TAMIL_INDIA                       0x0449
#define TT_MS_LANGID_TELUGU_INDIA                      0x044A
#define TT_MS_LANGID_KANNADA_INDIA                     0x044B
#define TT_MS_LANGID_MALAYALAM_INDIA                   0x044C
#define TT_MS_LANGID_ASSAMESE_INDIA                    0x044D
#define TT_MS_LANGID_MARATHI_INDIA                     0x044E
#define TT_MS_LANGID_SANSKRIT_INDIA                    0x044F
#define TT_MS_LANGID_MONGOLIAN_MONGOLIA /* Cyrillic */ 0x0450
#define TT_MS_LANGID_MONGOLIAN_PRC                     0x0850
#define TT_MS_LANGID_TIBETAN_PRC                       0x0451
#define TT_MS_LANGID_WELSH_UNITED_KINGDOM              0x0452
#define TT_MS_LANGID_KHMER_CAMBODIA                    0x0453
#define TT_MS_LANGID_LAO_LAOS                          0x0454
#define TT_MS_LANGID_GALICIAN_GALICIAN                 0x0456
#define TT_MS_LANGID_KONKANI_INDIA                     0x0457
#define TT_MS_LANGID_SYRIAC_SYRIA                      0x045A
#define TT_MS_LANGID_SINHALA_SRI_LANKA                 0x045B
#define TT_MS_LANGID_INUKTITUT_CANADA                  0x045D
#define TT_MS_LANGID_INUKTITUT_CANADA_LATIN            0x085D
#define TT_MS_LANGID_AMHARIC_ETHIOPIA                  0x045E
#define TT_MS_LANGID_TAMAZIGHT_ALGERIA                 0x085F
#define TT_MS_LANGID_NEPALI_NEPAL                      0x0461
#define TT_MS_LANGID_FRISIAN_NETHERLANDS               0x0462
#define TT_MS_LANGID_PASHTO_AFGHANISTAN                0x0463
#define TT_MS_LANGID_FILIPINO_PHILIPPINES              0x0464
#define TT_MS_LANGID_DHIVEHI_MALDIVES                  0x0465
#define TT_MS_LANGID_HAUSA_NIGERIA                     0x0468
#define TT_MS_LANGID_YORUBA_NIGERIA                    0x046A
#define TT_MS_LANGID_QUECHUA_BOLIVIA                   0x046B
#define TT_MS_LANGID_QUECHUA_ECUADOR                   0x086B
#define TT_MS_LANGID_QUECHUA_PERU                      0x0C6B
#define TT_MS_LANGID_SESOTHO_SA_LEBOA_SOUTH_AFRICA     0x046C
#define TT_MS_LANGID_BASHKIR_RUSSIA                    0x046D
#define TT_MS_LANGID_LUXEMBOURGISH_LUXEMBOURG          0x046E
#define TT_MS_LANGID_GREENLANDIC_GREENLAND             0x046F
#define TT_MS_LANGID_IGBO_NIGERIA                      0x0470
#define TT_MS_LANGID_YI_PRC                            0x0478
#define TT_MS_LANGID_MAPUDUNGUN_CHILE                  0x047A
#define TT_MS_LANGID_MOHAWK_MOHAWK                     0x047C
#define TT_MS_LANGID_BRETON_FRANCE                     0x047E
#define TT_MS_LANGID_UIGHUR_PRC                        0x0480
#define TT_MS_LANGID_MAORI_NEW_ZEALAND                 0x0481
#define TT_MS_LANGID_OCCITAN_FRANCE                    0x0482
#define TT_MS_LANGID_CORSICAN_FRANCE                   0x0483
#define TT_MS_LANGID_ALSATIAN_FRANCE                   0x0484
#define TT_MS_LANGID_YAKUT_RUSSIA                      0x0485
#define TT_MS_LANGID_KICHE_GUATEMALA                   0x0486
#define TT_MS_LANGID_KINYARWANDA_RWANDA                0x0487
#define TT_MS_LANGID_WOLOF_SENEGAL                     0x0488
#define TT_MS_LANGID_DARI_AFGHANISTAN                  0x048C

  /* */


  /* legacy macro definitions not present in OpenType 1.8.1 */
#define TT_MS_LANGID_ARABIC_GENERAL                    0x0001
#define TT_MS_LANGID_CATALAN_SPAIN \
          TT_MS_LANGID_CATALAN_CATALAN
#define TT_MS_LANGID_CHINESE_GENERAL                   0x0004
#define TT_MS_LANGID_CHINESE_MACAU \
          TT_MS_LANGID_CHINESE_MACAO
#define TT_MS_LANGID_GERMAN_LIECHTENSTEI \
          TT_MS_LANGID_GERMAN_LIECHTENSTEIN
#define TT_MS_LANGID_ENGLISH_GENERAL                   0x0009
#define TT_MS_LANGID_ENGLISH_INDONESIA                 0x3809
#define TT_MS_LANGID_ENGLISH_HONG_KONG                 0x3C09
#define TT_MS_LANGID_SPANISH_SPAIN_INTERNATIONAL_SORT \
          TT_MS_LANGID_SPANISH_SPAIN_MODERN_SORT
#define TT_MS_LANGID_SPANISH_LATIN_AMERICA             0xE40AU
#define TT_MS_LANGID_FRENCH_WEST_INDIES                0x1C0C
#define TT_MS_LANGID_FRENCH_REUNION                    0x200C
#define TT_MS_LANGID_FRENCH_CONGO                      0x240C
  /* which was formerly: */
#define TT_MS_LANGID_FRENCH_ZAIRE \
          TT_MS_LANGID_FRENCH_CONGO
#define TT_MS_LANGID_FRENCH_SENEGAL                    0x280C
#define TT_MS_LANGID_FRENCH_CAMEROON                   0x2C0C
#define TT_MS_LANGID_FRENCH_COTE_D_IVOIRE              0x300C
#define TT_MS_LANGID_FRENCH_MALI                       0x340C
#define TT_MS_LANGID_FRENCH_MOROCCO                    0x380C
#define TT_MS_LANGID_FRENCH_HAITI                      0x3C0C
#define TT_MS_LANGID_FRENCH_NORTH_AFRICA               0xE40CU
#define TT_MS_LANGID_KOREAN_EXTENDED_WANSUNG_KOREA \
          TT_MS_LANGID_KOREAN_KOREA
#define TT_MS_LANGID_KOREAN_JOHAB_KOREA                0x0812
#define TT_MS_LANGID_RHAETO_ROMANIC_SWITZERLAND \
          TT_MS_LANGID_ROMANSH_SWITZERLAND
#define TT_MS_LANGID_MOLDAVIAN_MOLDAVIA                0x0818
#define TT_MS_LANGID_RUSSIAN_MOLDAVIA                  0x0819
#define TT_MS_LANGID_URDU_INDIA                        0x0820
#define TT_MS_LANGID_CLASSIC_LITHUANIAN_LITHUANIA      0x0827
#define TT_MS_LANGID_SLOVENE_SLOVENIA \
          TT_MS_LANGID_SLOVENIAN_SLOVENIA
#define TT_MS_LANGID_FARSI_IRAN                        0x0429
#define TT_MS_LANGID_BASQUE_SPAIN \
          TT_MS_LANGID_BASQUE_BASQUE
#define TT_MS_LANGID_SORBIAN_GERMANY \
          TT_MS_LANGID_UPPER_SORBIAN_GERMANY
#define TT_MS_LANGID_SUTU_SOUTH_AFRICA                 0x0430
#define TT_MS_LANGID_TSONGA_SOUTH_AFRICA               0x0431
#define TT_MS_LANGID_TSWANA_SOUTH_AFRICA \
          TT_MS_LANGID_SETSWANA_SOUTH_AFRICA
#define TT_MS_LANGID_VENDA_SOUTH_AFRICA                0x0433
#define TT_MS_LANGID_XHOSA_SOUTH_AFRICA \
          TT_MS_LANGID_ISIXHOSA_SOUTH_AFRICA
#define TT_MS_LANGID_ZULU_SOUTH_AFRICA \
          TT_MS_LANGID_ISIZULU_SOUTH_AFRICA
#define TT_MS_LANGID_SAAMI_LAPONIA                     0x043B
  /* the next two values are incorrectly inverted */
#define TT_MS_LANGID_IRISH_GAELIC_IRELAND              0x043C
#define TT_MS_LANGID_SCOTTISH_GAELIC_UNITED_KINGDOM    0x083C
#define TT_MS_LANGID_YIDDISH_GERMANY                   0x043D
#define TT_MS_LANGID_KAZAK_KAZAKSTAN \
          TT_MS_LANGID_KAZAKH_KAZAKHSTAN
#define TT_MS_LANGID_KIRGHIZ_KIRGHIZ_REPUBLIC \
          TT_MS_LANGID_KYRGYZ_KYRGYZSTAN
#define TT_MS_LANGID_KIRGHIZ_KIRGHIZSTAN \
          TT_MS_LANGID_KYRGYZ_KYRGYZSTAN
#define TT_MS_LANGID_SWAHILI_KENYA \
          TT_MS_LANGID_KISWAHILI_KENYA
#define TT_MS_LANGID_TATAR_TATARSTAN \
          TT_MS_LANGID_TATAR_RUSSIA
#define TT_MS_LANGID_PUNJABI_ARABIC_PAKISTAN           0x0846
#define TT_MS_LANGID_ORIYA_INDIA \
          TT_MS_LANGID_ODIA_INDIA
#define TT_MS_LANGID_MONGOLIAN_MONGOLIA_MONGOLIAN \
          TT_MS_LANGID_MONGOLIAN_PRC
#define TT_MS_LANGID_TIBETAN_CHINA \
          TT_MS_LANGID_TIBETAN_PRC
#define TT_MS_LANGID_DZONGHKA_BHUTAN                   0x0851
#define TT_MS_LANGID_TIBETAN_BHUTAN \
          TT_MS_LANGID_DZONGHKA_BHUTAN
#define TT_MS_LANGID_WELSH_WALES \
          TT_MS_LANGID_WELSH_UNITED_KINGDOM
#define TT_MS_LANGID_BURMESE_MYANMAR                   0x0455
#define TT_MS_LANGID_GALICIAN_SPAIN \
          TT_MS_LANGID_GALICIAN_GALICIAN
#define TT_MS_LANGID_MANIPURI_INDIA  /* Bengali */     0x0458
#define TT_MS_LANGID_SINDHI_INDIA /* Arabic */         0x0459
#define TT_MS_LANGID_SINDHI_PAKISTAN                   0x0859
#define TT_MS_LANGID_SINHALESE_SRI_LANKA \
          TT_MS_LANGID_SINHALA_SRI_LANKA
#define TT_MS_LANGID_CHEROKEE_UNITED_STATES            0x045C
#define TT_MS_LANGID_TAMAZIGHT_MOROCCO /* Arabic */    0x045F
#define TT_MS_LANGID_TAMAZIGHT_MOROCCO_LATIN \
          TT_MS_LANGID_TAMAZIGHT_ALGERIA
#define TT_MS_LANGID_KASHMIRI_PAKISTAN /* Arabic */    0x0460
#define TT_MS_LANGID_KASHMIRI_SASIA                    0x0860
#define TT_MS_LANGID_KASHMIRI_INDIA \
          TT_MS_LANGID_KASHMIRI_SASIA
#define TT_MS_LANGID_NEPALI_INDIA                      0x0861
#define TT_MS_LANGID_DIVEHI_MALDIVES \
          TT_MS_LANGID_DHIVEHI_MALDIVES
#define TT_MS_LANGID_EDO_NIGERIA                       0x0466
#define TT_MS_LANGID_FULFULDE_NIGERIA                  0x0467
#define TT_MS_LANGID_IBIBIO_NIGERIA                    0x0469
#define TT_MS_LANGID_SEPEDI_SOUTH_AFRICA \
          TT_MS_LANGID_SESOTHO_SA_LEBOA_SOUTH_AFRICA
#define TT_MS_LANGID_SOTHO_SOUTHERN_SOUTH_AFRICA \
          TT_MS_LANGID_SESOTHO_SA_LEBOA_SOUTH_AFRICA
#define TT_MS_LANGID_KANURI_NIGERIA                    0x0471
#define TT_MS_LANGID_OROMO_ETHIOPIA                    0x0472
#define TT_MS_LANGID_TIGRIGNA_ETHIOPIA                 0x0473
#define TT_MS_LANGID_TIGRIGNA_ERYTHREA                 0x0873
#define TT_MS_LANGID_TIGRIGNA_ERYTREA \
          TT_MS_LANGID_TIGRIGNA_ERYTHREA
#define TT_MS_LANGID_GUARANI_PARAGUAY                  0x0474
#define TT_MS_LANGID_HAWAIIAN_UNITED_STATES            0x0475
#define TT_MS_LANGID_LATIN                             0x0476
#define TT_MS_LANGID_SOMALI_SOMALIA                    0x0477
#define TT_MS_LANGID_YI_CHINA \
          TT_MS_LANGID_YI_PRC
#define TT_MS_LANGID_PAPIAMENTU_NETHERLANDS_ANTILLES   0x0479
#define TT_MS_LANGID_UIGHUR_CHINA \
          TT_MS_LANGID_UIGHUR_PRC


  /***********************************************************************
   *
   * @enum:
   *   TT_NAME_ID_XXX
   *
   * @description:
   *   Possible values of the `name' identifier field in the name records of
   *   an SFNT `name' table.  These values are platform independent.
   */

#define TT_NAME_ID_COPYRIGHT              0
#define TT_NAME_ID_FONT_FAMILY            1
#define TT_NAME_ID_FONT_SUBFAMILY         2
#define TT_NAME_ID_UNIQUE_ID              3
#define TT_NAME_ID_FULL_NAME              4
#define TT_NAME_ID_VERSION_STRING         5
#define TT_NAME_ID_PS_NAME                6
#define TT_NAME_ID_TRADEMARK              7

  /* the following values are from the OpenType spec */
#define TT_NAME_ID_MANUFACTURER           8
#define TT_NAME_ID_DESIGNER               9
#define TT_NAME_ID_DESCRIPTION            10
#define TT_NAME_ID_VENDOR_URL             11
#define TT_NAME_ID_DESIGNER_URL           12
#define TT_NAME_ID_LICENSE                13
#define TT_NAME_ID_LICENSE_URL            14
  /* number 15 is reserved */
#define TT_NAME_ID_TYPOGRAPHIC_FAMILY     16
#define TT_NAME_ID_TYPOGRAPHIC_SUBFAMILY  17
#define TT_NAME_ID_MAC_FULL_NAME          18

  /* The following code is new as of 2000-01-21 */
#define TT_NAME_ID_SAMPLE_TEXT            19

  /* This is new in OpenType 1.3 */
#define TT_NAME_ID_CID_FINDFONT_NAME      20

  /* This is new in OpenType 1.5 */
#define TT_NAME_ID_WWS_FAMILY             21
#define TT_NAME_ID_WWS_SUBFAMILY          22

  /* This is new in OpenType 1.7 */
#define TT_NAME_ID_LIGHT_BACKGROUND       23
#define TT_NAME_ID_DARK_BACKGROUND        24

  /* This is new in OpenType 1.8 */
#define TT_NAME_ID_VARIATIONS_PREFIX      25

  /* these two values are deprecated */
#define TT_NAME_ID_PREFERRED_FAMILY     TT_NAME_ID_TYPOGRAPHIC_FAMILY
#define TT_NAME_ID_PREFERRED_SUBFAMILY  TT_NAME_ID_TYPOGRAPHIC_SUBFAMILY


  /***********************************************************************
   *
   * @enum:
   *   TT_UCR_XXX
   *
   * @description:
   *   Possible bit mask values for the `ulUnicodeRangeX' fields in an SFNT
   *   `OS/2' table.
   */

  /* ulUnicodeRange1 */
  /* --------------- */

  /* Bit  0   Basic Latin */
#define TT_UCR_BASIC_LATIN                     (1L <<  0) /* U+0020-U+007E */
  /* Bit  1   C1 Controls and Latin-1 Supplement */
#define TT_UCR_LATIN1_SUPPLEMENT               (1L <<  1) /* U+0080-U+00FF */
  /* Bit  2   Latin Extended-A */
#define TT_UCR_LATIN_EXTENDED_A                (1L <<  2) /* U+0100-U+017F */
  /* Bit  3   Latin Extended-B */
#define TT_UCR_LATIN_EXTENDED_B                (1L <<  3) /* U+0180-U+024F */
  /* Bit  4   IPA Extensions                 */
  /*          Phonetic Extensions            */
  /*          Phonetic Extensions Supplement */
#define TT_UCR_IPA_EXTENSIONS                  (1L <<  4) /* U+0250-U+02AF */
                                                          /* U+1D00-U+1D7F */
                                                          /* U+1D80-U+1DBF */
  /* Bit  5   Spacing Modifier Letters */
  /*          Modifier Tone Letters    */
#define TT_UCR_SPACING_MODIFIER                (1L <<  5) /* U+02B0-U+02FF */
                                                          /* U+A700-U+A71F */
  /* Bit  6   Combining Diacritical Marks            */
  /*          Combining Diacritical Marks Supplement */
#define TT_UCR_COMBINING_DIACRITICAL_MARKS     (1L <<  6) /* U+0300-U+036F */
                                                          /* U+1DC0-U+1DFF */
  /* Bit  7   Greek and Coptic */
#define TT_UCR_GREEK                           (1L <<  7) /* U+0370-U+03FF */
  /* Bit  8   Coptic */
#define TT_UCR_COPTIC                          (1L <<  8) /* U+2C80-U+2CFF */
  /* Bit  9   Cyrillic            */
  /*          Cyrillic Supplement */
  /*          Cyrillic Extended-A */
  /*          Cyrillic Extended-B */
#define TT_UCR_CYRILLIC                        (1L <<  9) /* U+0400-U+04FF */
                                                          /* U+0500-U+052F */
                                                          /* U+2DE0-U+2DFF */
                                                          /* U+A640-U+A69F */
  /* Bit 10   Armenian */
#define TT_UCR_ARMENIAN                        (1L << 10) /* U+0530-U+058F */
  /* Bit 11   Hebrew */
#define TT_UCR_HEBREW                          (1L << 11) /* U+0590-U+05FF */
  /* Bit 12   Vai */
#define TT_UCR_VAI                             (1L << 12) /* U+A500-U+A63F */
  /* Bit 13   Arabic            */
  /*          Arabic Supplement */
#define TT_UCR_ARABIC                          (1L << 13) /* U+0600-U+06FF */
                                                          /* U+0750-U+077F */
  /* Bit 14   NKo */
#define TT_UCR_NKO                             (1L << 14) /* U+07C0-U+07FF */
  /* Bit 15   Devanagari */
#define TT_UCR_DEVANAGARI                      (1L << 15) /* U+0900-U+097F */
  /* Bit 16   Bengali */
#define TT_UCR_BENGALI                         (1L << 16) /* U+0980-U+09FF */
  /* Bit 17   Gurmukhi */
#define TT_UCR_GURMUKHI                        (1L << 17) /* U+0A00-U+0A7F */
  /* Bit 18   Gujarati */
#define TT_UCR_GUJARATI                        (1L << 18) /* U+0A80-U+0AFF */
  /* Bit 19   Oriya */
#define TT_UCR_ORIYA                           (1L << 19) /* U+0B00-U+0B7F */
  /* Bit 20   Tamil */
#define TT_UCR_TAMIL                           (1L << 20) /* U+0B80-U+0BFF */
  /* Bit 21   Telugu */
#define TT_UCR_TELUGU                          (1L << 21) /* U+0C00-U+0C7F */
  /* Bit 22   Kannada */
#define TT_UCR_KANNADA                         (1L << 22) /* U+0C80-U+0CFF */
  /* Bit 23   Malayalam */
#define TT_UCR_MALAYALAM                       (1L << 23) /* U+0D00-U+0D7F */
  /* Bit 24   Thai */
#define TT_UCR_THAI                            (1L << 24) /* U+0E00-U+0E7F */
  /* Bit 25   Lao */
#define TT_UCR_LAO                             (1L << 25) /* U+0E80-U+0EFF */
  /* Bit 26   Georgian            */
  /*          Georgian Supplement */
#define TT_UCR_GEORGIAN                        (1L << 26) /* U+10A0-U+10FF */
                                                          /* U+2D00-U+2D2F */
  /* Bit 27   Balinese */
#define TT_UCR_BALINESE                        (1L << 27) /* U+1B00-U+1B7F */
  /* Bit 28   Hangul Jamo */
#define TT_UCR_HANGUL_JAMO                     (1L << 28) /* U+1100-U+11FF */
  /* Bit 29   Latin Extended Additional */
  /*          Latin Extended-C          */
  /*          Latin Extended-D          */
#define TT_UCR_LATIN_EXTENDED_ADDITIONAL       (1L << 29) /* U+1E00-U+1EFF */
                                                          /* U+2C60-U+2C7F */
                                                          /* U+A720-U+A7FF */
  /* Bit 30   Greek Extended */
#define TT_UCR_GREEK_EXTENDED                  (1L << 30) /* U+1F00-U+1FFF */
  /* Bit 31   General Punctuation      */
  /*          Supplemental Punctuation */
#define TT_UCR_GENERAL_PUNCTUATION             (1L << 31) /* U+2000-U+206F */
                                                          /* U+2E00-U+2E7F */

  /* ulUnicodeRange2 */
  /* --------------- */

  /* Bit 32   Superscripts And Subscripts */
#define TT_UCR_SUPERSCRIPTS_SUBSCRIPTS         (1L <<  0) /* U+2070-U+209F */
  /* Bit 33   Currency Symbols */
#define TT_UCR_CURRENCY_SYMBOLS                (1L <<  1) /* U+20A0-U+20CF */
  /* Bit 34   Combining Diacritical Marks For Symbols */
#define TT_UCR_COMBINING_DIACRITICAL_MARKS_SYMB \
                                               (1L <<  2) /* U+20D0-U+20FF */
  /* Bit 35   Letterlike Symbols */
#define TT_UCR_LETTERLIKE_SYMBOLS              (1L <<  3) /* U+2100-U+214F */
  /* Bit 36   Number Forms */
#define TT_UCR_NUMBER_FORMS                    (1L <<  4) /* U+2150-U+218F */
  /* Bit 37   Arrows                           */
  /*          Supplemental Arrows-A            */
  /*          Supplemental Arrows-B            */
  /*          Miscellaneous Symbols and Arrows */
#define TT_UCR_ARROWS                          (1L <<  5) /* U+2190-U+21FF */
                                                          /* U+27F0-U+27FF */
                                                          /* U+2900-U+297F */
                                                          /* U+2B00-U+2BFF */
  /* Bit 38   Mathematical Operators               */
  /*          Supplemental Mathematical Operators  */
  /*          Miscellaneous Mathematical Symbols-A */
  /*          Miscellaneous Mathematical Symbols-B */
#define TT_UCR_MATHEMATICAL_OPERATORS          (1L <<  6) /* U+2200-U+22FF */
                                                          /* U+2A00-U+2AFF */
                                                          /* U+27C0-U+27EF */
                                                          /* U+2980-U+29FF */
  /* Bit 39 Miscellaneous Technical */
#define TT_UCR_MISCELLANEOUS_TECHNICAL         (1L <<  7) /* U+2300-U+23FF */
  /* Bit 40   Control Pictures */
#define TT_UCR_CONTROL_PICTURES                (1L <<  8) /* U+2400-U+243F */
  /* Bit 41   Optical Character Recognition */
#define TT_UCR_OCR                             (1L <<  9) /* U+2440-U+245F */
  /* Bit 42   Enclosed Alphanumerics */
#define TT_UCR_ENCLOSED_ALPHANUMERICS          (1L << 10) /* U+2460-U+24FF */
  /* Bit 43   Box Drawing */
#define TT_UCR_BOX_DRAWING                     (1L << 11) /* U+2500-U+257F */
  /* Bit 44   Block Elements */
#define TT_UCR_BLOCK_ELEMENTS                  (1L << 12) /* U+2580-U+259F */
  /* Bit 45   Geometric Shapes */
#define TT_UCR_GEOMETRIC_SHAPES                (1L << 13) /* U+25A0-U+25FF */
  /* Bit 46   Miscellaneous Symbols */
#define TT_UCR_MISCELLANEOUS_SYMBOLS           (1L << 14) /* U+2600-U+26FF */
  /* Bit 47   Dingbats */
#define TT_UCR_DINGBATS                        (1L << 15) /* U+2700-U+27BF */
  /* Bit 48   CJK Symbols and Punctuation */
#define TT_UCR_CJK_SYMBOLS                     (1L << 16) /* U+3000-U+303F */
  /* Bit 49   Hiragana */
#define TT_UCR_HIRAGANA                        (1L << 17) /* U+3040-U+309F */
  /* Bit 50   Katakana                     */
  /*          Katakana Phonetic Extensions */
#define TT_UCR_KATAKANA                        (1L << 18) /* U+30A0-U+30FF */
                                                          /* U+31F0-U+31FF */
  /* Bit 51   Bopomofo          */
  /*          Bopomofo Extended */
#define TT_UCR_BOPOMOFO                        (1L << 19) /* U+3100-U+312F */
                                                          /* U+31A0-U+31BF */
  /* Bit 52   Hangul Compatibility Jamo */
#define TT_UCR_HANGUL_COMPATIBILITY_JAMO       (1L << 20) /* U+3130-U+318F */
  /* Bit 53   Phags-Pa */
#define TT_UCR_CJK_MISC                        (1L << 21) /* U+A840-U+A87F */
#define TT_UCR_KANBUN  TT_UCR_CJK_MISC /* deprecated */
#define TT_UCR_PHAGSPA
  /* Bit 54   Enclosed CJK Letters and Months */
#define TT_UCR_ENCLOSED_CJK_LETTERS_MONTHS     (1L << 22) /* U+3200-U+32FF */
  /* Bit 55   CJK Compatibility */
#define TT_UCR_CJK_COMPATIBILITY               (1L << 23) /* U+3300-U+33FF */
  /* Bit 56   Hangul Syllables */
#define TT_UCR_HANGUL                          (1L << 24) /* U+AC00-U+D7A3 */
  /* Bit 57   High Surrogates              */
  /*          High Private Use Surrogates  */
  /*          Low Surrogates               */

  /* According to OpenType specs v.1.3+,   */
  /* setting bit 57 implies that there is  */
  /* at least one codepoint beyond the     */
  /* Basic Multilingual Plane that is      */
  /* supported by this font.  So it really */
  /* means >= U+10000.                     */
#define TT_UCR_SURROGATES                      (1L << 25) /* U+D800-U+DB7F */
                                                          /* U+DB80-U+DBFF */
                                                          /* U+DC00-U+DFFF */
#define TT_UCR_NON_PLANE_0  TT_UCR_SURROGATES
  /* Bit 58  Phoenician */
#define TT_UCR_PHOENICIAN                      (1L << 26) /*U+10900-U+1091F*/
  /* Bit 59   CJK Unified Ideographs             */
  /*          CJK Radicals Supplement            */
  /*          Kangxi Radicals                    */
  /*          Ideographic Description Characters */
  /*          CJK Unified Ideographs Extension A */
  /*          CJK Unified Ideographs Extension B */
  /*          Kanbun                             */
#define TT_UCR_CJK_UNIFIED_IDEOGRAPHS          (1L << 27) /* U+4E00-U+9FFF */
                                                          /* U+2E80-U+2EFF */
                                                          /* U+2F00-U+2FDF */
                                                          /* U+2FF0-U+2FFF */
                                                          /* U+3400-U+4DB5 */
                                                          /*U+20000-U+2A6DF*/
                                                          /* U+3190-U+319F */
  /* Bit 60   Private Use */
#define TT_UCR_PRIVATE_USE                     (1L << 28) /* U+E000-U+F8FF */
  /* Bit 61   CJK Strokes                             */
  /*          CJK Compatibility Ideographs            */
  /*          CJK Compatibility Ideographs Supplement */
#define TT_UCR_CJK_COMPATIBILITY_IDEOGRAPHS    (1L << 29) /* U+31C0-U+31EF */
                                                          /* U+F900-U+FAFF */
                                                          /*U+2F800-U+2FA1F*/
  /* Bit 62   Alphabetic Presentation Forms */
#define TT_UCR_ALPHABETIC_PRESENTATION_FORMS   (1L << 30) /* U+FB00-U+FB4F */
  /* Bit 63   Arabic Presentation Forms-A */
#define TT_UCR_ARABIC_PRESENTATION_FORMS_A     (1L << 31) /* U+FB50-U+FDFF */

  /* ulUnicodeRange3 */
  /* --------------- */

  /* Bit 64   Combining Half Marks */
#define TT_UCR_COMBINING_HALF_MARKS            (1L <<  0) /* U+FE20-U+FE2F */
  /* Bit 65   Vertical forms          */
  /*          CJK Compatibility Forms */
#define TT_UCR_CJK_COMPATIBILITY_FORMS         (1L <<  1) /* U+FE10-U+FE1F */
                                                          /* U+FE30-U+FE4F */
  /* Bit 66   Small Form Variants */
#define TT_UCR_SMALL_FORM_VARIANTS             (1L <<  2) /* U+FE50-U+FE6F */
  /* Bit 67   Arabic Presentation Forms-B */
#define TT_UCR_ARABIC_PRESENTATION_FORMS_B     (1L <<  3) /* U+FE70-U+FEFE */
  /* Bit 68   Halfwidth and Fullwidth Forms */
#define TT_UCR_HALFWIDTH_FULLWIDTH_FORMS       (1L <<  4) /* U+FF00-U+FFEF */
  /* Bit 69   Specials */
#define TT_UCR_SPECIALS                        (1L <<  5) /* U+FFF0-U+FFFD */
  /* Bit 70   Tibetan */
#define TT_UCR_TIBETAN                         (1L <<  6) /* U+0F00-U+0FFF */
  /* Bit 71   Syriac */
#define TT_UCR_SYRIAC                          (1L <<  7) /* U+0700-U+074F */
  /* Bit 72   Thaana */
#define TT_UCR_THAANA                          (1L <<  8) /* U+0780-U+07BF */
  /* Bit 73   Sinhala */
#define TT_UCR_SINHALA                         (1L <<  9) /* U+0D80-U+0DFF */
  /* Bit 74   Myanmar */
#define TT_UCR_MYANMAR                         (1L << 10) /* U+1000-U+109F */
  /* Bit 75   Ethiopic            */
  /*          Ethiopic Supplement */
  /*          Ethiopic Extended   */
#define TT_UCR_ETHIOPIC                        (1L << 11) /* U+1200-U+137F */
                                                          /* U+1380-U+139F */
                                                          /* U+2D80-U+2DDF */
  /* Bit 76   Cherokee */
#define TT_UCR_CHEROKEE                        (1L << 12) /* U+13A0-U+13FF */
  /* Bit 77   Unified Canadian Aboriginal Syllabics */
#define TT_UCR_CANADIAN_ABORIGINAL_SYLLABICS   (1L << 13) /* U+1400-U+167F */
  /* Bit 78   Ogham */
#define TT_UCR_OGHAM                           (1L << 14) /* U+1680-U+169F */
  /* Bit 79   Runic */
#define TT_UCR_RUNIC                           (1L << 15) /* U+16A0-U+16FF */
  /* Bit 80   Khmer         */
  /*          Khmer Symbols */
#define TT_UCR_KHMER                           (1L << 16) /* U+1780-U+17FF */
                                                          /* U+19E0-U+19FF */
  /* Bit 81   Mongolian */
#define TT_UCR_MONGOLIAN                       (1L << 17) /* U+1800-U+18AF */
  /* Bit 82   Braille Patterns */
#define TT_UCR_BRAILLE                         (1L << 18) /* U+2800-U+28FF */
  /* Bit 83   Yi Syllables */
  /*          Yi Radicals  */
#define TT_UCR_YI                              (1L << 19) /* U+A000-U+A48F */
                                                          /* U+A490-U+A4CF */
  /* Bit 84   Tagalog  */
  /*          Hanunoo  */
  /*          Buhid    */
  /*          Tagbanwa */
#define TT_UCR_PHILIPPINE                      (1L << 20) /* U+1700-U+171F */
                                                          /* U+1720-U+173F */
                                                          /* U+1740-U+175F */
                                                          /* U+1760-U+177F */
  /* Bit 85   Old Italic */
#define TT_UCR_OLD_ITALIC                      (1L << 21) /*U+10300-U+1032F*/
  /* Bit 86   Gothic */
#define TT_UCR_GOTHIC                          (1L << 22) /*U+10330-U+1034F*/
  /* Bit 87   Deseret */
#define TT_UCR_DESERET                         (1L << 23) /*U+10400-U+1044F*/
  /* Bit 88   Byzantine Musical Symbols      */
  /*          Musical Symbols                */
  /*          Ancient Greek Musical Notation */
#define TT_UCR_MUSICAL_SYMBOLS                 (1L << 24) /*U+1D000-U+1D0FF*/
                                                          /*U+1D100-U+1D1FF*/
                                                          /*U+1D200-U+1D24F*/
  /* Bit 89   Mathematical Alphanumeric Symbols */
#define TT_UCR_MATH_ALPHANUMERIC_SYMBOLS       (1L << 25) /*U+1D400-U+1D7FF*/
  /* Bit 90   Private Use (plane 15) */
  /*          Private Use (plane 16) */
#define TT_UCR_PRIVATE_USE_SUPPLEMENTARY       (1L << 26) /*U+F0000-U+FFFFD*/
                                                        /*U+100000-U+10FFFD*/
  /* Bit 91   Variation Selectors            */
  /*          Variation Selectors Supplement */
#define TT_UCR_VARIATION_SELECTORS             (1L << 27) /* U+FE00-U+FE0F */
                                                          /*U+E0100-U+E01EF*/
  /* Bit 92   Tags */
#define TT_UCR_TAGS                            (1L << 28) /*U+E0000-U+E007F*/
  /* Bit 93   Limbu */
#define TT_UCR_LIMBU                           (1L << 29) /* U+1900-U+194F */
  /* Bit 94   Tai Le */
#define TT_UCR_TAI_LE                          (1L << 30) /* U+1950-U+197F */
  /* Bit 95   New Tai Lue */
#define TT_UCR_NEW_TAI_LUE                     (1L << 31) /* U+1980-U+19DF */

  /* ulUnicodeRange4 */
  /* --------------- */

  /* Bit 96   Buginese */
#define TT_UCR_BUGINESE                        (1L <<  0) /* U+1A00-U+1A1F */
  /* Bit 97   Glagolitic */
#define TT_UCR_GLAGOLITIC                      (1L <<  1) /* U+2C00-U+2C5F */
  /* Bit 98   Tifinagh */
#define TT_UCR_TIFINAGH                        (1L <<  2) /* U+2D30-U+2D7F */
  /* Bit 99   Yijing Hexagram Symbols */
#define TT_UCR_YIJING                          (1L <<  3) /* U+4DC0-U+4DFF */
  /* Bit 100  Syloti Nagri */
#define TT_UCR_SYLOTI_NAGRI                    (1L <<  4) /* U+A800-U+A82F */
  /* Bit 101  Linear B Syllabary */
  /*          Linear B Ideograms */
  /*          Aegean Numbers     */
#define TT_UCR_LINEAR_B                        (1L <<  5) /*U+10000-U+1007F*/
                                                          /*U+10080-U+100FF*/
                                                          /*U+10100-U+1013F*/
  /* Bit 102  Ancient Greek Numbers */
#define TT_UCR_ANCIENT_GREEK_NUMBERS           (1L <<  6) /*U+10140-U+1018F*/
  /* Bit 103  Ugaritic */
#define TT_UCR_UGARITIC                        (1L <<  7) /*U+10380-U+1039F*/
  /* Bit 104  Old Persian */
#define TT_UCR_OLD_PERSIAN                     (1L <<  8) /*U+103A0-U+103DF*/
  /* Bit 105  Shavian */
#define TT_UCR_SHAVIAN                         (1L <<  9) /*U+10450-U+1047F*/
  /* Bit 106  Osmanya */
#define TT_UCR_OSMANYA                         (1L << 10) /*U+10480-U+104AF*/
  /* Bit 107  Cypriot Syllabary */
#define TT_UCR_CYPRIOT_SYLLABARY               (1L << 11) /*U+10800-U+1083F*/
  /* Bit 108  Kharoshthi */
#define TT_UCR_KHAROSHTHI                      (1L << 12) /*U+10A00-U+10A5F*/
  /* Bit 109  Tai Xuan Jing Symbols */
#define TT_UCR_TAI_XUAN_JING                   (1L << 13) /*U+1D300-U+1D35F*/
  /* Bit 110  Cuneiform                         */
  /*          Cuneiform Numbers and Punctuation */
#define TT_UCR_CUNEIFORM                       (1L << 14) /*U+12000-U+123FF*/
                                                          /*U+12400-U+1247F*/
  /* Bit 111  Counting Rod Numerals */
#define TT_UCR_COUNTING_ROD_NUMERALS           (1L << 15) /*U+1D360-U+1D37F*/
  /* Bit 112  Sundanese */
#define TT_UCR_SUNDANESE                       (1L << 16) /* U+1B80-U+1BBF */
  /* Bit 113  Lepcha */
#define TT_UCR_LEPCHA                          (1L << 17) /* U+1C00-U+1C4F */
  /* Bit 114  Ol Chiki */
#define TT_UCR_OL_CHIKI                        (1L << 18) /* U+1C50-U+1C7F */
  /* Bit 115  Saurashtra */
#define TT_UCR_SAURASHTRA                      (1L << 19) /* U+A880-U+A8DF */
  /* Bit 116  Kayah Li */
#define TT_UCR_KAYAH_LI                        (1L << 20) /* U+A900-U+A92F */
  /* Bit 117  Rejang */
#define TT_UCR_REJANG                          (1L << 21) /* U+A930-U+A95F */
  /* Bit 118  Cham */
#define TT_UCR_CHAM                            (1L << 22) /* U+AA00-U+AA5F */
  /* Bit 119  Ancient Symbols */
#define TT_UCR_ANCIENT_SYMBOLS                 (1L << 23) /*U+10190-U+101CF*/
  /* Bit 120  Phaistos Disc */
#define TT_UCR_PHAISTOS_DISC                   (1L << 24) /*U+101D0-U+101FF*/
  /* Bit 121  Carian */
  /*          Lycian */
  /*          Lydian */
#define TT_UCR_OLD_ANATOLIAN                   (1L << 25) /*U+102A0-U+102DF*/
                                                          /*U+10280-U+1029F*/
                                                          /*U+10920-U+1093F*/
  /* Bit 122  Domino Tiles  */
  /*          Mahjong Tiles */
#define TT_UCR_GAME_TILES                      (1L << 26) /*U+1F030-U+1F09F*/
                                                          /*U+1F000-U+1F02F*/
  /* Bit 123-127 Reserved for process-internal usage */

  /* */

  /* for backward compatibility with older FreeType versions */
#define TT_UCR_ARABIC_PRESENTATION_A         \
          TT_UCR_ARABIC_PRESENTATION_FORMS_A
#define TT_UCR_ARABIC_PRESENTATION_B         \
          TT_UCR_ARABIC_PRESENTATION_FORMS_B

#define TT_UCR_COMBINING_DIACRITICS          \
          TT_UCR_COMBINING_DIACRITICAL_MARKS
#define TT_UCR_COMBINING_DIACRITICS_SYMB          \
          TT_UCR_COMBINING_DIACRITICAL_MARKS_SYMB


FT_END_HEADER

#endif /* TTNAMEID_H_ */


/* END */
