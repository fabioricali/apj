const supertest = require('supertest');
const Apj = require('../');
const assert = require('assert');

let server;
let request;
let app;

describe('Apj router', function () {

    before(function () {
        app = new Apj({
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

    it ('should be 404', function (done) {
        request
            .get('/not-found')
            .expect(404)
            .end((err, res) => {
                if (err) throw err;
                done()
            });
    });

    it ('should be hello.txt', function (done) {
        request
            .get('/hello.txt')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                done()
            });
    });

    it ('should be /my-route', function (done) {

        app.router.get('/my-route', ctx => {
            ctx.body = 'hello';
        });

        request
            .get('/my-route')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                done()
            });
    });

    it ('should be /my-route with ctx', function (done) {

        app.router.get('/my-route/hello', ctx => {
            ctx.body = 'hello ' + ctx.myThing;
        });

        request
            .get('/my-route/hello')
            .expect(200)
            .expect(res => {
                assert.strictEqual(res.text, 'hello ciao');
            })
            .end(err => {
                if (err) throw err;
                done()
            });
    });

});