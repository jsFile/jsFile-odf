import JsFile from 'JsFile';
import parseParagraph from './parseParagraph';
const {Document} = JsFile;
const {merge} = JsFile.Engine;

export default function (params) {
    let result = Document.elementPrototype;
    let {node, styles, documentData} = params;

    result.properties.tagName = 'UL';

    if (!node) {
        return result;
    }

    const arrProto = Array.prototype;
    let push = arrProto.push;
    let map = arrProto.map;
    const attrValue = node.attributes['xml:id'] && node.attributes['xml:id'].value;
    if (attrValue) {
        result.properties.id = attrValue;
    }

    result.properties.className = node.attributes['text:style-name'] && node.attributes['text:style-name'].value || '';
    push.apply(result.children, map.call(node.querySelectorAll('list-item'), node => {
        let el = Document.elementPrototype;
        el.properties.tagName = 'LI';

        push.apply(el.children, map.call(node.querySelectorAll('p'), node => {
            return parseParagraph({
                node,
                styles,
                documentData
            });
        }));

        return el;
    }));

    return result;
}