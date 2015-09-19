import JsFile from 'JsFile';
import getStyleRules from './getStyleRules';
import getSize from './getSize';
const {Document} = JsFile;
const {tabAsSpaces, merge} = JsFile.Engine;

export default function (params) {
    let result = Document.elementPrototype;
    const {node, styles, documentData} = params;

    if (!node) {
        return result;
    }

    const children = node && node.childNodes || [];
    let styleRules;
    let attrValue = node.attributes['text:style-name'] && node.attributes['text:style-name'].value;
    if (attrValue) {
        styleRules  = getStyleRules({
            documentData,
            styles,
            styleName: attrValue,
            children: ['paragraph', 'text']
        });

        merge(result, styleRules.paragraph);
    }

    [].forEach.call(children, (node) => {
        let attrValue;
        const el = merge(Document.elementPrototype, styleRules && styleRules.text);

        switch (node.localName) {
            case 'tab':
                el.properties.textContent = tabAsSpaces;
                result.children.push(el);
                break;
            case 'soft-page-break':
                result.properties.pageBreak = true;
                break;
            case 'span':
                attrValue = node.attributes['text:style-name'] && params.node.attributes['text:style-name'].value;
                if (attrValue) {
                    merge(result, getStyleRules({
                        documentData,
                        styles,
                        styleName: attrValue,
                        children: ['text']
                    }).text);
                }

                [].forEach.call(node && node.childNodes || [], (node) => {
                    el.properties.textContent += node.textContent || '';
                });

                result.children.push(el);
                break;
            case 'frame':
                let size;

                attrValue = node.attributes['svg:x'] && node.attributes['svg:x'].value;
                if (attrValue) {
                    size = getSize(attrValue);

                    if (size.unit) {
                        el.style.left = size;
                        el.style.position = 'absolute';
                    }
                }

                attrValue = node.attributes['svg:y'] && node.attributes['svg:y'].value;
                if (attrValue) {
                    size = getSize(attrValue);

                    if (size.unit) {
                        el.style.top = size;
                        el.style.position = 'absolute';
                    }
                }

                attrValue = node.attributes['svg:width'] && node.attributes['svg:width'].value;
                if (attrValue) {
                    size = getSize(attrValue);

                    if (size.unit) {
                        el.style.width = size;
                    }
                }

                attrValue = node.attributes['svg:height'] && node.attributes['svg:height'].value;
                if (attrValue) {
                    size = getSize(attrValue);

                    if (size.unit) {
                        el.style.width = size;
                    }
                }

                attrValue = node.attributes['draw:z-index'] && node.attributes['draw:z-index'].value;
                if (!isNaN(attrValue)) {
                    el.style.zIndex = Number(attrValue);
                }

                attrValue = node.attributes['draw:style-name'] && node.attributes['draw:style-name'].value;
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
                el.properties.textContent = node.textContent;
                result.children.push(el);
        }
    });

    if (!children[0] && node.textContent) {
        let el = Document.elementPrototype;
        el.properties.tagName = 'SPAN';
        el.properties.textContent = node.textContent;
        result.children.push(el);
    }

    return result;
}
