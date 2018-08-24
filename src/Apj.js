const Validator = require('valify');
const Koa = require('koa');
const Router = require('koa-router');
const helmet = require('koa-helmet');
const body = require('koa-body');
const serve = require('koa-static');
const http = require('http');
const https = require('https');
const EventEmitter = require('events');
const options = require('./options');

/**
 * @class Apj
 */
class Apj extends EventEmitter {

    /**
     * Instance
     * @param opt
     */
    constructor(opt = {}) {

        super();

        /**
         * Options
         * @type {{}}
         */

        this.opt = new Validator(options, {
            returnImmutable: true,
            overwriteUndefined: true
        })(opt);

        this.app = new Koa();
        this.router = new Router(this.opt.routerSettings);

        this._appendPlugin();

        if (this.opt.autoStart)
            this.start();

    }

    /**
     * Start server app
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
        this._pluginInstances = [
            helmet(this.opt.helmetSettings),
            serve(this.opt.staticPath, {hidden: true}),
            body()
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