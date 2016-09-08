(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ERouter"] = factory();
	else
		root["ERouter"] = factory();
})(this, function() {
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(2);

	var util = _interopRequireWildcard(_util);

	var _history = __webpack_require__(3);

	var _history2 = _interopRequireDefault(_history);

	var _transition = __webpack_require__(4);

	var _transition2 = _interopRequireDefault(_transition);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Router = function () {
	  function Router() {
	    var _this = this;

	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _objectDestructuringEmpty(_ref);

	    _classCallCheck(this, Router);

	    this._$view = util.query("[router-view]");
	    this.transition = this._$view.getAttribute('transition');
	    this._routes = [];
	    this._currentRoute = {};
	    this._nextRoute = {};
	    this._currentPath = '';
	    this.isLeaving = false;
	    this.leaveTimer = null;
	    this._beforeEach = [];
	    this._beforeEachCursor = 0;
	    this._next = true;
	    this.history = new _history2.default({
	      onChange: function onChange(path) {
	        _this._match(path);
	      }
	    });
	  }

	  // public api 

	  /** 
	   * create route map
	   * @param  {Object} map
	   * @return {Router}
	   */


	  _createClass(Router, [{
	    key: 'map',
	    value: function map(_map) {
	      for (var url in _map) {
	        var route = _map[url];
	        route.url = url;
	        route.count = 0;
	        this.on(route);
	      }
	      return this;
	    }

	    /**
	     * start router
	     * @param  {String|Element}
	     * @return {Router}
	     */

	  }, {
	    key: 'start',
	    value: function start(container) {
	      if (!container) {
	        throw new Error('Must start e-router with a component and a ' + 'root container.');
	      }
	      this.$container = util.query(container);
	      this._scanElink();
	      this.history.start();
	      return this;
	    }

	    /**
	     * register route from map
	     * @param  {Object} router
	     * @return {Router}
	     */

	  }, {
	    key: 'on',
	    value: function on(route) {
	      var exist = this._routes.filter(function (r) {
	        return r.url === route.url;
	      })[0];
	      if (exist) {
	        throw new Error('route ' + route.url + ' is existed');
	      }
	      this._routes.push(route);
	      return this;
	    }

	    /**
	     * pushstate
	     * @param  {String} path
	     * @return {Router}
	     */

	  }, {
	    key: 'go',
	    value: function go(path) {
	      this._beforeEachCursor = 0;
	      var route = this._nextRoute = this._getRoute(path);
	      if (route) {
	        this._walkBeforeEach(this._beforeEachCursor);
	        if (this._next) {
	          this.history.go(route.url);
	        }
	      }
	      return this;
	    }

	    /**
	     * stop the router
	     * @return {Router}
	     */

	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.history.stop();
	    }

	    /**
	     * beforeEach hook
	     * @param  {Function} beforeEach
	     * @return {[type]}
	     */

	  }, {
	    key: 'beforeEach',
	    value: function beforeEach(_beforeEach) {
	      if (typeof _beforeEach === 'function') {
	        this._beforeEach.push(_beforeEach);
	      } else {
	        throw new Error('beforeEach should be a function!');
	      }
	    }

	    // internal api

	  }, {
	    key: '_scanElink',
	    value: function _scanElink() {
	      var _this2 = this;

	      this.$container.addEventListener('click', function (e) {
	        var target = e.target;
	        var link = target.getAttribute('e-link');
	        if (link) {
	          _this2.go(link);
	        }
	      }, false);
	    }
	  }, {
	    key: '_walkBeforeEach',
	    value: function _walkBeforeEach(cursor) {
	      var beforeFn = this._beforeEach[cursor];
	      if (beforeFn) {
	        beforeFn(new _transition2.default({
	          Router: this,
	          to: this._nextRoute,
	          from: this._currentRoute
	        }));
	      }
	    }
	  }, {
	    key: '_match',
	    value: function _match(path) {
	      var _this3 = this;

	      var match = path.match(/(.*)\?(.*)/);
	      var route = void 0;
	      if (match) {
	        path = match[1];
	      }
	      if (this._currentPath === path) return;
	      this._currentPath = path;
	      route = this._currentRoute = this._getRoute(path);
	      if (route) {
	        this._leave();
	        if (typeof route.component === 'function') {
	          route.component(function (resolve) {
	            resolve.controller();
	            _this3._enter(resolve.template);
	          });
	        } else {
	          this._enter(content);
	        }
	      }
	    }
	  }, {
	    key: '_getRoute',
	    value: function _getRoute(path) {
	      var route = this._routes.filter(function (r) {
	        return r.url === path;
	      })[0];
	      if (!route) {
	        throw new Error('can not find the path \n        ' + path + ' in your routerMap!');
	      }
	      return route;
	    }
	  }, {
	    key: '_leave',
	    value: function _leave() {
	      var child = this._$view.children[0];
	      if (child) {
	        var transitionTime = util.getCSSTranstionTime(child);
	        if (this.transition) {
	          child.classList.add(this.transition + '-leave');
	        }
	        setTimeout(function () {
	          child.parentNode.removeChild(child);
	        }, transitionTime * 1000);
	      }
	    }
	  }, {
	    key: '_enter',
	    value: function _enter(content) {
	      var _this4 = this;

	      var node = document.createElement('div');
	      node.innerHTML = content;
	      this._$view.appendChild(node);
	      if (this.transition) {
	        (function () {
	          var transitionName = _this4.transition + '-transition';
	          var transitionEnter = _this4.transition + '-enter';
	          node.classList.add(transitionName);
	          node.classList.add(transitionEnter);
	          setTimeout(function () {
	            node.classList.remove(transitionEnter);
	          }, 16);
	        })();
	      }
	    }
	  }]);

	  return Router;
	}();

	exports.default = Router;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.noop = noop;
	exports.getCSSTranstionTime = getCSSTranstionTime;
	exports.query = query;
	/**
	 * noop
	 */
	function noop() {}

	function getCSSTranstionTime(node) {
	  var time = 0;
	  var cssTransition = getComputedStyle(node).transition;
	  if (cssTransition) {
	    time = cssTransition.split(/\s+/)[1];
	  }
	  return parseFloat(time);
	}

	function query(selector) {
	  var el = void 0;
	  if (typeof selector == 'string') {
	    el = document.querySelector(selector);
	  }
	  return el;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var History = function () {
	  function History(_ref) {
	    var root = _ref.root;
	    var onChange = _ref.onChange;

	    _classCallCheck(this, History);

	    if (root && root !== '/') {
	      // make sure there's the starting slash
	      if (root.charAt(0) !== '/') {
	        root = '/' + root;
	      }
	      // remove trailing slash
	      this.root = root.replace(/\/$/, '');
	      this.rootRE = new RegExp('^\\' + this.root);
	    } else {
	      this.root = null;
	    }
	    this.onChange = onChange;
	    var baseEl = document.querySelector('base');
	    this.base = baseEl && baseEl.getAttribute('href');
	  }

	  _createClass(History, [{
	    key: 'start',
	    value: function start() {
	      var _this = this;

	      this.listener = function (e) {
	        var url = location.pathname + location.search;
	        if (_this.root) {
	          url = url.replace(_this.rootRE, '') || '/';
	        }
	        _this.onChange(url, e && e.state, location.hash);
	      };
	      window.addEventListener('popstate', this.listener);
	      this.listener();
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      window.removeEventListener('popstate', this.listener);
	    }
	  }, {
	    key: 'go',
	    value: function go(path) {
	      history.replaceState({
	        pos: {
	          x: window.pageXOffset,
	          y: window.pageYOffset
	        }
	      }, '', location.href);
	      history.pushState({}, '', path);
	      this.onChange(path);
	    }
	  }]);

	  return History;
	}();

	exports.default = History;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Transition = function () {
	  function Transition() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var _ref$Router = _ref.Router;
	    var Router = _ref$Router === undefined ? function () {
	      throw new Error('Router is needed!');
	    } : _ref$Router;
	    var _ref$to = _ref.to;
	    var to = _ref$to === undefined ? {} : _ref$to;
	    var _ref$from = _ref.from;
	    var from = _ref$from === undefined ? {} : _ref$from;

	    _classCallCheck(this, Transition);

	    this.to = to;
	    this.from = from;
	    this.Router = Router;
	  }

	  _createClass(Transition, [{
	    key: 'abort',
	    value: function abort() {
	      this.Router._next = false;
	    }
	  }, {
	    key: 'next',
	    value: function next() {
	      this.Router._next = true;
	      this.Router._walkBeforeEach(++this.Router._beforeEachCursor);
	    }
	  }, {
	    key: 'redirect',
	    value: function redirect() {}
	  }]);

	  return Transition;
	}();

	exports.default = Transition;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;