const supertest = require('supertest');
const Apj = require('../');

let server;
let request;
let app;

describe('Apj router', function () {

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
            ]
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

});