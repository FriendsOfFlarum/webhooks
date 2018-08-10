module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./admin.js":
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "./src/admin/addSettingsPage.js":
/*!**************************************!*\
  !*** ./src/admin/addSettingsPage.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/AdminNav */ "flarum/components/AdminNav");
/* harmony import */ var flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/AdminLinkButton */ "flarum/components/AdminLinkButton");
/* harmony import */ var flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_SettingsPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/SettingsPage */ "./src/admin/components/SettingsPage.js");




/* harmony default export */ __webpack_exports__["default"] = (function () {
  app.routes['reflar-webhooks'] = {
    path: '/reflar/webhooks',
    component: _components_SettingsPage__WEBPACK_IMPORTED_MODULE_3__["default"].component()
  };

  app.extensionSettings['reflar-webhooks'] = function () {
    return m.route(app.route('reflar-webhooks'));
  };

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'items', function (items) {
    items.add('reflar-webhooks', flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      href: app.route('reflar-webhooks'),
      icon: 'fas fa-external-link-alt',
      children: 'Webhooks',
      description: app.translator.trans('reflar-webhooks.admin.nav.desc')
    }));
  });
});

/***/ }),

/***/ "./src/admin/components/SettingsPage.js":
/*!**********************************************!*\
  !*** ./src/admin/components/SettingsPage.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SettingsPage; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Alert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Alert */ "flarum/components/Alert");
/* harmony import */ var flarum_components_Alert__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Alert__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Select */ "flarum/components/Select");
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Select__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/utils/saveSettings */ "flarum/utils/saveSettings");
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_5__);







var SettingsPage =
/*#__PURE__*/
function (_Page) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(SettingsPage, _Page);

  function SettingsPage() {
    return _Page.apply(this, arguments) || this;
  }

  var _proto = SettingsPage.prototype;

  _proto.init = function init() {
    this.values = {};
    this.services = app.forum.attribute('reflar-webhooks-services').reduce(function (o, service) {
      o[service] = app.translator.trans("reflar-webhooks.admin.settings.services." + service);
      return o;
    }, {});
    this.webhooks = app.forum.webhooks();
    this.settingsPrefix = 'reflar.webhooks';
    this.newWebhook = {
      service: m.prop('discord'),
      url: m.prop(''),
      loading: m.prop(false)
    };
  };
  /**
   * @returns {*}
   */


  _proto.view = function view() {
    var _this = this;

    return m("div", {
      className: "WebhooksPage"
    }, m("div", {
      className: "container"
    }, m("form", {
      onsubmit: this.onsubmit.bind(this)
    }, m("fieldset", null, m("legend", null, app.translator.trans('reflar-webhooks.admin.settings.title')), m("label", null, app.translator.trans('reflar-webhooks.admin.settings.webhooks')), m("div", {
      style: "margin-bottom: -10px",
      className: "helpText"
    }, app.translator.trans('reflar-webhooks.admin.settings.help.general')), m("br", null), m("div", {
      className: "Webhooks--Container"
    }, this.webhooks.map(function (webhook) {
      return [m("div", {
        className: "Webhooks--row"
      }, m("div", {
        className: "Webhook-input"
      }, flarum_components_Select__WEBPACK_IMPORTED_MODULE_4___default.a.component({
        options: _this.services,
        value: webhook.service(),
        onchange: function onchange(value) {
          return _this.updateWebhook(webhook, 'service', value);
        }
      }), m("input", {
        className: "FormControl Webhook-url",
        type: "url",
        value: webhook.url(),
        placeholder: app.translator.trans('reflar-webhooks.admin.settings.help.url'),
        onchange: m.withAttr('value', _this.updateWebhook.bind(_this, webhook, 'url'))
      }), flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
        type: 'button',
        className: 'Button Button--warning Webhook-button',
        icon: 'fas fa-times',
        onclick: function onclick() {
          return _this.deleteWebhook(webhook);
        }
      })), webhook.error && webhook.error() && flarum_components_Alert__WEBPACK_IMPORTED_MODULE_1___default.a.component({
        children: webhook.error(),
        className: 'Webhook-error',
        type: 'error',
        dismissible: false
      }))];
    }), m("br", null), m("div", {
      className: "Webhooks--row"
    }, m("div", {
      className: "Webhook-input"
    }, flarum_components_Select__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      options: this.services,
      value: this.newWebhook.service(),
      onchange: this.newWebhook.service
    }), m("input", {
      className: "FormControl Webhook-url",
      type: "url",
      placeholder: app.translator.trans('reflar-webhooks.admin.settings.help.url'),
      onchange: m.withAttr('value', this.newWebhook.url)
    }), flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      type: 'button',
      loading: this.newWebhook.loading(),
      className: 'Button Button--warning Webhook-button',
      icon: 'fas fa-plus',
      onclick: function onclick() {
        return _this.addWebhook(_this);
      }
    }))))))));
  };

  _proto.onsubmit = function onsubmit(e) {
    var _this2 = this;

    // prevent the usual form submit behaviour
    e.preventDefault(); // if the page is already saving, do nothing

    if (this.loading) return false; // prevents multiple savings

    this.loading = true; // remove previous success popup

    app.alerts.dismiss(this.successAlert);
    var settings = {}; // actually saves everything in the database

    flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_5___default()(settings).then(function () {
      // on success, show popup
      app.alerts.show(_this2.successAlert = new flarum_components_Alert__WEBPACK_IMPORTED_MODULE_1___default.a({
        type: 'success',
        children: app.translator.trans('core.admin.basics.saved_message')
      }));
    }).catch(function () {}).then(function () {
      // return to the initial state and redraw the page
      _this2.loading = false;
      m.redraw();
    });
    return false;
  };
  /**
   *
   * @param webhook
   */


  _proto.addWebhook = function addWebhook(webhook) {
    var _this3 = this;

    this.newWebhook.loading(true);
    app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + "/reflar/webhooks",
      data: {
        service: this.newWebhook.service(),
        url: this.newWebhook.url()
      }
    }).then(function (response) {
      _this3.webhooks.push({
        id: m.prop(response.data.id),
        service: m.prop(response.data.attributes.service),
        url: m.prop(response.data.attributes.url)
      });

      _this3.newWebhook.service('discord');

      _this3.newWebhook.url('');

      _this3.newWebhook.loading(false);

      m.lazyRedraw();
    }).catch(function () {
      _this3.newWebhook.loading(false);

      m.lazyRedraw();
    });
  };

  _proto.updateWebhook = function updateWebhook(webhook, field, value) {
    var _data;

    app.request({
      method: 'PATCH',
      url: app.forum.attribute('apiUrl') + "/reflar/webhooks/" + webhook.id(),
      data: (_data = {}, _data[field] = value, _data)
    });
    this.webhooks.some(function (w) {
      if (w.id() === webhook.id()) {
        w[field] = m.prop(value);
        return true;
      }
    });
  };

  _proto.deleteWebhook = function deleteWebhook(webhook) {
    app.request({
      method: 'DELETE',
      url: app.forum.attribute('apiUrl') + "/reflar/webhooks/" + webhook.id()
    });
    this.webhooks.splice(this.webhooks.indexOf(webhook), 1);
  };
  /**
   * @returns boolean
   */


  _proto.changed = function changed() {
    var _this4 = this;

    return this.fields.some(function (key) {
      return _this4.values[key]() !== (app.data.settings[_this4.addPrefix(key)] || '');
    });
  };

  return SettingsPage;
}(flarum_components_Page__WEBPACK_IMPORTED_MODULE_3___default.a);



