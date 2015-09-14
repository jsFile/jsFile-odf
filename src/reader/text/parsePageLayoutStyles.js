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
            page: {
                style: {},
                properties: {}
            },
            footnote: {
                style: {},
                properties: {}
            },
            footer: {
                style: {},
                properties: {}
            },
            header: {
                style: {},
                properties: {}
            }
        };

    node = node && node.querySelector('page-layout-properties');

    if (node) {
        Array.prototype.forEach.call(node.attributes || [], attr => {
            let size;
            const {value = '', name = ''} = attr;
            const prop = name && formatPropertyName(name);

            if (prop.includes('padding') || prop.includes('margin')) {
                size = value && getSize(value);

                if (size && size.unit) {
                    result.page.style[prop] = size;
                }
            } else if (name === 'writing-mode') {
                result.page.style.direction = (/rl/ig).test(name) ? 'rtl' : 'ltr';
            } else if (name === 'print-orientation') {
                result.page.properties.isLandscapeOrientation = value === 'landscape';
            } else if (name === 'num-format') {
                if (value) {
                    result.page.properties.numberingFormat = value;
                }
            } else if (name === 'footnote-max-height') {
                size = value && getSize(value);
                if (size && size.unit) {
                    result.footnote.style.maxHeight = size;
                }
            } else if (name === 'page-height') {
                size = value && getSize(value);
                if (size && size.unit) {
                    result.page.style.height = size;
                }
            } else if (name === 'page-width') {
                size = value && getSize(value);
                if (size && size.unit) {
                    result.page.style.width = size;
                }
            } else {
                size = value && getSize(value);
                if (size && size.unit) {
                    result.page.properties[prop] = size;
                } else {
                    result.page.properties[prop] = value;
                }
            }
        });

        $.children(node).forEach(node => {
            if (node.localName === 'footnote-sep') {
                let attrValue = node.attributes['style:width'] && node.attributes['style:width'].value;
                let size = attrValue && getSize(attrValue);
                if (size.unit) {
                    result.footnote.style.width = size;
                }

                attrValue = node.attributes['style:distance-before-sep'] &&
                    node.attributes['style:distance-before-sep'].value;
                size = attrValue && getSize(attrValue);
                if (size.unit) {
                    result.footnote.style.marginTop = size;
                }

                attrValue = node.attributes['style:distance-after-sep'] &&
                    node.attributes['style:distance-after-sep'].value;
                size = attrValue && getSize(attrValue);
                if (size.unit) {
                    result.footnote.style.marginBottom = size;
                }

                attrValue = node.attributes['style:adjustment'] && node.attributes['style:adjustment'].value;
                if (attrValue) {
                    result.footnote.style.float = 'none';

                    if (attrValue === 'left') {
                        result.footnote.style.float = 'left';
                    } else if (attrValue === 'right') {
                        result.footnote.style.float = 'right';
                    }
                }

                attrValue = node.attributes['style:color'] && node.attributes['style:color'].value;
                if (attrValue) {
                    result.footnote.style.color = normalizeColorValue(attrValue);
                }
            }
        });
    }

    return result;
};