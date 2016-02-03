import JsFile from 'JsFile';
import getSize from './getSize';
import parseBorderStyle from './parseBorderStyle';
const {merge, formatPropertyName} = JsFile.Engine;

/**
 *
 * @param node
 * @return {Object}
 * @private
 */
export default function parseTableCellProperties (node) {
    let result = {
        style: {}
    };

    Array.prototype.forEach.call(node && node.attributes || [], attr => {
        const {value = '', name = ''} = attr;
        const prop = name && formatPropertyName(name);

        if (prop.includes('border')) {
            merge(result.style, parseBorderStyle(prop, value));
        } else if (prop === 'padding') {
            const size = value && getSize(value);
            if (size && size.unit) {
                result.style[prop] = size;
            }
        }
    });

    return result;
}