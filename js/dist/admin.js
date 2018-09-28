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

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _extends; });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
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

/***/ "./src/admin/addBazaarPage.js":
/*!************************************!*\
  !*** ./src/admin/addBazaarPage.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/AdminNav */ "flarum/components/AdminNav");
/* harmony import */ var flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/AdminLinkButton */ "flarum/components/AdminLinkButton");
/* harmony import */ var flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_BazaarPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/BazaarPage */ "./src/admin/components/BazaarPage.js");





/* harmony default export */ __webpack_exports__["default"] = (function () {
  // create the route
  flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.routes['flagrow-bazaar'] = {
    path: '/flagrow/bazaar',
    component: _components_BazaarPage__WEBPACK_IMPORTED_MODULE_4__["default"].component()
  }; // settings toggle on native extensions page

  flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.extensionSettings['flagrow-bazaar'] = function () {
    return m.route(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.route('flagrow-bazaar'));
  }; // Add tab to admin menu


  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'items', function (items) {
    items.add('flagrow-bazaar', flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      href: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.route('flagrow-bazaar'),
      icon: 'fas fa-shopping-bag',
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.nav.title'),
      description: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.nav.description')
    }));
  });
});

/***/ }),

/***/ "./src/admin/addTasksPage.js":
/*!***********************************!*\
  !*** ./src/admin/addTasksPage.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_TasksPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/TasksPage */ "./src/admin/components/TasksPage.js");



/* harmony default export */ __webpack_exports__["default"] = (function () {
  flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.routes['flagrow-bazaar-tasks'] = {
    path: '/flagrow/bazaar/tasks',
    component: _components_TasksPage__WEBPACK_IMPORTED_MODULE_2__["default"].component()
  };
});

/***/ }),

/***/ "./src/admin/components/BazaarLoader.js":
/*!**********************************************!*\
  !*** ./src/admin/components/BazaarLoader.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BazaarLoader; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/LinkButton */ "flarum/components/LinkButton");
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_4__);






var BazaarLoader =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(BazaarLoader, _Component);

  function BazaarLoader() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = BazaarLoader.prototype;

  _proto.view = function view() {
    var _this = this;

    var error = this.props.loading() === 'error';
    return m('div', {
      className: 'Bazaar--Loader ' + (error ? 'Error' : null),
      hidden: this.props.loading() === false
    }, [m('.Loader-modal', [m('.Loader-icon', flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default()(error ? 'fas fa-exclamation-triangle' : 'fas fa-shopping-bag')), m('div', [m('p', app.translator.trans(error ? 'flagrow-bazaar.admin.loader.error' : 'flagrow-bazaar.admin.loader.is_loading')), error ? [flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      className: 'Button Button--block',
      icon: 'fas fa-sync',
      onclick: function onclick() {
        return location.reload();
      },
      children: app.translator.trans('flagrow-bazaar.admin.loader.refresh')
    }), flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      className: 'Button Button--block',
      icon: 'fas fa-times',
      onclick: function onclick() {
        return _this.props.loading(false);
      },
      children: app.translator.trans('flagrow-bazaar.admin.loader.close')
    }), flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      className: 'Button Button--block',
      icon: 'fas fa-bug',
      href: 'https://github.com/flagrow/bazaar/issues',
      target: '_blank',
      config: {},
      // Disable internal Mithril routing
      children: app.translator.trans('flagrow-bazaar.admin.loader.report_issue')
    })] : null])])]);
  };

  return BazaarLoader;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/components/BazaarPage.js":
/*!********************************************!*\
  !*** ./src/admin/components/BazaarPage.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BazaarPage; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_ExtensionRepository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/ExtensionRepository */ "./src/admin/utils/ExtensionRepository.js");
/* harmony import */ var _ExtensionList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ExtensionList */ "./src/admin/components/ExtensionList.js");
/* harmony import */ var _ExtensionSearch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ExtensionSearch */ "./src/admin/components/ExtensionSearch.js");
/* harmony import */ var _BazaarPageHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BazaarPageHeader */ "./src/admin/components/BazaarPageHeader.js");







var BazaarPage =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(BazaarPage, _Component);

  function BazaarPage() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = BazaarPage.prototype;

  _proto.init = function init() {
    app.current = this;
    this.authorized = (app.data.settings['flagrow.bazaar.api_token'] || '').length > 0;
    this.connected = app.data.settings['flagrow.bazaar.connected'] && app.data.settings['flagrow.bazaar.connected'] !== '0';
    this.loading = m.prop(true);
    this.params = this.params();
    this.repository = new _utils_ExtensionRepository__WEBPACK_IMPORTED_MODULE_2__["default"](this.loading);
    this.extensionList = new _ExtensionList__WEBPACK_IMPORTED_MODULE_3__["default"]({
      params: this.params,
      loading: this.loading,
      repository: this.repository,
      connected: this.connected,
      authorized: this.authorized
    });
    this.search = _ExtensionSearch__WEBPACK_IMPORTED_MODULE_4__["default"].component({
      params: this.params,
      onsubmit: this.updateResults.bind(this)
    });
  };

  _proto.updateResults = function updateResults(params) {
    this.params = params;
    this.extensionList.update(params);
  };

  _proto.view = function view() {
    return m('div', {
      className: 'Bazaar Extensions'
    }, [_BazaarPageHeader__WEBPACK_IMPORTED_MODULE_5__["default"].component({
      connected: this.connected
    }), m('div', {
      className: 'ExtensionsPage-list'
    }, [m('div', {
      className: 'container'
    }, [this.search, this.extensionList.render()])])]);
  };
  /**
   * Get URL parameters that stick between filter changes.
   *
   * @return {Object}
   */


  _proto.stickyParams = function stickyParams() {
    return {
      sort: m.route.param('sort'),
      q: m.route.param('q')
    };
  };
  /**
   * Get parameters to pass to the DiscussionList component.
   *
   * @return {Object}
   */


  _proto.params = function params() {
    var params = this.stickyParams();
    params.filter = m.route.param('filter');
    return params;
  };

  return BazaarPage;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/components/BazaarPageHeader.js":
/*!**************************************************!*\
  !*** ./src/admin/components/BazaarPageHeader.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BazaarPageHeader; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/LinkButton */ "flarum/components/LinkButton");
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modals_FilePermissionsModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modals/FilePermissionsModal */ "./src/admin/modals/FilePermissionsModal.js");
/* harmony import */ var _modals_MemoryLimitModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modals/MemoryLimitModal */ "./src/admin/modals/MemoryLimitModal.js");
/* harmony import */ var _modals_BazaarConnectModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../modals/BazaarConnectModal */ "./src/admin/modals/BazaarConnectModal.js");
/* harmony import */ var _modals_BazaarSettingsModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../modals/BazaarSettingsModal */ "./src/admin/modals/BazaarSettingsModal.js");
/* harmony import */ var _modals_DashboardModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../modals/DashboardModal */ "./src/admin/modals/DashboardModal.js");











