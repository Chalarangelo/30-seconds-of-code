<!doctype html>
<html lang="en">
<head>
    <title>Code coverage report for tar/lib/unpack.js</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="../../prettify.css" />
    <link rel="stylesheet" href="../../base.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type='text/css'>
        .coverage-summary .sorter {
            background-image: url(../../sort-arrow-sprite.png);
        }
    </style>
</head>
<body>
<div class='wrapper'>
  <div class='pad1'>
    <h1>
      <a href="../../index.html">All files</a> / <a href="index.html">tar/lib</a> unpack.js
    </h1>
    <div class='clearfix'>
      <div class='fl pad1y space-right2'>
        <span class="strong">100% </span>
        <span class="quiet">Statements</span>
        <span class='fraction'>254/254</span>
      </div>
      <div class='fl pad1y space-right2'>
        <span class="strong">100% </span>
        <span class="quiet">Branches</span>
        <span class='fraction'>194/194</span>
      </div>
      <div class='fl pad1y space-right2'>
        <span class="strong">100% </span>
        <span class="quiet">Functions</span>
        <span class='fraction'>44/44</span>
      </div>
      <div class='fl pad1y space-right2'>
        <span class="strong">100% </span>
        <span class="quiet">Lines</span>
        <span class='fraction'>247/247</span>
      </div>
    </div>
  </div>
  <div class='status-line high'></div>
