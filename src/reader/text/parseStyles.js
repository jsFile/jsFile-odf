import parsePageLayoutStyles from './parsePageLayoutStyles';
import parseStylesNode from './parseStylesNode';

/**
 *
 * @param xml
 * @returns {Promise}
 * @private
 */
export default function parseStyles (xml) {
    let pageLayoutName;
    const layouts = {};
    let firstPageLayout = '';
    let node = xml.querySelector('master-styles master-page');
    if (node) {
        const attrValue = node.attributes['style:page-layout-name'] && node.attributes['style:page-layout-name'].value;
        if (attrValue) {
            pageLayoutName = attrValue;
        }
    }

    [].forEach.call(xml.querySelectorAll('automatic-styles page-layout'), (node) => {
        const attrValue = node.attributes['style:name'] && node.attributes['style:name'].value;
        if (attrValue) {
            layouts[attrValue] = parsePageLayoutStyles(node);

            if (!firstPageLayout) {
                firstPageLayout = attrValue;
            }
        }
    });

    const pageLayout = layouts[pageLayoutName] || layouts[firstPageLayout];

    return parseStylesNode(xml.querySelector('styles')).then((result) => {
        result.pageLayout = pageLayout;
        return result;
    });
}