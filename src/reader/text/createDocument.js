import JsFile from 'JsFile';
import parseMetaInformation from './parseMetaInformation';
import parseStyles from './parseStyles';
import parseDocumentContent from './parseDocumentContent';

const {Document} = JsFile;
const {normalizeDataUri} = JsFile.Engine;

/**
 *
 * @param filesEntry {Array}
 * @private
 */
export default function createDocument (filesEntry) {
    const domParser = new DOMParser();
    const queue = [];
    let document;
    let documentData = {
        documentInfo: {},
        appInfo: {},
        styles: {},
        media: {}
    };

    filesEntry.forEach(fileEntry => {
        let method;
        const filename = fileEntry.entry.filename;
        let isMediaSource;

        if (!fileEntry.file) {
            return;
        }

        isMediaSource = Boolean(filename && filename.includes('Pictures/'));
        if (isMediaSource) {
            method = 'readAsDataURL';
        }

        const promise = this.readFileEntry({
            file: fileEntry.file,
            method
        }).then((result) => {
            let xml;

            if (isMediaSource) {
                documentData.media[filename] = normalizeDataUri(result, filename);
            } else {
                xml = domParser.parseFromString(result, 'application/xml');

                if (filename.includes('styles.')) {
                    return parseStyles(xml).then((styles) => documentData.styles = styles);
                }

                if (filename.includes('meta.')) {
                    let info = parseMetaInformation(xml);
                    documentData.documentInfo = info.documentInfo;
                    documentData.appInfo = info.appInfo;
                } else if (filename.includes('content.')) {
                    document = xml;
                }
            }
        });

        queue.push(promise);
    }, this);

    return Promise.all(queue).then(() => {
        const promise = parseDocumentContent({
            xml: document,
            documentData: documentData,
            fileName: this.fileName
        }).then((result) => new Document(result));

        documentData = null;
        document = null;

        return promise;
    });
}