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

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _assertThisInitialized; });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _defineProperty; });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

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
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Dropdown */ "flarum/common/components/Dropdown");
/* harmony import */ var flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Select */ "flarum/common/components/Select");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Alert */ "flarum/common/components/Alert");
/* harmony import */ var flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/utils/Stream */ "flarum/common/utils/Stream");
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/utils/withAttr */ "flarum/common/utils/withAttr");
/* harmony import */ var flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/common/helpers/icon */ "flarum/common/helpers/icon");
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var flarum_tags_common_helpers_tagIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/tags/common/helpers/tagIcon */ "flarum/tags/common/helpers/tagIcon");
/* harmony import */ var flarum_tags_common_helpers_tagIcon__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_tags_common_helpers_tagIcon__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _WebhookEditModal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./WebhookEditModal */ "./src/admin/components/WebhookEditModal.js");












var SettingsListItem = /*#__PURE__*/function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(SettingsListItem, _Component);

  function SettingsListItem() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = SettingsListItem.prototype;

  _proto.oninit = function oninit(vnode) {
    _Component.prototype.oninit.call(this, vnode);

    this.webhook = this.attrs.webhook;
    this.services = this.attrs.services;
    this.url = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.webhook.url());
    this.service = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.webhook.service());
    this.events = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.webhook.events());
    this.error = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.webhook.error());
    this.loading = {};
  };

  _proto.view = function view() {
    var _this = this;

    var webhook = this.webhook,
        services = this.services;
    var service = webhook.service();
    var errors = [webhook.error && webhook.error()];

    if (!services[service]) {
      errors.push(app.translator.trans('fof-webhooks.admin.errors.service_not_found', {
        service: service
      }));
    } else if (!webhook.isValid()) {
      errors.push(app.translator.trans('fof-webhooks.admin.errors.url_invalid'));
    }

    var tagsEnabled = app.initializers.has('flarum-tags');
    var tag = webhook.tag();
    var tagIdLoading = !!this.loading['tag_id'];
    return m("div", {
      className: "Webhooks--row"
    }, m("div", {
      className: "Webhook-input"
    }, m(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_4___default.a, {
      options: services,
      value: service,
      onchange: this.update('service'),
      disabled: this.loading['service']
    }), m("input", {
      className: "FormControl Webhook-url",
      type: "url",
      value: this.url(),
      onchange: flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_7___default()('value', this.update('url')),
      disabled: this.loading['url'],
      placeholder: app.translator.trans('fof-webhooks.admin.settings.help.url')
    }), tagsEnabled && m(flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_2___default.a, {
      buttonClassName: "Button",
      label: tag ? m("span", null, !tagIdLoading && flarum_tags_common_helpers_tagIcon__WEBPACK_IMPORTED_MODULE_9___default()(tag, {
        className: 'Button-icon'
      }), " ", tag.name()) : app.translator.trans('fof-webhooks.admin.settings.item.tag_any_label'),
      icon: tagIdLoading ? 'fas fa-spinner fa-spin' : tag ? true : 'fas fa-tag',
      caretIcon: null
    }, m(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {
      icon: 'fas fa-tag',
      onclick: function onclick() {
        return _this.update('tag_id')(null);
      }
    }, app.translator.trans('fof-webhooks.admin.settings.item.tag_any_label')), m("hr", null), app.store.all('tags').map(function (tag) {
      return m(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {
        icon: true,
        onclick: function onclick() {
          return _this.update('tag_id')(tag.id());
        }
      }, flarum_tags_common_helpers_tagIcon__WEBPACK_IMPORTED_MODULE_9___default()(tag, {
        className: 'Button-icon'
      }), " ", tag.name());
    })), m(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {
      type: "button",
      className: "Button Webhook-button",
      icon: "fas fa-edit",
      onclick: function onclick() {
        return app.modal.show(_WebhookEditModal__WEBPACK_IMPORTED_MODULE_10__["default"], {
          webhook: webhook,
          updateWebhook: _this.update('events')
        });
      }
    }), m(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {
      type: "button",
      className: "Button Button--warning Webhook-button",
      icon: "fas fa-times",
      onclick: this["delete"].bind(this)
    })), !this.events().length && m(flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: "Webhook-error",
      dismissible: false
    }, app.translator.trans('fof-webhooks.admin.settings.help.disabled')), errors.filter(Boolean).map(function (error) {
      return m(flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_5___default.a, {
        className: "Webhook-error",
        type: "error",
        dismissible: false
      }, app.translator.trans(error));
    }));
  };

  _proto.update = function update(field) {
    var _this2 = this;

    return function (value) {
      var _this2$webhook$save;

      _this2.loading[field] = true;
      return _this2.webhook.save((_this2$webhook$save = {}, _this2$webhook$save[field] = value, _this2$webhook$save))["catch"](function () {}).then(function () {
        _this2.loading[field] = false;
        if (_this2[field]) _this2[field](value);
        m.redraw();
      });
    };
  };

  _proto["delete"] = function _delete() {
    return this.webhook["delete"]().then(function () {
      return m.redraw();
    });
  };

  return SettingsListItem;
}(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



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
/* harmony import */ var flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Switch */ "flarum/common/components/Switch");
/* harmony import */ var flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Dropdown */ "flarum/common/components/Dropdown");
/* harmony import */ var flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/helpers/icon */ "flarum/common/helpers/icon");
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_models_Group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/models/Group */ "flarum/common/models/Group");
/* harmony import */ var flarum_common_models_Group__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_models_Group__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/components/Modal */ "flarum/common/components/Modal");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/utils/Stream */ "flarum/common/utils/Stream");
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7__);