<pre><table class="coverage">
<tr><td class="line-count quiet">1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
370
371
372
373
374
375
376
377
378
379
380
381
382
383
384
385
386
387
388
389
390
391
392
393
394
395
396
397
398
399
400
401
402
403
404
405
406
407
408
409
410
411
412
413
414
415
416
417
418
419
420
421
422
423
424
425
426
427
428
429
430
431
432
433
434
435
436
437
438
439
440
441
442
443
444
445
446
447
448
449
450
451
452
453
454
455
456
457
458
459
460
461
462
463
464
465
466
467
468
469
470
471
472
473
474
475
476
477
478
479
480
481
482
483
484
485
486
487
488
489
490
491
492
493
494
495
496
497
498
499
500
501
502
503
504
505
506
507
508
509
510
511
512
513
514</td><td class="line-coverage quiet"><span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">60x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">134x</span>
<span class="cline-any cline-yes">4x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">134x</span>
<span class="cline-any cline-yes">109x</span>
<span class="cline-any cline-yes">109x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">134x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">134x</span>
<span class="cline-any cline-yes">134x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">134x</span>
<span class="cline-any cline-yes">134x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">134x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">134x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">9x</span>
<span class="cline-any cline-yes">2x</span>
<span class="cline-any cline-yes">7x</span>
<span class="cline-any cline-yes">1x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">6x</span>
<span class="cline-any cline-yes">6x</span>
<span class="cline-any cline-yes">6x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">125x</span>
<span class="cline-any cline-yes">125x</span>
<span class="cline-any cline-yes">125x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">131x</span>
<span class="cline-any cline-yes">119x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">12x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">131x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">131x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">131x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">131x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">131x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">131x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">131x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">131x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">131x</span>
<span class="cline-any cline-yes">131x</span>
<span class="cline-any cline-yes">131x</span>
<span class="cline-any cline-yes">131x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">131x</span>
<span class="cline-any cline-yes">131x</span>
<span class="cline-any cline-yes">571x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">473x</span>
<span class="cline-any cline-yes">98x</span>
<span class="cline-any cline-yes">98x</span>
<span class="cline-any cline-yes">98x</span>
<span class="cline-any cline-yes">98x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">571x</span>
<span class="cline-any cline-yes">144x</span>
<span class="cline-any cline-yes">144x</span>
<span class="cline-any cline-yes">9x</span>
<span class="cline-any cline-yes">135x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">562x</span>
<span class="cline-any cline-yes">545x</span>
<span class="cline-any cline-yes">545x</span>
<span class="cline-any cline-yes">2x</span>
<span class="cline-any cline-yes">2x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">543x</span>
<span class="cline-any cline-yes">2x</span>
<span class="cline-any cline-yes">2x</span>
<span class="cline-any cline-yes">2x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">560x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">560x</span>
<span class="cline-any cline-yes">2x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">558x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">560x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">571x</span>
<span class="cline-any cline-yes">11x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">560x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">560x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">179x</span>
<span class="cline-any cline-yes">140x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">554x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">6x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">39x</span>
<span class="cline-any cline-yes">12x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">27x</span>
<span class="cline-any cline-yes">27x</span>
<span class="cline-any cline-yes">27x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">451x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">473x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">30x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">30x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">221x</span>
<span class="cline-any cline-yes">221x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">221x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">221x</span>
<span class="cline-any cline-yes">221x</span>
<span class="cline-any cline-yes">421x</span>
<span class="cline-any cline-yes">1x</span>
<span class="cline-any cline-yes">1x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">421x</span>
<span class="cline-any cline-yes">219x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">221x</span>
<span class="cline-any cline-yes">219x</span>
<span class="cline-any cline-yes">192x</span>
<span class="cline-any cline-yes">192x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">219x</span>
<span class="cline-any cline-yes">10x</span>
<span class="cline-any cline-yes">10x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">219x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">221x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">97x</span>
<span class="cline-any cline-yes">97x</span>
<span class="cline-any cline-yes">97x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">94x</span>
<span class="cline-any cline-yes">94x</span>
<span class="cline-any cline-yes">171x</span>
<span class="cline-any cline-yes">94x</span>
<span class="cline-any cline-yes">94x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">94x</span>
<span class="cline-any cline-yes">73x</span>
<span class="cline-any cline-yes">73x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">94x</span>
<span class="cline-any cline-yes">4x</span>
<span class="cline-any cline-yes">4x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">94x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">6x</span>
<span class="cline-any cline-yes">6x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">21x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">19x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">354x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">364x</span>
<span class="cline-any cline-yes">364x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">4x</span>
<span class="cline-any cline-yes">4x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">354x</span>
<span class="cline-any cline-yes">354x</span>
<span class="cline-any cline-yes">354x</span>
<span class="cline-any cline-yes">12x</span>
<span class="cline-any cline-yes">342x</span>
<span class="cline-any cline-yes">342x</span>
<span class="cline-any cline-yes">2x</span>
<span class="cline-any cline-yes">340x</span>
<span class="cline-any cline-yes">318x</span>
<span class="cline-any cline-yes">22x</span>
<span class="cline-any cline-yes">16x</span>
<span class="cline-any cline-yes">11x</span>
<span class="cline-any cline-yes">9x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">2x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">5x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">6x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">528x</span>
<span class="cline-any cline-yes">1x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">527x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">314x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">19x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">21x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">173x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">21x</span>
<span class="cline-any cline-yes">21x</span>
<span class="cline-any cline-yes">1x</span>
<span class="cline-any cline-yes">20x</span>
<span class="cline-any cline-yes">20x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">59x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">200x</span>
<span class="cline-any cline-yes">200x</span>
<span class="cline-any cline-yes">9x</span>
<span class="cline-any cline-yes">191x</span>
<span class="cline-any cline-yes">191x</span>
<span class="cline-any cline-yes">17x</span>
<span class="cline-any cline-yes">2x</span>
<span class="cline-any cline-yes">15x</span>
<span class="cline-any cline-yes">2x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">13x</span>
<span class="cline-any cline-yes">13x</span>
<span class="cline-any cline-yes">6x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">2x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">7x</span>
<span class="cline-any cline-yes">12x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">1x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">174x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">93x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">93x</span>
<span class="cline-any cline-yes">6x</span>
<span class="cline-any cline-yes">6x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">93x</span>
<span class="cline-any cline-yes">93x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">1x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">92x</span>
<span class="cline-any cline-yes">86x</span>
<span class="cline-any cline-yes">86x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">1x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">92x</span>
<span class="cline-any cline-yes">86x</span>
<span class="cline-any cline-yes">86x</span>
<span class="cline-any cline-yes">58x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">85x</span>
<span class="cline-any cline-yes">12x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">82x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">4x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">76x</span>
<span class="cline-any cline-yes">76x</span>
<span class="cline-any cline-yes">76x</span>
<span class="cline-any cline-yes">1x</span>
<span class="cline-any cline-yes">75x</span>
<span class="cline-any cline-yes">56x</span>
<span class="cline-any cline-yes">56x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">75x</span>
<span class="cline-any cline-yes">4x</span>
<span class="cline-any cline-yes">4x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">75x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">276x</span>
<span class="cline-any cline-yes">276x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">4x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">19x</span>
<span class="cline-any cline-yes">19x</span>
<span class="cline-any cline-yes">17x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">2x</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-neutral">&nbsp;</span></td><td class="text"><pre class="prettyprint lang-js">'use strict'
&nbsp;
const assert = require('assert')
const EE = require('events').EventEmitter
const Parser = require('./parse.js')
const fs = require('fs')
const fsm = require('fs-minipass')
const path = require('path')
const mkdir = require('./mkdir.js')
const mkdirSync = mkdir.sync
const wc = require('./winchars.js')
&nbsp;
const ONENTRY = Symbol('onEntry')
const CHECKFS = Symbol('checkFs')
const MAKEFS = Symbol('makeFs')
const FILE = Symbol('file')
const DIRECTORY = Symbol('directory')
const LINK = Symbol('link')
const SYMLINK = Symbol('symlink')
const HARDLINK = Symbol('hardlink')
const UNSUPPORTED = Symbol('unsupported')
const UNKNOWN = Symbol('unknown')
const CHECKPATH = Symbol('checkPath')
const MKDIR = Symbol('mkdir')
const ONERROR = Symbol('onError')
const PENDING = Symbol('pending')
const PEND = Symbol('pend')
const UNPEND = Symbol('unpend')
const ENDED = Symbol('ended')
const MAYBECLOSE = Symbol('maybeClose')
const SKIP = Symbol('skip')
const DOCHOWN = Symbol('doChown')
const UID = Symbol('uid')
const GID = Symbol('gid')
&nbsp;
// this.gid, entry.gid, this.processUid
const uint32 = (a, b, c) =&gt;
  a === a &gt;&gt;&gt; 0 ? a
  : b === b &gt;&gt;&gt; 0 ? b
  : c
