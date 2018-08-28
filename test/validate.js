const supertest = require('supertest');
const Apj = require('../');
const assert = require('assert');

let server;
let request;
let app;

describe('Apj validate', function () {

    this.timeout(5000);

    before(function () {
        app = new Apj({
            dev: true,
            staticPath: __dirname + '/static',
            use: [
                async (ctx, next) => {
                    const start = Date.now();
                    await next();
                    const ms = Date.now() - start;
                    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
                }
            ],
            ctx: {
                myThing: 'ciao'
            }
        }).start();

        server = app.server;
        request = supertest(server);
    });

    after(function () {
        app.stop();
    });

    it ('validation should be ok', function (done) {

        app.router.post('/my-route', ctx => {
            ctx.struct({
                hello: 'string'
            });
            ctx.body = 'ok';
        });

        request
            .post('/my-route')
            .send({hello: 'world'})
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                done()
            });
    });

    it ('validation should be fail', function (done) {

        app.router.post('/my-route-fail', ctx => {
            ctx.struct({
                hello: 'string'
            });
        });

        request
            .post('/my-route-fail')
            .send({})
            .expect(500)
            .end((err, res) => {
                console.log(res.text);
                if (err) throw err;
                done()
            });
    });

});