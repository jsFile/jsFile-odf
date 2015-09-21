import parsePageLayoutStyles from './parsePageLayoutStyles';
import parseStylesNode from './parseStylesNode';

const tags = {
    paragraph: 'p'
};

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
    let node = xml.querySelector('master-styles');
    [].forEach.call(node && node.childNodes || [], ({localName, attributes}) => {
        if (localName === 'master-page') {
            const attrValue = attributes['style:page-layout-name'] && attributes['style:page-layout-name'].value;
            if (attrValue) {
                result.pageLayout = attrValue;
            }
        }
    });

    node = xml.querySelector('automatic-styles');
    [].forEach.call(node && node.childNodes || [], ({localName, attributes}) => {
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
        result.computed = [];
        for (let k in styles) {
            if (styles.hasOwnProperty(k)) {
                const item = styles[k];
                if (k === 'named') {
                    for (let i in item) {
                        if (item.hasOwnProperty(i)) {
                            result.computed.push({
                                selector: `.${i}`,
                                rules: item[i].style
                            });
                        }
                    }
                } else {
                    result.computed.push({
                        selector: tags[k] || k,
                        rules: item.style
                    });
                }
            }
        }

        resolve(result);
    }, reject);
});