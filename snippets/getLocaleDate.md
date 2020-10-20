---
title: getLocaleDate
tags: date,beginner,format
---

Returns a string of locale date from a Date object.

- Usage: getLocaleDate(Date, Region, Long/Short)

```js
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const getLocaleDate = (date, region, longOrShort) => {
    if(longOrShort === 's' || longOrShort === 'S') {
        return date.toLocaleDateString(region)
    } else if(longOrShort === 'l' || longOrShort === 'L') {
        return date.toLocaleDateString(region, options)
    } else { // default
        return date.toLocaleDateString('en-US')
    }
}
```
Sample input and output:

```js
getLocaleDate(new Date('2020-09-09'), 'en-US', 'L')) // Tuesday, September 9, 2020
getLocaleDate(new Date('2020-09-09'), 'vi-VN', 'L') // Thứ Tư, 9 tháng 9, 2020
getLocaleDate(new Date('2020-09-09'), 'vi-VN', 'S') // 9/9/2020
```
Region language codes:
```
Afrikaans	af
Albanian	sq
Arabic (Algeria)	ar-dz
Arabic (Bahrain)	ar-bh
Arabic (Egypt)	ar-eg
Arabic (Iraq)	ar-iq
Arabic (Jordan)	ar-jo
Arabic (Kuwait)	ar-kw
Arabic (Lebanon)	ar-lb
Arabic (Libya)	ar-ly
Arabic (Morocco)	ar-ma
Arabic (Oman)	ar-om
Arabic (Qatar)	ar-qa
Arabic (Saudi Arabia)	ar-sa
Arabic (Syria)	ar-sy
Arabic (Tunisia)	ar-tn
Arabic (U.A.E.)	ar-ae
Arabic (Yemen)	ar-ye
Basque	eu
Belarusian	be
Bulgarian	bg
Catalan	ca
Chinese (Hong Kong)	zh-hk
Chinese (PRC)	zh-cn
Chinese (Singapore)	zh-sg
Chinese (Taiwan)	zh-tw
Croatian	hr
Czech	cs
Danish	da
Dutch (Belgium)	nl-be
Dutch (Standard)	nl
English	en
English (Australia)	en-au
English (Belize)	en-bz
English (Canada)	en-ca
English (Ireland)	en-ie
English (Jamaica)	en-jm
English (New Zealand)	en-nz
English (South Africa)	en-za
English (Trinidad)	en-tt
English (United Kingdom)	en-gb
English (United States)	en-us
Estonian	et
Faeroese	fo
Farsi	fa
Finnish	fi
French (Belgium)	fr-be
French (Canada)	fr-ca
French (Luxembourg)	fr-lu
French (Standard)	fr
French (Switzerland)	fr-ch
Gaelic (Scotland)	gd
German (Austria)	de-at
German (Liechtenstein)	de-li
German (Luxembourg)	de-lu
German (Standard)	de
German (Switzerland)	de-ch
Greek	el
Hebrew	he
Hindi	hi
Hungarian	hu
Icelandic	is
Indonesian	id
Irish	ga
Italian (Standard)	it
Italian (Switzerland)	it-ch
Japanese	ja
Korean	ko
Korean (Johab)	ko
Kurdish	ku
Latvian	lv
Lithuanian	lt
Macedonian (FYROM)	mk
Malayalam	ml
Malaysian	ms
Maltese	mt
Norwegian	no
Norwegian (Bokmål)	nb
Norwegian (Nynorsk)	nn
Polish	pl
Portuguese (Brazil)	pt-br
Portuguese (Portugal)	pt
Punjabi	pa
Rhaeto-Romanic	rm
Romanian	ro
Romanian (Republic of Moldova)	ro-md
Russian	ru
Russian (Republic of Moldova)	ru-md
Serbian	sr
Slovak	sk
Slovenian	sl
Sorbian	sb
Spanish (Argentina)	es-ar
Spanish (Bolivia)	es-bo
Spanish (Chile)	es-cl
Spanish (Colombia)	es-co
Spanish (Costa Rica)	es-cr
Spanish (Dominican Republic)	es-do
Spanish (Ecuador)	es-ec
Spanish (El Salvador)	es-sv
Spanish (Guatemala)	es-gt
Spanish (Honduras)	es-hn
Spanish (Mexico)	es-mx
Spanish (Nicaragua)	es-ni
Spanish (Panama)	es-pa
Spanish (Paraguay)	es-py
Spanish (Peru)	es-pe
Spanish (Puerto Rico)	es-pr
Spanish (Spain)	es
Spanish (Uruguay)	es-uy
Spanish (Venezuela)	es-ve
Swedish	sv
Swedish (Finland)	sv-fi
Thai	th
Tsonga	ts
Tswana	tn
Turkish	tr
Ukrainian	uk
Urdu	ur
Venda	ve
Vietnamese	vi
Welsh	cy
Xhosa	xh
Yiddish	ji
Zulu	zu
```