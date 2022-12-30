/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/dotenv/lib/main.js":
/*!*****************************************!*\
  !*** ./node_modules/dotenv/lib/main.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const fs = __webpack_require__(/*! fs */ \"fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\nconst os = __webpack_require__(/*! os */ \"os\")\nconst packageJson = __webpack_require__(/*! ../package.json */ \"./node_modules/dotenv/package.json\")\n\nconst version = packageJson.version\n\nconst LINE = /(?:^|^)\\s*(?:export\\s+)?([\\w.-]+)(?:\\s*=\\s*?|:\\s+?)(\\s*'(?:\\\\'|[^'])*'|\\s*\"(?:\\\\\"|[^\"])*\"|\\s*`(?:\\\\`|[^`])*`|[^#\\r\\n]+)?\\s*(?:#.*)?(?:$|$)/mg\n\n// Parser src into an Object\nfunction parse (src) {\n  const obj = {}\n\n  // Convert buffer to string\n  let lines = src.toString()\n\n  // Convert line breaks to same format\n  lines = lines.replace(/\\r\\n?/mg, '\\n')\n\n  let match\n  while ((match = LINE.exec(lines)) != null) {\n    const key = match[1]\n\n    // Default undefined or null to empty string\n    let value = (match[2] || '')\n\n    // Remove whitespace\n    value = value.trim()\n\n    // Check if double quoted\n    const maybeQuote = value[0]\n\n    // Remove surrounding quotes\n    value = value.replace(/^(['\"`])([\\s\\S]*)\\1$/mg, '$2')\n\n    // Expand newlines if double quoted\n    if (maybeQuote === '\"') {\n      value = value.replace(/\\\\n/g, '\\n')\n      value = value.replace(/\\\\r/g, '\\r')\n    }\n\n    // Add to object\n    obj[key] = value\n  }\n\n  return obj\n}\n\nfunction _log (message) {\n  console.log(`[dotenv@${version}][DEBUG] ${message}`)\n}\n\nfunction _resolveHome (envPath) {\n  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath\n}\n\n// Populates process.env from .env file\nfunction config (options) {\n  let dotenvPath = path.resolve(process.cwd(), '.env')\n  let encoding = 'utf8'\n  const debug = Boolean(options && options.debug)\n  const override = Boolean(options && options.override)\n\n  if (options) {\n    if (options.path != null) {\n      dotenvPath = _resolveHome(options.path)\n    }\n    if (options.encoding != null) {\n      encoding = options.encoding\n    }\n  }\n\n  try {\n    // Specifying an encoding returns a string instead of a buffer\n    const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }))\n\n    Object.keys(parsed).forEach(function (key) {\n      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {\n        process.env[key] = parsed[key]\n      } else {\n        if (override === true) {\n          process.env[key] = parsed[key]\n        }\n\n        if (debug) {\n          if (override === true) {\n            _log(`\"${key}\" is already defined in \\`process.env\\` and WAS overwritten`)\n          } else {\n            _log(`\"${key}\" is already defined in \\`process.env\\` and was NOT overwritten`)\n          }\n        }\n      }\n    })\n\n    return { parsed }\n  } catch (e) {\n    if (debug) {\n      _log(`Failed to load ${dotenvPath} ${e.message}`)\n    }\n\n    return { error: e }\n  }\n}\n\nconst DotenvModule = {\n  config,\n  parse\n}\n\nmodule.exports.config = DotenvModule.config\nmodule.exports.parse = DotenvModule.parse\nmodule.exports = DotenvModule\n\n\n//# sourceURL=webpack://crud-api/./node_modules/dotenv/lib/main.js?");

/***/ }),

/***/ "./src/model/cycled-queue.ts":
/*!***********************************!*\
  !*** ./src/model/cycled-queue.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CycledQueue\": () => (/* binding */ CycledQueue)\n/* harmony export */ });\nclass CycledQueue {\r\n    constructor() {\r\n        this._list = [];\r\n    }\r\n    add(item) {\r\n        this._list.push(item);\r\n    }\r\n    pop() {\r\n        const item = this._list.at(-1);\r\n        if (item === undefined) {\r\n            return item;\r\n        }\r\n        this._list = [item, ...this._list.slice(0, this._list.length)];\r\n        return item;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://crud-api/./src/model/cycled-queue.ts?");

/***/ }),

/***/ "./src/model/index.ts":
/*!****************************!*\
  !*** ./src/model/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CycledQueue\": () => (/* reexport safe */ _cycled_queue__WEBPACK_IMPORTED_MODULE_0__.CycledQueue),\n/* harmony export */   \"RequestHandler\": () => (/* reexport safe */ _request_handler__WEBPACK_IMPORTED_MODULE_1__.RequestHandler)\n/* harmony export */ });\n/* harmony import */ var _cycled_queue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cycled-queue */ \"./src/model/cycled-queue.ts\");\n/* harmony import */ var _request_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request-handler */ \"./src/model/request-handler.ts\");\n\r\n\r\n\n\n//# sourceURL=webpack://crud-api/./src/model/index.ts?");

/***/ }),

