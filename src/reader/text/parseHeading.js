import JsFile from 'JsFile';
const {Document} = JsFile;

export default function (params) {
    let result = Document.elementPrototype;
    const {node} = params;
    result.properties.tagName = 'SPAN';

    if (!node) {
        return result;
    }

    const {attributes = {}, textContent = ''} = node;
    let attrValue = attributes['text:style-name'] && attributes['text:style-name'].value;
    if (attrValue) {
        result.properties.className = attrValue;
    }

    attrValue = attributes['text:outline-level'] && attributes['text:outline-level'].value;
    if (attrValue) {
        result.properties.outlineLevel = attrValue;
    }

    result.properties.textContent = textContent;

    return result;
}