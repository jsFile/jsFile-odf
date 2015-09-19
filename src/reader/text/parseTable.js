import JsFile from 'JsFile';
import getStyleRules from './getStyleRules';
import parseParagraph from './parseParagraph';
const {Document} = JsFile;
const {merge} = JsFile.Engine;

export default function (params) {
    const {node, styles, documentData} = params;
    const thead = Document.elementPrototype;
    const tbody = Document.elementPrototype;
    const result = Document.elementPrototype;
    let attrValue = node.attributes['table:name'] && node.attributes['table:name'].value;
    if (attrValue) {
        result.properties.name = attrValue;
    }

    result.properties.tagName = 'TABLE';
    thead.properties.tagName = 'THEAD';
    tbody.properties.tagName = 'TBODY';
    attrValue = node.attributes['table:style-name'] && node.attributes['table:style-name'].value;
    if (attrValue) {
        merge(result, getStyleRules({
            documentData,
            styles,
            styleName: attrValue,
            children: ['table']
        }).table);
    }

    [].forEach.call(node && node.childNodes || [], (node) => {
        const localName = node.localName;

        if (localName === 'table-row') {
            tbody.children.push(parseTableRow({
                node,
                documentData,
                styles
            }));
        } else if (localName === 'table-header-rows') {
            let arrProto = Array.prototype;
            arrProto.push.apply(thead.children, arrProto.map.call(node.querySelectorAll('table-row'), (node) => {
                return parseTableRow({
                    head: true,
                    node,
                    documentData,
                    styles
                });
            }));
        }
    });

    result.children.push(thead, tbody);
    return result;
}

function parseTableRow (params) {
    let arrProto = Array.prototype;
    const push = arrProto.push;
    const map = arrProto.map;
    let result = Document.elementPrototype;
    const {node, styles, documentData, head} = params;

    result.properties.tagName = 'TR';

    push.apply(result.children, map.call(node.querySelectorAll('table-cell'), (node) => {
        let el = Document.elementPrototype;
        const attrValue = node.attributes['table:style-name'] && node.attributes['table:style-name'].value;

        if (attrValue) {
            const styleRules = getStyleRules({
                documentData,
                styles,
                styleName: attrValue,
                children: ['tableCell']
            });
            merge(el, styles, styleRules.tableCell);
        }

        el.properties.tagName = head ? 'TH' : 'TD';
        push.apply(el.children, map.call(node.querySelectorAll('p'), (node) => {
            return parseParagraph({
                node,
                styles,
                documentData
            });
        }));
    }));

    return result;
}
