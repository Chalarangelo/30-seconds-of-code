/* Pango
 * pango-script.h: Script tag handling
 *
 * Copyright (C) 2002 Red Hat Software
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Library General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	 See the GNU
 * Library General Public License for more details.
 *
 * You should have received a copy of the GNU Library General Public
 * License along with this library; if not, write to the
 * Free Software Foundation, Inc., 59 Temple Place - Suite 330,
 * Boston, MA 02111-1307, USA.
 */

#ifndef __PANGO_SCRIPT_H__
#define __PANGO_SCRIPT_H__

#include <glib.h>

G_BEGIN_DECLS

/**
 * PangoScriptIter:
 *
 * A #PangoScriptIter is used to iterate through a string
 * and identify ranges in different scripts.
 **/
typedef struct _PangoScriptIter PangoScriptIter;

/**
 * PangoScript:
 * @PANGO_SCRIPT_INVALID_CODE: a value never returned from pango_script_for_unichar()
 * @PANGO_SCRIPT_COMMON: a character used by multiple different scripts
 * @PANGO_SCRIPT_INHERITED: a mark glyph that takes its script from the
 * base glyph to which it is attached
 * @PANGO_SCRIPT_ARABIC: 	Arabic
 * @PANGO_SCRIPT_ARMENIAN: Armenian
 * @PANGO_SCRIPT_BENGALI: 	Bengali
 * @PANGO_SCRIPT_BOPOMOFO: Bopomofo
 * @PANGO_SCRIPT_CHEROKEE: 	Cherokee
 * @PANGO_SCRIPT_COPTIC: 	Coptic
 * @PANGO_SCRIPT_CYRILLIC: 	Cyrillic
 * @PANGO_SCRIPT_DESERET: 	Deseret
 * @PANGO_SCRIPT_DEVANAGARI: 	Devanagari
 * @PANGO_SCRIPT_ETHIOPIC: 	Ethiopic
 * @PANGO_SCRIPT_GEORGIAN: 	Georgian
 * @PANGO_SCRIPT_GOTHIC: 	Gothic
 * @PANGO_SCRIPT_GREEK: 	Greek
 * @PANGO_SCRIPT_GUJARATI: 	Gujarati
 * @PANGO_SCRIPT_GURMUKHI: 	Gurmukhi
 * @PANGO_SCRIPT_HAN: 	Han
 * @PANGO_SCRIPT_HANGUL: 	Hangul
 * @PANGO_SCRIPT_HEBREW: 	Hebrew
 * @PANGO_SCRIPT_HIRAGANA: 	Hiragana
 * @PANGO_SCRIPT_KANNADA: 	Kannada
 * @PANGO_SCRIPT_KATAKANA: 	Katakana
 * @PANGO_SCRIPT_KHMER: 	Khmer
 * @PANGO_SCRIPT_LAO: 	Lao
 * @PANGO_SCRIPT_LATIN: 	Latin
 * @PANGO_SCRIPT_MALAYALAM: 	Malayalam
 * @PANGO_SCRIPT_MONGOLIAN: 	Mongolian
 * @PANGO_SCRIPT_MYANMAR: 	Myanmar
 * @PANGO_SCRIPT_OGHAM: 	Ogham
 * @PANGO_SCRIPT_OLD_ITALIC: 	Old Italic
 * @PANGO_SCRIPT_ORIYA: 	Oriya
 * @PANGO_SCRIPT_RUNIC: 	Runic
 * @PANGO_SCRIPT_SINHALA: 	Sinhala
 * @PANGO_SCRIPT_SYRIAC: 	Syriac
 * @PANGO_SCRIPT_TAMIL: 	Tamil
 * @PANGO_SCRIPT_TELUGU: 	Telugu
 * @PANGO_SCRIPT_THAANA: 	Thaana
 * @PANGO_SCRIPT_THAI: 	Thai
 * @PANGO_SCRIPT_TIBETAN: 	Tibetan
 * @PANGO_SCRIPT_CANADIAN_ABORIGINAL: 	Canadian Aboriginal
 * @PANGO_SCRIPT_YI: 	Yi
 * @PANGO_SCRIPT_TAGALOG: 	Tagalog
 * @PANGO_SCRIPT_HANUNOO: 	Hanunoo
 * @PANGO_SCRIPT_BUHID: 	Buhid
 * @PANGO_SCRIPT_TAGBANWA: 	Tagbanwa
 * @PANGO_SCRIPT_BRAILLE: 	Braille
 * @PANGO_SCRIPT_CYPRIOT: 	Cypriot
 * @PANGO_SCRIPT_LIMBU: 	Limbu
 * @PANGO_SCRIPT_OSMANYA: 	Osmanya
 * @PANGO_SCRIPT_SHAVIAN: 	Shavian
 * @PANGO_SCRIPT_LINEAR_B: 	Linear B
 * @PANGO_SCRIPT_TAI_LE: 	Tai Le
 * @PANGO_SCRIPT_UGARITIC: 	Ugaritic
 * @PANGO_SCRIPT_NEW_TAI_LUE: 	New Tai Lue. Since 1.10
 * @PANGO_SCRIPT_BUGINESE: 	Buginese. Since 1.10
 * @PANGO_SCRIPT_GLAGOLITIC: 	Glagolitic. Since 1.10
 * @PANGO_SCRIPT_TIFINAGH: 	Tifinagh. Since 1.10
 * @PANGO_SCRIPT_SYLOTI_NAGRI: 	Syloti Nagri. Since 1.10
 * @PANGO_SCRIPT_OLD_PERSIAN: 	Old Persian. Since 1.10
 * @PANGO_SCRIPT_KHAROSHTHI: 	Kharoshthi. Since 1.10
 * @PANGO_SCRIPT_UNKNOWN: 		an unassigned code point. Since 1.14
 * @PANGO_SCRIPT_BALINESE: 		Balinese. Since 1.14
 * @PANGO_SCRIPT_CUNEIFORM: 	Cuneiform. Since 1.14
 * @PANGO_SCRIPT_PHOENICIAN: 	Phoenician. Since 1.14
 * @PANGO_SCRIPT_PHAGS_PA: 		Phags-pa. Since 1.14
 * @PANGO_SCRIPT_NKO: 		N'Ko. Since 1.14
 * @PANGO_SCRIPT_KAYAH_LI:   Kayah Li. Since 1.20.1
 * @PANGO_SCRIPT_LEPCHA:     Lepcha. Since 1.20.1
 * @PANGO_SCRIPT_REJANG:     Rejang. Since 1.20.1
 * @PANGO_SCRIPT_SUNDANESE:  Sundanese. Since 1.20.1
 * @PANGO_SCRIPT_SAURASHTRA: Saurashtra. Since 1.20.1
 * @PANGO_SCRIPT_CHAM:       Cham. Since 1.20.1
 * @PANGO_SCRIPT_OL_CHIKI:   Ol Chiki. Since 1.20.1
 * @PANGO_SCRIPT_VAI:        Vai. Since 1.20.1
 * @PANGO_SCRIPT_CARIAN:     Carian. Since 1.20.1
 * @PANGO_SCRIPT_LYCIAN:     Lycian. Since 1.20.1
 * @PANGO_SCRIPT_LYDIAN:     Lydian. Since 1.20.1
 * @PANGO_SCRIPT_BATAK:      Batak. Since 1.32
 * @PANGO_SCRIPT_BRAHMI:     Brahmi. Since 1.32
 * @PANGO_SCRIPT_MANDAIC:    Mandaic. Since 1.32
 * @PANGO_SCRIPT_CHAKMA:               Chakma. Since: 1.32
 * @PANGO_SCRIPT_MEROITIC_CURSIVE:     Meroitic Cursive. Since: 1.32
 * @PANGO_SCRIPT_MEROITIC_HIEROGLYPHS: Meroitic Hieroglyphs. Since: 1.32
 * @PANGO_SCRIPT_MIAO:                 Miao. Since: 1.32
 * @PANGO_SCRIPT_SHARADA:              Sharada. Since: 1.32
 * @PANGO_SCRIPT_SORA_SOMPENG:         Sora Sompeng. Since: 1.32
 * @PANGO_SCRIPT_TAKRI:                Takri. Since: 1.32
 * @PANGO_SCRIPT_BASSA_VAH:            Bassa. Since: 1.40
 * @PANGO_SCRIPT_CAUCASIAN_ALBANIAN:   Caucasian Albanian. Since: 1.40
 * @PANGO_SCRIPT_DUPLOYAN:             Duployan. Since: 1.40
 * @PANGO_SCRIPT_ELBASAN:              Elbasan. Since: 1.40
 * @PANGO_SCRIPT_GRANTHA:              Grantha. Since: 1.40
 * @PANGO_SCRIPT_KHOJKI:               Kjohki. Since: 1.40
 * @PANGO_SCRIPT_KHUDAWADI:            Khudawadi, Sindhi. Since: 1.40
 * @PANGO_SCRIPT_LINEAR_A:             Linear A. Since: 1.40
 * @PANGO_SCRIPT_MAHAJANI:             Mahajani. Since: 1.40
 * @PANGO_SCRIPT_MANICHAEAN:           Manichaean. Since: 1.40
 * @PANGO_SCRIPT_MENDE_KIKAKUI:        Mende Kikakui. Since: 1.40
 * @PANGO_SCRIPT_MODI:                 Modi. Since: 1.40
 * @PANGO_SCRIPT_MRO:                  Mro. Since: 1.40
 * @PANGO_SCRIPT_NABATAEAN:            Nabataean. Since: 1.40
 * @PANGO_SCRIPT_OLD_NORTH_ARABIAN:    Old North Arabian. Since: 1.40
 * @PANGO_SCRIPT_OLD_PERMIC:           Old Permic. Since: 1.40
 * @PANGO_SCRIPT_PAHAWH_HMONG:         Pahawh Hmong. Since: 1.40
 * @PANGO_SCRIPT_PALMYRENE:            Palmyrene. Since: 1.40
 * @PANGO_SCRIPT_PAU_CIN_HAU:          Pau Cin Hau. Since: 1.40
 * @PANGO_SCRIPT_PSALTER_PAHLAVI:      Psalter Pahlavi. Since: 1.40
 * @PANGO_SCRIPT_SIDDHAM:              Siddham. Since: 1.40
 * @PANGO_SCRIPT_TIRHUTA:              Tirhuta. Since: 1.40
 * @PANGO_SCRIPT_WARANG_CITI:          Warang Citi. Since: 1.40
 * @PANGO_SCRIPT_AHOM:                 Ahom. Since: 1.40
 * @PANGO_SCRIPT_ANATOLIAN_HIEROGLYPHS: Anatolian Hieroglyphs. Since: 1.40
 * @PANGO_SCRIPT_HATRAN:               Hatran. Since: 1.40
 * @PANGO_SCRIPT_MULTANI:              Multani. Since: 1.40
 * @PANGO_SCRIPT_OLD_HUNGARIAN:        Old Hungarian. Since: 1.40
 * @PANGO_SCRIPT_SIGNWRITING:          Signwriting. Since: 1.40
 *
 * The #PangoScript enumeration identifies different writing
 * systems. The values correspond to the names as defined in the
 * Unicode standard.
 * Note that new types may be added in the future. Applications should be ready
 * to handle unknown values.  This enumeration is interchangeable with
 * #GUnicodeScript.  See <ulink
 * url="http://www.unicode.org/reports/tr24/">Unicode Standard Annex
 * #24: Script names</ulink>.
 */
