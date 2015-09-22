import JsFile from 'JsFile';
import getSize from './getSize';
const {formatPropertyName, normalizeColorValue} = JsFile.Engine;

/**
 *
 * @param node
 * @return {Object}
 * @private
 */
export default function (node) {
    let result = {
        style: {}
    };

    Array.prototype.forEach.call(node && node.attributes || [], attr => {
        const {value = '', name = ''} = attr;
        const prop = name && formatPropertyName(name);

        if (prop.includes('padding') || prop.includes('margin')) {
            let size = value && getSize(value);

            if (size && size.unit) {
                result.style[prop] = size;
            }
        } else if (prop === 'backgroundColor') {
            result.style[prop] = normalizeColorValue(value);
        } else if (prop === 'writingMode') {
            result.style.direction = (/rl/i).test(value) ? 'rtl' : 'ltr';
        } else if (prop === 'textAlign') {
            let align = (/center|left|right/i).exec(value);

            if (align && align[0]) {
                result.style[prop] = align[0];
            }
        }
    });

    return result;
}