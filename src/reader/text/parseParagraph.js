import JsFile from 'JsFile';
import getSize from './getSize';
const {Document} = JsFile;
const {tabAsSpaces} = JsFile.Engine;

export default function (params) {
    let result = Document.elementPrototype;
    const {node, documentData} = params;
    result.properties.tagName = 'P';

    if (!node) {
        return result;
    }

    result.properties.className = node.attributes['text:style-name'] && node.attributes['text:style-name'].value || '';
    [].forEach.call(node && node.childNodes || [], (node) => {
        let attrValue;
        const {textContent = '', localName, attributes} = node;
        const el = Document.elementPrototype;
        el.properties.tagName = 'SPAN';

        switch (localName) {
            case 'tab':
                el.properties.textContent = tabAsSpaces;
                result.children.push(el);
                break;
            case 'soft-page-break':
                result.properties.pageBreak = true;
                break;
            case 'a':
            case 'span':
                if (localName === 'span') {
                    attrValue = attributes['text:style-name'] && attributes['text:style-name'].value || '';
                    el.properties.className = attrValue;
                } else {
                    el.properties.tagName = 'A';
                    attrValue = attributes['xlink:href'] && attributes['xlink:href'].value;
                    if (attrValue) {
                        el.properties.href = attrValue;
                        if (attrValue[0] !== '#') {
                            el.properties.target = '_blank';
                        }
                    }
                }

                [].forEach.call(node && node.childNodes || [], (child) => {
                    el.properties.textContent += child.textContent || '';
                });

                result.children.push(el);
                break;
            case 'frame':
                let size;

                attrValue = attributes['svg:x'] && attributes['svg:x'].value;
                if (attrValue) {
                    size = getSize(attrValue);

                    if (size.unit) {
                        el.style.left = size;
                        el.style.position = 'absolute';
                    }
                }

                attrValue = attributes['svg:y'] && attributes['svg:y'].value;
                if (attrValue) {
                    size = getSize(attrValue);

                    if (size.unit) {
                        el.style.top = size;
                        el.style.position = 'absolute';
                    }
                }

                attrValue = attributes['svg:width'] && attributes['svg:width'].value;
                if (attrValue) {
                    size = getSize(attrValue);

                    if (size.unit) {
                        el.style.width = size;
                    }
                }

                attrValue = attributes['svg:height'] && attributes['svg:height'].value;
                if (attrValue) {
                    size = getSize(attrValue);

                    if (size.unit) {
                        el.style.width = size;
                    }
                }

                attrValue = attributes['draw:z-index'] && attributes['draw:z-index'].value;
                if (!isNaN(attrValue)) {
                    el.style.zIndex = Number(attrValue);
                }

                attrValue = attributes['draw:style-name'] && attributes['draw:style-name'].value;
                if (attrValue) {
                    el.properties.styleName = attrValue;
                }

                let img = node.querySelector('image');
                if (img) {
                    attrValue = img.attributes['xlink:href'] && img.attributes['xlink:href'].value;
                    if (attrValue && documentData && documentData.media) {
                        el.properties.src = documentData.media[attrValue];
                    }
                }

                result.children.push(el);
                break;
            default:
                el.properties.textContent = textContent;
                result.children.push(el);
        }
    });

    return result;
}