var BazaarPageHeader =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(BazaarPageHeader, _Component);

  function BazaarPageHeader() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = BazaarPageHeader.prototype;

  _proto.view = function view() {
    return m("div", {
      className: "ExtensionsPage-header"
    }, m("div", {
      className: "container"
    }, this.header()));
  };

  _proto.header = function header() {
    var buttons = [].concat(this.pagesButtons(), this.settingsButton(), this.requirementsButtons(), this.connectedButtons());
    return m('div', {
      className: 'ButtonGroup'
    }, buttons);
  };

  _proto.settingsButton = function settingsButton() {
    return [flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      className: 'Button Button--icon',
      icon: 'fas fa-cog',
      onclick: function onclick() {
        return flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.modal.show(new _modals_BazaarSettingsModal__WEBPACK_IMPORTED_MODULE_8__["default"]());
      }
    })];
  };
  /**
   * Loads a list of buttons that give insight in the state of this installation.
   * @returns {Array}
   */


  _proto.requirementsButtons = function requirementsButtons() {
    var memory_limit_met = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.data.settings['flagrow.bazaar.php.memory_limit-met'] || false;
    var memory_limit = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.data.settings['flagrow.bazaar.php.memory_limit'];
    var memory_requested = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.data.settings['flagrow.bazaar.php.memory_requested'];
    var file_permissions = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.data.settings['flagrow.bazaar.file-permissions'] || [];
    var components = [];

    if (!memory_limit_met) {
      components.push(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
        className: 'Button Button--icon Requirement-MemoryLimit',
        icon: 'fas fa-signal',
        onclick: function onclick() {
          return flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.modal.show(new _modals_MemoryLimitModal__WEBPACK_IMPORTED_MODULE_6__["default"]({
            memory_requested: memory_requested,
            memory_limit: memory_limit
          }));
        }
      }));
    }

    if (file_permissions.length > 0) {
      components.push(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
        className: 'Button Button--icon Requirement-FilePermissions',
        icon: 'fas fa-hdd',
        onclick: function onclick() {
          return flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.modal.show(new _modals_FilePermissionsModal__WEBPACK_IMPORTED_MODULE_5__["default"]({
            file_permissions: file_permissions
          }));
        }
      }));
    }

    return components;
  };

  _proto.connectedButtons = function connectedButtons() {
    var connected = this.props.connected;
    var flagrowHost = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.data.settings['flagrow.bazaar.flagrow-host'] || 'https://flagrow.io';

    if (connected) {
      return [flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
        className: 'Button Button--icon Connected',
        icon: 'fas fa-plug',
        onclick: function onclick() {
          return flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.modal.show(new _modals_DashboardModal__WEBPACK_IMPORTED_MODULE_9__["default"]({
            flagrowHost: flagrowHost
          }));
        }
      })];
    }

    return [flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      className: 'Button Button--icon Connect',
      icon: 'fas fa-plug',
      onclick: function onclick() {
        return flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.modal.show(new _modals_BazaarConnectModal__WEBPACK_IMPORTED_MODULE_7__["default"]({
          flagrowHost: flagrowHost
        }));
      }
    })];
  };

  _proto.pagesButtons = function pagesButtons() {
    // Sometimes no route has been set as the current one
    if (typeof flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.current === 'undefined') {
      return null;
    }

    var routeName = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.current.props.routeName;
    var links = [];
    links.push(flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      className: 'Button Button--icon',
      icon: 'fas fa-shopping-bag',
      href: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.route('flagrow-bazaar'),
      title: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.header.extensions'),
      active: routeName === 'flagrow-bazaar'
    }));
    links.push(flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      className: 'Button Button--icon',
      icon: 'fas fa-history',
      href: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.route('flagrow-bazaar-tasks'),
      title: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.header.tasks'),
      active: routeName === 'flagrow-bazaar-tasks'
    }));
    return links;
  };

  return BazaarPageHeader;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/admin/components/CustomCheckbox.js":
/*!************************************************!*\
  !*** ./src/admin/components/CustomCheckbox.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomCheckbox; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_utils_extract__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/extract */ "flarum/utils/extract");
/* harmony import */ var flarum_utils_extract__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_extract__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/utils/extractText */ "flarum/utils/extractText");
/* harmony import */ var flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_5__);







var CustomCheckbox =
/*#__PURE__*/
function (_Button) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(CustomCheckbox, _Button);

  function CustomCheckbox() {
    return _Button.apply(this, arguments) || this;
  }

  var _proto = CustomCheckbox.prototype;

  _proto.view = function view() {
    var attrs = Object.assign({}, this.props);
    delete attrs.state;
    delete attrs.children;
    attrs.className = attrs.className || '';
    attrs.type = attrs.type || 'button';
    if (this.props.state) attrs.className += ' active'; // If nothing else is provided, we use the textual button content as tooltip

    if (!attrs.title && this.props.children) {
      attrs.title = flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_5___default()(this.props.children);
    }

    var iconName = flarum_utils_extract__WEBPACK_IMPORTED_MODULE_4___default()(attrs, 'icon');
    if (iconName) attrs.className += ' hasIcon';
    var loading = flarum_utils_extract__WEBPACK_IMPORTED_MODULE_4___default()(attrs, 'loading');

    if (attrs.disabled || loading) {
      attrs.className += ' disabled' + (loading ? ' loading' : '');
      delete attrs.onclick;
    }

    return m("button", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, attrs, {
      onclick: this.onchange.bind(this)
    }), this.getButtonContent());
  };
  /**
   * Run a callback when the state of the checkbox is changed.
   *
   * @param {Boolean} checked
   * @protected
   */


  _proto.onchange = function onchange() {
    if (this.props.onchange) this.props.onchange(!this.props.state, this);
  };

  return CustomCheckbox;
}(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/admin/components/ExtensionList.js":
/*!***********************************************!*\
  !*** ./src/admin/components/ExtensionList.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExtensionList; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ExtensionListItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ExtensionListItem */ "./src/admin/components/ExtensionListItem.js");
/* harmony import */ var _BazaarLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BazaarLoader */ "./src/admin/components/BazaarLoader.js");
/* harmony import */ var flarum_components_Placeholder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/Placeholder */ "flarum/components/Placeholder");
/* harmony import */ var flarum_components_Placeholder__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Placeholder__WEBPACK_IMPORTED_MODULE_5__);