var sortByProp = function sortByProp(prop) {
  return function (a, b) {
    var propA = a[prop].toUpperCase(); // ignore upper and lowercase

    var propB = b[prop].toUpperCase(); // ignore upper and lowercase

    return propA < propB ? -1 : propA > propB ? 1 : 0;
  };
};

var groupBy = function groupBy(obj, fn) {
  var keys = Object.keys(obj);
  var vals = Object.values(obj);
  return keys.map(typeof fn === 'function' ? fn : function (val) {
    return val[fn];
  }).reduce(function (acc, val, i) {
    if (!acc[val]) acc[val] = {};
    acc[val][keys[i]] = vals[i];
    return acc;
  }, {});
};

var WebhookEditModal = /*#__PURE__*/function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(WebhookEditModal, _Modal);

  function WebhookEditModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = WebhookEditModal.prototype;

  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);

    this.webhook = this.attrs.webhook;
    var events = app.data['fof-webhooks.events'];
    this.groupId = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default()(this.webhook.groupId() || flarum_common_models_Group__WEBPACK_IMPORTED_MODULE_5___default.a.GUEST_ID);
    this.extraText = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default()(this.webhook.extraText() || '');
    this.usePlainText = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default()(this.webhook.usePlainText());
    this.maxPostContentLength = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default()(this.webhook.maxPostContentLength());
    this.events = groupBy(events.reduce(function (obj, evt) {
      var m = /((?:[a-z]+\\?)+?)\\Events?\\([a-z]+)/i.exec(evt);

      if (!m) {
        obj.other.push({
          full: evt,
          name: evt
        });
        obj.other = obj.other.sort();
        return obj;
      }

      var group = m[1].toLowerCase().replace('\\', '.');
      if (!obj[group]) obj[group] = [];
      obj[group] = obj[group].concat({
        full: evt,
        name: m[2]
      }).sort();
      return obj;
    }, {
      other: []
    }), function (key) {
      return key.split('.')[0];
    });
  };

  _proto.className = function className() {
    return 'Modal--medium';
  };

  _proto.title = function title() {
    return app.translator.trans('fof-webhooks.admin.settings.modal.title');
  };

  _proto.content = function content() {
    var _this = this;

    var icons = {
      2: 'fas fa-globe',
      3: 'fas fa-user'
    };
    var group = app.store.getById('groups', this.groupId());
    return m("div", {
      className: "FofWebhooksModal Modal-body"
    }, m("form", {
      className: "Form",
      onsubmit: this.onsubmit.bind(this)
    }, m(flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_1___default.a, {
      state: this.usePlainText(),
      onchange: this.usePlainText
    }, app.translator.trans('fof-webhooks.admin.settings.modal.use_plain_text_label')), m("div", {
      className: "Form-group"
    }, m("label", {
      className: "label"
    }, app.translator.trans('fof-webhooks.admin.settings.modal.max_post_content_length_label')), m("p", {
      className: "helpText"
    }, app.translator.trans('fof-webhooks.admin.settings.modal.max_post_content_length_help')), m("input", {
      type: "number",
      min: "0",
      className: "FormControl",
      bidi: this.maxPostContentLength,
      onkeypress: this.onkeypress.bind(this)
    })), m("div", {
      className: "Form-group hasLoading"
    }, m("label", {
      className: "label"
    }, app.translator.trans('fof-webhooks.admin.settings.modal.extra_text_label')), m("p", {
      className: "helpText"
    }, app.translator.trans('fof-webhooks.admin.settings.modal.extra_text_help')), m("input", {
      type: "text",
      className: "FormControl",
      bidi: this.extraText,
      onkeypress: this.onkeypress.bind(this)
    })), m("div", {
      className: "Form-group"
    }, m("label", {
      className: "label"
    }, app.translator.trans('fof-webhooks.admin.settings.modal.group_label')), m("p", {
      className: "helpText"
    }, app.translator.trans('fof-webhooks.admin.settings.modal.group_help')), m(flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_3___default.a, {
      label: [flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_4___default()(group.icon() || icons[group.id()]), group.namePlural()],
      buttonClassName: "Button Button--danger"
    }, app.store.all('groups').filter(function (g) {
      return ['1', '2'].includes(g.id());
    }).map(function (g) {
      return m(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a, {
        active: group.id() === g.id(),
        disabled: group.id() === g.id(),
        icon: g.icon() || icons[g.id()],
        onclick: function onclick() {
          return _this.groupId(g.id());
        }
      }, g.namePlural());
    }))), m("div", {
      className: "Form-group Webhook-events"
    }, m("label", {
      className: "label"
    }, app.translator.trans('fof-webhooks.admin.settings.modal.events_label')), app.translator.trans('fof-webhooks.admin.settings.modal.description'), Object.entries(this.events).map(function (_ref) {
      var events = _ref[1];
      return m("div", null, Object.entries(events).sort(sortByProp(0)).map(function (_ref2) {
        var group = _ref2[0],
            events = _ref2[1];
        return events.length ? m("div", null, m("h3", null, _this.translate(group)), events.map(function (event) {
          return m(flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_1___default.a, {
            state: _this.webhook.events().includes(event.full),
            onchange: _this.onchange.bind(_this, event.full)
          }, _this.translate(group, event.name.toLowerCase()));
        })) : null;
      }));
    })), m("div", {
      className: "Form-group"
    }, m(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a, {
      type: "submit",
      className: "Button Button--primary",
      loading: this.loading,
      disabled: !this.isDirty()
    }, app.translator.trans('core.admin.settings.submit_button')))));
  };

  _proto.translate = function translate(group, key) {
    if (key === void 0) {
      key = 'title';
    }

    return app.translator.trans("fof-webhooks.admin.settings.actions." + group + "." + key);
  };

  _proto.isDirty = function isDirty() {
    return this.extraText() != this.webhook.extraText() || this.groupId() !== this.webhook.groupId() || this.usePlainText() !== this.webhook.usePlainText() || this.maxPostContentLength() != this.webhook.maxPostContentLength();
  };

  _proto.onsubmit = function onsubmit(e) {
    var _this2 = this;

    e.preventDefault();
    this.loading = true;
    return this.webhook.save({
      extraText: this.extraText(),
      group_id: this.groupId(),
      use_plain_text: this.usePlainText(),
      max_post_content_length: this.maxPostContentLength() || 0
    }).then(function () {
      _this2.loading = false;
      m.redraw();
    })["catch"](function () {
      _this2.loading = false;
      m.redraw();
    });
  };

  _proto.onkeypress = function onkeypress(e) {
    if (e.key === 'Enter') {
      this.onsubmit(e);
    }
  };

  _proto.onchange = function onchange(event, checked, component) {
    component.loading = true;
    var events = this.webhook.events();

    if (checked) {
      events.push(event);
    } else {
      events.splice(events.indexOf(event), 1);
    }

    return this.attrs.updateWebhook(events).then(function () {
      component.loading = false;
      m.redraw();
    });
  };

  return WebhookEditModal;
}(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_6___default.a);



