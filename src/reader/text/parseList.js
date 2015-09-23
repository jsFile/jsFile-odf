import JsFile from 'JsFile';
import parseDocumentElement from './parseDocumentElement';
const {Document} = JsFile;

export default function (params) {
    const result = Document.elementPrototype;
    const {node, documentData} = params;
    result.properties.tagName = 'UL';

    if (!node) {
        return result;
    }

    const {attributes} = node;
    const arrProto = Array.prototype;
    const push = arrProto.push;
    const map = arrProto.map;
    const forEach = arrProto.forEach;
    const attrValue = attributes['xml:id'] && attributes['xml:id'].value;
    if (attrValue) {
        result.properties.id = attrValue;
    }

    result.properties.className = attributes['text:style-name'] && attributes['text:style-name'].value || '';
    push.apply(result.children, map.call(node.querySelectorAll('list-item'), (node) => {
        const el = Document.elementPrototype;
        el.properties.tagName = 'LI';

        forEach.call(node.childNodes || [], (node) => {
            const child = parseDocumentElement({
                node,
                documentData
            });

            if (child) {
                el.children.push(child);
            }
        });

        return el;
    }));

    return result;
}