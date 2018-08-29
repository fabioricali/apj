const Apj = require('../../index');

const app = new Apj({
    dev: true,
    viewsPath: __dirname + '/views'
}).start();

app.router.get('/', async ctx => {
    await ctx.render('home', {
        title: 'Lorem ipsum',
        body: 'dolor sit'
    });
});