/***/ }),

/***/ "./src/admin/components/WebhooksPage.js":
/*!**********************************************!*\
  !*** ./src/admin/components/WebhooksPage.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WebhooksPage; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/components/ExtensionPage */ "flarum/admin/components/ExtensionPage");
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/utils/Stream */ "flarum/common/utils/Stream");
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/utils/withAttr */ "flarum/common/utils/withAttr");
/* harmony import */ var flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Select */ "flarum/common/components/Select");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _SettingsListItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SettingsListItem */ "./src/admin/components/SettingsListItem.js");








var WebhooksPage = /*#__PURE__*/function (_ExtensionPage) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(WebhooksPage, _ExtensionPage);

  function WebhooksPage() {
    return _ExtensionPage.apply(this, arguments) || this;
  }

  var _proto = WebhooksPage.prototype;

  _proto.oninit = function oninit(vnode) {
    _ExtensionPage.prototype.oninit.call(this, vnode);

    this.values = {};
    this.services = app.data['fof-webhooks.services'].reduce(function (o, service) {
      o[service] = app.translator.trans("fof-webhooks.admin.settings.services." + service);
      return o;
    }, {});
    this.newWebhook = {
      service: flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_2___default()('discord'),
      url: flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_2___default()(''),
      loading: flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_2___default()(false)
    };
  };

  _proto.content = function content() {
    var _this = this;

    var webhooks = app.store.all('webhooks');
    return m("div", {
      className: "WebhookContent"
    }, m("div", {
      className: "container"
    }, m("form", null, m("p", {
      className: "helpText"
    }, app.translator.trans('fof-webhooks.admin.settings.help.general')), m("fieldset", null, m("div", {
      className: "Webhooks--Container"
    }, webhooks.map(function (webhook) {
      return m(_SettingsListItem__WEBPACK_IMPORTED_MODULE_6__["default"], {
        webhook: webhook,
        services: _this.services
      });
    }), m("div", {
      className: "Webhooks--row"
    }, m("div", {
      className: "Webhook-input"
    }, m(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5___default.a, {
      options: this.services,
      value: this.newWebhook.service(),
      onchange: this.newWebhook.service
    }), m("input", {
      className: "FormControl Webhook-url",
      type: "url",
      placeholder: app.translator.trans('fof-webhooks.admin.settings.help.url'),
      onchange: flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_3___default()('value', this.newWebhook.url),
      onkeypress: this.onkeypress.bind(this)
    }), m(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a, {
      type: "button",
      loading: this.newWebhook.loading(),
      className: "Button Button--warning Webhook-button",
      icon: "fas fa-plus",
      onclick: this.addWebhook.bind(this)
    }))))))));
  };

  _proto.addWebhook = function addWebhook() {
    var _this2 = this;

    if (this.newWebhook.loading()) return;
    this.newWebhook.loading(true);
    return app.store.createRecord('webhooks').save({
      service: this.newWebhook.service(),
      url: this.newWebhook.url()
    }).then(function () {
      _this2.newWebhook.service('discord');

      _this2.newWebhook.url('');

      _this2.newWebhook.loading(false);

      m.redraw();
    })["catch"](function () {
      _this2.newWebhook.loading(false);

      m.redraw();
    });
  };

  _proto.onkeypress = function onkeypress(e) {
    if (e.key === 'Enter') {
      this.addWebhook();
    }
  }
  /**
   * @returns boolean
   */
  ;

  _proto.changed = function changed() {
    var _this3 = this;

    return this.fields.some(function (key) {
      return _this3.values[key]() !== (app.data.settings[_this3.addPrefix(key)] || '');
    });
  };

  return WebhooksPage;
}(flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_models_Forum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/models/Forum */ "flarum/common/models/Forum");
/* harmony import */ var flarum_common_models_Forum__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_models_Forum__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _models_Webhook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/Webhook */ "./src/admin/models/Webhook.js");
/* harmony import */ var _components_WebhooksPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/WebhooksPage */ "./src/admin/components/WebhooksPage.js");




