import JsFile from 'JsFile';
import getSize from './getSize';
import parseBorderStyle from './parseBorderStyle';
const {merge, formatPropertyName, normalizeColorValue} = JsFile.Engine;

/**
 *
 * @param node
 * @return {Object}
 * @private
 */
export default function parseParagraphProperties (node) {
    const result = {
        style: {}
    };

    Array.prototype.forEach.call(node && node.attributes || [], attr => {
        const {value = '', name = ''} = attr;
        const prop = name && formatPropertyName(name);
        let size;

        if (prop.includes('padding') || prop.includes('margin')) {
            size = value && getSize(value);

            if (size.unit) {
                result.style[prop] = size;
            }
        } else if (prop === 'backgroundColor') {
            result.style[prop] = normalizeColorValue(value);
        } else if (prop.includes('border')) {
            merge(result.style, parseBorderStyle(prop, value));
        } else if (prop === 'writingMode') {
            result.style.direction = (/rl/i).test(value) ? 'rtl' : 'ltr';
        } else if (prop === 'textAlign') {
            const align = (/center|left|right/i).exec(value);

            if (align && align[0]) {
                result.style[prop] = align[0];
            }
        }
    });

    return result;
}