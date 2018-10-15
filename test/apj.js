const Apj = require('../');

describe('Apj', function () {

    it('should be ok', function (done) {
        const app = new Apj({
            dev: true
        });

        app.on('start', () => {
            console.log('START APP');
            setTimeout(() => {
                app.stop();
            }, 1000)
        });

        app.on('stop', () => {
            console.log('STOP APP');
            done();
        });

        app.start();

    });

});