app.initializers.add('fof/webhooks', function () {
  app.store.models.webhooks = _models_Webhook__WEBPACK_IMPORTED_MODULE_2__["default"];
  flarum_common_models_Forum__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.webhooks = flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default.a.hasMany('webhooks');
  app.extensionData["for"]('fof-webhooks').registerPage(_components_WebhooksPage__WEBPACK_IMPORTED_MODULE_3__["default"]);
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
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_3__);





var Webhook = /*#__PURE__*/function (_Model) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(Webhook, _Model);

  function Webhook() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Model.call.apply(_Model, [this].concat(args)) || this;

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__["default"])(_this), "id", flarum_common_Model__WEBPACK_IMPORTED_MODULE_3___default.a.attribute('id'));

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__["default"])(_this), "service", flarum_common_Model__WEBPACK_IMPORTED_MODULE_3___default.a.attribute('service'));

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__["default"])(_this), "url", flarum_common_Model__WEBPACK_IMPORTED_MODULE_3___default.a.attribute('url'));

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__["default"])(_this), "error", flarum_common_Model__WEBPACK_IMPORTED_MODULE_3___default.a.attribute('error'));

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__["default"])(_this), "events", flarum_common_Model__WEBPACK_IMPORTED_MODULE_3___default.a.attribute('events'));

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__["default"])(_this), "tagId", flarum_common_Model__WEBPACK_IMPORTED_MODULE_3___default.a.attribute('tag_id'));

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__["default"])(_this), "groupId", flarum_common_Model__WEBPACK_IMPORTED_MODULE_3___default.a.attribute('group_id'));

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__["default"])(_this), "extraText", flarum_common_Model__WEBPACK_IMPORTED_MODULE_3___default.a.attribute('extra_text'));

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__["default"])(_this), "isValid", flarum_common_Model__WEBPACK_IMPORTED_MODULE_3___default.a.attribute('is_valid', Boolean));

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__["default"])(_this), "usePlainText", flarum_common_Model__WEBPACK_IMPORTED_MODULE_3___default.a.attribute('use_plain_text', Boolean));

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__["default"])(_this), "maxPostContentLength", flarum_common_Model__WEBPACK_IMPORTED_MODULE_3___default.a.attribute('max_post_content_length'));

    return _this;
  }

  var _proto = Webhook.prototype;

  _proto.apiEndpoint = function apiEndpoint() {
    return "/fof/webhooks" + (this.exists ? "/" + this.data.id : '');
  };

  _proto.tag = function tag() {
    return app.store.getById('tags', this.tagId());
  };

  return Webhook;
}(flarum_common_Model__WEBPACK_IMPORTED_MODULE_3___default.a);



