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

/***/ "./src/admin/components/SettingsListItem.js":
/*!**************************************************!*\
  !*** ./src/admin/components/SettingsListItem.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SettingsListItem; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Select */ "flarum/components/Select");
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Select__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Alert */ "flarum/components/Alert");
/* harmony import */ var flarum_components_Alert__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Alert__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _WebhookEditModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./WebhookEditModal */ "./src/admin/components/WebhookEditModal.js");







var SettingsListItem =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(SettingsListItem, _Component);

  function SettingsListItem() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = SettingsListItem.prototype;

  _proto.view = function view() {
    var _this$props = this.props,
        webhook = _this$props.webhook,
        services = _this$props.services,
        onChange = _this$props.onChange,
        onDelete = _this$props.onDelete;
    return m("div", {
      className: "Webhooks--row"
    }, m("div", {
      className: "Webhook-input"
    }, flarum_components_Select__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      options: services,
      value: webhook.service(),
      onchange: function onchange(value) {
        return onChange(webhook, 'service', value);
      }
    }), m("input", {
      className: "FormControl Webhook-url",
      type: "url",
      value: webhook.url(),
      placeholder: app.translator.trans('reflar-webhooks.admin.settings.help.url'),
      onchange: m.withAttr('value', function (value) {
        return onChange(webhook, 'url', value);
      })
    }), flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      type: 'button',
      className: 'Button Webhook-button',
      icon: 'fas fa-edit',
      onclick: function onclick() {
        return app.modal.show(new _WebhookEditModal__WEBPACK_IMPORTED_MODULE_5__["default"]({
          webhook: webhook,
          updateWebhook: function updateWebhook(events) {
            return onChange(webhook, 'events', events);
          }
        }));
      }
    }), flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      type: 'button',
      className: 'Button Button--warning Webhook-button',
      icon: 'fas fa-times',
      onclick: function onclick() {
        return onDelete(webhook);
      }
    })), !webhook.events().length && flarum_components_Alert__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      className: 'Webhook-error',
      children: app.translator.trans('reflar-webhooks.admin.settings.help.disabled'),
      dismissible: false
    }), webhook.error && webhook.error() && flarum_components_Alert__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      children: webhook.error(),
      className: 'Webhook-error',
      type: 'error',
      dismissible: false
    }));
  };

  return SettingsListItem;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



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
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Select */ "flarum/components/Select");
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Select__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _SettingsListItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SettingsListItem */ "./src/admin/components/SettingsListItem.js");






