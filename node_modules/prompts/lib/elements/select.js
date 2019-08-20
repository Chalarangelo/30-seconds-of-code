'use strict';

const color = require('kleur');
const Prompt = require('./prompt');
const { style, clear, figures, wrap } = require('../util');
const { cursor } = require('sisteransi');

/**
 * SelectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {Number} [opts.initial] Index of default value
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class SelectPrompt extends Prompt {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.hint = opts.hint || '- Use arrow-keys. Return to submit.';
    this.warn = opts.warn || '- This option is disabled';
    this.cursor = opts.initial || 0;
    this.choices = opts.choices.map((ch, idx) => {
      if (typeof ch === 'string')
        ch = {title: ch, value: idx};
      return {
        title: ch && (ch.title || ch.value || ch),
        value: ch && (ch.value || idx),
        description: ch && ch.description,
        selected: ch && ch.selected,
        disabled: ch && ch.disabled
      };
    });
    this.value = (this.choices[this.cursor] || {}).value;
    this.clear = clear('');
    this.render();
  }

  moveCursor(n) {
    this.cursor = n;
    this.value = this.choices[n].value;
    this.fire();
  }

  reset() {
    this.moveCursor(0);
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    if (!this.selection.disabled) {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    } else
      this.bell();
  }

  first() {
    this.moveCursor(0);
    this.render();
  }

  last() {
    this.moveCursor(this.choices.length - 1);
    this.render();
  }

  up() {
    if (this.cursor === 0) return this.bell();
    this.moveCursor(this.cursor - 1);
    this.render();
  }

  down() {
    if (this.cursor === this.choices.length - 1) return this.bell();
    this.moveCursor(this.cursor + 1);
    this.render();
  }

  next() {
    this.moveCursor((this.cursor + 1) % this.choices.length);
    this.render();
  }

  _(c, key) {
    if (c === ' ') return this.submit();
  }

  get selection() {
    return this.choices[this.cursor];
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    else this.out.write(clear(this.outputText));
    super.render();

    // Print prompt
    this.outputText = [
      style.symbol(this.done, this.aborted),
      color.bold(this.msg),
      style.delimiter(false),
      this.done ? this.selection.title : this.selection.disabled
          ? color.yellow(this.warn) : color.gray(this.hint)
    ].join(' ');

    // Print choices
    if (!this.done) {
      this.outputText += '\n' +
          this.choices
            .map((v, i) => {
              let title, prefix, desc = '';
              if (v.disabled) {
                title = this.cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
                prefix = this.cursor === i ? color.bold().gray(figures.pointer) + ' ' : '  ';
              } else {
                title = this.cursor === i ? color.cyan().underline(v.title) : v.title;
                prefix = this.cursor === i ? color.cyan(figures.pointer) + ' ' : '  ';
                if (v.description && this.cursor === i) {
                  desc = ` - ${v.description}`;
                  if (prefix.length + title.length + desc.length >= this.out.columns
                      || v.description.split(/\r?\n/).length > 1) {
                    desc = '\n' + wrap(v.description, { margin: 3, width: this.out.columns });
                  }
                }
              }
              return `${prefix} ${title}${color.gray(desc)}`;
            })
            .join('\n');
    }

    this.out.write(this.outputText);
  }
}

module.exports = SelectPrompt;