/***/ "./src/model/request-handler.ts":
/*!**************************************!*\
  !*** ./src/model/request-handler.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RequestHandler\": () => (/* binding */ RequestHandler)\n/* harmony export */ });\nclass RequestHandler {\r\n    constructor(next = undefined) {\r\n        this.next = next;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://crud-api/./src/model/request-handler.ts?");

/***/ }),

/***/ "./src/server/db/index.ts":
/*!********************************!*\
  !*** ./src/server/db/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getDbByType\": () => (/* binding */ getDbByType)\n/* harmony export */ });\n/* harmony import */ var _inmemory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inmemory */ \"./src/server/db/inmemory.ts\");\n/* harmony import */ var _remote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./remote */ \"./src/server/db/remote.ts\");\n\r\n\r\nconst getDbByType = ({ type = \"inmemory\", payload, }) => {\r\n    if (type === \"remote\") {\r\n        return new _remote__WEBPACK_IMPORTED_MODULE_1__.RemoteDb(payload);\r\n    }\r\n    return new _inmemory__WEBPACK_IMPORTED_MODULE_0__.InmemoryDb();\r\n};\r\n\n\n//# sourceURL=webpack://crud-api/./src/server/db/index.ts?");

/***/ }),

/***/ "./src/server/db/inmemory.ts":
/*!***********************************!*\
  !*** ./src/server/db/inmemory.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"InmemoryDb\": () => (/* binding */ InmemoryDb)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ \"./src/utils/index.ts\");\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model */ \"./src/server/model/index.ts\");\n\r\n\r\nclass InmemoryDbSegment extends _model__WEBPACK_IMPORTED_MODULE_1__.DatabaseSegment {\r\n    constructor() {\r\n        super(...arguments);\r\n        this._storage = [];\r\n    }\r\n    getAll() {\r\n        return Promise.resolve({ records: [...this._storage] });\r\n    }\r\n    getById(id) {\r\n        const item = this._storage.find((item) => item.id === id);\r\n        if (!item) {\r\n            return Promise.reject({\r\n                statusCode: 404,\r\n                message: `There's no record with an id ${id}`,\r\n            });\r\n        }\r\n        return Promise.resolve({ record: item });\r\n    }\r\n    create(record) {\r\n        const newRecord = Object.assign({ id: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateUid)() }, record);\r\n        this._storage.push(newRecord);\r\n        return Promise.resolve({ record: newRecord });\r\n    }\r\n    update(id, record) {\r\n        const item = this._storage.find((item) => item.id === id);\r\n        if (!item) {\r\n            return Promise.reject({\r\n                statusCode: 404,\r\n                message: `There's no record with an id ${id}`,\r\n            });\r\n        }\r\n        const newRecord = Object.assign(Object.assign(Object.assign({}, item), record), { id: item.id });\r\n        this._storage = this._storage.map((item) => item.id === id ? newRecord : item);\r\n        return Promise.resolve({ record: newRecord });\r\n    }\r\n    delete(id) {\r\n        const item = this._storage.find((item) => item.id === id);\r\n        if (!item) {\r\n            return Promise.reject({\r\n                statusCode: 404,\r\n                message: `There's no record with an id ${id}`,\r\n            });\r\n        }\r\n        this._storage = this._storage.filter((item) => item.id !== id);\r\n        return Promise.resolve();\r\n    }\r\n}\r\nclass InmemoryDb {\r\n    constructor() {\r\n        this._segments = {};\r\n    }\r\n    getOrCreateSegment(name) {\r\n        if (this._segments[name]) {\r\n            return Promise.resolve(this._segments[name]);\r\n        }\r\n        this._segments[name] = new InmemoryDbSegment();\r\n        return Promise.resolve(this._segments[name]);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://crud-api/./src/server/db/inmemory.ts?");

/***/ }),

