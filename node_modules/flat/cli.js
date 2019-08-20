#!/usr/bin/env node

const flat = require('.')
const fs = require('fs')
const path = require('path')
const readline = require('readline')

if (process.stdin.isTTY) {
  // Read from file
  const file = path.resolve(process.cwd(), process.argv.slice(2)[0])
  if (!file) usage()
  if (!fs.existsSync(file)) usage()
  out(require(file))
} else {
  // Read from newline-delimited STDIN
  const lines = []
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })
    .on('line', line => lines.push(line))
    .on('close', () => out(JSON.parse(lines.join('\n'))))
}

function out (data) {
  process.stdout.write(JSON.stringify(flat(data), null, 2))
}

function usage () {
  console.log(`
Usage:

flat foo.json
cat foo.json | flat
`)

  process.exit()
}
