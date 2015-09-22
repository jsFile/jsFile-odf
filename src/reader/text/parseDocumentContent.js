import JsFile from 'JsFile';
import parseParagraph from './parseParagraph';
import parseList from './parseList';
import parseTable from './parseTable';
const {Document} = JsFile;
const {errors: {invalidReadFile}} = JsFile.Engine;

const parsers = {
    p: parseParagraph,
    list: parseList,
    table: parseTable
};

export default function (params) {
    return new Promise((resolve, reject) => {
        const {xml, documentData, fileName} = params;
        if (!xml || !documentData) {
            reject(new Error(invalidReadFile));
        }

        let result = {
            name: fileName,
            wordsCount: (documentData.documentInfo && documentData.documentInfo.wordsCount) || null,
            content: [],
            styles: documentData.styles.computed
        };
        const node = xml.querySelector('body text');
        if (node) {
            let page = Document.elementPrototype;
            [].forEach.call(node && node.childNodes || [], (node) => {
                let parser = parsers[node.localName];
                if (parser) {
                    let el = parser({
                        node,
                        documentData
                    });

                    if (el.properties.pageBreak) {
                        result.content.push(page);
                        page = Document.elementPrototype;
                    }

                    page.children.push(el);
                }
            });

            result.content.push(page);
        }

        resolve(result);
    });
}