var ExtensionList =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ExtensionList, _Component);

  function ExtensionList() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ExtensionList.prototype;

  _proto.init = function init() {
    /**
     * Whether or not discussion results are loading.
     *
     * @type {Boolean}
     */
    this.loading = this.props.loading;
    /**
     * Whether or not there are more results that can be loaded.
     *
     * @type {Boolean}
     */

    this.moreResults = false;
    this.resultMeta = {}; // this.repository = new ExtensionRepository(this.loading);

    /**
     * The discussions in the discussion list.
     *
     * @type {Extension[]}
     */

    this.extensions = [];
    this.refresh();
  };

  _proto.view = function view() {
    var _this = this;

    var loading;

    if (this.loading()) {
      loading = _BazaarLoader__WEBPACK_IMPORTED_MODULE_4__["default"].component({
        loading: this.loading
      });
    } else if (this.moreResults) {
      loading = [flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
        children: app.translator.trans('flagrow-bazaar.admin.page.button.more', {
          current: this.resultMeta.pages_current + 1,
          total: this.resultMeta.pages_total
        }),
        className: 'Button Button--primary',
        onclick: this.loadMore.bind(this)
      })];
    }

    if (this.extensions.length === 0 && !this.loading) {
      var text = app.translator.trans('flagrow-bazaar.admin.page.state.no_results_available');

      if (!this.props.authorized) {
        text = app.translator.trans('flagrow-bazaar.admin.page.state.not_authorized');
      }

      return m("div", {
        className: "DiscussionList"
      }, flarum_components_Placeholder__WEBPACK_IMPORTED_MODULE_5___default.a.component({
        text: text
      }));
    }

    return m("div", {
      className: "ExtensionList-wrapper"
    }, m("div", {
      className: "ExtensionList"
    }, this.extensions.map(function (extension) {
      return _ExtensionListItem__WEBPACK_IMPORTED_MODULE_3__["default"].component({
        extension: extension,
        repository: _this.props.repository,
        connected: _this.props.connected,
        key: extension.package()
      });
    })), m("div", {
      className: "ExtensionList-loadMore"
    }, loading));
  };

  _proto.update = function update(params) {
    this.props.params = params;
    this.refresh();
  };
  /**
   * Clear and reload the discussion list.
   *
   * @public
   */


  _proto.refresh = function refresh(clear) {
    var _this2 = this;

    if (clear === void 0) {
      clear = true;
    }

    if (clear) {
      this.loading(true);
      this.extensions = [];
    }

    return this.loadResults().then(function (results) {
      _this2.extensions = [];

      _this2.parseResults(results);
    }, function () {
      _this2.loading(false);

      m.redraw();
    });
  };
  /**
   * Load a new page of discussion results.
   *
   * @param {Integer} offset The index to start the page at.
   * @return {Promise}
   */


  _proto.loadResults = function loadResults(offset) {
    var params = this.requestParams();
    params.page = {
      offset: offset
    };
    params.include = params.include.join(',');
    return app.store.find('bazaar/extensions', params);
  };
  /**
   * Parse results and append them to the discussion list.
   *
   * @param {Extension[]} results
   * @return {Extension[]}
   */


  _proto.parseResults = function parseResults(results) {
    [].push.apply(this.extensions, results);
    this.loading(false);
    this.moreResults = !!results.payload.links.next;
    this.resultMeta = results.payload.meta || {};
    m.lazyRedraw();
    return results;
  };
  /**
   * Load the next page of discussion results.
   *
   * @public
   */


  _proto.loadMore = function loadMore() {
    this.loading(true);
    this.loadResults(this.extensions.length).then(this.parseResults.bind(this));
  };
  /**
   * Get the parameters that should be passed in the API request to get
   * discussion results.
   *
   * @return {Object}
   * @api
   */


  _proto.requestParams = function requestParams() {
    var params = this.props.params;
    var out = {
      include: [],
      filter: {}
    };
    out.sort = this.sortMap()[params.sort];

    if (params.q) {
      out.filter.q = params.q;
    }

    if (params.filter) {
      out.filter[params.filter] = true;
    }

    return out;
  };
  /**
   * Get a map of sort keys (which appear in the URL, and are used for
   * translation) to the API sort value that they represent.
   *
   * @return {Object}
   */


  _proto.sortMap = function sortMap() {
    var map = {};

    if (this.props.params.q) {
      map.relevance = '';
    }

    return map;
  };

  return ExtensionList;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/components/ExtensionListItem.js":
/*!***************************************************!*\
  !*** ./src/admin/components/ExtensionListItem.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExtensionListItem; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/Dropdown */ "flarum/components/Dropdown");
/* harmony import */ var flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_components_Badge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/components/Badge */ "flarum/components/Badge");
/* harmony import */ var flarum_components_Badge__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Badge__WEBPACK_IMPORTED_MODULE_6__);