/***/ "./src/server/db/remote.ts":
/*!*********************************!*\
  !*** ./src/server/db/remote.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RemoteDb\": () => (/* binding */ RemoteDb)\n/* harmony export */ });\n/* harmony import */ var node_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:http */ \"node:http\");\n/* harmony import */ var node_http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_http__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ \"./src/utils/index.ts\");\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model */ \"./src/server/model/index.ts\");\n\r\n\r\n\r\nclass RemoteDbSegment extends _model__WEBPACK_IMPORTED_MODULE_2__.DatabaseSegment {\r\n    constructor(url, name) {\r\n        super();\r\n        this._url = url;\r\n        this._name = name;\r\n    }\r\n    getAll() {\r\n        return new Promise((resolve, reject) => {\r\n            const request = node_http__WEBPACK_IMPORTED_MODULE_0___default().request(`${this._url}/${this._name}`, {\r\n                method: \"GET\",\r\n            });\r\n            request.on(\"response\", async (res) => {\r\n                const data = await (0,_utils__WEBPACK_IMPORTED_MODULE_1__.streamToPromise)(res);\r\n                if (res.statusCode === 404 || res.statusCode === 400) {\r\n                    reject({ statusCode: res.statusCode, message: data });\r\n                }\r\n                resolve(JSON.parse(data));\r\n            });\r\n            request.end();\r\n        });\r\n    }\r\n    getById(id) {\r\n        return new Promise((resolve, reject) => {\r\n            const request = node_http__WEBPACK_IMPORTED_MODULE_0___default().request(`${this._url}/${this._name}/${id}`, {\r\n                method: \"GET\",\r\n            });\r\n            request.on(\"response\", async (res) => {\r\n                const data = await (0,_utils__WEBPACK_IMPORTED_MODULE_1__.streamToPromise)(res);\r\n                if (res.statusCode === 400 || res.statusCode === 404) {\r\n                    reject({ statusCode: res.statusCode, message: data });\r\n                    return;\r\n                }\r\n                resolve(JSON.parse(data));\r\n            });\r\n            request.end();\r\n        });\r\n    }\r\n    create(record) {\r\n        return new Promise((resolve, reject) => {\r\n            const request = node_http__WEBPACK_IMPORTED_MODULE_0___default().request(`${this._url}/${this._name}`, {\r\n                method: \"POST\",\r\n            });\r\n            request.on(\"response\", async (res) => {\r\n                const data = await (0,_utils__WEBPACK_IMPORTED_MODULE_1__.streamToPromise)(res);\r\n                if (res.statusCode === 400 || res.statusCode === 404) {\r\n                    reject({ statusCode: res.statusCode, message: data });\r\n                    return;\r\n                }\r\n                resolve(JSON.parse(data));\r\n            });\r\n            request.write(JSON.stringify({\r\n                record,\r\n            }));\r\n            request.end();\r\n        });\r\n    }\r\n    update(id, record) {\r\n        return new Promise((resolve, reject) => {\r\n            const request = node_http__WEBPACK_IMPORTED_MODULE_0___default().request(`${this._url}/${this._name}/${id}`, {\r\n                method: \"PUT\",\r\n            });\r\n            request.on(\"response\", async (res) => {\r\n                const data = await (0,_utils__WEBPACK_IMPORTED_MODULE_1__.streamToPromise)(res);\r\n                if (res.statusCode === 400 || res.statusCode === 404) {\r\n                    reject({ statusCode: res.statusCode, message: data });\r\n                    return;\r\n                }\r\n                resolve(JSON.parse(data));\r\n            });\r\n            request.write(JSON.stringify({\r\n                record,\r\n            }));\r\n            request.end();\r\n        });\r\n    }\r\n    delete(id) {\r\n        return new Promise((resolve, reject) => {\r\n            const request = node_http__WEBPACK_IMPORTED_MODULE_0___default().request(`${this._url}/${this._name}/${id}`, {\r\n                method: \"DELETE\",\r\n            });\r\n            request.on(\"response\", async (res) => {\r\n                if (res.statusCode === 400 || res.statusCode === 404) {\r\n                    const errorMessage = await (0,_utils__WEBPACK_IMPORTED_MODULE_1__.streamToPromise)(res);\r\n                    reject({ statusCode: res.statusCode, message: errorMessage });\r\n                    return;\r\n                }\r\n                resolve();\r\n            });\r\n            request.end();\r\n        });\r\n    }\r\n}\r\nclass RemoteDb extends _model__WEBPACK_IMPORTED_MODULE_2__.Database {\r\n    constructor(url) {\r\n        super();\r\n        this._url = url;\r\n    }\r\n    async getOrCreateSegment(name) {\r\n        return new Promise((resolve, reject) => {\r\n            const request = node_http__WEBPACK_IMPORTED_MODULE_0___default().request(`${this._url}/segment`, {\r\n                method: \"POST\",\r\n            });\r\n            request.on(\"response\", async (res) => {\r\n                const data = await (0,_utils__WEBPACK_IMPORTED_MODULE_1__.streamToPromise)(res);\r\n                if (res.statusCode === 400 || res.statusCode === 404) {\r\n                    reject({ statusCode: res.statusCode, message: data });\r\n                    return;\r\n                }\r\n                resolve(new RemoteDbSegment(this._url, name));\r\n            });\r\n            request.write(JSON.stringify({\r\n                name,\r\n            }));\r\n            request.end();\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://crud-api/./src/server/db/remote.ts?");

/***/ }),

/***/ "./src/server/handlers/create-user-request-handler.ts":
/*!************************************************************!*\
  !*** ./src/server/handlers/create-user-request-handler.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CreateUserRequestHanlder\": () => (/* binding */ CreateUserRequestHanlder)\n/* harmony export */ });\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model */ \"./src/model/index.ts\");\n/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/index */ \"./src/utils/index.ts\");\n/* harmony import */ var _repositories_user_repository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../repositories/user-repository */ \"./src/server/repositories/user-repository.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store */ \"./src/server/store.ts\");\n\r\n\r\n\r\n\r\nlet repo;\r\n_store__WEBPACK_IMPORTED_MODULE_3__[\"default\"].onUpdate((state) => {\r\n    repo = new _repositories_user_repository__WEBPACK_IMPORTED_MODULE_2__.UserRepository(state.db);\r\n});\r\nconst REQUIRED_FIELDS = [\"name\", \"age\", \"hobbies\"];\r\nclass CreateUserRequestHanlder extends _model__WEBPACK_IMPORTED_MODULE_0__.RequestHandler {\r\n    constructor(next) {\r\n        super(next);\r\n    }\r\n    async handle(req, res) {\r\n        const url = new URL(req.url, `http://${req.headers.host}`);\r\n        if (url.pathname !== \"/api/users\" || req.method !== \"POST\") {\r\n            return this.next.handle(req, res);\r\n        }\r\n        const body = await (0,_utils_index__WEBPACK_IMPORTED_MODULE_1__.streamToPromise)(req);\r\n        const userParams = JSON.parse(body);\r\n        const { name, age, hobbies } = userParams;\r\n        if (!name || !age || !hobbies) {\r\n            const undefinedParams = REQUIRED_FIELDS.filter((field) => userParams[field] === undefined);\r\n            res.writeHead(400, { \"Content-Type\": \"text/plain\" });\r\n            res.end(`Value for ${undefinedParams} param(s) is mandatory`);\r\n            return;\r\n        }\r\n        const result = await repo.add(userParams);\r\n        res.writeHead(200, { \"Content-Type\": \"application/json\" });\r\n        res.end(JSON.stringify({\r\n            data: result,\r\n        }));\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://crud-api/./src/server/handlers/create-user-request-handler.ts?");