/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_models_Forum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/models/Forum */ "flarum/models/Forum");
/* harmony import */ var flarum_models_Forum__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_models_Forum__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _models_Webhook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/Webhook */ "./src/admin/models/Webhook.js");
/* harmony import */ var _addSettingsPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./addSettingsPage */ "./src/admin/addSettingsPage.js");





flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.initializers.add('reflar/webhooks', function () {
  flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.store.models.webhooks = _models_Webhook__WEBPACK_IMPORTED_MODULE_3__["default"];
  flarum_models_Forum__WEBPACK_IMPORTED_MODULE_2___default.a.prototype.webhooks = flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.hasMany('webhooks');
  Object(_addSettingsPage__WEBPACK_IMPORTED_MODULE_4__["default"])();
});

/***/ }),

/***/ "./src/admin/models/Webhook.js":
/*!*************************************!*\
  !*** ./src/admin/models/Webhook.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Webhook; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/utils/mixin */ "flarum/utils/mixin");
/* harmony import */ var flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2__);




var Webhook =
/*#__PURE__*/
function (_mixin) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Webhook, _mixin);

  function Webhook() {
    return _mixin.apply(this, arguments) || this;
  }

  return Webhook;
}(flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2___default()(flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a, {
  id: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('id'),
  service: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('service'),
  url: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('url'),
  error: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('error')
}));



/***/ }),

/***/ "flarum/Model":
/*!**********************************************!*\
  !*** external "flarum.core.compat['Model']" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Model'];

/***/ }),

/***/ "flarum/app":
/*!********************************************!*\
  !*** external "flarum.core.compat['app']" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['app'];

/***/ }),

/***/ "flarum/components/AdminLinkButton":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['components/AdminLinkButton']" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/AdminLinkButton'];

/***/ }),

/***/ "flarum/components/AdminNav":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/AdminNav']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/AdminNav'];

/***/ }),

/***/ "flarum/components/Alert":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Alert']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Alert'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/Page":
/*!********************************************************!*\
  !*** external "flarum.core.compat['components/Page']" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Page'];

/***/ }),

/***/ "flarum/components/Select":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Select']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Select'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/models/Forum":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['models/Forum']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['models/Forum'];

/***/ }),

/***/ "flarum/utils/mixin":
/*!****************************************************!*\
  !*** external "flarum.core.compat['utils/mixin']" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/mixin'];

/***/ }),

/***/ "flarum/utils/saveSettings":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['utils/saveSettings']" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/saveSettings'];

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map