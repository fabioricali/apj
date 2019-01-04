const Validator = require('valify');
const Koa = require('koa');
const Router = require('koa-router');
const helmet = require('koa-helmet');
const body = require('koa-body');
const serve = require('koa-static');
const cache = require('koa-incache');
const struct = require('koa-struct');
const success = require('koa-json-success');
const views = require('koa-views');
const logger = require('koa-logger');
const responseError = require('./responseError');
const http = require('http');
const https = require('https');
const EventEmitter = require('events');
const options = require('./options');

/**
 * Triggered on server start
 * @event Apj#start
 */

/**
 * Triggered on SSL server start
 * @event Apj#SSLStart
 */

/**
 * Triggered on server stop
 * @event Apj#stop
 */

/**
 * Triggered on SSL server stop
 * @event Apj#SSLStop
 */

/**
 * Apj instance
 * @typedef {object} Apj~apj
 * @property {object} app Koa instance
 * @property {object} router router object
 * @property {object} server server instance
 * @property {object} SSLServer SSL server instance
 */

class Apj extends EventEmitter {

    /**
     * Create instance
     * @param {object} [opt] options
     * @param {string} [opt.host=localhost] host
     * @param {number} [opt.port=80] port
     * @param {object} [opt.serverOptions] server options
     * @param {number} [opt.devPort=3000] dev port (when dev is true)
     * @param {number} [opt.SSLPort=443] SSL port
     * @param {object} [opt.serverSSLOptions] SSL server options
     * @param {object} [opt.helmetSettings] koa-helmet settings
     * @param {object} [opt.routerSettings] koa-router settings
     * @param {object} [opt.bodySettings] koa-body settings
     * @param {object} [opt.successSettings] koa-json-success settings
     * @param {object} [opt.structSettings] koa-struct settings
     * @param {object} [opt.cacheSettings] koa-incache settings
     * @param {object} [opt.viewsSettings] koa-views settings
     * @param {object} [opt.loggerSettings] koa-logger settings
     * @param {object} [opt.logger=false] active koa-logger
     * @param {object} [opt.ctx] Koa context
     * @param {string} [opt.viewsPath=./views/] path to views
     * @param {string} [opt.staticPath=./public/] path to static resources
     * @param {array} [opt.use] array of middleware
     * @param {boolean} [opt.autoStart=false] start on create
     * @param {boolean} [opt.responseErrorHandler] manipulate message and code
     * @returns {Apj~apj|*}
     */
    constructor(opt = {}) {

        super();

        /**
         * @ignore
         * @type {{}}
         */
        this.opt = new Validator(options, {
            returnImmutable: true,
            overwriteUndefined: true
        })(opt);

        this.app = new Koa();
        this.app.context = Object.assign(this.app.context, {
            __DEV__: this.opt.dev
        }, this.opt.ctx);

        success(this.app, this.opt.successSettings);

        this.router = new Router(this.opt.routerSettings);
        this.server = null;
        this.SSLServer = null;

        this._appendPlugin();

        if (this.opt.autoStart)
            this.start();

    }

    /**
     * Start server app
     * @fires Apj#start
     * @fires Apj#SSLStart
     * @returns {Apj}
     */
    start() {
        const port = this.opt.dev ? this.opt.devPort : this.opt.port;

        this.server = http
            .createServer(this.app.callback())
            .listen(port, this.opt.host, () => {
                if (this.opt.dev) {
                    console.log(`Start DEV server at http://${this.opt.host}:${this.opt.devPort}`);
                }
                this.emit('start');
            });

        if (this.opt.serverSSLOptions)
            this.SSLServer = https
                .createServer(this.opt.serverSSLOptions, this.app.callback())
                .listen(this.opt.SSLPort, this.opt.host, () => {
                    this.emit('SSLStart');
                });

        return this;
    }

    /**
     * Stop server app
     * @fires Apj#stop
     * @fires Apj#SSLStop
     * @returns {Apj}
     */
    stop() {
        this.server.close(() => {
            this.emit('stop');
        });
        if (this.SSLServer)
            this.SSLServer.close(() => {
                this.emit('stopSSL');
            });

        return this;
    }

    /**
     * Append plugin
     * @private
     * @ignore
     */
    _appendPlugin() {

        if (this.opt.dev || this.opt.logger) {
            this.app.use(logger(this.opt.loggerSettings));
        }

        this._pluginInstances = [
            helmet(this.opt.helmetSettings),
            serve(this.opt.staticPath, {hidden: true}),
            responseError(this.opt.dev, this.opt.responseErrorHandler),
            body(this.opt.bodySettings),
            cache(this.opt.cacheSettings),
            struct(this.opt.structSettings),
            views(this.opt.viewsPath, this.opt.viewsSettings)
        ].concat(this.opt.use, [
            this.router.routes(),
            this.router.allowedMethods()
        ]);

        this._pluginInstances.forEach(plugin => {
            this.app.use(plugin);
        })
    }
}

module.exports = Apj;