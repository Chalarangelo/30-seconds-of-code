import ClipboardAction from '../src/clipboard-action';
import Emitter from 'tiny-emitter';

describe('ClipboardAction', () => {
    before(() => {
        global.input = document.createElement('input');
        global.input.setAttribute('id', 'input');
        global.input.setAttribute('value', 'abc');
        document.body.appendChild(global.input);

        global.paragraph = document.createElement('p');
        global.paragraph.setAttribute('id', 'paragraph');
        global.paragraph.textContent = 'abc';
        document.body.appendChild(global.paragraph);
    });

    after(() => {
        document.body.innerHTML = '';
    });

    describe('#resolveOptions', () => {
        it('should set base properties', () => {
            let clip = new ClipboardAction({
                emitter: new Emitter(),
                container: document.body,
                text: 'foo'
            });

            assert.property(clip, 'action');
            assert.property(clip, 'container');
            assert.property(clip, 'emitter');
            assert.property(clip, 'target');
            assert.property(clip, 'text');
            assert.property(clip, 'trigger');
            assert.property(clip, 'selectedText');
        });
    });

    describe('#initSelection', () => {
        it('should set the position right style property', done => {
            // Set document direction
            document.documentElement.setAttribute('dir', 'rtl');

            let clip = new ClipboardAction({
                    emitter: new Emitter(),
                    container: document.body,
                    text: 'foo'
                });

            assert.equal(clip.fakeElem.style.right, '-9999px');
            done();
        });
    });

    describe('#set action', () => {
        it('should throw an error since "action" is invalid', done => {
            try {
                new ClipboardAction({
                    text: 'foo',
                    action: 'paste'
                });
            }
            catch(e) {
                assert.equal(e.message, 'Invalid "action" value, use either "copy" or "cut"');
                done();
            }
        });
    });

    describe('#set target', () => {
        it('should throw an error since "target" do not match any element', done => {
            try {
                new ClipboardAction({
                    target: document.querySelector('#foo')
                });
            }
            catch(e) {
                assert.equal(e.message, 'Invalid "target" value, use a valid Element');
                done();
            }
        });
    });

    describe('#selectText', () => {
        it('should create a fake element and select its value', () => {
            let clip = new ClipboardAction({
                emitter: new Emitter(),
                container: document.body,
                text: 'blah'
            });

            assert.equal(clip.selectedText, clip.fakeElem.value);
        });
    });

    describe('#removeFake', () => {
        it('should remove a temporary fake element', () => {
            let clip = new ClipboardAction({
                emitter: new Emitter(),
                container: document.body,
                text: 'blah'
            });

            clip.removeFake();

            assert.equal(clip.fakeElem, null);
        });
    });

    describe('#selectTarget', () => {
        it('should select text from editable element', () => {
            let clip = new ClipboardAction({
                emitter: new Emitter(),
                container: document.body,
                target: document.querySelector('#input')
            });

            assert.equal(clip.selectedText, clip.target.value);
        });

        it('should select text from non-editable element', () => {
            let clip = new ClipboardAction({
                emitter: new Emitter(),
                container: document.body,
                target: document.querySelector('#paragraph')
            });

            assert.equal(clip.selectedText, clip.target.textContent);
        });
    });

    describe('#copyText', () => {
        before(() => {
            global.stub = sinon.stub(document, 'execCommand');
        });

        after(() => {
            global.stub.restore();
        });

        it('should fire a success event on browsers that support copy command', done => {
            global.stub.returns(true);

            let emitter = new Emitter();

            emitter.on('success', () => {
                done();
            });

            let clip = new ClipboardAction({
                emitter,
                target: document.querySelector('#input')
            });
        });

        it('should fire an error event on browsers that support copy command', done => {
            global.stub.returns(false);

            let emitter = new Emitter();

            emitter.on('error', () => {
                done();
            });

            let clip = new ClipboardAction({
                emitter,
                target: document.querySelector('#input')
            });
        });
    });

    describe('#handleResult', () => {
        it('should fire a success event with certain properties', done => {
            let clip = new ClipboardAction({
                emitter: new Emitter(),
                container: document.body,
                target: document.querySelector('#input')
            });

            clip.emitter.on('success', (e) => {
                assert.property(e, 'action');
                assert.property(e, 'text');
                assert.property(e, 'trigger');
                assert.property(e, 'clearSelection');

                done();
            });

            clip.handleResult(true);
        });

        it('should fire a error event with certain properties', done => {
            let clip = new ClipboardAction({
                emitter: new Emitter(),
                container: document.body,
                target: document.querySelector('#input')
            });

            clip.emitter.on('error', (e) => {
                assert.property(e, 'action');
                assert.property(e, 'trigger');
                assert.property(e, 'clearSelection');

                done();
            });

            clip.handleResult(false);
        });
    });

    describe('#clearSelection', () => {
        it('should remove focus from target and text selection', () => {
            let clip = new ClipboardAction({
                emitter: new Emitter(),
                container: document.body,
                target: document.querySelector('#input')
            });

            clip.clearSelection();

            let selectedElem = document.activeElement;
            let selectedText = window.getSelection().toString();

            assert.equal(selectedElem, document.body);
            assert.equal(selectedText, '');
        });
    });

    describe('#destroy', () => {
        it('should destroy an existing fake element', () => {
            let clip = new ClipboardAction({
                emitter: new Emitter(),
                container: document.body,
                text: 'blah'
            });

            clip.selectFake();
            clip.destroy();

            assert.equal(clip.fakeElem, null);
        });
    });
});
