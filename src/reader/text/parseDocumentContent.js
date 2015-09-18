import JsFile from 'JsFile';
import parseStylesNode from './parseStylesNode';
import parseParagraph from './parseParagraph';
import parseList from './parseList';
import parseTable from './parseTable';
const {Document, dom: $} = JsFile;
const {errors, merge} = JsFile.Engine;

const parsers = {
    p: parseParagraph,
    list: parseList,
    table: parseTable
};

export default function (params) {
    return new Promise((resolve, reject) => {
        const {xml, documentData = {}, fileName} = params;
        if (!xml) {
            reject(new Error(errors.invalidReadFile.message));
        }

        let result = {
            name: fileName,
            wordsCount: (documentData.documentInfo && documentData.documentInfo.wordsCount) || null,
            pages: []
        };
        const pageLayout = documentData.styles && documentData.styles.automatic &&  documentData.styles.automatic.layouts &&
            documentData.styles.automatic.layouts[documentData.styles.pageLayout];
        const node = xml.querySelector('body text');
        if (node) {
            parseStylesNode(xml.querySelector('automatic-styles')).then(styles => {
                let page = merge(pageLayout && pageLayout.page || {}, Document.elementPrototype);
                $.children(node).forEach(node => {
                    let parser = parsers[node.localName];

                    if (parser) {
                        let el = parser({
                            node,
                            styles,
                            documentData
                        });

                        if (el.properties.pageBreak) {
                            result.pages.push(page);
                            page = merge(pageLayout && pageLayout.page || {}, Document.elementPrototype);
                        }

                        page.children.push(el);
                    }
                });

                result.pages.push(page);
                resolve(new Document(result));
            }, reject);
        } else {
            resolve(new Document(result));
        }
    });
}