var ExtensionListItem =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ExtensionListItem, _Component);

  function ExtensionListItem() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ExtensionListItem.prototype;

  _proto.config = function config(isInitialized) {
    if (isInitialized) return; // Be careful to always use a `key` with this component or this mis-align the tooltips if items are added or removed

    if (this.props.extension.description()) this.$('.ExtensionIcon').tooltip({
      container: 'body'
    });
  };

  _proto.view = function view() {
    var extension = this.props.extension;
    var connected = this.props.connected || false;
    var controls = this.controlItems(extension, connected).toArray();
    var badges = this.badges(extension).toArray();
    var repository = this.props.repository;
    return m("div", {
      className: 'Extension ' + (extension.enabled() ? 'enabled ' : 'disabled ') + (extension.installed() ? 'installed ' : 'uninstalled ') + (extension.outdated() ? 'outdated ' : '') + (extension.pending() ? 'pending ' : '') + (controls.length > 0 ? 'hasControls' : '') + (extension.favorited() ? 'favorited' : '') + (extension.flarumCompatibilityCurrent() ? ' compatible' : 'incompatible'),
      key: extension.id(),
      "data-id": extension.id()
    }, m("span", {
      className: "Extension-icon",
      style: extension.icon() || '',
      title: extension.description()
    }, extension.icon() ? flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default()('fas fa-' + extension.icon().name) : ''), m("div", {
      className: "Extension-meta"
    }, m("ul", {
      className: "ExtensionListItem-badges badges"
    }, badges), m("label", {
      className: "Meta-Title"
    }, extension.title() || extension.package()), m("div", {
      className: "Meta-Item description"
    }, extension.description()), m("div", {
      className: "Meta-Item vendor"
    }, m("div", {
      className: "label"
    }, m("i", {
      className: "fas fa-user"
    }), " ", app.translator.trans('flagrow-bazaar.admin.page.extension.vendor')), m("div", {
      className: "value"
    }, extension.package().split('/')[0])), m("div", {
      className: "Meta-Item downloads"
    }, m("div", {
      className: "label"
    }, m("i", {
      class: "fas fa-download"
    }), " ", app.translator.trans('flagrow-bazaar.admin.page.extension.downloads')), m("div", {
      className: "value"
    }, extension.downloads())), m("div", {
      className: "Meta-Item favorites"
    }, m("div", {
      className: "label"
    }, m("i", {
      className: "fas fa-heart"
    }), " ", app.translator.trans('flagrow-bazaar.admin.page.extension.favorites')), m("div", {
      className: "value"
    }, extension.favorites())), extension.installed_version() ? m("div", {
      className: "Meta-Item version"
    }, m("div", {
      className: "label"
    }, app.translator.trans('flagrow-bazaar.admin.page.extension.installed_version')), m("div", {
      className: "value"
    }, extension.installed_version())) : '', m("div", {
      className: "Meta-Item version"
    }, m("div", {
      className: "label"
    }, app.translator.trans('flagrow-bazaar.admin.page.extension.highest_version')), m("div", {
      className: "value"
    }, extension.highest_version())), m("div", {
      className: "Extension-controls"
    }, connected ? m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: "Button Button--icon Button--flat favorite",
      icon: (extension.favorited() ? 'fas' : 'far') + ' fa-heart',
      onclick: function onclick() {
        return repository.favoriteExtension(extension);
      }
    }) : '', extension.discuss_link() ? m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: "Button Button--icon Button--flat",
      icon: "fas fa-comments",
      onclick: function onclick() {
        return window.open(extension.discuss_link());
      }
    }) : '', extension.landing_link() ? m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: "Button Button--icon Button--flat",
      icon: "fas fa-chart-line",
      onclick: function onclick() {
        return window.open(extension.landing_link());
      }
    }) : '', m(flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_5___default.a, {
      buttonClassName: "Button Button--icon Button--flat",
      menuClassName: "Dropdown-menu--right",
      icon: "fas fa-ellipsis-h"
    }, controls))));
  };

  _proto.controlItems = function controlItems(extension, connected) {
    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();
    var repository = this.props.repository;
    var favoriteTrans = extension.favorited() ? 'flagrow-bazaar.admin.page.button.remove_favorite_button' : 'flagrow-bazaar.admin.page.button.favorite_button';

    if (connected) {
      items.add('favorite', flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
        icon: 'fas fa-heart',
        children: app.translator.trans(favoriteTrans),
        onclick: function onclick() {
          repository.favoriteExtension(extension);
        }
      }));
    }

    if (!extension.pending()) {
      if (extension.enabled() && app.extensionSettings[name]) {
        items.add('settings', flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
          icon: 'fas fa-cog',
          children: app.translator.trans('core.admin.extensions.settings_button'),
          onclick: app.extensionSettings[name]
        }));
      }

      if (extension.can_uninstall()) {
        items.add('uninstall', flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
          icon: 'fas fa-minus-square',
          children: app.translator.trans('flagrow-bazaar.admin.page.button.uninstall'),
          onclick: function onclick() {
            repository.uninstallExtension(extension);
          }
        }));
      }

      if (extension.can_enable()) {
        items.add('enable', flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
          icon: 'fas fa-check-square',
          children: app.translator.trans('flagrow-bazaar.admin.page.button.enable'),
          onclick: function onclick() {
            repository.enableExtension(extension);
          }
        }));
      }

      if (extension.installed() && extension.outdated()) {
        items.add('update', flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
          icon: 'fas fa-level-up',
          children: app.translator.trans('flagrow-bazaar.admin.page.button.update'),
          onclick: function onclick() {
            repository.updateExtension(extension);
          }
        }));
      }

      if (extension.can_disable()) {
        items.add('disable', flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
          icon: 'fas fa-square',
          children: app.translator.trans('flagrow-bazaar.admin.page.button.disable'),
          onclick: function onclick() {
            repository.disableExtension(extension);
          }
        }));
      }

      if (extension.can_install()) {
        items.add('install', flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
          icon: 'fas fa-plus-square',
          children: app.translator.trans('flagrow-bazaar.admin.page.button.install'),
          onclick: function onclick() {
            repository.installExtension(extension);
          }
        }));
      }
    }

    if (extension.premium() && !connected) {
      items.add('subscribe', flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
        disabled: true,
        icon: 'fas fa-shopping-cart',
        children: app.translator.trans('flagrow-bazaar.admin.page.button.connect_to_subscribe')
      }));
    }

    if (extension.canCheckout() && connected) {
      items.add('subscribe', flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
        icon: 'fas fa-shopping-cart',
        children: app.translator.trans('flagrow-bazaar.admin.page.button.subscribe'),
        onclick: function onclick() {
          repository.premiumExtensionSubscribe(extension);
        }
      }));
    }

    if (extension.canSafelyUnsubscribe() && connected) {
      items.add('unsubscribe', flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
        icon: 'fas fa-ban',
        children: app.translator.trans('flagrow-bazaar.admin.page.button.unsubscribe'),
        onclick: function onclick() {
          repository.premiumExtensionUnsubscribe(extension);
        }
      }));
    }

    return items;
  };
  /**
   * Get the Badge components that apply to this discussion.
   *
   * @return {ItemList}
   * @public
   */


  _proto.badges = function badges(extension) {
    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();

    if (!extension.flarumCompatibilityNext()) {
      items.add('nextIncompatible', m(flarum_components_Badge__WEBPACK_IMPORTED_MODULE_6___default.a, {
        icon: "fas fa-exclamation-triangle",
        type: "nextIncompatible",
        label: app.translator.trans('flagrow-bazaar.admin.page.extension.next_incompatible')
      }));
    }

    if (!extension.flarumCompatibilityLatest()) {
      items.add('latestIncompatible', m(flarum_components_Badge__WEBPACK_IMPORTED_MODULE_6___default.a, {
        icon: "fas fa-exclamation-triangle",
        type: "latestIncompatible",
        label: app.translator.trans('flagrow-bazaar.admin.page.extension.latest_incompatible')
      }));
    }

    if (!extension.flarumCompatibilityCurrent()) {
      items.add('incompatible', m(flarum_components_Badge__WEBPACK_IMPORTED_MODULE_6___default.a, {
        icon: "fas fa-exclamation-triangle",
        type: "incompatible",
        label: app.translator.trans('flagrow-bazaar.admin.page.extension.incompatible')
      }));
    }

    if (extension.subscribed()) {
      items.add('subscribed', m(flarum_components_Badge__WEBPACK_IMPORTED_MODULE_6___default.a, {
        icon: "fas fa-shopping-cart",
        type: "subscribed",
        label: app.translator.trans('flagrow-bazaar.admin.page.extension.subscribed')
      }));
    } else if (extension.premium()) {
      items.add('premium', m(flarum_components_Badge__WEBPACK_IMPORTED_MODULE_6___default.a, {
        icon: "fas fa-certificate",
        type: "premium",
        label: app.translator.trans('flagrow-bazaar.admin.page.extension.premium')
      }));
    }

    if (extension.pending()) {
      items.add('pending', m(flarum_components_Badge__WEBPACK_IMPORTED_MODULE_6___default.a, {
        icon: "fas fa-circle-notch fa-spin",
        type: "pending",
        label: app.translator.trans('flagrow-bazaar.admin.page.extension.pending')
      }));
    }

    if (extension.installed() && extension.outdated()) {
      items.add('outdated', m(flarum_components_Badge__WEBPACK_IMPORTED_MODULE_6___default.a, {
        icon: "fas fa-warning",
        type: "outdated",
        label: app.translator.trans('flagrow-bazaar.admin.page.extension.outdated', {
          new: extension.highest_version()
        })
      }));
    }

    if (extension.favorited()) {
      items.add('favorited', m(flarum_components_Badge__WEBPACK_IMPORTED_MODULE_6___default.a, {
        icon: "fas fa-heart",
        type: "favorited",
        label: app.translator.trans('flagrow-bazaar.admin.page.extension.favorited')
      }));
    }

    if (extension.installed() && !extension.enabled()) {
      items.add('installed', m(flarum_components_Badge__WEBPACK_IMPORTED_MODULE_6___default.a, {
        icon: "fas fa-plus-square",
        type: "installed",
        label: app.translator.trans('flagrow-bazaar.admin.page.extension.installed')
      }));
    }

    if (extension.enabled()) {
      items.add('enabled', m(flarum_components_Badge__WEBPACK_IMPORTED_MODULE_6___default.a, {
        icon: "fas fa-check-square",
        type: "enabled",
        label: app.translator.trans('flagrow-bazaar.admin.page.extension.enabled')
      }));
    }

    return items;
  };

  return ExtensionListItem;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/components/ExtensionSearch.js":
/*!*************************************************!*\
  !*** ./src/admin/components/ExtensionSearch.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExtensionSearch; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CustomCheckbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CustomCheckbox */ "./src/admin/components/CustomCheckbox.js");
/* harmony import */ var _utils_debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/debounce */ "./src/admin/utils/debounce.js");