typedef enum {                         /* ISO 15924 code */
      PANGO_SCRIPT_INVALID_CODE = -1,
      PANGO_SCRIPT_COMMON       = 0,   /* Zyyy */
      PANGO_SCRIPT_INHERITED,          /* Qaai */
      PANGO_SCRIPT_ARABIC,             /* Arab */
      PANGO_SCRIPT_ARMENIAN,           /* Armn */
      PANGO_SCRIPT_BENGALI,            /* Beng */
      PANGO_SCRIPT_BOPOMOFO,           /* Bopo */
      PANGO_SCRIPT_CHEROKEE,           /* Cher */
      PANGO_SCRIPT_COPTIC,             /* Qaac */
      PANGO_SCRIPT_CYRILLIC,           /* Cyrl (Cyrs) */
      PANGO_SCRIPT_DESERET,            /* Dsrt */
      PANGO_SCRIPT_DEVANAGARI,         /* Deva */
      PANGO_SCRIPT_ETHIOPIC,           /* Ethi */
      PANGO_SCRIPT_GEORGIAN,           /* Geor (Geon, Geoa) */
      PANGO_SCRIPT_GOTHIC,             /* Goth */
      PANGO_SCRIPT_GREEK,              /* Grek */
      PANGO_SCRIPT_GUJARATI,           /* Gujr */
      PANGO_SCRIPT_GURMUKHI,           /* Guru */
      PANGO_SCRIPT_HAN,                /* Hani */
      PANGO_SCRIPT_HANGUL,             /* Hang */
      PANGO_SCRIPT_HEBREW,             /* Hebr */
      PANGO_SCRIPT_HIRAGANA,           /* Hira */
      PANGO_SCRIPT_KANNADA,            /* Knda */
      PANGO_SCRIPT_KATAKANA,           /* Kana */
      PANGO_SCRIPT_KHMER,              /* Khmr */
      PANGO_SCRIPT_LAO,                /* Laoo */
      PANGO_SCRIPT_LATIN,              /* Latn (Latf, Latg) */
      PANGO_SCRIPT_MALAYALAM,          /* Mlym */
      PANGO_SCRIPT_MONGOLIAN,          /* Mong */
      PANGO_SCRIPT_MYANMAR,            /* Mymr */
      PANGO_SCRIPT_OGHAM,              /* Ogam */
      PANGO_SCRIPT_OLD_ITALIC,         /* Ital */
      PANGO_SCRIPT_ORIYA,              /* Orya */
      PANGO_SCRIPT_RUNIC,              /* Runr */
      PANGO_SCRIPT_SINHALA,            /* Sinh */
      PANGO_SCRIPT_SYRIAC,             /* Syrc (Syrj, Syrn, Syre) */
      PANGO_SCRIPT_TAMIL,              /* Taml */
      PANGO_SCRIPT_TELUGU,             /* Telu */
      PANGO_SCRIPT_THAANA,             /* Thaa */
      PANGO_SCRIPT_THAI,               /* Thai */
      PANGO_SCRIPT_TIBETAN,            /* Tibt */
      PANGO_SCRIPT_CANADIAN_ABORIGINAL, /* Cans */
      PANGO_SCRIPT_YI,                 /* Yiii */
      PANGO_SCRIPT_TAGALOG,            /* Tglg */
      PANGO_SCRIPT_HANUNOO,            /* Hano */
      PANGO_SCRIPT_BUHID,              /* Buhd */
      PANGO_SCRIPT_TAGBANWA,           /* Tagb */

      /* Unicode-4.0 additions */
      PANGO_SCRIPT_BRAILLE,            /* Brai */
      PANGO_SCRIPT_CYPRIOT,            /* Cprt */
      PANGO_SCRIPT_LIMBU,              /* Limb */
      PANGO_SCRIPT_OSMANYA,            /* Osma */
      PANGO_SCRIPT_SHAVIAN,            /* Shaw */
      PANGO_SCRIPT_LINEAR_B,           /* Linb */
      PANGO_SCRIPT_TAI_LE,             /* Tale */
      PANGO_SCRIPT_UGARITIC,           /* Ugar */

      /* Unicode-4.1 additions */
      PANGO_SCRIPT_NEW_TAI_LUE,        /* Talu */
      PANGO_SCRIPT_BUGINESE,           /* Bugi */
      PANGO_SCRIPT_GLAGOLITIC,         /* Glag */
      PANGO_SCRIPT_TIFINAGH,           /* Tfng */
      PANGO_SCRIPT_SYLOTI_NAGRI,       /* Sylo */
      PANGO_SCRIPT_OLD_PERSIAN,        /* Xpeo */
      PANGO_SCRIPT_KHAROSHTHI,         /* Khar */

      /* Unicode-5.0 additions */
      PANGO_SCRIPT_UNKNOWN,            /* Zzzz */
      PANGO_SCRIPT_BALINESE,           /* Bali */
      PANGO_SCRIPT_CUNEIFORM,          /* Xsux */
      PANGO_SCRIPT_PHOENICIAN,         /* Phnx */
      PANGO_SCRIPT_PHAGS_PA,           /* Phag */
      PANGO_SCRIPT_NKO,                /* Nkoo */

      /* Unicode-5.1 additions */
      PANGO_SCRIPT_KAYAH_LI,           /* Kali */
      PANGO_SCRIPT_LEPCHA,             /* Lepc */
      PANGO_SCRIPT_REJANG,             /* Rjng */
      PANGO_SCRIPT_SUNDANESE,          /* Sund */
      PANGO_SCRIPT_SAURASHTRA,         /* Saur */
      PANGO_SCRIPT_CHAM,               /* Cham */
      PANGO_SCRIPT_OL_CHIKI,           /* Olck */
      PANGO_SCRIPT_VAI,                /* Vaii */
      PANGO_SCRIPT_CARIAN,             /* Cari */
      PANGO_SCRIPT_LYCIAN,             /* Lyci */
      PANGO_SCRIPT_LYDIAN,             /* Lydi */

      /* Unicode-6.0 additions */
      PANGO_SCRIPT_BATAK,              /* Batk */
      PANGO_SCRIPT_BRAHMI,             /* Brah */
      PANGO_SCRIPT_MANDAIC,            /* Mand */

      /* Unicode-6.1 additions */
      PANGO_SCRIPT_CHAKMA,             /* Cakm */
      PANGO_SCRIPT_MEROITIC_CURSIVE,   /* Merc */
      PANGO_SCRIPT_MEROITIC_HIEROGLYPHS,/* Mero */
      PANGO_SCRIPT_MIAO,               /* Plrd */
      PANGO_SCRIPT_SHARADA,            /* Shrd */
      PANGO_SCRIPT_SORA_SOMPENG,       /* Sora */
      PANGO_SCRIPT_TAKRI,              /* Takr */

      /* Unicode 7.0 additions */
      PANGO_SCRIPT_BASSA_VAH,              /* Bass */
      PANGO_SCRIPT_CAUCASIAN_ALBANIAN,     /* Aghb */
      PANGO_SCRIPT_DUPLOYAN,               /* Dupl */
      PANGO_SCRIPT_ELBASAN,                /* Elba */
      PANGO_SCRIPT_GRANTHA,                /* Gran */
      PANGO_SCRIPT_KHOJKI,                 /* Khoj */
      PANGO_SCRIPT_KHUDAWADI,              /* Sind */
      PANGO_SCRIPT_LINEAR_A,               /* Lina */
      PANGO_SCRIPT_MAHAJANI,               /* Mahj */
      PANGO_SCRIPT_MANICHAEAN,             /* Manu */
      PANGO_SCRIPT_MENDE_KIKAKUI,          /* Mend */
      PANGO_SCRIPT_MODI,                   /* Modi */
      PANGO_SCRIPT_MRO,                    /* Mroo */
      PANGO_SCRIPT_NABATAEAN,              /* Nbat */
      PANGO_SCRIPT_OLD_NORTH_ARABIAN,      /* Narb */
      PANGO_SCRIPT_OLD_PERMIC,             /* Perm */
      PANGO_SCRIPT_PAHAWH_HMONG,           /* Hmng */
      PANGO_SCRIPT_PALMYRENE,              /* Palm */
      PANGO_SCRIPT_PAU_CIN_HAU,            /* Pauc */
      PANGO_SCRIPT_PSALTER_PAHLAVI,        /* Phlp */
      PANGO_SCRIPT_SIDDHAM,                /* Sidd */
      PANGO_SCRIPT_TIRHUTA,                /* Tirh */
      PANGO_SCRIPT_WARANG_CITI,            /* Wara */

      /* Unicode 8.0 additions */
      PANGO_SCRIPT_AHOM,                   /* Ahom */
      PANGO_SCRIPT_ANATOLIAN_HIEROGLYPHS,  /* Hluw */
      PANGO_SCRIPT_HATRAN,                 /* Hatr */
      PANGO_SCRIPT_MULTANI,                /* Mult */
      PANGO_SCRIPT_OLD_HUNGARIAN,          /* Hung */
      PANGO_SCRIPT_SIGNWRITING             /* Sgnw */
} PangoScript;

#include <pango/pango-version-macros.h>

PANGO_AVAILABLE_IN_1_4
PangoScript pango_script_for_unichar         (gunichar             ch) G_GNUC_CONST;

PANGO_AVAILABLE_IN_1_4
PangoScriptIter *pango_script_iter_new       (const char          *text,
					      int                  length);
PANGO_AVAILABLE_IN_1_4
void             pango_script_iter_get_range (PangoScriptIter     *iter,
                                              const char         **start,
                                              const char         **end,
                                              PangoScript         *script);
PANGO_AVAILABLE_IN_1_4
gboolean         pango_script_iter_next      (PangoScriptIter     *iter);
PANGO_AVAILABLE_IN_1_4
void             pango_script_iter_free      (PangoScriptIter     *iter);

#include <pango/pango-language.h>

PANGO_AVAILABLE_IN_1_4
PangoLanguage *pango_script_get_sample_language (PangoScript    script) G_GNUC_PURE;

G_END_DECLS

#endif /* __PANGO_SCRIPT_H__ */