/***/ }),

/***/ "./src/server/handlers/delete-user-request-handler.ts":
/*!************************************************************!*\
  !*** ./src/server/handlers/delete-user-request-handler.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DeleteUserRequestHanlder\": () => (/* binding */ DeleteUserRequestHanlder)\n/* harmony export */ });\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model */ \"./src/model/index.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ \"./src/utils/index.ts\");\n/* harmony import */ var _repositories_user_repository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../repositories/user-repository */ \"./src/server/repositories/user-repository.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store */ \"./src/server/store.ts\");\n\r\n\r\n\r\n\r\nlet repo;\r\n_store__WEBPACK_IMPORTED_MODULE_3__[\"default\"].onUpdate((state) => {\r\n    repo = new _repositories_user_repository__WEBPACK_IMPORTED_MODULE_2__.UserRepository(state.db);\r\n});\r\nclass DeleteUserRequestHanlder extends _model__WEBPACK_IMPORTED_MODULE_0__.RequestHandler {\r\n    constructor(next) {\r\n        super(next);\r\n    }\r\n    async handle(req, res) {\r\n        const url = new URL(req.url, `http://${req.headers.host}`);\r\n        if (!url.pathname.startsWith(\"/api/users\") || req.method !== \"DELETE\") {\r\n            return this.next.handle(req, res);\r\n        }\r\n        const [, , id] = url.pathname.slice(1).split(\"/\");\r\n        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_1__.isValidUid)(id)) {\r\n            res.writeHead(400);\r\n            res.end(`${id} is not valid userId`);\r\n        }\r\n        try {\r\n            await repo.delete(id);\r\n        }\r\n        catch (err) {\r\n            if (err.statusCode === 404) {\r\n                res.writeHead(404, { \"Content-Type\": \"text/plain\" });\r\n                res.end(`User with id ${id} was not found`);\r\n            }\r\n            return;\r\n        }\r\n        res.writeHead(204);\r\n        res.end();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://crud-api/./src/server/handlers/delete-user-request-handler.ts?");

/***/ }),

/***/ "./src/server/handlers/get-user-by-id-request-handler.ts":
/*!***************************************************************!*\
  !*** ./src/server/handlers/get-user-by-id-request-handler.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GetUserByIdRequestHanlder\": () => (/* binding */ GetUserByIdRequestHanlder)\n/* harmony export */ });\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model */ \"./src/model/index.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ \"./src/utils/index.ts\");\n/* harmony import */ var _repositories_user_repository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../repositories/user-repository */ \"./src/server/repositories/user-repository.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store */ \"./src/server/store.ts\");\n\r\n\r\n\r\n\r\nlet repo;\r\n_store__WEBPACK_IMPORTED_MODULE_3__[\"default\"].onUpdate((state) => {\r\n    repo = new _repositories_user_repository__WEBPACK_IMPORTED_MODULE_2__.UserRepository(state.db);\r\n});\r\nclass GetUserByIdRequestHanlder extends _model__WEBPACK_IMPORTED_MODULE_0__.RequestHandler {\r\n    constructor(next) {\r\n        super(next);\r\n    }\r\n    async handle(req, res) {\r\n        const url = new URL(req.url, `http://${req.headers.host}`);\r\n        if (req.method !== \"GET\" || !url.pathname.startsWith(\"/api/users\")) {\r\n            return this.next.handle(req, res);\r\n        }\r\n        const [, , id] = url.pathname.slice(1).split(\"/\");\r\n        if (!id) {\r\n            return this.next.handle(req, res);\r\n        }\r\n        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_1__.isValidUid)(id)) {\r\n            res.writeHead(400, { \"Content-Type\": \"text/plain\" });\r\n            res.end(`${id} is not a valid uuid`);\r\n            return;\r\n        }\r\n        try {\r\n            const { record } = await repo.getById(id);\r\n            res.writeHead(200, { \"Content-Type\": \"application/json\" });\r\n            res.end(JSON.stringify({\r\n                data: record,\r\n            }));\r\n        }\r\n        catch (err) {\r\n            if (err.statusCode === 404) {\r\n                res.writeHead(404, { \"Content-Type\": \"text/plain\" });\r\n                res.end(`User with id ${id} doesn't exist`);\r\n            }\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://crud-api/./src/server/handlers/get-user-by-id-request-handler.ts?");

