const Validator = require('valify');
const Koa = require('koa');
const Router = require('koa-router');
const helmet = require('koa-helmet');
const body = require('koa-body');
const serve = require('koa-static');
/**
 * @class Apj
 */
class Apj {
    constructor(opt = {}) {

        this.opt = new Validator({

            port: {
                type: 'number',
                default: 3000
            },
            host: {
                type: 'string',
                default: 'localhost'
            },
            helmet: {
                type: 'boolean',
                default: true
            },
            helmetSettings: {
                type: 'object',
                default: {}
            },
            staticPath: {
                type: 'string',
                default: './public/'
            },
            use: {
                type: 'array',
                default: []
            }

        }, {returnImmutable: true})(opt);

        console.log(this.opt);

        const app = new Koa();

        app
            .use(serve(this.opt.staticPath))
            .use(body())
            //.use(router.routes())
            //.use(router.allowedMethods());

        app.listen(this.opt.port);
    }
}

module.exports = Apj;