&nbsp;
class Unpack extends Parser {
  constructor (opt) {
    if (!opt)
      opt = {}
&nbsp;
    opt.ondone = _ =&gt; {
      this[ENDED] = true
      this[MAYBECLOSE]()
    }
&nbsp;
    super(opt)
&nbsp;
    this.writable = true
    this.readable = false
&nbsp;
    this[PENDING] = 0
    this[ENDED] = false
&nbsp;
    this.dirCache = opt.dirCache || new Map()
&nbsp;
    if (typeof opt.uid === 'number' || typeof opt.gid === 'number') {
      // need both or neither
      if (typeof opt.uid !== 'number' || typeof opt.gid !== 'number')
        throw new TypeError('cannot set owner without number uid and gid')
      if (opt.preserveOwner)
        throw new TypeError(
          'cannot preserve owner in archive and also set owner explicitly')
      this.uid = opt.uid
      this.gid = opt.gid
      this.setOwner = true
    } else {
      this.uid = null
      this.gid = null
      this.setOwner = false
    }
&nbsp;
    // default true for root
    if (opt.preserveOwner === undefined &amp;&amp; typeof opt.uid !== 'number')
      this.preserveOwner = process.getuid &amp;&amp; process.getuid() === 0
    else
      this.preserveOwner = !!opt.preserveOwner
&nbsp;
    this.processUid = (this.preserveOwner || this.setOwner) &amp;&amp; process.getuid ?
      process.getuid() : null
    this.processGid = (this.preserveOwner || this.setOwner) &amp;&amp; process.getgid ?
      process.getgid() : null
&nbsp;
    // turn &gt;&lt;?| in filenames into 0xf000-higher encoded forms
    this.win32 = !!opt.win32 || process.platform === 'win32'
&nbsp;
    // do not unpack over files that are newer than what's in the archive
    this.newer = !!opt.newer
&nbsp;
    // do not unpack over ANY files
    this.keep = !!opt.keep
&nbsp;
    // do not set mtime/atime of extracted entries
    this.noMtime = !!opt.noMtime
&nbsp;
    // allow .., absolute path entries, and unpacking through symlinks
    // without this, warn and skip .., relativize absolutes, and error
    // on symlinks in extraction path
    this.preservePaths = !!opt.preservePaths
&nbsp;
    // unlink files and links before writing. This breaks existing hard
    // links, and removes symlink directories rather than erroring
    this.unlink = !!opt.unlink
&nbsp;
    this.cwd = path.resolve(opt.cwd || process.cwd())
    this.strip = +opt.strip || 0
    this.processUmask = process.umask()
    this.umask = typeof opt.umask === 'number' ? opt.umask : this.processUmask
    // default mode for dirs created as parents
    this.dmode = opt.dmode || (0o0777 &amp; (~this.umask))
    this.fmode = opt.fmode || (0o0666 &amp; (~this.umask))
    this.on('entry', entry =&gt; this[ONENTRY](entry))
  }
&nbsp;
  [MAYBECLOSE] () {
    if (this[ENDED] &amp;&amp; this[PENDING] === 0) {
      this.emit('prefinish')
      this.emit('finish')
      this.emit('end')
      this.emit('close')
    }
  }
&nbsp;
  [CHECKPATH] (entry) {
    if (this.strip) {
      const parts = entry.path.split(/\/|\\/)
      if (parts.length &lt; this.strip)
        return false
      entry.path = parts.slice(this.strip).join('/')
    }
&nbsp;
    if (!this.preservePaths) {
      const p = entry.path
      if (p.match(/(^|\/|\\)\.\.(\\|\/|$)/)) {
        this.warn('path contains \'..\'', p)
        return false
      }
&nbsp;
      // absolutes on posix are also absolutes on win32
      // so we only need to test this one to get both
      if (path.win32.isAbsolute(p)) {
        const parsed = path.win32.parse(p)
        this.warn('stripping ' + parsed.root + ' from absolute path', p)
        entry.path = p.substr(parsed.root.length)
      }
    }
&nbsp;
    // only encode : chars that aren't drive letter indicators
    if (this.win32) {
      const parsed = path.win32.parse(entry.path)
      entry.path = parsed.root === '' ? wc.encode(entry.path)
        : parsed.root + wc.encode(entry.path.substr(parsed.root.length))
    }
&nbsp;
    if (path.isAbsolute(entry.path))
      entry.absolute = entry.path
    else
      entry.absolute = path.resolve(this.cwd, entry.path)
&nbsp;
    return true
  }
&nbsp;
  [ONENTRY] (entry) {
    if (!this[CHECKPATH](entry))
      return entry.resume()
&nbsp;
    assert.equal(typeof entry.absolute, 'string')
&nbsp;
    switch (entry.type) {
      case 'Directory':
      case 'GNUDumpDir':
        if (entry.mode)
          entry.mode = entry.mode | 0o700
&nbsp;
      case 'File':
      case 'OldFile':
      case 'ContiguousFile':
      case 'Link':
      case 'SymbolicLink':
        return this[CHECKFS](entry)
&nbsp;
      case 'CharacterDevice':
      case 'BlockDevice':
      case 'FIFO':
        return this[UNSUPPORTED](entry)
    }
  }
&nbsp;
  [ONERROR] (er, entry) {
    // Cwd has to exist, or else nothing works. That's serious.
    // Other errors are warnings, which raise the error in strict
    // mode, but otherwise continue on.
    if (er.name === 'CwdError')
      this.emit('error', er)
    else {
      this.warn(er.message, er)
      this[UNPEND]()
      entry.resume()
    }
  }
&nbsp;
  [MKDIR] (dir, mode, cb) {
    mkdir(dir, {
      uid: this.uid,
      gid: this.gid,
      processUid: this.processUid,
      processGid: this.processGid,
      umask: this.processUmask,
      preserve: this.preservePaths,
      unlink: this.unlink,
      cache: this.dirCache,
      cwd: this.cwd,
      mode: mode
    }, cb)
  }
&nbsp;
  [DOCHOWN] (entry) {
    // in preserve owner mode, chown if the entry doesn't match process
    // in set owner mode, chown if setting doesn't match process
    return this.preserveOwner &amp;&amp;
      ( typeof entry.uid === 'number' &amp;&amp; entry.uid !== this.processUid ||
        typeof entry.gid === 'number' &amp;&amp; entry.gid !== this.processGid )
      ||
      ( typeof this.uid === 'number' &amp;&amp; this.uid !== this.processUid ||
        typeof this.gid === 'number' &amp;&amp; this.gid !== this.processGid )
  }
&nbsp;
  [UID] (entry) {
    return uint32(this.uid, entry.uid, this.processUid)
  }
&nbsp;
  [GID] (entry) {
    return uint32(this.gid, entry.gid, this.processGid)
  }
&nbsp;
  [FILE] (entry) {
    const mode = entry.mode &amp; 0o7777 || this.fmode
    const stream = new fsm.WriteStream(entry.absolute, {
      mode: mode,
      autoClose: false
    })
    stream.on('error', er =&gt; this[ONERROR](er, entry))
&nbsp;
    let actions = 1
    const done = er =&gt; {
      if (er) {
        this[ONERROR](er, entry)
        actions = 1
      }
&nbsp;
      if (--actions === 0)
        fs.close(stream.fd, _ =&gt; this[UNPEND]())
    }
&nbsp;
    stream.on('finish', _ =&gt; {
      if (entry.mtime &amp;&amp; !this.noMtime) {
        actions++
        fs.futimes(stream.fd, entry.atime || new Date(), entry.mtime, done)
      }
&nbsp;
      if (this[DOCHOWN](entry)) {
        actions++
        fs.fchown(stream.fd, this[UID](entry), this[GID](entry), done)
      }
&nbsp;
      done()
    })
&nbsp;
    entry.pipe(stream)
  }
&nbsp;
  [DIRECTORY] (entry) {
    const mode = entry.mode &amp; 0o7777 || this.dmode
    this[MKDIR](entry.absolute, mode, er =&gt; {
      if (er)
        return this[ONERROR](er, entry)
&nbsp;
      let actions = 1
      const done = _ =&gt; {
        if (--actions === 0) {
          this[UNPEND]()
          entry.resume()
        }
      }
&nbsp;
      if (entry.mtime &amp;&amp; !this.noMtime) {
        actions++
        fs.utimes(entry.absolute, entry.atime || new Date(), entry.mtime, done)
      }
&nbsp;
      if (this[DOCHOWN](entry)) {
        actions++
        fs.chown(entry.absolute, this[UID](entry), this[GID](entry), done)
      }
&nbsp;
      done()
    })
  }
&nbsp;
  [UNSUPPORTED] (entry) {
    this.warn('unsupported entry type: ' + entry.type, entry)
    entry.resume()
  }
&nbsp;
  [SYMLINK] (entry) {
    this[LINK](entry, entry.linkpath, 'symlink')
  }
&nbsp;
  [HARDLINK] (entry) {
    this[LINK](entry, path.resolve(this.cwd, entry.linkpath), 'link')
  }
&nbsp;
  [PEND] () {
    this[PENDING]++
  }
&nbsp;
  [UNPEND] () {
    this[PENDING]--
    this[MAYBECLOSE]()
  }
&nbsp;
  [SKIP] (entry) {
    this[UNPEND]()
    entry.resume()
  }
&nbsp;
  // check if a thing is there, and if so, try to clobber it
  [CHECKFS] (entry) {
    this[PEND]()
    this[MKDIR](path.dirname(entry.absolute), this.dmode, er =&gt; {
      if (er)
        return this[ONERROR](er, entry)
      fs.lstat(entry.absolute, (er, st) =&gt; {
        if (st &amp;&amp; (this.keep || this.newer &amp;&amp; st.mtime &gt; entry.mtime))
          this[SKIP](entry)
        else if (er || (entry.type === 'File' &amp;&amp; !this.unlink &amp;&amp; st.isFile()))
          this[MAKEFS](null, entry)
        else if (st.isDirectory()) {
          if (entry.type === 'Directory') {
            if (!entry.mode || (st.mode &amp; 0o7777) === entry.mode)
              this[MAKEFS](null, entry)
            else
              fs.chmod(entry.absolute, entry.mode, er =&gt; this[MAKEFS](er, entry))
          } else
            fs.rmdir(entry.absolute, er =&gt; this[MAKEFS](er, entry))
        } else
          fs.unlink(entry.absolute, er =&gt; this[MAKEFS](er, entry))
      })
    })
  }
&nbsp;
  [MAKEFS] (er, entry) {
    if (er)
      return this[ONERROR](er, entry)
&nbsp;
    switch (entry.type) {
      case 'File':
      case 'OldFile':
      case 'ContiguousFile':
        return this[FILE](entry)
&nbsp;
      case 'Link':
        return this[HARDLINK](entry)
&nbsp;
      case 'SymbolicLink':
        return this[SYMLINK](entry)
&nbsp;
      case 'Directory':
      case 'GNUDumpDir':
        return this[DIRECTORY](entry)
    }
  }
&nbsp;
  [LINK] (entry, linkpath, link) {
    // XXX: get the type ('file' or 'dir') for windows
    fs[link](linkpath, entry.absolute, er =&gt; {
      if (er)
        return this[ONERROR](er, entry)
      this[UNPEND]()
      entry.resume()
    })
  }
}
&nbsp;
class UnpackSync extends Unpack {
  constructor (opt) {
    super(opt)
  }
&nbsp;
  [CHECKFS] (entry) {
    const er = this[MKDIR](path.dirname(entry.absolute), this.dmode)
    if (er)
      return this[ONERROR](er, entry)
    try {
      const st = fs.lstatSync(entry.absolute)
      if (this.keep || this.newer &amp;&amp; st.mtime &gt; entry.mtime)
        return this[SKIP](entry)
      else if (entry.type === 'File' &amp;&amp; !this.unlink &amp;&amp; st.isFile())
        return this[MAKEFS](null, entry)
      else {
        try {
          if (st.isDirectory()) {
            if (entry.type === 'Directory') {
              if (entry.mode &amp;&amp; (st.mode &amp; 0o7777) !== entry.mode)
                fs.chmodSync(entry.absolute, entry.mode)
            } else
              fs.rmdirSync(entry.absolute)
          } else
            fs.unlinkSync(entry.absolute)
          return this[MAKEFS](null, entry)
        } catch (er) {
          return this[ONERROR](er, entry)
        }
      }
    } catch (er) {
      return this[MAKEFS](null, entry)
    }
  }
&nbsp;
  [FILE] (entry) {
    const mode = entry.mode &amp; 0o7777 || this.fmode
&nbsp;
    const oner = er =&gt; {
      try { fs.closeSync(fd) } catch (_) {}
      this[ONERROR](er, entry)
    }
&nbsp;
    let stream
    let fd
    try {
      fd = fs.openSync(entry.absolute, 'w', mode)
    } catch (er) {
      return oner(er)
    }
&nbsp;
    entry.on('data', chunk =&gt; {
      try {
        fs.writeSync(fd, chunk, 0, chunk.length)
      } catch (er) {
        oner(er)
      }
    })
&nbsp;
    entry.on('end', _ =&gt; {
      try {
        if (entry.mtime &amp;&amp; !this.noMtime)
          fs.futimesSync(fd, entry.atime || new Date(), entry.mtime)
&nbsp;
        if (this[DOCHOWN](entry))
          fs.fchownSync(fd, this[UID](entry), this[GID](entry))
&nbsp;
        fs.closeSync(fd)
      } catch (er) {
        return oner(er)
      }
    })
&nbsp;
  }
&nbsp;
  [DIRECTORY] (entry) {
    const mode = entry.mode &amp; 0o7777 || this.dmode
    const er = this[MKDIR](entry.absolute, mode)
    if (er)
      return this[ONERROR](er, entry)
    if (entry.mtime &amp;&amp; !this.noMtime) {
      try {
        fs.utimesSync(entry.absolute, entry.atime || new Date(), entry.mtime)
      } catch (er) {}
    }
    if (this[DOCHOWN](entry)) {
      try {
        fs.chownSync(entry.absolute, this[UID](entry), this[GID](entry))
      } catch (er) {}
    }
    entry.resume()
  }
&nbsp;
  [MKDIR] (dir, mode) {
    try {
      return mkdir.sync(dir, {
        uid: this.uid,
        gid: this.gid,
        processUid: this.processUid,
        processGid: this.processGid,
        umask: this.processUmask,
        preserve: this.preservePaths,
        unlink: this.unlink,
        cache: this.dirCache,
        cwd: this.cwd,
        mode: mode
      })
    } catch (er) {
      return er
    }
  }
&nbsp;
  [LINK] (entry, linkpath, link) {
    try {
      fs[link + 'Sync'](linkpath, entry.absolute)
      entry.resume()
    } catch (er) {
      return this[ONERROR](er, entry)
    }
  }
}
&nbsp;
Unpack.Sync = UnpackSync
module.exports = Unpack
&nbsp;</pre></td></tr>
</table></pre>
<div class='push'></div><!-- for sticky footer -->
</div><!-- /wrapper -->
<div class='footer quiet pad2 space-top1 center small'>
  Code coverage
  generated by <a href="https://istanbul.js.org/" target="_blank">istanbul</a> at Mon Nov 20 2017 16:00:38 GMT-0800 (PST)
</div>
</div>
<script src="../../prettify.js"></script>
<script>
window.onload = function () {
        if (typeof prettyPrint === 'function') {
            prettyPrint();
        }
};
</script>
<script src="../../sorter.js"></script>
</body>
</html>