/***/ }),

/***/ "./src/server/handlers/get-users-request-handler.ts":
/*!**********************************************************!*\
  !*** ./src/server/handlers/get-users-request-handler.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GetUsersRequestHanlder\": () => (/* binding */ GetUsersRequestHanlder)\n/* harmony export */ });\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model */ \"./src/model/index.ts\");\n/* harmony import */ var _repositories__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../repositories */ \"./src/server/repositories/index.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store */ \"./src/server/store.ts\");\n\r\n\r\n\r\nlet repo;\r\n_store__WEBPACK_IMPORTED_MODULE_2__[\"default\"].onUpdate((state) => {\r\n    repo = new _repositories__WEBPACK_IMPORTED_MODULE_1__.UserRepository(state.db);\r\n});\r\nclass GetUsersRequestHanlder extends _model__WEBPACK_IMPORTED_MODULE_0__.RequestHandler {\r\n    constructor(next) {\r\n        super(next);\r\n    }\r\n    async handle(req, res) {\r\n        const url = new URL(req.url, `http://${req.headers.host}`);\r\n        if (req.method !== \"GET\" || url.pathname !== \"/api/users\") {\r\n            return this.next.handle(req, res);\r\n        }\r\n        const { records } = await repo.getAll();\r\n        res.writeHead(200, { \"Content-Type\": \"application/json\" });\r\n        res.end(JSON.stringify({\r\n            data: records,\r\n        }));\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://crud-api/./src/server/handlers/get-users-request-handler.ts?");

/***/ }),

/***/ "./src/server/handlers/index.ts":
/*!**************************************!*\
  !*** ./src/server/handlers/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CreateUserRequestHanlder\": () => (/* reexport safe */ _create_user_request_handler__WEBPACK_IMPORTED_MODULE_0__.CreateUserRequestHanlder),\n/* harmony export */   \"DeleteUserRequestHanlder\": () => (/* reexport safe */ _delete_user_request_handler__WEBPACK_IMPORTED_MODULE_3__.DeleteUserRequestHanlder),\n/* harmony export */   \"GetUserByIdRequestHanlder\": () => (/* reexport safe */ _get_user_by_id_request_handler__WEBPACK_IMPORTED_MODULE_2__.GetUserByIdRequestHanlder),\n/* harmony export */   \"GetUsersRequestHanlder\": () => (/* reexport safe */ _get_users_request_handler__WEBPACK_IMPORTED_MODULE_1__.GetUsersRequestHanlder),\n/* harmony export */   \"NotExistingRequestsHandler\": () => (/* reexport safe */ _not_existing_requests_handler__WEBPACK_IMPORTED_MODULE_5__.NotExistingRequestsHandler),\n/* harmony export */   \"UpdateUserRequestHanlder\": () => (/* reexport safe */ _update_user_request_handler__WEBPACK_IMPORTED_MODULE_4__.UpdateUserRequestHanlder)\n/* harmony export */ });\n/* harmony import */ var _create_user_request_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-user-request-handler */ \"./src/server/handlers/create-user-request-handler.ts\");\n/* harmony import */ var _get_users_request_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-users-request-handler */ \"./src/server/handlers/get-users-request-handler.ts\");\n/* harmony import */ var _get_user_by_id_request_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get-user-by-id-request-handler */ \"./src/server/handlers/get-user-by-id-request-handler.ts\");\n/* harmony import */ var _delete_user_request_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./delete-user-request-handler */ \"./src/server/handlers/delete-user-request-handler.ts\");\n/* harmony import */ var _update_user_request_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./update-user-request-handler */ \"./src/server/handlers/update-user-request-handler.ts\");\n/* harmony import */ var _not_existing_requests_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./not-existing-requests-handler */ \"./src/server/handlers/not-existing-requests-handler.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://crud-api/./src/server/handlers/index.ts?");

/***/ }),

/***/ "./src/server/handlers/not-existing-requests-handler.ts":
/*!**************************************************************!*\
  !*** ./src/server/handlers/not-existing-requests-handler.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NotExistingRequestsHandler\": () => (/* binding */ NotExistingRequestsHandler)\n/* harmony export */ });\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model */ \"./src/model/index.ts\");\n\r\nclass NotExistingRequestsHandler extends _model__WEBPACK_IMPORTED_MODULE_0__.RequestHandler {\r\n    handle(req, res) {\r\n        const url = new URL(req.url, `http://${req.headers.host}`);\r\n        res.writeHead(404, { \"Content-Type\": \"text/plain\" });\r\n        res.end(`Resource under the route ${url.pathname} hasn't been found.`);\r\n        return Promise.resolve();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://crud-api/./src/server/handlers/not-existing-requests-handler.ts?");

/***/ }),

