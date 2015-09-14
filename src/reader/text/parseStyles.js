import {dom as $} from 'JsFile';
import parsePageLayoutStyles from './parsePageLayoutStyles';
import parseStylesNode from './parseStylesNode';

/**
 *
 * @param xml
 * @returns {*}
 * @private
 */
export default xml => new Promise((resolve, reject) => {
    let result = {
        automatic: {
            layouts: {}
        },
        pageLayout: '',
        defaults: {}
    };
    let firstPageLayout = '';

    $.children(xml.querySelector('master-styles')).forEach(({localName, attributes}) => {
        if (localName === 'master-page') {
            const attrValue = attributes['style:page-layout-name'] && attributes['style:page-layout-name'].value;
            if (attrValue) {
                result.pageLayout = attrValue;
            }
        }
    });

    $.children(xml.querySelector('automatic-styles')).forEach(({localName, attributes}) => {
        if (localName === 'page-layout') {
            const attrValue = attributes['style:name'] && attributes['style:name'].value;
            if (attrValue) {
                result.automatic.layouts[attrValue] = parsePageLayoutStyles(node);

                if (!firstPageLayout) {
                    firstPageLayout = attrValue;
                }
            }
        }
    });

    if (!result.automatic.layouts[result.pageLayout] && firstPageLayout) {
        result.pageLayout = firstPageLayout;
    }

    parseStylesNode(xml.querySelector('styles')).then(styles => {
        result.defaults = styles;
        resolve(result);
    }, reject);
});