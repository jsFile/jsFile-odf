import OdfEngine from './../../src/index';

describe('jsFile-odf', () => {
    describe('Library imports', () => {
        it('should import JS module', () => {
            assert.isFunction(OdfEngine);
        });

        it('should exist in global scope', () => {
            assert.isFunction(window.JsFileOdf.default);
        });
    });
});