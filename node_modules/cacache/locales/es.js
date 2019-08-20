'use strict'

const ls = require('../ls.js')
const get = require('../get.js')
const put = require('../put.js')
const rm = require('../rm.js')
const verify = require('../verify.js')
const setLocale = require('../lib/util/y.js').setLocale
const clearMemoized = require('../lib/memoization.js').clearMemoized
const tmp = require('../lib/util/tmp.js')

setLocale('es')

const x = module.exports

x.ls = cache => ls(cache)
x.ls.flujo = cache => ls.stream(cache)

x.saca = (cache, clave, ops) => get(cache, clave, ops)
x.saca.porHacheo = (cache, hacheo, ops) => get.byDigest(cache, hacheo, ops)
x.saca.sinc = (cache, clave, ops) => get.sync(cache, clave, ops)
x.saca.sinc.porHacheo = (cache, hacheo, ops) => get.sync.byDigest(cache, hacheo, ops)
x.saca.flujo = (cache, clave, ops) => get.stream(cache, clave, ops)
x.saca.flujo.porHacheo = (cache, hacheo, ops) => get.stream.byDigest(cache, hacheo, ops)
x.sava.copia = (cache, clave, destino, opts) => get.copy(cache, clave, destino, opts)
x.sava.copia.porHacheo = (cache, hacheo, destino, opts) => get.copy.byDigest(cache, hacheo, destino, opts)
x.saca.info = (cache, clave) => get.info(cache, clave)
x.saca.tieneDatos = (cache, hacheo) => get.hasContent(cache, hacheo)
x.saca.tieneDatos.sinc = (cache, hacheo) => get.hasContent.sync(cache, hacheo)

x.mete = (cache, clave, datos, ops) => put(cache, clave, datos, ops)
x.mete.flujo = (cache, clave, ops) => put.stream(cache, clave, ops)

x.rm = (cache, clave) => rm.entry(cache, clave)
x.rm.todo = cache => rm.all(cache)
x.rm.entrada = x.rm
x.rm.datos = (cache, hacheo) => rm.content(cache, hacheo)

x.ponLenguaje = lang => setLocale(lang)
x.limpiaMemoizado = () => clearMemoized()

x.tmp = {}
x.tmp.mkdir = (cache, ops) => tmp.mkdir(cache, ops)
x.tmp.hazdir = x.tmp.mkdir
x.tmp.conTmp = (cache, ops, cb) => tmp.withTmp(cache, ops, cb)

x.verifica = (cache, ops) => verify(cache, ops)
x.verifica.ultimaVez = cache => verify.lastRun(cache)
x.verifica.últimaVez = x.verifica.ultimaVez