var ExtensionSearch =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ExtensionSearch, _Component);

  function ExtensionSearch() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ExtensionSearch.prototype;

  _proto.init = function init() {
    var _this = this;

    this.updateDebounce = Object(_utils_debounce__WEBPACK_IMPORTED_MODULE_3__["default"])(function () {
      if (_this.props.onsubmit) _this.props.onsubmit(_this.props.params);
    }, 500);
  };

  _proto.view = function view() {
    var _this2 = this;

    return m('div', [m('fieldset', {
      className: 'ExtensionSearch'
    }, m('input[type=text].FormControl', {
      value: this.props.params.q || '',
      oninput: m.withAttr('value', function (term) {
        return _this2.search(term);
      }),
      placeholder: app.translator.trans('flagrow-bazaar.admin.search.placeholder')
    })), m('div', {
      className: 'ExtensionFilters ButtonGroup'
    }, [_CustomCheckbox__WEBPACK_IMPORTED_MODULE_2__["default"].component({
      icon: 'fas fa-level-up',
      className: 'Button hasIcon',
      state: this.props.params.filter == 'update_required',
      onchange: function onchange(checked) {
        return _this2.toggleFilter('update_required', checked);
      },
      children: app.translator.trans('flagrow-bazaar.admin.search.filter_update_required')
    }), _CustomCheckbox__WEBPACK_IMPORTED_MODULE_2__["default"].component({
      icon: 'fas fa-circle-notch',
      className: 'Button hasIcon',
      state: this.props.params.filter == 'pending',
      onchange: function onchange(checked) {
        return _this2.toggleFilter('pending', checked);
      },
      children: app.translator.trans('flagrow-bazaar.admin.search.filter_pending')
    }), _CustomCheckbox__WEBPACK_IMPORTED_MODULE_2__["default"].component({
      icon: 'fas fa-plus-square',
      className: 'Button hasIcon',
      state: this.props.params.filter == 'installed',
      onchange: function onchange(checked) {
        return _this2.toggleFilter('installed', checked);
      },
      children: app.translator.trans('flagrow-bazaar.admin.search.filter_installed')
    }), this.connected ? [_CustomCheckbox__WEBPACK_IMPORTED_MODULE_2__["default"].component({
      icon: 'fas fa-heart',
      className: 'Button hasIcon',
      state: this.props.params.filter == 'favorited',
      onchange: function onchange(checked) {
        return _this2.toggleFilter('favorited', checked);
      },
      children: app.translator.trans('flagrow-bazaar.admin.search.filter_favorited')
    }), _CustomCheckbox__WEBPACK_IMPORTED_MODULE_2__["default"].component({
      icon: 'fas fa-shopping-cart',
      className: 'Button hasIcon',
      state: this.props.params.filter == 'subscribed',
      onchange: function onchange(checked) {
        return _this2.toggleFilter('subscribed', checked);
      },
      children: app.translator.trans('flagrow-bazaar.admin.search.filter_subscribed')
    })] : '', _CustomCheckbox__WEBPACK_IMPORTED_MODULE_2__["default"].component({
      icon: 'fas fa-certificate',
      className: 'Button hasIcon',
      state: this.props.params.filter == 'premium',
      onchange: function onchange(checked) {
        return _this2.toggleFilter('is_premium', checked);
      },
      children: app.translator.trans('flagrow-bazaar.admin.search.filter_premium')
    })])]);
  };

  _proto.toggleFilter = function toggleFilter(filter, checked) {
    if (checked) {
      this.props.params.filter = filter;
    } else {
      this.props.params.filter = null;
    }

    this.updateDebounce();
  };

  _proto.search = function search(term) {
    this.props.params.q = term;
    this.updateDebounce();
  };

  return ExtensionSearch;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/components/TaskListItem.js":
/*!**********************************************!*\
  !*** ./src/admin/components/TaskListItem.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TaskListItem; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_helpers_humanTime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/helpers/humanTime */ "flarum/helpers/humanTime");
/* harmony import */ var flarum_helpers_humanTime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_humanTime__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_helpers_fullTime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/helpers/fullTime */ "flarum/helpers/fullTime");
/* harmony import */ var flarum_helpers_fullTime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_fullTime__WEBPACK_IMPORTED_MODULE_6__);








var TaskListItem =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(TaskListItem, _Component);

  function TaskListItem() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = TaskListItem.prototype;

  _proto.init = function init() {
    this.extended = m.prop(false);
  };

  _proto.view = function view() {
    var _this = this;

    var task = this.props.task;

    var iconName = function () {
      switch (task.status()) {
        case 'success':
          return 'fas fa-check';

        case 'exception':
          return 'fas fa-exclamation';

        case 'working':
          return 'fas fa-spinner';
      }

      return 'fas fa-clock';
    }(); // We need to wrap items in a tbody because Mithril 0.2 and therefore flarum/Component does not allow a list of vnodes to be returned from a view
    // And we can't wrap <tr> in anything else without breaking the table
    // Having multiple <tbody> does not seem to be too much an issue https://stackoverflow.com/a/3076790/3133038


    return m("tbody", {
      className: 'TaskListItem status-' + task.status()
    }, m("tr", null, m("td", {
      className: "time-column"
    }, flarum_helpers_humanTime__WEBPACK_IMPORTED_MODULE_5___default()(task.created_at())), m("td", {
      className: "status-column",
      title: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.page.task.status.' + (task.status() !== null ? task.status() : 'unknown'))
    }, m("div", {
      className: "status"
    }, flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_3___default()(iconName))), m("td", {
      className: "command-column"
    }, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.page.task.command.' + task.command(), {
      extension: m("strong", null, task.package())
    })), m("td", {
      className: "details-column"
    }, flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      icon: 'fas fa-plus',
      className: 'Button',
      onclick: function onclick() {
        _this.extended(!_this.extended());
      }
    }))), this.extended() ? m("tr", null, m("td", {
      className: "output-column",
      colspan: "4"
    }, m("dl", null, m("dt", null, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.page.task.attribute.created_at')), m("dd", null, flarum_helpers_fullTime__WEBPACK_IMPORTED_MODULE_6___default()(task.created_at()))), m("dl", null, m("dt", null, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.page.task.attribute.started_at')), m("dd", null, flarum_helpers_fullTime__WEBPACK_IMPORTED_MODULE_6___default()(task.started_at()))), m("dl", null, m("dt", null, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.page.task.attribute.finished_at')), m("dd", null, flarum_helpers_fullTime__WEBPACK_IMPORTED_MODULE_6___default()(task.finished_at()))), m("p", null, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.page.task.header.output')), m("pre", {
      className: "output"
    }, task.output()))) : null);
  };

  return TaskListItem;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/admin/components/TasksPage.js":
/*!*******************************************!*\
  !*** ./src/admin/components/TasksPage.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TasksPage; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_TaskRepository__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../utils/TaskRepository */ "./src/admin/utils/TaskRepository.js");
/* harmony import */ var _BazaarPageHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BazaarPageHeader */ "./src/admin/components/BazaarPageHeader.js");
/* harmony import */ var _TaskListItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TaskListItem */ "./src/admin/components/TaskListItem.js");
/* harmony import */ var _BazaarLoader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BazaarLoader */ "./src/admin/components/BazaarLoader.js");








var TasksPage =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(TasksPage, _Component);

  function TasksPage() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = TasksPage.prototype;

  _proto.init = function init() {
    // Used in the header
    flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.current = this;
    this.loading = m.prop(false);
    this.repository = new _utils_TaskRepository__WEBPACK_IMPORTED_MODULE_3__["default"](this.loading);
    this.repository.loadNextPage();
    this.loader = _BazaarLoader__WEBPACK_IMPORTED_MODULE_6__["default"].component({
      loading: this.loading
    });
    this.connected = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.data.settings['flagrow.bazaar.connected'] && flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.data.settings['flagrow.bazaar.connected'] !== '0';
  };

  _proto.view = function view() {
    return m("div", {
      className: "ExtensionsPage Bazaar TaskPage"
    }, _BazaarPageHeader__WEBPACK_IMPORTED_MODULE_4__["default"].component({
      connected: this.connected
    }), m("div", {
      className: "ExtensionsPage-list"
    }, m("div", {
      className: "container"
    }, this.taskGroups().map(function (group) {
      return group.tasks.length ? m("div", null, m("h2", null, group.title), m("table", {
        className: "TaskPage-table"
      }, m("thead", null, m("tr", null, m("th", {
        className: "time-column"
      }, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.page.task.header.time')), m("th", {
        className: "status-column"
      }, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.page.task.header.status')), m("th", null, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.page.task.header.command')), m("th", {
        className: "details-column"
      }, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.page.task.header.details')))), group.tasks.map(function (task) {
        return m(_TaskListItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
          task: task
        });
      }))) : null;
    }))), this.loader);
  };
  /**
   * Split tasks into three groups: today, this month and older
   */


  _proto.taskGroups = function taskGroups() {
    var taskGroups = [{
      title: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.page.task.group.today'),
      tasks: []
    }, {
      title: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.page.task.group.lastmonth'),
      tasks: []
    }, {
      title: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.page.task.group.older'),
      tasks: []
    }];
    var currentGroup = 0; // Milliseconds from 1 January 1970 00:00:00 UTC

    var today = new Date().setHours(0, 0, 0, 0);
    this.repository.tasks().forEach(function (task) {
      // Milliseconds from 1 January 1970 00:00:00 UTC
      var taskDate = new Date(task.created_at()).setHours(0, 0, 0, 0);

      switch (currentGroup) {
        case 0:
          if (taskDate === today) {
            taskGroups[currentGroup].tasks.push(task);
          } else {
            currentGroup++;
          }

          break;

        case 1:
          // Check if the date is within the last 30 days
          if ((today - taskDate) / (1000 * 3600 * 24) <= 30) {
            taskGroups[currentGroup].tasks.push(task);
          } else {
            currentGroup++;
          }

          break;

        default:
          taskGroups[currentGroup].tasks.push(task);
      }
    });
    return taskGroups;
  };

  return TasksPage;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _models_Extension__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/Extension */ "./src/admin/models/Extension.js");
