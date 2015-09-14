(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("JsFile"));
	else if(typeof define === 'function' && define.amd)
		define(["JsFile"], factory);
	else if(typeof exports === 'object')
		exports["JsFileOdf"] = factory(require("JsFile"));
	else
		root["JsFileOdf"] = factory(root["JsFile"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _JsFile = __webpack_require__(1);

	var _readerCreateDocument = __webpack_require__(2);

	var _readerCreateDocument2 = _interopRequireDefault(_readerCreateDocument);

	var validateFile = _JsFile.Engine.validateFile;

	var fileTypes = {
	    textFiles: {
	        extension: ['odt'],
	        mime: ['application/vnd.oasis.opendocument.text']
	    },
	    textTemplateFiles: {
	        extension: ['ott'],
	        mime: ['application/vnd.oasis.opendocument.text-template']
	    },
	    graphicsFiles: {
	        extension: ['odg'],
	        mime: ['application/vnd.oasis.opendocument.graphics']
	    },
	    graphicsTemplateFiles: {
	        extension: ['otg'],
	        mime: ['application/vnd.oasis.opendocument.graphics-template']
	    },
	    presentationFiles: {
	        extension: ['odp'],
	        mime: ['application/vnd.oasis.opendocument.presentation']
	    },
	    presentationTemplateFiles: {
	        extension: ['otp'],
	        mime: ['application/vnd.oasis.opendocument.presentation-template']
	    },
	    spreadSheetFiles: {
	        extension: ['ods'],
	        mime: ['application/vnd.oasis.opendocument.spreadsheet']
	    },
	    spreadSheetTemplateFiles: {
	        extension: ['ots'],
	        mime: ['application/vnd.oasis.opendocument.spreadsheet-template']
	    },
	    chartFiles: {
	        extension: ['odc'],
	        mime: ['application/vnd.oasis.opendocument.chart']
	    },
	    chartTemplateFiles: {
	        extension: ['otc'],
	        mime: ['application/vnd.oasis.opendocument.chart-template']
	    },
	    imageFiles: {
	        extension: ['odi'],
	        mime: ['application/vnd.oasis.opendocument.image']
	    },
	    imageTemplateFiles: {
	        extension: ['oti'],
	        mime: ['application/vnd.oasis.opendocument.image-template']
	    },
	    formulaFiles: {
	        extension: ['odf'],
	        mime: ['application/vnd.oasis.opendocument.formula']
	    },
	    formulaTemplateFiles: {
	        extension: ['otf'],
	        mime: ['application/vnd.oasis.opendocument.formula-template']
	    },
	    textMasterFiles: {
	        extension: ['odm'],
	        mime: ['application/vnd.oasis.opendocument.text-master']
	    },
	    textWebFiles: {
	        extension: ['oth'],
	        mime: ['application/vnd.oasis.opendocument.text-web']
	    }
	};

	/**
	 * @description Supported files by engine
	 * @type {{extension: Array, mime: Array}}
	 */
	var files = {
	    extension: [],
	    mime: []
	};

	for (var k in fileTypes) {
	    if (fileTypes.hasOwnProperty(k)) {
	        files.extension.push.apply(files.extension, fileTypes[k].extension);
	        files.mime.push.apply(files.mime, fileTypes[k].mime);
	    }
	}

	var OdfEngine = (function (_Engine) {
	    _inherits(OdfEngine, _Engine);

	    function OdfEngine() {
	        _classCallCheck(this, OdfEngine);

	        _get(Object.getPrototypeOf(OdfEngine.prototype), 'constructor', this).apply(this, arguments);

	        this.createDocument = _readerCreateDocument2['default'];
	        this.parser = 'readArchive';
	        this.files = files;
	    }

	    _createClass(OdfEngine, [{
	        key: 'isTextFile',
	        value: function isTextFile() {
	            return Boolean(this.file && validateFile(this.file, fileTypes.textFiles));
	        }
	    }], [{
	        key: 'test',
	        value: function test(file) {
	            return Boolean(file && validateFile(file, files));
	        }
	    }, {
	        key: 'mimeTypes',
	        value: files.mime.slice(0),
	        enumerable: true
	    }]);

	    return OdfEngine;
	})(_JsFile.Engine);

	(0, _JsFile.defineEngine)(OdfEngine);

	exports['default'] = OdfEngine;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _textCreateDocument = __webpack_require__(3);

	var _textCreateDocument2 = _interopRequireDefault(_textCreateDocument);

	var Document = _JsFile2['default'].Document;
	var errors = _JsFile2['default'].Engine.errors;

	exports['default'] = function (data) {
	    if (this.isTextFile()) {
	        return _textCreateDocument2['default'].apply(this, arguments);
	    }

	    return Promise.reject(errors.invalidFileType);
	};

	;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _parseMetaInformation = __webpack_require__(4);

	var _parseMetaInformation2 = _interopRequireDefault(_parseMetaInformation);

	var _parseStyles = __webpack_require__(5);

	var _parseStyles2 = _interopRequireDefault(_parseStyles);

	var _parseDocumentContent = __webpack_require__(16);

	var _parseDocumentContent2 = _interopRequireDefault(_parseDocumentContent);

	var normalizeDataUri = _JsFile2['default'].Engine.normalizeDataUri;

	/**
	 *
	 * @param filesEntry {Array}
	 * @private
	 */

	exports['default'] = function (filesEntry) {
	    return new Promise((function (resolve, reject) {
	        var _this = this;

	        var domParser = new DOMParser();
	        var queue = [];
	        var document = undefined;
	        var documentData = {
	            documentInfo: {},
	            appInfo: {},
	            styles: {},
	            media: {}
	        };

	        filesEntry.forEach(function (fileEntry) {
	            var method = undefined;
	            var filename = fileEntry.entry.filename;
	            var isMediaSource = undefined;

	            if (!fileEntry.file) {
	                return;
	            }

	            isMediaSource = Boolean(filename && filename.includes('Pictures/'));
	            if (isMediaSource) {
	                method = 'readAsDataURL';
	            }

	            queue.push(new Promise((function (resolve, reject) {
	                this.readFileEntry({
	                    file: fileEntry.file,
	                    method: method
	                }).then(function (result) {
	                    var xml = undefined;

	                    if (isMediaSource) {
	                        documentData.media[filename] = normalizeDataUri(result, filename);
	                        resolve();
	                    } else {
	                        xml = domParser.parseFromString(result, 'application/xml');

	                        if (filename.includes('styles.')) {
	                            (0, _parseStyles2['default'])(xml).then(function (styles) {
	                                return documentData.styles = styles;
	                            }, reject);
	                        } else if (filename.includes('meta.')) {
	                            var info = (0, _parseMetaInformation2['default'])(xml);
	                            documentData.documentInfo = info.documentInfo;
	                            documentData.appInfo = info.appInfo;
	                        } else if (filename.includes('content.')) {
	                            document = xml;
	                        }

	                        resolve();
	                    }
	                }, reject);
	            }).bind(_this)));
	        }, this);

	        Promise.all(queue).then((function () {
	            (0, _parseDocumentContent2['default'])({
	                xml: document,
	                documentData: documentData,
	                fileName: this.fileName
	            }).then(resolve, reject);

	            documentData = document = null;
	        }).bind(this), reject);
	    }).bind(this));
	};

	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var $ = _JsFile2['default'].dom;
	var formatPropertyName = _JsFile2['default'].Engine.formatPropertyName;

	exports['default'] = function (xml) {
	    var result = {
	        documentInfo: {},
	        appInfo: {}
	    };

	    $.children(xml.querySelector('meta')).forEach(function (_ref) {
	        var textContent = _ref.textContent;
	        var localName = _ref.localName;
	        var attributes = _ref.attributes;

	        switch (localName) {
	            case 'initial-creator':
	            case 'creator':
	                if (textContent) {
	                    result.documentInfo.creator = textContent;
	                }

	                break;
	            case 'creation-date':
	                if (textContent) {
	                    result.documentInfo.created = new Date(textContent);
	                }

	                break;
	            case 'date':
	                if (textContent) {
	                    result.documentInfo.modified = new Date(textContent);
	                }

	                break;
	            case 'generator':
	                if (textContent) {
	                    result.appInfo.application = textContent;
	                }

	                break;
	            case 'document-statistic':
	                Array.prototype.forEach.call(attributes || [], function (_ref2) {
	                    var value = _ref2.value;
	                    var name = _ref2.name;

	                    result.documentInfo[formatPropertyName(name)] = !isNaN(value) ? Number(value) : value;
	                });

	                break;
	        }
	    });

	    return result;
	};

	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _parsePageLayoutStyles = __webpack_require__(6);

	var _parsePageLayoutStyles2 = _interopRequireDefault(_parsePageLayoutStyles);

	var _parseStylesNode = __webpack_require__(8);

	var _parseStylesNode2 = _interopRequireDefault(_parseStylesNode);

	/**
	 *
	 * @param xml
	 * @returns {*}
	 * @private
	 */

	exports['default'] = function (xml) {
	    return new Promise(function (resolve, reject) {
	        var result = {
	            automatic: {
	                layouts: {}
	            },
	            pageLayout: '',
	            defaults: {}
	        };
	        var firstPageLayout = '';

	        _JsFile.dom.children(xml.querySelector('master-styles')).forEach(function (_ref) {
	            var localName = _ref.localName;
	            var attributes = _ref.attributes;

	            if (localName === 'master-page') {
	                var attrValue = attributes['style:page-layout-name'] && attributes['style:page-layout-name'].value;
	                if (attrValue) {
	                    result.pageLayout = attrValue;
	                }
	            }
	        });

	        _JsFile.dom.children(xml.querySelector('automatic-styles')).forEach(function (_ref2) {
	            var localName = _ref2.localName;
	            var attributes = _ref2.attributes;

	            if (localName === 'page-layout') {
	                var attrValue = attributes['style:name'] && attributes['style:name'].value;
	                if (attrValue) {
	                    result.automatic.layouts[attrValue] = (0, _parsePageLayoutStyles2['default'])(node);

	                    if (!firstPageLayout) {
	                        firstPageLayout = attrValue;
	                    }
	                }
	            }
	        });

	        if (!result.automatic.layouts[result.pageLayout] && firstPageLayout) {
	            result.pageLayout = firstPageLayout;
	        }

	        (0, _parseStylesNode2['default'])(xml.querySelector('styles')).then(function (styles) {
	            result.defaults = styles;
	            resolve(result);
	        }, reject);
	    });
	};

	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _getSize = __webpack_require__(7);

	var _getSize2 = _interopRequireDefault(_getSize);

	var _JsFile$Engine = _JsFile2['default'].Engine;
	var formatPropertyName = _JsFile$Engine.formatPropertyName;
	var normalizeColorValue = _JsFile$Engine.normalizeColorValue;

	/**
	 *
	 * @param node
	 * @return {Object}
	 * @private
	 */

	exports['default'] = function (node) {
	    var result = {
	        page: {
	            style: {},
	            properties: {}
	        },
	        footnote: {
	            style: {},
	            properties: {}
	        },
	        footer: {
	            style: {},
	            properties: {}
	        },
	        header: {
	            style: {},
	            properties: {}
	        }
	    };

	    node = node && node.querySelector('page-layout-properties');

	    if (node) {
	        Array.prototype.forEach.call(node.attributes || [], function (attr) {
	            var size = undefined;
	            var _attr$value = attr.value;
	            var value = _attr$value === undefined ? '' : _attr$value;
	            var _attr$name = attr.name;
	            var name = _attr$name === undefined ? '' : _attr$name;

	            var prop = name && formatPropertyName(name);

	            if (prop.includes('padding') || prop.includes('margin')) {
	                size = value && (0, _getSize2['default'])(value);

	                if (size && size.unit) {
	                    result.page.style[prop] = size;
	                }
	            } else if (name === 'writing-mode') {
	                result.page.style.direction = /rl/ig.test(name) ? 'rtl' : 'ltr';
	            } else if (name === 'print-orientation') {
	                result.page.properties.isLandscapeOrientation = value === 'landscape';
	            } else if (name === 'num-format') {
	                if (value) {
	                    result.page.properties.numberingFormat = value;
	                }
	            } else if (name === 'footnote-max-height') {
	                size = value && (0, _getSize2['default'])(value);
	                if (size && size.unit) {
	                    result.footnote.style.maxHeight = size;
	                }
	            } else if (name === 'page-height') {
	                size = value && (0, _getSize2['default'])(value);
	                if (size && size.unit) {
	                    result.page.style.height = size;
	                }
	            } else if (name === 'page-width') {
	                size = value && (0, _getSize2['default'])(value);
	                if (size && size.unit) {
	                    result.page.style.width = size;
	                }
	            } else {
	                size = value && (0, _getSize2['default'])(value);
	                if (size && size.unit) {
	                    result.page.properties[prop] = size;
	                } else {
	                    result.page.properties[prop] = value;
	                }
	            }
	        });

	        $.children(node).forEach(function (node) {
	            if (node.localName === 'footnote-sep') {
	                var attrValue = node.attributes['style:width'] && node.attributes['style:width'].value;
	                var size = attrValue && (0, _getSize2['default'])(attrValue);
	                if (size.unit) {
	                    result.footnote.style.width = size;
	                }

	                attrValue = node.attributes['style:distance-before-sep'] && node.attributes['style:distance-before-sep'].value;
	                size = attrValue && (0, _getSize2['default'])(attrValue);
	                if (size.unit) {
	                    result.footnote.style.marginTop = size;
	                }

	                attrValue = node.attributes['style:distance-after-sep'] && node.attributes['style:distance-after-sep'].value;
	                size = attrValue && (0, _getSize2['default'])(attrValue);
	                if (size.unit) {
	                    result.footnote.style.marginBottom = size;
	                }

	                attrValue = node.attributes['style:adjustment'] && node.attributes['style:adjustment'].value;
	                if (attrValue) {
	                    result.footnote.style.float = 'none';

	                    if (attrValue === 'left') {
	                        result.footnote.style.float = 'left';
	                    } else if (attrValue === 'right') {
	                        result.footnote.style.float = 'right';
	                    }
	                }

	                attrValue = node.attributes['style:color'] && node.attributes['style:color'].value;
	                if (attrValue) {
	                    result.footnote.style.color = normalizeColorValue(attrValue);
	                }
	            }
	        });
	    }

	    return result;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var masks = [/^([0-9]*[0-9][0-9]*(?:\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px))$/, /^-?([0-9]+(?:\.[0-9]*)?|\.[0-9]+)(%)$/];

	/**
	 *
	 * @param val
	 * @returns {{value: number, unit: string}}
	 * @private
	 */

	exports['default'] = function (val) {
	    var result = {
	        value: 0,
	        unit: ''
	    };
	    var data = undefined;

	    masks.some(function (regExp) {
	        return data = regExp.exec(val);
	    });

	    if (data) {
	        var value = Number(data[1]);
	        var unit = data[2];

	        if (!isNaN(value) && unit) {
	            result.unit = String(unit).toLowerCase();
	            result.value = value;
	        }
	    }

	    return result;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _parseListStyles = __webpack_require__(9);

	var _parseListStyles2 = _interopRequireDefault(_parseListStyles);

	var _parseTableStyles = __webpack_require__(10);

	var _parseTableStyles2 = _interopRequireDefault(_parseTableStyles);

	var _parseTableColumnStyles = __webpack_require__(11);

	var _parseTableColumnStyles2 = _interopRequireDefault(_parseTableColumnStyles);

	var _parseTableCellStyles = __webpack_require__(12);

	var _parseTableCellStyles2 = _interopRequireDefault(_parseTableCellStyles);

	var _parseParagraphStyles = __webpack_require__(14);

	var _parseParagraphStyles2 = _interopRequireDefault(_parseParagraphStyles);

	var _parseTextStyles = __webpack_require__(15);

	var _parseTextStyles2 = _interopRequireDefault(_parseTextStyles);

	var $ = _JsFile2['default'].dom;
	var merge = _JsFile2['default'].Engine.merge;

	var defaultStyleNodeName = 'default-style';

	function readNodes(i, length, nodes, result, resolve, reject) {
	    var size = i + 100;

	    if (size > length) {
	        size = length;
	    }

	    for (; i < size; i++) {
	        var attrValue = undefined;
	        var _nodes$i = nodes[i];
	        var localName = _nodes$i.localName;
	        var attributes = _nodes$i.attributes;

	        if (localName === 'style' || localName === defaultStyleNodeName) {
	            var namedStyle = undefined;
	            attrValue = attributes['style:name'] && attributes['style:name'].value;

	            if (localName !== defaultStyleNodeName && attrValue) {
	                namedStyle = result.named[attrValue] = result.named[attrValue] || {};
	            }

	            attrValue = attributes['style:family'] && attributes['style:family'].value;
	            switch (attrValue) {
	                case 'table':
	                    (namedStyle || result).table = (0, _parseTableStyles2['default'])(node);
	                    break;
	                case 'table-column':
	                    (namedStyle || result).tableColumn = (0, _parseTableColumnStyles2['default'])(node);
	                    break;
	                case 'table-cell':
	                    (namedStyle || result).tableCell = (0, _parseTableCellStyles2['default'])(node);
	                    break;
	                case 'paragraph':
	                    (namedStyle || result).paragraph = (0, _parseParagraphStyles2['default'])(node);
	                    break;
	                case 'text':
	                    (namedStyle || result).text = (0, _parseTextStyles2['default'])(node);
	                    break;
	            }
	        } else {
	            attrValue = attributes['style:name'] && attributes['style:name'].value;
	            if (localName === 'list-style' && attrValue) {
	                result.named[attrValue] = merge(result.named[attrValue] || {}, (0, _parseListStyles2['default'])(node));
	            }
	        }
	    }

	    if (i === length) {
	        resolve(result);
	        return;
	    }

	    setTimeout(function () {
	        return readNodes(i, length, nodes, result, resolve, reject);
	    });
	}

	exports['default'] = function (node) {
	    return new Promise(function (resolve, reject) {
	        var nodes = $.children(node);

	        readNodes(0, nodes.length, nodes, {
	            named: {}
	        }, resolve, reject);
	    });
	};

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _JsFile = __webpack_require__(1);

	var listStyleTypes = {
	    1: 'decimal',
	    i: 'lower-roman',
	    I: 'upper-roman',
	    a: 'lower-alpha',
	    A: 'upper-alpha'
	};

	exports['default'] = function (xml) {
	    var result = {
	        style: {}
	    };
	    var nodes = _JsFile.dom.children(xml);
	    var i = nodes.length;

	    while (i--) {
	        if (nodes[i].localName === 'list-level-style-number') {
	            var attr = nodes[i].attributes['style:num-format'];

	            result.style.listStyleType = attr && listStyleTypes[attr.value] || 'auto';
	        }
	    }

	    return result;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _getSize = __webpack_require__(7);

	var _getSize2 = _interopRequireDefault(_getSize);

	/**
	 *
	 * @param node
	 * @return {Object}
	 * @private
	 */

	exports['default'] = function (node) {
	    var result = {
	        style: {}
	    };
	    node = node && node.querySelector('table-properties');
	    if (node) {
	        var attrValue = node.attributes['style:width'] && node.attributes['style:width'].value;
	        if (attrValue) {
	            var size = (0, _getSize2['default'])(attrValue);
	            if (size.unit) {
	                result.style.width = size;
	            }
	        }

	        attrValue = node.attributes['table:border-model'] && node.attributes['table:border-model'].value;
	        if (attrValue) {
	            result.style.borderCollapse = /coll/i.test(attrValue) ? 'collapse' : 'separate';
	        }
	    }

	    return result;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _getSize = __webpack_require__(7);

	var _getSize2 = _interopRequireDefault(_getSize);

	/**
	 *
	 * @param node
	 * @return {Object}
	 * @private
	 */

	exports['default'] = function (node) {
	    var result = {
	        style: {}
	    };

	    node = node && node.querySelector('table-column-properties');

	    if (node) {
	        var attr = node.attributes['style:column-width'];
	        var size = attr && (0, _getSize2['default'])(attr.value);

	        if (size && size.unit) {
	            result.style.width = size;
	        }
	    }

	    return result;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _getSize = __webpack_require__(7);

	var _getSize2 = _interopRequireDefault(_getSize);

	var _parseBorderStyle = __webpack_require__(13);

	var _parseBorderStyle2 = _interopRequireDefault(_parseBorderStyle);

	var formatPropertyName = _JsFile2['default'].Engine.formatPropertyName;

	/**
	 *
	 * @param node
	 * @return {Object}
	 * @private
	 */

	exports['default'] = function (node) {
	    var result = {
	        style: {}
	    };

	    node = node && node.querySelector('table-cell-properties');

	    Array.prototype.forEach.call(node && node.attributes || [], function (attr) {
	        var _attr$value = attr.value;
	        var value = _attr$value === undefined ? '' : _attr$value;
	        var _attr$name = attr.name;
	        var name = _attr$name === undefined ? '' : _attr$name;

	        var prop = name && formatPropertyName(name);

	        if (prop.includes('border')) {
	            var _ref = (0, _parseBorderStyle2['default'])(value) || {};

	            var style = _ref.style;
	            var width = _ref.width;
	            var color = _ref.color;

	            result.style[prop + 'Style'] = style;
	            result.style[prop + 'Width'] = width;
	            result.style[prop + 'Color'] = color;
	        } else if (prop === 'padding') {
	            var size = value && (0, _getSize2['default'])(value);
	            if (size && size.unit) {
	                result.style[prop] = size;
	            }
	        }
	    });

	    return result;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _getSize = __webpack_require__(7);

	var _getSize2 = _interopRequireDefault(_getSize);

	var normalizeColorValue = _JsFile2['default'].Engine.normalizeColorValue;

	/**
	 *
	 * @param data
	 * @return {Object}
	 * @private
	 */

	exports['default'] = function (data) {
	    var result = {
	        width: {
	            value: 0,
	            unit: 'pt'
	        },
	        color: 'none',
	        style: 'none'
	    };

	    if (data && data !== 'none') {
	        var _data$split = data.split(' ');

	        var _data$split2 = _slicedToArray(_data$split, 3);

	        var sizeData = _data$split2[0];
	        var style = _data$split2[1];
	        var color = _data$split2[2];

	        if (sizeData && style && color) {
	            var size = (0, _getSize2['default'])(sizeData);

	            if (size.unit) {
	                result.width = size;
	            }

	            result.style = style;
	            result.color = normalizeColorValue(color);
	        }
	    }

	    return result;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _getSize = __webpack_require__(7);

	var _getSize2 = _interopRequireDefault(_getSize);

	var _JsFile$Engine = _JsFile2['default'].Engine;
	var formatPropertyName = _JsFile$Engine.formatPropertyName;
	var normalizeColorValue = _JsFile$Engine.normalizeColorValue;

	/**
	 *
	 * @param node
	 * @return {Object}
	 * @private
	 */

	exports['default'] = function (node) {
	    var result = {
	        style: {}
	    };
	    node = node && node.querySelector('paragraph-properties');

	    Array.prototype.forEach.call(node && node.attributes || [], function (attr) {
	        var _attr$value = attr.value;
	        var value = _attr$value === undefined ? '' : _attr$value;
	        var _attr$name = attr.name;
	        var name = _attr$name === undefined ? '' : _attr$name;

	        var prop = name && formatPropertyName(name);

	        if (prop.includes('padding') || prop.includes('margin')) {
	            var size = value && (0, _getSize2['default'])(value);

	            if (size && size.unit) {
	                result.style[prop] = size;
	            }
	        } else if (prop === 'backgroundColor') {
	            result.style[prop] = normalizeColorValue(value);
	        } else if (prop === 'writingMode') {
	            result.style.direction = /rl/i.test(value) ? 'rtl' : 'ltr';
	        } else if (prop === 'textAlign') {
	            var align = /center|left|right/i.exec(value);

	            if (align && align[0]) {
	                result.style[prop] = align[0];
	            }
	        }
	    });

	    return result;
	};

	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _getSize = __webpack_require__(7);

	var _getSize2 = _interopRequireDefault(_getSize);

	var _JsFile$Engine = _JsFile2['default'].Engine;
	var formatPropertyName = _JsFile$Engine.formatPropertyName;
	var normalizeColorValue = _JsFile$Engine.normalizeColorValue;

	/**
	 *
	 * @param node
	 * @return {Object}
	 * @private
	 */

	exports['default'] = function (node) {
	    var result = {
	        style: {},
	        properties: {}
	    };
	    node = node && node.querySelector('text-properties');
	    Array.prototype.forEach.call(node && node.attributes || [], function (attr) {
	        var _attr$value = attr.value;
	        var value = _attr$value === undefined ? '' : _attr$value;
	        var _attr$name = attr.name;
	        var name = _attr$name === undefined ? '' : _attr$name;

	        var prop = name && formatPropertyName(name);

	        if (prop.includes('padding') || prop.includes('margin') || prop.includes('fontSize')) {
	            var size = value && (0, _getSize2['default'])(value);

	            if (size && size.unit) {
	                result.style[prop] = size;
	            }
	        } else if (prop === 'color') {
	            result.style.color = normalizeColorValue(value);
	        } else if (prop === 'fontStyle') {
	            result.style[prop] = /italic/ig.test(value) ? 'italic' : 'normal';
	        } else if (prop === 'fontName') {
	            result.style.fontFamily = value;
	        } else if (prop === 'fontWeight') {
	            result.style[prop] = /bold/ig.test(value) ? 'bold' : 'normal';
	        } else if (prop === 'textUnderlineStyle') {
	            result.style.textDecoration = /none/ig.test(value) ? 'none' : 'underline';
	        } else if (prop === 'language') {
	            result.properties.lang = value;
	        }
	    });

	    return result;
	};

	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _parseStylesNode = __webpack_require__(8);

	var _parseStylesNode2 = _interopRequireDefault(_parseStylesNode);

	var _parseParagraph = __webpack_require__(17);

	var _parseParagraph2 = _interopRequireDefault(_parseParagraph);

	var _parseList = __webpack_require__(19);

	var _parseList2 = _interopRequireDefault(_parseList);

	var _parseTable = __webpack_require__(20);

	var _parseTable2 = _interopRequireDefault(_parseTable);

	var Document = _JsFile2['default'].Document;
	var _JsFile$Engine = _JsFile2['default'].Engine;
	var errors = _JsFile$Engine.errors;
	var merge = _JsFile$Engine.merge;

	var parsers = {
	    p: _parseParagraph2['default'],
	    list: _parseList2['default'],
	    table: _parseTable2['default']
	};

	exports['default'] = function (params) {
	    return new Promise(function (resolve, reject) {
	        var xml = params.xml;
	        var _params$documentData = params.documentData;
	        var documentData = _params$documentData === undefined ? {} : _params$documentData;
	        var fileName = params.fileName;

	        if (!xml) {
	            reject(new Error(errors.invalidReadFile.message));
	        }

	        var result = {
	            name: fileName,
	            wordsCount: documentData.documentInfo && documentData.documentInfo.wordsCount || null,
	            pages: []
	        };
	        var pageLayout = documentData.styles && documentData.styles.automatic && documentData.styles.automatic.layouts && documentData.styles.automatic.layouts[documentData.styles.pageLayout];
	        var node = xml.querySelector('body text');
	        if (node) {
	            (0, _parseStylesNode2['default'])(xml.querySelector('automatic-styles')).then(function (styles) {
	                var page = merge(pageLayout && pageLayout.page || {}, Document.elementPrototype);
	                $.children(node).forEach(function (node) {
	                    var parser = parsers[node.localName];

	                    if (parser) {
	                        var el = parser({
	                            node: node,
	                            styles: styles,
	                            documentData: documentData
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
	};

	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _getStyleRules = __webpack_require__(18);

	var _getStyleRules2 = _interopRequireDefault(_getStyleRules);

	var _getSize = __webpack_require__(7);

	var _getSize2 = _interopRequireDefault(_getSize);

	var $ = _JsFile2['default'].dom;
	var Document = _JsFile2['default'].Document;
	var _JsFile$Engine = _JsFile2['default'].Engine;
	var tabAsSpaces = _JsFile$Engine.tabAsSpaces;
	var merge = _JsFile$Engine.merge;

	exports['default'] = function (params) {
	    var result = Document.elementPrototype;
	    var node = params.node;
	    var styles = params.styles;
	    var documentData = params.documentData;

	    if (!node) {
	        return result;
	    }

	    var styleRules = undefined;
	    var attrValue = node.attributes['text:style-name'] && node.attributes['text:style-name'].value;
	    if (attrValue) {
	        styleRules = (0, _getStyleRules2['default'])({
	            documentData: documentData,
	            styles: styles,
	            styleName: attrValue,
	            children: ['paragraph', 'text']
	        });

	        merge(result, styleRules.paragraph);
	    }

	    $.children(node).forEach(function (node) {
	        var attrValue = undefined;
	        var el = merge(Document.elementPrototype, styleRules && styleRules.text);

	        switch (node.localName) {
	            case 'tab':
	                el.properties.textContent = tabAsSpaces;
	                result.children.push(el);
	                break;
	            case 'soft-page-break':
	                result.properties.pageBreak = true;
	                break;
	            case 'span':
	                attrValue = node.attributes['text:style-name'] && params.node.attributes['text:style-name'].value;
	                if (attrValue) {
	                    merge(result, (0, _getStyleRules2['default'])({
	                        documentData: documentData,
	                        styles: styles,
	                        styleName: attrValue,
	                        children: ['text']
	                    }).text);
	                }

	                $.children(node).forEach(function (node) {
	                    el.properties.textContent += node.textContent || '';
	                });

	                result.children.push(el);
	                break;
	            case 'frame':
	                var size = undefined;

	                attrValue = node.attributes['svg:x'] && options.node.attributes['svg:x'].value;
	                if (attrValue) {
	                    size = (0, _getSize2['default'])(attrValue);

	                    if (size.unit) {
	                        el.style.left = size;
	                        el.style.position = 'absolute';
	                    }
	                }

	                attrValue = node.attributes['svg:y'] && options.node.attributes['svg:y'].value;
	                if (attrValue) {
	                    size = (0, _getSize2['default'])(attrValue);

	                    if (size.unit) {
	                        el.style.top = size;
	                        el.style.position = 'absolute';
	                    }
	                }

	                attrValue = node.attributes['svg:width'] && options.node.attributes['svg:width'].value;
	                if (attrValue) {
	                    size = (0, _getSize2['default'])(attrValue);

	                    if (size.unit) {
	                        el.style.width = size;
	                    }
	                }

	                attrValue = node.attributes['svg:height'] && options.node.attributes['svg:height'].value;
	                if (attrValue) {
	                    size = (0, _getSize2['default'])(attrValue);

	                    if (size.unit) {
	                        el.style.width = size;
	                    }
	                }

	                attrValue = node.attributes['draw:z-index'] && options.node.attributes['draw:z-index'].value;
	                if (!isNaN(attrValue)) {
	                    el.style.zIndex = Number(attrValue);
	                }

	                attrValue = node.attributes['draw:style-name'] && options.node.attributes['draw:style-name'].value;
	                if (attrValue) {
	                    el.properties.styleName = attrValue;
	                }

	                var img = node.querySelector('image');
	                if (img) {
	                    attrValue = img.attributes['xlink:href'] && img.attributes['xlink:href'].value;
	                    if (attrValue && documentData && documentData.media) {
	                        el.properties.src = documentData.media[attrValue];
	                    }
	                }

	                result.children.push(el);
	                break;
	            default:
	                el.properties.textContent = node.textContent;
	                result.children.push(el);
	        }
	    });

	    return result;
	};

	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _JsFile$Engine = _JsFile2['default'].Engine;
	var clone = _JsFile$Engine.clone;
	var merge = _JsFile$Engine.merge;

	exports['default'] = function (params) {
	    var result = {};
	    var _params$children = params.children;
	    var children = _params$children === undefined ? [] : _params$children;
	    var _params$documentData = params.documentData;
	    var documentData = _params$documentData === undefined ? {} : _params$documentData;
	    var styleName = params.styleName;
	    var _params$styles = params.styles;
	    var styles = _params$styles === undefined ? {} : _params$styles;

	    children.forEach(function (dest) {
	        result[dest] = {
	            style: {}
	        };

	        if (documentData.styles && documentData.styles.defaults) {
	            if (documentData.styles.defaults[dest]) {
	                result[dest].style = clone(documentData.styles.defaults[dest].style);
	            }

	            if (documentData.styles.defaults.named && documentData.styles.defaults.named[styleName] && documentData.styles.defaults.named[styleName][dest]) {
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
	};

	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _getStyleRules = __webpack_require__(18);

	var _getStyleRules2 = _interopRequireDefault(_getStyleRules);

	var _parseParagraph = __webpack_require__(17);

	var _parseParagraph2 = _interopRequireDefault(_parseParagraph);

	var Document = _JsFile2['default'].Document;
	var merge = _JsFile2['default'].Engine.merge;

	exports['default'] = function (params) {
	    var result = Document.elementPrototype;
	    var node = params.node;
	    var styles = params.styles;
	    var documentData = params.documentData;

	    result.properties.tagName = 'UL';

	    if (!node) {
	        return result;
	    }

	    var attrValue = undefined;
	    var arrProto = Array.prototype;
	    var push = arrProto.push;
	    var map = arrProto.map;

	    attrValue = node.attributes['xml:id'] && node.attributes['xml:id'].value;
	    if (attrValue) {
	        result.properties.id = attrValue;
	    }

	    attrValue = node.attributes['text:style-name'] && node.attributes['text:style-name'].value;
	    if (attrValue) {
	        merge(result, (0, _getStyleRules2['default'])({
	            documentData: documentData,
	            styles: styles,
	            styleName: attrValue,
	            children: ['list']
	        }).list);
	    }

	    push.apply(result.children, map.call(node.querySelectorAll('list-item'), function (node) {
	        var el = Document.elementPrototype;
	        el.properties.tagName = 'LI';

	        push.apply(el.children, map.call(node.querySelectorAll('p'), function (node) {
	            return (0, _parseParagraph2['default'])({
	                node: node,
	                styles: styles,
	                documentData: documentData
	            });
	        }));

	        return el;
	    }));

	    return result;
	};

	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _getStyleRules = __webpack_require__(18);

	var _getStyleRules2 = _interopRequireDefault(_getStyleRules);

	var _parseParagraph = __webpack_require__(17);

	var _parseParagraph2 = _interopRequireDefault(_parseParagraph);

	var Document = _JsFile2['default'].Document;
	var merge = _JsFile2['default'].Engine.merge;

	exports['default'] = function (params) {
	    var node = params.node;
	    var styles = params.styles;
	    var documentData = params.documentData;

	    var thead = Document.elementPrototype;
	    var tbody = Document.elementPrototype;
	    var result = Document.elementPrototype;
	    var attrValue = node.attributes['table:name'] && node.attributes['table:name'].value;
	    if (attrValue) {
	        result.properties.name = attrValue;
	    }

	    result.properties.tagName = 'TABLE';
	    thead.properties.tagName = 'THEAD';
	    tbody.properties.tagName = 'TBODY';
	    attrValue = node.attributes['table:style-name'] && node.attributes['table:style-name'].value;
	    if (attrValue) {
	        merge(result, (0, _getStyleRules2['default'])({
	            documentData: documentData,
	            styles: styles,
	            styleName: attrValue,
	            children: ['table']
	        }).table);
	    }

	    $.children(node).forEach(function (node) {
	        var localName = node.localName;

	        if (localName === 'table-row') {
	            tbody.children.push(parseTableRow({
	                node: node,
	                documentData: documentData,
	                styles: styles
	            }));
	        } else if (localName === 'table-header-rows') {
	            var arrProto = Array.prototype;
	            arrProto.push.apply(thead.children, arrProto.map.call(node.querySelectorAll('table-row'), function (node) {
	                return parseTableRow({
	                    head: true,
	                    node: node,
	                    documentData: documentData,
	                    styles: styles
	                });
	            }));
	        }
	    });

	    result.children.push(thead, tbody);
	    return result;
	};

	function parseTableRow(params) {
	    var arrProto = Array.prototype;
	    var push = arrProto.push;
	    var map = arrProto.map;
	    var result = Document.elementPrototype;
	    var node = params.node;
	    var styles = params.styles;
	    var documentData = params.documentData;

	    result.properties.tagName = 'TR';

	    push.apply(result.children, map.call(node.querySelectorAll('table-cell'), function (node) {
	        var el = Document.elementPrototype;
	        var attrValue = node.attributes['table:style-name'] && node.attributes['table:style-name'].value;

	        if (attrValue) {
	            var styleRules = (0, _getStyleRules2['default'])({
	                documentData: documentData,
	                styles: styles,
	                styleName: attrValue,
	                children: ['tableCell']
	            });
	            merge(el, styles, styleRules.tableCell);
	        }

	        el.properties.tagName = header ? 'TH' : 'TD';
	        push.apply(el.children, map.call(node.querySelectorAll('p'), function (node) {
	            return (0, _parseParagraph2['default'])({
	                node: node,
	                styles: styles,
	                documentData: documentData
	            });
	        }));
	    }));

	    return result;
	}
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;