/***/ "./src/server/handlers/update-user-request-handler.ts":
/*!************************************************************!*\
  !*** ./src/server/handlers/update-user-request-handler.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UpdateUserRequestHanlder\": () => (/* binding */ UpdateUserRequestHanlder)\n/* harmony export */ });\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model */ \"./src/model/index.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ \"./src/utils/index.ts\");\n/* harmony import */ var _repositories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../repositories */ \"./src/server/repositories/index.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store */ \"./src/server/store.ts\");\n\r\n\r\n\r\n\r\nlet repo;\r\n_store__WEBPACK_IMPORTED_MODULE_3__[\"default\"].onUpdate((state) => {\r\n    repo = new _repositories__WEBPACK_IMPORTED_MODULE_2__.UserRepository(state.db);\r\n});\r\nclass UpdateUserRequestHanlder extends _model__WEBPACK_IMPORTED_MODULE_0__.RequestHandler {\r\n    constructor(next) {\r\n        super(next);\r\n    }\r\n    async handle(req, res) {\r\n        const url = new URL(req.url, `http://${req.headers.host}`);\r\n        if (!url.pathname.startsWith(\"/api/users\") || req.method !== \"PUT\") {\r\n            return this.next.handle(req, res);\r\n        }\r\n        const [, , id] = url.pathname.slice(1).split(\"/\");\r\n        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_1__.isValidUid)(id)) {\r\n            res.writeHead(400, { \"Content-Type\": \"text/plain\" });\r\n            res.end(`${id} is not a valid uuid`);\r\n            return;\r\n        }\r\n        const body = await (0,_utils__WEBPACK_IMPORTED_MODULE_1__.streamToPromise)(req);\r\n        const newUserData = JSON.parse(body);\r\n        const { record } = await repo.edit(id, newUserData);\r\n        res.writeHead(200, { \"Content-Type\": \"application/json\" });\r\n        res.end(JSON.stringify({\r\n            data: record,\r\n        }));\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://crud-api/./src/server/handlers/update-user-request-handler.ts?");

/***/ }),

/***/ "./src/server/index.ts":
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ \"./node_modules/dotenv/lib/main.js\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var node_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:http */ \"node:http\");\n/* harmony import */ var node_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_http__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var node_process__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:process */ \"node:process\");\n/* harmony import */ var node_process__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_process__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./handlers */ \"./src/server/handlers/index.ts\");\n\r\n\r\n\r\n\r\ndotenv__WEBPACK_IMPORTED_MODULE_0__.config();\r\nconst server = (0,node_http__WEBPACK_IMPORTED_MODULE_1__.createServer)();\r\nconst addRequestHandlers = (server) => {\r\n    const notExistingRequestHandler = new _handlers__WEBPACK_IMPORTED_MODULE_3__.NotExistingRequestsHandler();\r\n    const deleteUserRequestHandler = new _handlers__WEBPACK_IMPORTED_MODULE_3__.DeleteUserRequestHanlder(notExistingRequestHandler);\r\n    const createUserRequesHandler = new _handlers__WEBPACK_IMPORTED_MODULE_3__.CreateUserRequestHanlder(deleteUserRequestHandler);\r\n    const updateUserRequestHanlder = new _handlers__WEBPACK_IMPORTED_MODULE_3__.UpdateUserRequestHanlder(createUserRequesHandler);\r\n    const getUsersRequestHanlder = new _handlers__WEBPACK_IMPORTED_MODULE_3__.GetUsersRequestHanlder(updateUserRequestHanlder);\r\n    const requestHandlers = new _handlers__WEBPACK_IMPORTED_MODULE_3__.GetUserByIdRequestHanlder(getUsersRequestHanlder);\r\n    return server.on(\"request\", async (req, res) => await requestHandlers.handle(req, res));\r\n};\r\naddRequestHandlers(server).listen((node_process__WEBPACK_IMPORTED_MODULE_2___default().env.AT_CRUD_API_PORT), () => {\r\n    console.log(`Server's listening ${(node_process__WEBPACK_IMPORTED_MODULE_2___default().env.AT_CRUD_API_PORT)} port`);\r\n});\r\n\n\n//# sourceURL=webpack://crud-api/./src/server/index.ts?");

/***/ }),

/***/ "./src/server/model/db.ts":
/*!********************************!*\
  !*** ./src/server/model/db.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Database\": () => (/* binding */ Database),\n/* harmony export */   \"DatabaseSegment\": () => (/* binding */ DatabaseSegment)\n/* harmony export */ });\nclass DatabaseSegment {\r\n}\r\nclass Database {\r\n}\r\n\n\n//# sourceURL=webpack://crud-api/./src/server/model/db.ts?");

/***/ }),

/***/ "./src/server/model/index.ts":
/*!***********************************!*\
  !*** ./src/server/model/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Database\": () => (/* reexport safe */ _db__WEBPACK_IMPORTED_MODULE_0__.Database),\n/* harmony export */   \"DatabaseSegment\": () => (/* reexport safe */ _db__WEBPACK_IMPORTED_MODULE_0__.DatabaseSegment)\n/* harmony export */ });\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./db */ \"./src/server/model/db.ts\");\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ \"./src/server/model/user.ts\");\n\r\n\r\n\n\n//# sourceURL=webpack://crud-api/./src/server/model/index.ts?");

/***/ }),

/***/ "./src/server/model/user.ts":
/*!**********************************!*\
  !*** ./src/server/model/user.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\r\n\n\n//# sourceURL=webpack://crud-api/./src/server/model/user.ts?");

/***/ }),