/* harmony import */ var _models_Task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/Task */ "./src/admin/models/Task.js");
/* harmony import */ var _addBazaarPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./addBazaarPage */ "./src/admin/addBazaarPage.js");
/* harmony import */ var _addTasksPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./addTasksPage */ "./src/admin/addTasksPage.js");






flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.initializers.add('flagrow-bazaar', function (app) {
  app.store.models['bazaar-extensions'] = _models_Extension__WEBPACK_IMPORTED_MODULE_2__["default"];
  app.store.models['bazaar-tasks'] = _models_Task__WEBPACK_IMPORTED_MODULE_3__["default"];
  Object(_addBazaarPage__WEBPACK_IMPORTED_MODULE_4__["default"])();
  Object(_addTasksPage__WEBPACK_IMPORTED_MODULE_5__["default"])();
});

/***/ }),

/***/ "./src/admin/modals/BazaarConnectModal.js":
/*!************************************************!*\
  !*** ./src/admin/modals/BazaarConnectModal.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BazaarConnectModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);




var BazaarConnectModal =
/*#__PURE__*/
function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(BazaarConnectModal, _Modal);

  function BazaarConnectModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = BazaarConnectModal.prototype;

  _proto.className = function className() {
    return 'FilePermissionsModal';
  };

  _proto.title = function title() {
    return app.translator.trans('flagrow-bazaar.admin.modal.connect-bazaar.title');
  };

  _proto.content = function content() {
    var flagrowHost = this.props.flagrowHost;
    return m('div', {
      className: 'Modal-body'
    }, [m('p', app.translator.trans('flagrow-bazaar.admin.modal.connect-bazaar.description', {
      host: flagrowHost
    })), m('div', {
      className: "App-primaryControl"
    }, [flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      type: 'submit',
      className: 'Button Button--primary Button--block',
      disabled: false,
      icon: 'check',
      children: app.translator.trans('flagrow-bazaar.admin.page.button.connect')
    })])]);
  };

  _proto.connect = function connect() {
    var popup = window.open();
    app.request({
      method: 'GET',
      url: app.forum.attribute('apiUrl') + '/bazaar/connect'
    }).then(function (response) {
      if (response && response.redirect) {
        popup.location = response.redirect;
      } else {
        popup.close();
      }
    });
  };
  /**
   * Handle the modal form's submit event.
   *
   * @param {Event} e
   */


  _proto.onsubmit = function onsubmit() {
    this.connect();
  };

  return BazaarConnectModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/modals/BazaarSettingsModal.js":
/*!*************************************************!*\
  !*** ./src/admin/modals/BazaarSettingsModal.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BazaarSettingsModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/SettingsModal */ "flarum/components/SettingsModal");
/* harmony import */ var flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3__);





var BazaarSettingsModal =
/*#__PURE__*/
function (_SettingsModal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(BazaarSettingsModal, _SettingsModal);

  function BazaarSettingsModal() {
    return _SettingsModal.apply(this, arguments) || this;
  }

  var _proto = BazaarSettingsModal.prototype;

  _proto.title = function title() {
    return flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.modal.settings.title');
  };

  _proto.form = function form() {
    return [m('div', {
      className: 'Form-group'
    }, [m('label', {
      for: 'use-cron'
    }, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.modal.settings.field.use_cron_for_tasks.label')), flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      state: this.setting('flagrow.bazaar.use_cron_for_tasks')(),
      onchange: this.setting('flagrow.bazaar.use_cron_for_tasks'),
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.modal.settings.field.use_cron_for_tasks.toggle')
    }), m('span', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.modal.settings.field.use_cron_for_tasks.description', {
      a: m("a", {
        href: "https://github.com/flagrow/bazaar/wiki/Cron-task-processing",
        target: "_blank"
      })
    }))]), m('div', {
      className: 'Form-group'
    }, [m('label', {
      for: 'bazaar-api-token'
    }, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.modal.settings.field.token.label')), m('input', {
      id: 'bazaar-api-token',
      className: 'FormControl',
      bidi: this.setting('flagrow.bazaar.api_token')
    }), m('span', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-bazaar.admin.modal.settings.field.token.description'))])];
  };

  return BazaarSettingsModal;
}(flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/admin/modals/DashboardModal.js":
/*!********************************************!*\
  !*** ./src/admin/modals/DashboardModal.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DashboardModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/SettingsModal */ "flarum/components/SettingsModal");
/* harmony import */ var flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/saveSettings */ "flarum/utils/saveSettings");
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__);






