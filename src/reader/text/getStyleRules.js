import JsFile from 'JsFile';
const {clone, merge} = JsFile.Engine;

export default function (params) {
    const result = {};
    const {children = [], documentData = {}, styleName, styles = {}} = params;

    children.forEach(dest => {
        result[dest] = {
            style: {}
        };

        if (documentData.styles && documentData.styles.defaults) {
            if (documentData.styles.defaults[dest]) {
                result[dest].style = clone(documentData.styles.defaults[dest].style);
            }

            if (
                documentData.styles.defaults.named && documentData.styles.defaults.named[styleName] &&
                documentData.styles.defaults.named[styleName][dest]
            ) {
                merge(result[dest].style, documentData.styles.defaults.named[styleName][dest].style);
            }
        }

        if (styles && styles[dest]) {
            merge(result[dest].style, styles[dest].style);
        }

        if (styles && styles.named && styles.named[styleName] && styles.named[styleName][dest]) {
            merge(result[dest].style, styles.named[styleName][dest].style);
        }
    });

    return result;
}