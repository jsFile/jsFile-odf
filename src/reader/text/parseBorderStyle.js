import JsFile from 'JsFile';
import getSize from './getSize';
const {normalizeColorValue} = JsFile.Engine;

/**
 *
 * @param prop {String}
 * @param value {String}
 * @return {Object}
 * @private
 */
export default function parseBorderStyle (prop, value) {
    const result = {};

    if (prop.includes('borderLine')) {
        return result;
    }

    if (value && value !== 'none') {
        const borderData = value.split(' ');
        const size = borderData[0] && getSize(borderData[0]);

        if (borderData.length !== 3 || !size.unit) {
            return result;
        }

        const [sizeData, style, color] = value.split(' ');

        if (sizeData && style && color) {
            /**
             * @description minimal visible size for borders in inches
             * @type {number}
             */
            const minimalVisibleSize = 0.02;

            /**
             * Browser can't render too thin borders, as 0.0008in.
             * So, here is the normalization of border width if it's not a 0.
             */
            if (size.value && size.value < minimalVisibleSize) {
                size.value = minimalVisibleSize;
            }

            result[`${prop}Width`] = size;
            result[`${prop}Style`] = borderData[1];
            result[`${prop}Color`] = normalizeColorValue(borderData[2]);
        }
    }

    return result;
}