var DashboardModal =
/*#__PURE__*/
function (_SettingsModal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(DashboardModal, _SettingsModal);

  function DashboardModal() {
    return _SettingsModal.apply(this, arguments) || this;
  }

  var _proto = DashboardModal.prototype;

  _proto.title = function title() {
    return app.translator.trans('flagrow-bazaar.admin.modal.dashboard.title');
  };

  _proto.form = function form() {
    var flagrowHost = this.props.flagrowHost;
    var syncing = this.setting('flagrow.bazaar.sync', false);
    return m('div', {
      className: 'Modal-body'
    }, [m('p', app.translator.trans('flagrow-bazaar.admin.modal.dashboard.sync.description', {
      host: flagrowHost
    })), flarum_components_Switch__WEBPACK_IMPORTED_MODULE_1___default.a.component({
      state: syncing() === true || syncing() == 1,
      onchange: this.updateSetting.bind(this, syncing, 'flagrow.bazaar.sync'),
      children: app.translator.trans('flagrow-bazaar.admin.modal.dashboard.sync.switch', {
        host: flagrowHost
      })
    })]);
  };

  _proto.submitButton = function submitButton() {
    var flagrowHost = this.props.flagrowHost;
    return m('div', {
      className: 'ButtonGroup'
    }, [flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      className: 'Button Connected',
      icon: 'dashboard',
      children: app.translator.trans('flagrow-bazaar.admin.modal.dashboard.visit-remote-dashboard'),
      onclick: function onclick() {
        return window.open(flagrowHost + '/home');
      }
    })]);
  };
  /**
   * Updates setting in database.
   * @param prop
   * @param setting
   * @param value
   */


  _proto.updateSetting = function updateSetting(prop, setting, value) {
    var _saveSettings;

    flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3___default()((_saveSettings = {}, _saveSettings[setting] = value, _saveSettings));
    prop(value);
  };

  return DashboardModal;
}(flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/admin/modals/FilePermissionsModal.js":
/*!**************************************************!*\
  !*** ./src/admin/modals/FilePermissionsModal.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FilePermissionsModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);



var FilePermissionsModal =
/*#__PURE__*/
function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(FilePermissionsModal, _Modal);

  function FilePermissionsModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = FilePermissionsModal.prototype;

  _proto.className = function className() {
    return 'FilePermissionsModal';
  };

  _proto.title = function title() {
    return app.translator.trans('flagrow-bazaar.admin.modal.requirements.file-permissions.title');
  };

  _proto.content = function content() {
    var permissions = this.props.file_permissions;
    var paths = [];
    permissions.forEach(function (path) {
      paths.push(m('li', m('span', {
        className: 'code'
      }, path)));
    });
    return m('div', {
      className: 'Modal-body'
    }, [m('p', app.translator.trans('flagrow-bazaar.admin.modal.requirements.file-permissions.description', {
      a: m("a", {
        href: "https://github.com/flagrow/bazaar/wiki/File-permissions",
        target: "_blank"
      })
    })), m('ul', paths)]);
  };

  return FilePermissionsModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/modals/MemoryLimitModal.js":
/*!**********************************************!*\
  !*** ./src/admin/modals/MemoryLimitModal.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MemoryLimitModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);



var MemoryLimitModal =
/*#__PURE__*/
function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(MemoryLimitModal, _Modal);

  function MemoryLimitModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = MemoryLimitModal.prototype;

  _proto.className = function className() {
    return 'MemoryLimitModal';
  };

  _proto.title = function title() {
    return app.translator.trans('flagrow-bazaar.admin.modal.requirements.php-memory_limit.title');
  };

  _proto.content = function content() {
    var memory_requested = this.props.memory_requested;
    var memory_limit = this.props.memory_limit;
    return m('div', {
      className: 'Modal-body'
    }, app.translator.trans('flagrow-bazaar.admin.modal.requirements.php-memory_limit.description', {
      required: memory_requested,
      limit: memory_limit,
      a: m("a", {
        href: "https://github.com/flagrow/bazaar/wiki/PHP-memory-limit",
        target: "_blank"
      })
    }));
  };

  return MemoryLimitModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/models/Extension.js":
/*!***************************************!*\
  !*** ./src/admin/models/Extension.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Extension; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/utils/mixin */ "flarum/utils/mixin");
/* harmony import */ var flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/computed */ "flarum/utils/computed");
/* harmony import */ var flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3__);





var Extension =
/*#__PURE__*/
function (_mixin) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Extension, _mixin);

  function Extension() {
    return _mixin.apply(this, arguments) || this;
  }

  return Extension;
}(flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2___default()(flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a, {
  package: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('package'),
  title: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('title'),
  description: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('description'),
  license: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('license'),
  icon: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('icon'),
  locale: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('locale'),
  discuss_link: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('discuss_link'),
  landing_link: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('landing_link'),
  downloads: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('downloads'),
  installed: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('installed'),
  enabled: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('enabled'),
  pending: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('pending'),
  installed_version: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('installed_version'),
  highest_version: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('highest_version'),
  outdated: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('outdated'),
  flarum_id: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('flarum_id'),
  premium: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('premium'),
  subscribed: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('subscribed'),
  // Install/uninstall
  // Extension is available if it's either non-premium or premium & subscribed
  can_install: flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3___default()('installed', 'premium', 'subscribed', 'flarumCompatibilityCurrent', function (installed, premium, subscribed, flarumCompatibilityCurrent) {
    return !installed && flarumCompatibilityCurrent && (!premium || subscribed);
  }),
  can_uninstall: flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3___default()('installed', 'enabled', function (installed, enabled) {
    return installed && !enabled;
  }),
  // Enable/disable
  can_enable: flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3___default()('installed', 'enabled', function (installed, enabled) {
    return installed && !enabled;
  }),
  can_disable: flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3___default()('installed', 'enabled', function (installed, enabled) {
    return installed && enabled;
  }),
  canCheckout: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('canCheckout'),
  canUnsubscribe: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('canUnsubscribe'),
  canSafelyUnsubscribe: flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3___default()('canUnsubscribe', 'installed', function (canUnsubscribe, installed) {
    return canUnsubscribe && !installed;
  }),
  favorites: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('favorites'),
  favorited: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('favorited'),
  flarumCompatibilityLatest: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('flarumCompatibilityLatest'),
  flarumCompatibilityNext: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('flarumCompatibilityNext'),
  flarumCompatibilityCurrent: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('flarumCompatibilityCurrent')
}));



/***/ }),

/***/ "./src/admin/models/Task.js":
/*!**********************************!*\
  !*** ./src/admin/models/Task.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Task; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/utils/mixin */ "flarum/utils/mixin");
/* harmony import */ var flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2__);




var Task =
/*#__PURE__*/
function (_mixin) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Task, _mixin);

  function Task() {
    return _mixin.apply(this, arguments) || this;
  }

  return Task;
}(flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2___default()(flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a, {
  status: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('status'),
  command: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('command'),
  package: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('package'),
  output: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('output'),
  created_at: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('created_at'),
  started_at: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('started_at'),
  finished_at: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('finished_at')
}));



/***/ }),

/***/ "./src/admin/utils/ExtensionRepository.js":
/*!************************************************!*\
  !*** ./src/admin/utils/ExtensionRepository.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExtensionRepository; });
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _popupPromise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popupPromise */ "./src/admin/utils/popupPromise.js");



