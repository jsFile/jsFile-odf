import JsFile from 'JsFile';
import parseListStyles from './parseListStyles';
import parseTableStyles from './parseTableStyles';
import parseTableColumnStyles from './parseTableColumnStyles';
import parseTableCellStyles from './parseTableCellStyles';
import parseParagraphStyles from './parseParagraphStyles';
import parseTextStyles from './parseTextStyles';
const {dom: $} = JsFile;
const {merge} = JsFile.Engine;

const defaultStyleNodeName = 'default-style';

function readNodes (i, length, nodes, result, resolve, reject) {
    let size = i + 100;

    if (size > length) {
        size = length;
    }

    for (; i < size; i++) {
        let attrValue;
        const {localName, attributes} = nodes[i];

        if (localName === 'style' || localName === defaultStyleNodeName) {
            let namedStyle;
            attrValue = attributes['style:name'] && attributes['style:name'].value;

            if (localName !== defaultStyleNodeName && attrValue) {
                namedStyle = result.named[attrValue] = result.named[attrValue] || {};
            }

            attrValue = attributes['style:family'] && attributes['style:family'].value;
            switch (attrValue) {
                case 'table':
                    (namedStyle || result).table = parseTableStyles(node);
                    break;
                case 'table-column':
                    (namedStyle || result).tableColumn = parseTableColumnStyles(node);
                    break;
                case 'table-cell':
                    (namedStyle || result).tableCell = parseTableCellStyles(node);
                    break;
                case 'paragraph':
                    (namedStyle || result).paragraph = parseParagraphStyles(node);
                    break;
                case 'text':
                    (namedStyle || result).text = parseTextStyles(node);
                    break;
            }
        } else {
            attrValue = attributes['style:name'] && attributes['style:name'].value;
            if (localName === 'list-style' && attrValue) {
                result.named[attrValue] = merge(result.named[attrValue] || {}, parseListStyles(node));
            }
        }
    }

    if (i === length) {
        resolve(result);
        return;
    }

    setTimeout(() => readNodes(i, length, nodes, result, resolve, reject));
}

export default function (node) {
    return new Promise((resolve, reject) => {
        const nodes = $.children(node);

        readNodes(0, nodes.length, nodes, {
            named: {}
        }, resolve, reject);
    });
}