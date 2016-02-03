import JsFile from 'JsFile';
import createTextDocument from './text/createDocument';
const {errors} = JsFile.Engine;

export default function createDocument () {
    if (this.isTextFile()) {
        return createTextDocument.apply(this, arguments);
    }

    return Promise.reject(errors.invalidFileType);
}