const supertest = require('supertest');
const Apj = require('../');
const assert = require('assert');

let server;
let request;
let app;

describe('Apj response-error-handler', function () {

    before(function () {
        app = new Apj({
            dev: true,
            responseErrorHandler: function(error, devMode) {
                return {
                    message: 'ciao',
                    errorCode: 9000,
                    code: 501
                }
            }
        }).start();

        server = app.server;
        request = supertest(server);
    });

    after(function () {
        app.stop();
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
            .expect(501)
            .end((err, res) => {
                console.log(res.text);
                if (err) throw err;
                done()
            });
    });

});