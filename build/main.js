require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var domain = void 0,
    mainDomain = void 0,
    swapsDomain = void 0;
try {
  domain = 'tigermex.com';
  mainDomain = 'http://local.tigermex.com';
  swapsDomain = 'http://localdevswap.tigermex.com';
} catch (err) {}
/* harmony default export */ exports["a"] = {
  domain: domain,
  mainDomain: mainDomain,
  swapsDomain: swapsDomain,
  baseUrl: 'https://api.tigermex.com/',
  swapsUrl: 'https://api.tigermex.com/',
  webSocketUrl: 'wss://api.tigermex.com/wsswap/realTime',
  // 如果是合约云则为true
  isYun: true
};

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "starter",
    meta: [{
      charset: "utf-8"
    }, {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }, {
      hid: "description",
      name: "description",
      content: "Nuxt.js project"
    }],
    link: [{
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    }, {
      href: "/js/charting_library/base.css"
    }, {
      href: "/js/charting_library/base2.css"
    }],
    script: [{
      src: "/js/jquery-3.2.1.min.js"
    }, {
      src: "/js/charting_library/charting_library.min.js"
    }]
  },
  /*
   ** Global CSS
   */
  css: ["~assets/css/main.css"],
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#3B8070"
  },
  /*
   ** Build configuration
   */
  plugins: ["~plugins/i18n.js", "~plugins/st-ui.js", "~plugins/api.js", "~plugins/filter.js", {
    src: "~plugins/google.js",
    ssr: false
  }, {
    src: "~plugins/intercom.js",
    ssr: false
  }, "~plugins/echarts", "~plugins/qrcode.js"],
  modules: ["@nuxtjs/proxy"],
  proxy: {},
  build: {
    /*
     ** Run ESLINT on save
     */
    // extend(config, ctx) {
    //   if (ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: "pre",
    //       test: /\.(js|vue)$/,
    //       loader: "eslint-loader",
    //       exclude: /(node_modules)/
    //     });
    //   }
    // }
  }
};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("vuex");

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_huangenzi_Desktop_code_cloudweb_demo_node_modules_babel_runtime_regenerator__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_huangenzi_Desktop_code_cloudweb_demo_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Users_huangenzi_Desktop_code_cloudweb_demo_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vuex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_api_config_js__ = __webpack_require__(0);


var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_huangenzi_Desktop_code_cloudweb_demo_node_modules_babel_runtime_regenerator___default.a.mark(function _callee3() {
    var _this = this;

    var app, host, port, config, nuxt, builder;
    return __WEBPACK_IMPORTED_MODULE_0__Users_huangenzi_Desktop_code_cloudweb_demo_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            app = new __WEBPACK_IMPORTED_MODULE_1_koa___default.a();
            host = process.env.HOST || '0.0.0.0';
            port = process.env.PORT || 3008;

            // Import and Set Nuxt.js options

            config = __webpack_require__(1);

            config.dev = !(app.env === 'production');

            // Instantiate nuxt.js
            nuxt = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Nuxt"](config);

            // Build in development

            if (!config.dev) {
              _context3.next = 10;
              break;
            }

            builder = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Builder"](nuxt);
            _context3.next = 10;
            return builder.build();

          case 10:
            app.use(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_huangenzi_Desktop_code_cloudweb_demo_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
                var acceptLanguage;
                return __WEBPACK_IMPORTED_MODULE_0__Users_huangenzi_Desktop_code_cloudweb_demo_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        // VueX.Store.commit('auth/SET_TOKEN', {
                        //   token: ctx.cookies.get('token')
                        // })
                        // VueX.Store.commit('auth/SET_UID', {
                        //   uid: ctx.cookies.get('uid'),
                        //   ssid: ctx.cookies.get('ssid')
                        // })
                        // VueX.Store.commit('auth/SET_LOCALE', {
                        //   locale: ctx.cookies.get('locale'),
                        // })
                        ctx.req.instrument_id = ctx.query.id;
                        ctx.req.news = ctx.query.news;
                        ctx.req.token = ctx.cookies.get('token');
                        //  ctx.req.ssid = ctx.cookies.get('ssid')
                        //  ctx.req.uid = ctx.cookies.get('uid')
                        ctx.req.locale = ctx.cookies.get('lang');
                        if (!ctx.req.locale) {
                          acceptLanguage = ctx.req && ctx.req.headers['accept-language'];

                          if (acceptLanguage) {
                            if (~acceptLanguage.indexOf('en')) {
                              acceptLanguage = 'en-us';
                            }
                            if (~acceptLanguage.indexOf('CN')) {
                              acceptLanguage = 'zh-cn';
                            }
                            if (~['en-us', 'zh-cn'].indexOf(acceptLanguage)) {
                              ctx.cookies.set('lang', acceptLanguage, { domain: __WEBPACK_IMPORTED_MODULE_4__config_api_config_js__["a" /* default */].domain, maxAge: 3600 * 24 * 10, httpOnly: false });
                              ctx.req.locale = acceptLanguage;
                            }
                          }
                        } else {
                          if (~ctx.req.locale.indexOf('en')) {
                            ctx.req.locale = 'en-us';
                          }
                        }
                        _context.next = 7;
                        return next();

                      case 7:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x, _x2) {
                return _ref2.apply(this, arguments);
              };
            }());
            app.use(function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_huangenzi_Desktop_code_cloudweb_demo_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2(ctx, next) {
                return __WEBPACK_IMPORTED_MODULE_0__Users_huangenzi_Desktop_code_cloudweb_demo_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return next();

                      case 2:
                        ctx.status = 200; // koa defaults to 404 when it sees that status is unset
                        return _context2.abrupt('return', new Promise(function (resolve, reject) {
                          ctx.res.on('close', resolve);
                          ctx.res.on('finish', resolve);
                          nuxt.render(ctx.req, ctx.res, function (promise) {
                            // nuxt.render passes a rejected promise into callback on error.
                            promise.then(resolve).catch(reject);
                          });
                        }));

                      case 4:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this);
              }));

              return function (_x3, _x4) {
                return _ref3.apply(this, arguments);
              };
            }());

            app.listen(port, host);
            console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }







start();

/***/ }
/******/ ]);
//# sourceMappingURL=main.map