var ExtensionRepository =
/*#__PURE__*/
function () {
  function ExtensionRepository(loading) {
    this.extensions = m.prop([]);
    this.loading = loading;
  }
  /**
   * Handles a request error
   */


  var _proto = ExtensionRepository.prototype;

  _proto.requestError = function requestError() {
    // If an error occured, we can clear the loading overlay
    // The error means it's not processing anymore
    this.loading('error'); // Depending on how fast the "Oops! Something went wrong" popup appears,
    // the loading change is not taken into account. Use redraw to force remove the overlay

    m.redraw();
  };
  /**
   * Install an extension.
   * @param extension
   */


  _proto.installExtension = function installExtension(extension) {
    var _this = this;

    this.loading(true);
    flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.request({
      method: 'POST',
      url: flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.forum.attribute('apiUrl') + '/bazaar/extensions',
      timeout: 0,
      data: {
        id: extension.id()
      }
    }).then(function (response) {
      _this.updateExtensionInRepository(response);
    }).catch(function () {
      return _this.requestError();
    });
  };
  /**
   * Handles an installation failure.
   * @param extension
   */


  _proto.installFailure = function installFailure(extension) {
    this.resetNavigation();
    this.loadNextPage();
  };
  /**
   * Uninstall an extension.
   * @param extension
   */


  _proto.uninstallExtension = function uninstallExtension(extension) {
    var _this2 = this;

    this.loading(true);
    flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.request({
      method: 'DELETE',
      timeout: 0,
      url: flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.forum.attribute('apiUrl') + '/bazaar/extensions/' + extension.id()
    }).then(function (response) {
      _this2.updateExtensionInRepository(response);
    }).catch(function () {
      return _this2.requestError();
    });
  };
  /**
   * Handles an uninstall failure.
   * @param extension
   */


  _proto.uninstallFailure = function uninstallFailure(extension) {
    this.resetNavigation();
    this.loadNextPage();
  };
  /**
   * Processing (de-) favoriting extensions.
   * @param extension
   */


  _proto.favoriteExtension = function favoriteExtension(extension) {
    var _this3 = this;

    this.loading(true);
    flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.request({
      method: 'post',
      url: flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.forum.attribute('apiUrl') + '/bazaar/extensions/' + extension.id() + '/favorite',
      data: {
        favorite: extension.favorited() != true
      }
    }).then(function (response) {
      _this3.updateExtensionInRepository(response);
    }).catch(function () {
      return _this3.requestError();
    });
  };

  _proto.premiumExtensionSubscribe = function premiumExtensionSubscribe(extension, buy) {
    if (buy === void 0) {
      buy = true;
    }

    //this.loading(true);
    var popup = Object(_popupPromise__WEBPACK_IMPORTED_MODULE_1__["default"])({
      url: flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.forum.attribute('apiUrl') + '/bazaar/redirect/' + (buy ? '' : 'un') + 'subscribe/' + extension.id(),
      waitForUrl: flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.forum.attribute('apiUrl') + '/bazaar/callback/subscription'
    });
    popup.then(function () {
      window.location.reload();
    }).catch(function () {
      alert(flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.translator.trans('flagrow-bazaar.admin.page.extension.subscribe_check_failed'));
    });
  };

  _proto.premiumExtensionUnsubscribe = function premiumExtensionUnsubscribe(extension) {
    this.premiumExtensionSubscribe(extension, false);
  };
  /**
   * Updates an extension.
   * @param extension
   */


  _proto.updateExtension = function updateExtension(extension) {
    var _this4 = this;

    this.loading(true);
    flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.request({
      url: flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.forum.attribute('apiUrl') + '/bazaar/extensions/' + extension.id(),
      timeout: 0,
      method: 'PATCH'
    }).then(function (response) {
      _this4.updateExtensionInRepository(response);
    }).then(function () {
      location.reload();
    }).catch(function () {
      return _this4.requestError();
    });
  };
  /**
   * Toggles an extension (enable or disable).
   * @param extension
   */


  _proto.toggleExtension = function toggleExtension(extension) {
    var _this5 = this;

    this.loading(true);
    var enabled = extension.enabled();
    flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.request({
      url: flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.forum.attribute('apiUrl') + '/bazaar/extensions/' + extension.id() + '/toggle',
      method: 'PATCH',
      data: {
        enabled: !enabled
      }
    }).then(function (response) {
      _this5.updateExtensionInRepository(response);
    }).catch(function () {
      return _this5.requestError();
    });
  };
  /**
   * Disable an extension.
   * @param extension
   */


  _proto.disableExtension = function disableExtension(extension) {
    this.toggleExtension(extension);
  };
  /**
   * Enable an extension.
   * @param extension
   */


  _proto.enableExtension = function enableExtension(extension) {
    this.toggleExtension(extension);
  };
  /**
   * Loads the index of this extension in the extensions array.
   * @param extension
   * @returns {number}
   */


  _proto.getExtensionIndex = function getExtensionIndex(extension) {
    return this.extensions().findIndex(function (ext) {
      return ext.id() == extension.id();
    });
  };
  /**
   * Updates an extension and takes care of updating its state in the extension page too.
   * @param extension
   * @param property
   * @param value
   */


  _proto.updateExtensionInRepository = function updateExtensionInRepository(response) {
    this.loading(false);
    var extension = flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.store.createRecord('bazaar-extensions', response.data);
    this.extensions()[this.getExtensionIndex(extension)] = extension;
    m.redraw();
  };

  return ExtensionRepository;
}();



/***/ }),

/***/ "./src/admin/utils/TaskRepository.js":
/*!*******************************************!*\
  !*** ./src/admin/utils/TaskRepository.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExtensionRepository; });
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_0__);


var ExtensionRepository =
/*#__PURE__*/
function () {
  function ExtensionRepository(loading) {
    this.tasks = m.prop([]);
    this.nextPageUrl = null;
    this.loading = loading;
    this.resetNavigation();
  }

  var _proto = ExtensionRepository.prototype;

  _proto.loadNextPage = function loadNextPage() {
    var _this = this;

    if (this.loading() || !this.nextPageUrl) {
      return;
    }

    this.loading(true);
    flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.request({
      method: 'GET',
      url: this.nextPageUrl
    }).then(function (result) {
      var newTasks = result.data.map(function (data) {
        return flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.store.createRecord('bazaar-tasks', data);
      });

      _this.tasks(newTasks);

      _this.nextPageUrl = null;

      _this.loading(false);

      m.redraw();
    });
  };

  _proto.resetNavigation = function resetNavigation() {
    this.loading(false);
    this.nextPageUrl = flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.forum.attribute('apiUrl') + '/bazaar/tasks';
    this.tasks([]);
  };

  return ExtensionRepository;
}();



/***/ }),

/***/ "./src/admin/utils/debounce.js":
/*!*************************************!*\
  !*** ./src/admin/utils/debounce.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Based on _.debounce from underscore.js
 * Copyright (c) 2009-2017 Jeremy Ashkenas, DocumentCloud and Investigative
 * @see https://davidwalsh.name/javascript-debounce-function
 *
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 */
/* harmony default export */ __webpack_exports__["default"] = (function (func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
});
;

/***/ }),

/***/ "./src/admin/utils/popupPromise.js":
/*!*****************************************!*\
  !*** ./src/admin/utils/popupPromise.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (settings) {
  if (settings === void 0) {
    settings = {};
  }

  var url = settings.url || '/';
  var waitForUrl = settings.waitForUrl || null;
  var width = settings.width || 600;
  var height = settings.height || 400;
  var $window = $(window); // The new Promise polyfill of Mithril v1 is a lot better

  var deferred = m.deferred();
  var popup = window.open(url, 'bazaarPopup', "width=" + width + "," + ("height=" + height + ",") + ("top=" + ($window.height() / 2 - height / 2) + ",") + ("left=" + ($window.width() / 2 - width / 2) + ",") + 'status=no,scrollbars=no,resizable=no');
  var interval = window.setInterval(function () {
    try {
      if (popup.closed) {
        window.clearInterval(interval);
        deferred.reject();
      } else if (popup.document.URL === waitForUrl) {
        window.clearInterval(interval);
        popup.close();
        deferred.resolve();
      }
    } catch (e) {// Ignore errors, these will be cross-origin exceptions
    }
  }, 500);
  return deferred.promise;
});

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

/***/ "flarum/components/Badge":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Badge']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Badge'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/Dropdown":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/Dropdown']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Dropdown'];

/***/ }),

/***/ "flarum/components/LinkButton":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['components/LinkButton']" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/LinkButton'];

/***/ }),

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Modal'];

/***/ }),

/***/ "flarum/components/Placeholder":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['components/Placeholder']" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Placeholder'];

/***/ }),

/***/ "flarum/components/SettingsModal":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['components/SettingsModal']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/SettingsModal'];

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

/***/ "flarum/helpers/fullTime":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['helpers/fullTime']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/fullTime'];

/***/ }),

/***/ "flarum/helpers/humanTime":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['helpers/humanTime']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/humanTime'];

/***/ }),

/***/ "flarum/helpers/icon":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['helpers/icon']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/icon'];

/***/ }),

/***/ "flarum/utils/ItemList":
/*!*******************************************************!*\
  !*** external "flarum.core.compat['utils/ItemList']" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/ItemList'];

/***/ }),

/***/ "flarum/utils/computed":
/*!*******************************************************!*\
  !*** external "flarum.core.compat['utils/computed']" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/computed'];

/***/ }),

/***/ "flarum/utils/extract":
/*!******************************************************!*\
  !*** external "flarum.core.compat['utils/extract']" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/extract'];

/***/ }),

/***/ "flarum/utils/extractText":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['utils/extractText']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/extractText'];

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