/***/ "./src/server/repositories/index.ts":
/*!******************************************!*\
  !*** ./src/server/repositories/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UserRepository\": () => (/* reexport safe */ _user_repository__WEBPACK_IMPORTED_MODULE_0__.UserRepository)\n/* harmony export */ });\n/* harmony import */ var _user_repository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-repository */ \"./src/server/repositories/user-repository.ts\");\n\r\n\n\n//# sourceURL=webpack://crud-api/./src/server/repositories/index.ts?");

/***/ }),

/***/ "./src/server/repositories/repository.ts":
/*!***********************************************!*\
  !*** ./src/server/repositories/repository.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Repository\": () => (/* binding */ Repository)\n/* harmony export */ });\nclass Repository {\r\n}\r\n\n\n//# sourceURL=webpack://crud-api/./src/server/repositories/repository.ts?");

/***/ }),

/***/ "./src/server/repositories/user-repository.ts":
/*!****************************************************!*\
  !*** ./src/server/repositories/user-repository.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UserRepository\": () => (/* binding */ UserRepository)\n/* harmony export */ });\n/* harmony import */ var _repository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./repository */ \"./src/server/repositories/repository.ts\");\n\r\nclass UserRepository extends _repository__WEBPACK_IMPORTED_MODULE_0__.Repository {\r\n    constructor(db) {\r\n        super();\r\n        this._db = db.getOrCreateSegment(\"Users\");\r\n    }\r\n    async getById(id) {\r\n        return await (await this._db).getById(id);\r\n    }\r\n    async getAll() {\r\n        return await (await this._db).getAll();\r\n    }\r\n    async add(user) {\r\n        return await (await this._db).create(user);\r\n    }\r\n    async delete(id) {\r\n        return await (await this._db).delete(id);\r\n    }\r\n    async edit(id, user) {\r\n        return await (await this._db).update(id, user);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://crud-api/./src/server/repositories/user-repository.ts?");

/***/ }),

/***/ "./src/server/store.ts":
/*!*****************************!*\
  !*** ./src/server/store.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var node_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:process */ \"node:process\");\n/* harmony import */ var node_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_process__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./db */ \"./src/server/db/index.ts\");\n\r\n\r\nclass Store {\r\n    constructor() {\r\n        this.state = {\r\n            db: (0,_db__WEBPACK_IMPORTED_MODULE_1__.getDbByType)({\r\n                type: (node_process__WEBPACK_IMPORTED_MODULE_0___default().env.AT_DB_URL) ? \"remote\" : \"inmemory\",\r\n                payload: (node_process__WEBPACK_IMPORTED_MODULE_0___default().env.AT_DB_URL),\r\n            }),\r\n        };\r\n        this._reducers = [\r\n            (state, { type, payload }) => {\r\n                if (type === \"SET_DB\") {\r\n                    return Object.assign(Object.assign({}, state), { db: (0,_db__WEBPACK_IMPORTED_MODULE_1__.getDbByType)(payload) });\r\n                }\r\n                return state;\r\n            },\r\n        ];\r\n        this._listeners = [];\r\n    }\r\n    trigger(action) {\r\n        this.state = this._reducers.reduce((result, next) => {\r\n            return next(result, action);\r\n        }, this.state);\r\n        this._listeners.forEach((fn) => fn(this.state));\r\n    }\r\n    onUpdate(fn) {\r\n        this._listeners = [...this._listeners, fn];\r\n        fn(this.state);\r\n    }\r\n}\r\nconst store = new Store();\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);\r\n\n\n//# sourceURL=webpack://crud-api/./src/server/store.ts?");

/***/ }),

/***/ "./src/utils/id.ts":
/*!*************************!*\
  !*** ./src/utils/id.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"generateUid\": () => (/* binding */ generateUid),\n/* harmony export */   \"isValidUid\": () => (/* binding */ isValidUid)\n/* harmony export */ });\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-node/v4.js\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-node/validate.js\");\n\r\nconst generateUid = () => {\r\n    return (0,uuid__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n};\r\nconst isValidUid = (id) => {\r\n    return (0,uuid__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(id);\r\n};\r\n\n\n//# sourceURL=webpack://crud-api/./src/utils/id.ts?");

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"generateUid\": () => (/* reexport safe */ _id__WEBPACK_IMPORTED_MODULE_0__.generateUid),\n/* harmony export */   \"isValidUid\": () => (/* reexport safe */ _id__WEBPACK_IMPORTED_MODULE_0__.isValidUid),\n/* harmony export */   \"streamToPromise\": () => (/* reexport safe */ _streams__WEBPACK_IMPORTED_MODULE_1__.streamToPromise)\n/* harmony export */ });\n/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ \"./src/utils/id.ts\");\n/* harmony import */ var _streams__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./streams */ \"./src/utils/streams.ts\");\n\r\n\r\n\n\n//# sourceURL=webpack://crud-api/./src/utils/index.ts?");

/***/ }),