var SettingsPage =
/*#__PURE__*/
function (_Page) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(SettingsPage, _Page);

  function SettingsPage() {
    return _Page.apply(this, arguments) || this;
  }

  var _proto = SettingsPage.prototype;

  _proto.init = function init() {
    _Page.prototype.init.call(this);

    this.values = {};
    this.services = app.forum.attribute('reflar-webhooks.services').reduce(function (o, service) {
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
    }, m("form", null, m("fieldset", null, m("legend", null, app.translator.trans('reflar-webhooks.admin.settings.title')), m("label", null, app.translator.trans('reflar-webhooks.admin.settings.webhooks')), m("div", {
      style: "margin-bottom: -10px",
      className: "helpText"
    }, app.translator.trans('reflar-webhooks.admin.settings.help.general')), m("br", null), m("div", {
      className: "Webhooks--Container"
    }, this.webhooks.map(function (webhook) {
      return _SettingsListItem__WEBPACK_IMPORTED_MODULE_4__["default"].component({
        webhook: webhook,
        services: _this.services,
        onChange: _this.updateWebhook.bind(_this),
        onDelete: _this.deleteWebhook.bind(_this)
      });
    }), this.webhooks.length !== 0 && m("br", null), m("div", {
      className: "Webhooks--row"
    }, m("div", {
      className: "Webhook-input"
    }, flarum_components_Select__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      options: this.services,
      value: this.newWebhook.service(),
      onchange: this.newWebhook.service
    }), m("input", {
      className: "FormControl Webhook-url",
      type: "url",
      placeholder: app.translator.trans('reflar-webhooks.admin.settings.help.url'),
      onchange: m.withAttr('value', this.newWebhook.url)
    }), flarum_components_Button__WEBPACK_IMPORTED_MODULE_1___default.a.component({
      type: 'button',
      loading: this.newWebhook.loading(),
      className: 'Button Button--warning Webhook-button',
      icon: 'fas fa-plus',
      onclick: this.addWebhook.bind(this)
    }))))))));
  };

  _proto.addWebhook = function addWebhook() {
    var _this2 = this;

    this.newWebhook.loading(true);
    return app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + "/reflar/webhooks",
      data: {
        service: this.newWebhook.service(),
        url: this.newWebhook.url()
      }
    }).then(function (response) {
      _this2.webhooks.push({
        id: m.prop(response.data.id),
        service: m.prop(response.data.attributes.service),
        url: m.prop(response.data.attributes.url)
      });

      _this2.newWebhook.service('discord');

      _this2.newWebhook.url('');

      _this2.newWebhook.loading(false);

      m.lazyRedraw();
    }).catch(function () {
      _this2.newWebhook.loading(false);

      m.lazyRedraw();
    });
  };

  _proto.updateWebhook = function updateWebhook(webhook, field, value) {
    var _data;

    this.webhooks.some(function (w) {
      if (w.id() === webhook.id()) {
        w[field] = m.prop(value);
        return true;
      }
    });
    return app.request({
      method: 'PATCH',
      url: app.forum.attribute('apiUrl') + "/reflar/webhooks/" + webhook.id(),
      data: (_data = {}, _data[field] = value, _data)
    });
  };

  _proto.deleteWebhook = function deleteWebhook(webhook) {
    this.webhooks.splice(this.webhooks.indexOf(webhook), 1);
    return app.request({
      method: 'DELETE',
      url: app.forum.attribute('apiUrl') + "/reflar/webhooks/" + webhook.id()
    });
  };
  /**
   * @returns boolean
   */


  _proto.changed = function changed() {
    var _this3 = this;

    return this.fields.some(function (key) {
      return _this3.values[key]() !== (app.data.settings[_this3.addPrefix(key)] || '');
    });
  };

  return SettingsPage;
}(flarum_components_Page__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/admin/components/WebhookEditModal.js":
/*!**************************************************!*\
  !*** ./src/admin/components/WebhookEditModal.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WebhookEditModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2__);




var WebhookEditModal =
/*#__PURE__*/
function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(WebhookEditModal, _Modal);

  function WebhookEditModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = WebhookEditModal.prototype;

  _proto.init = function init() {
    _Modal.prototype.init.call(this);

    this.webhook = this.props.webhook;
    this.events = app.forum.attribute('reflar-webhooks.events');
  };

  _proto.className = function className() {
    return 'Modal--medium';
  };

  _proto.title = function title() {
    return app.translator.trans('reflar-webhooks.admin.settings.modal.title');
  };

  _proto.content = function content() {
    var _this = this;

    return m("div", {
      className: "ReflarWebhooksModal Modal-body"
    }, app.translator.trans('reflar-webhoks.admin.settings.modal.description'), m("div", {
      className: "Webhook-events"
    }, this.events.map(function (event) {
      return flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2___default.a.component({
        state: _this.webhook.events().includes(event),
        children: event,
        onchange: _this.onchange.bind(_this, event)
      });
    })));
  };

  _proto.onchange = function onchange(event, checked, component) {
    component.loading = true;
    var events = this.webhook.events();

    if (checked) {
      events.push(event);
    } else {
      events.splice(events.indexOf(event), 1);
    }

    return this.props.updateWebhook(events).then(function () {
      component.loading = false;
      m.lazyRedraw();
    });
  };

  return WebhookEditModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default.a);



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




var transformJSON = function transformJSON(def) {
  return function (str) {
    return str ? JSON.parse(str) : def;
  };
};

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
  error: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('error'),
  events: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('events', transformJSON([]))
}));



/***/ }),

/***/ "flarum/Component":
/*!**************************************************!*\
  !*** external "flarum.core.compat['Component']" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Component'];

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

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Modal'];

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

/***/ "flarum/components/Switch":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Switch']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Switch'];

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

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map