/***/ }),

/***/ "flarum/admin/components/ExtensionPage":
/*!***********************************************************************!*\
  !*** external "flarum.core.compat['admin/components/ExtensionPage']" ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['admin/components/ExtensionPage'];

/***/ }),

/***/ "flarum/common/Component":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['common/Component']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/Component'];

/***/ }),

/***/ "flarum/common/Model":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['common/Model']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/Model'];

/***/ }),

/***/ "flarum/common/components/Alert":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Alert']" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Alert'];

/***/ }),

/***/ "flarum/common/components/Button":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Button']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Button'];

/***/ }),

/***/ "flarum/common/components/Dropdown":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['common/components/Dropdown']" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Dropdown'];

/***/ }),

/***/ "flarum/common/components/Modal":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Modal']" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Modal'];

/***/ }),

/***/ "flarum/common/components/Select":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Select']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Select'];

/***/ }),

/***/ "flarum/common/components/Switch":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Switch']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Switch'];

/***/ }),

/***/ "flarum/common/helpers/icon":
/*!************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/icon']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/helpers/icon'];

/***/ }),

/***/ "flarum/common/models/Forum":
/*!************************************************************!*\
  !*** external "flarum.core.compat['common/models/Forum']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/models/Forum'];

/***/ }),

/***/ "flarum/common/models/Group":
/*!************************************************************!*\
  !*** external "flarum.core.compat['common/models/Group']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/models/Group'];

/***/ }),

/***/ "flarum/common/utils/Stream":
/*!************************************************************!*\
  !*** external "flarum.core.compat['common/utils/Stream']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/utils/Stream'];

/***/ }),

/***/ "flarum/common/utils/withAttr":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['common/utils/withAttr']" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/utils/withAttr'];

/***/ }),

/***/ "flarum/tags/common/helpers/tagIcon":
/*!********************************************************************!*\
  !*** external "flarum.core.compat['tags/common/helpers/tagIcon']" ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['tags/common/helpers/tagIcon'];

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map