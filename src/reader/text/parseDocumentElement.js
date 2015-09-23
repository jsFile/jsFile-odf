import parseParagraph from './parseParagraph';
import parseList from './parseList';
import parseTable from './parseTable';
import parseTableOfContent from './parseTableOfContent';
import parseHeading from './parseHeading';
const parsers = {
    p: parseParagraph,
    h: parseHeading,
    list: parseList,
    table: parseTable,
    'table-of-content': parseTableOfContent
};

function parseDocumentElement (params) {
    let parser = params.node && parsers[params.node.localName];
    if (!parser) {
        return null;
    }

    params.parseDocumentElement = parseDocumentElement;
    return parser(params);
}

export default parseDocumentElement;