/***/ "./src/utils/streams.ts":
/*!******************************!*\
  !*** ./src/utils/streams.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"streamToPromise\": () => (/* binding */ streamToPromise)\n/* harmony export */ });\nconst streamToPromise = (stream) => {\r\n    return new Promise((res, rej) => {\r\n        let data = \"\";\r\n        stream\r\n            .setEncoding(\"utf8\")\r\n            .on(\"data\", (chunk) => (data += chunk))\r\n            .on(\"end\", () => res(data))\r\n            .on(\"error\", () => rej(\"Some error has occured\"));\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack://crud-api/./src/utils/streams.ts?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/native.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/native.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  randomUUID: (crypto__WEBPACK_IMPORTED_MODULE_0___default().randomUUID)\n});\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/esm-node/native.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/regex.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/regex.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/esm-node/regex.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/rng.js":
/*!************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/rng.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rng)\n/* harmony export */ });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);\n\nconst rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate\n\nlet poolPtr = rnds8Pool.length;\nfunction rng() {\n  if (poolPtr > rnds8Pool.length - 16) {\n    crypto__WEBPACK_IMPORTED_MODULE_0___default().randomFillSync(rnds8Pool);\n    poolPtr = 0;\n  }\n\n  return rnds8Pool.slice(poolPtr, poolPtr += 16);\n}\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/esm-node/rng.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/stringify.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/stringify.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"unsafeStringify\": () => (/* binding */ unsafeStringify)\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-node/validate.js\");\n\n/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\n\nconst byteToHex = [];\n\nfor (let i = 0; i < 256; ++i) {\n  byteToHex.push((i + 0x100).toString(16).slice(1));\n}\n\nfunction unsafeStringify(arr, offset = 0) {\n  // Note: Be careful editing this code!  It's been tuned for performance\n  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434\n  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();\n}\n\nfunction stringify(arr, offset = 0) {\n  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one\n  // of the following:\n  // - One or more input array values don't map to a hex octet (leading to\n  // \"undefined\" in the uuid)\n  // - Invalid input values for the RFC `version` or `variant` fields\n\n  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n    throw TypeError('Stringified UUID is invalid');\n  }\n\n  return uuid;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/esm-node/stringify.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v4.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v4.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ \"./node_modules/uuid/dist/esm-node/native.js\");\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-node/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-node/stringify.js\");\n\n\n\n\nfunction v4(options, buf, offset) {\n  if (_native_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].randomUUID && !buf && !options) {\n    return _native_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].randomUUID();\n  }\n\n  options = options || {};\n  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n\n  rnds[6] = rnds[6] & 0x0f | 0x40;\n  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided\n\n  if (buf) {\n    offset = offset || 0;\n\n    for (let i = 0; i < 16; ++i) {\n      buf[offset + i] = rnds[i];\n    }\n\n    return buf;\n  }\n\n  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/esm-node/v4.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/validate.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/validate.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ \"./node_modules/uuid/dist/esm-node/regex.js\");\n\n\nfunction validate(uuid) {\n  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].test(uuid);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/esm-node/validate.js?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "node:http":
/*!****************************!*\
  !*** external "node:http" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:http");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "./node_modules/dotenv/package.json":
/*!******************************************!*\
  !*** ./node_modules/dotenv/package.json ***!
  \******************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = JSON.parse('{\"name\":\"dotenv\",\"version\":\"16.0.3\",\"description\":\"Loads environment variables from .env file\",\"main\":\"lib/main.js\",\"types\":\"lib/main.d.ts\",\"exports\":{\".\":{\"require\":\"./lib/main.js\",\"types\":\"./lib/main.d.ts\",\"default\":\"./lib/main.js\"},\"./config\":\"./config.js\",\"./config.js\":\"./config.js\",\"./lib/env-options\":\"./lib/env-options.js\",\"./lib/env-options.js\":\"./lib/env-options.js\",\"./lib/cli-options\":\"./lib/cli-options.js\",\"./lib/cli-options.js\":\"./lib/cli-options.js\",\"./package.json\":\"./package.json\"},\"scripts\":{\"dts-check\":\"tsc --project tests/types/tsconfig.json\",\"lint\":\"standard\",\"lint-readme\":\"standard-markdown\",\"pretest\":\"npm run lint && npm run dts-check\",\"test\":\"tap tests/*.js --100 -Rspec\",\"prerelease\":\"npm test\",\"release\":\"standard-version\"},\"repository\":{\"type\":\"git\",\"url\":\"git://github.com/motdotla/dotenv.git\"},\"keywords\":[\"dotenv\",\"env\",\".env\",\"environment\",\"variables\",\"config\",\"settings\"],\"readmeFilename\":\"README.md\",\"license\":\"BSD-2-Clause\",\"devDependencies\":{\"@types/node\":\"^17.0.9\",\"decache\":\"^4.6.1\",\"dtslint\":\"^3.7.0\",\"sinon\":\"^12.0.1\",\"standard\":\"^16.0.4\",\"standard-markdown\":\"^7.1.0\",\"standard-version\":\"^9.3.2\",\"tap\":\"^15.1.6\",\"tar\":\"^6.1.11\",\"typescript\":\"^4.5.4\"},\"engines\":{\"node\":\">=12\"}}');\n\n//# sourceURL=webpack://crud-api/./node_modules/dotenv/package.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/index.ts");
/******/ 	
/******/ })()
;