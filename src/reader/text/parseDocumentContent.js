import JsFile from 'JsFile';
import parseStylesNode from './parseStylesNode';
import parseParagraph from './parseParagraph';
import parseList from './parseList';
import parseTable from './parseTable';
const {Document} = JsFile;
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
            content: [],
            styles: documentData.styles.computed
        };
        const pageLayout = documentData.styles && documentData.styles.automatic &&  documentData.styles.automatic.layouts &&
            documentData.styles.automatic.layouts[documentData.styles.pageLayout];
        const node = xml.querySelector('body text');
        if (node) {
            parseStylesNode(xml.querySelector('automatic-styles')).then(styles => {
                let page = merge(pageLayout && pageLayout.page || {}, Document.elementPrototype);
                [].forEach.call(node && node.childNodes || [], (node) => {
                    let parser = parsers[node.localName];

                    if (parser) {
                        let el = parser({
                            node,
                            styles,
                            documentData
                        });

                        if (el.properties.pageBreak) {
                            result.content.push(page);
                            page = merge(pageLayout && pageLayout.page || {}, Document.elementPrototype);
                        }

                        page.children.push(el);
                    }
                });

                result.content.push(page);
                resolve(result);
            }, reject);
        } else {
            resolve(result);
        }
    });
}
