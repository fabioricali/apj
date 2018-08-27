# Apj
Start with a complete Koa server with zero configuration.

<a href="https://travis-ci.org/fabioricali/apj" target="_blank"><img src="https://travis-ci.org/fabioricali/apj.svg?branch=master" title="Build Status"/></a>
<a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" title="License: MIT"/></a>

Apj includes Koa packages:
- <a href="https://github.com/dlau/koa-body" target="_blank">koa-body</a>
- <a href="https://github.com/venables/koa-helmet" target="_blank">koa-helmet</a>
- <a href="https://github.com/alexmingoia/koa-router" target="_blank">koa-router</a>
- <a href="https://github.com/koajs/static" target="_blank">koa-static</a>

## Installation

```
npm install apj --save
```

## Example

```javascript
const Apj = require('apj');

new Apj().start(); // Listen on http://localhost:80

```

Dev mode
```javascript

new Apj({
    dev: true
}).start(); // Listen on http://localhost:3000

```

Add routes
```javascript

const app = new Apj().start();

app.router.get('/my-route', ctx => {
    ctx.body = 'hello';
});

```

Use middleware
```javascript

new Apj({
    use: [
        async (ctx, next) => {
            const start = Date.now();
            await next();
            const ms = Date.now() - start;
            console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
        }
    ]
});

```

## API

<a name="Apj"></a>

## Apj
**Kind**: global class  

* [Apj](#Apj)
    * [new Apj([opt])](#new_Apj_new)
    * _instance_
        * [.start()](#Apj+start) ⇒ [<code>Apj</code>](#Apj)
        * [.stop()](#Apj+stop) ⇒ [<code>Apj</code>](#Apj)
        * ["start"](#Apj+event_start)
        * ["SSLStart"](#Apj+event_SSLStart)
        * ["stop"](#Apj+event_stop)
        * ["SSLStop"](#Apj+event_SSLStop)
    * _inner_
        * [~apj](#Apj..apj) : <code>object</code>

<a name="new_Apj_new"></a>

### new Apj([opt])
Create instance

<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[opt]</td><td><code>object</code></td><td></td><td><p>options</p>
</td>
    </tr><tr>
    <td>[opt.host]</td><td><code>string</code></td><td><code>&quot;localhost&quot;</code></td><td><p>host</p>
</td>
    </tr><tr>
    <td>[opt.port]</td><td><code>number</code></td><td><code>80</code></td><td><p>port</p>
</td>
    </tr><tr>
    <td>[opt.serverOptions]</td><td><code>object</code></td><td></td><td><p>server options</p>
</td>
    </tr><tr>
    <td>[opt.devPort]</td><td><code>number</code></td><td><code>3000</code></td><td><p>dev port (when dev is true)</p>
</td>
    </tr><tr>
    <td>[opt.SSLPort]</td><td><code>number</code></td><td><code>443</code></td><td><p>SSL port</p>
</td>
    </tr><tr>
    <td>[opt.serverSSLOptions]</td><td><code>object</code></td><td></td><td><p>SSL server options</p>
</td>
    </tr><tr>
    <td>[opt.helmetSettings]</td><td><code>object</code></td><td></td><td><p>Helmet settings</p>
</td>
    </tr><tr>
    <td>[opt.routerSettings]</td><td><code>object</code></td><td></td><td><p>Router settings</p>
</td>
    </tr><tr>
    <td>[opt.bodySettings]</td><td><code>object</code></td><td></td><td><p>Body settings</p>
</td>
    </tr><tr>
    <td>[opt.staticPath]</td><td><code>string</code></td><td><code>&quot;./public/&quot;</code></td><td><p>path to static resources</p>
</td>
    </tr><tr>
    <td>[opt.use]</td><td><code>array</code></td><td></td><td><p>array of middleware</p>
</td>
    </tr><tr>
    <td>[opt.autoStart]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>start on create</p>
</td>
    </tr>  </tbody>
</table>

<a name="Apj+start"></a>

### apj.start() ⇒ [<code>Apj</code>](#Apj)
Start server app

**Kind**: instance method of [<code>Apj</code>](#Apj)  
**Emits**: [<code>start</code>](#Apj+event_start), [<code>SSLStart</code>](#Apj+event_SSLStart)  
<a name="Apj+stop"></a>

### apj.stop() ⇒ [<code>Apj</code>](#Apj)
Stop server app

**Kind**: instance method of [<code>Apj</code>](#Apj)  
**Emits**: [<code>stop</code>](#Apj+event_stop), [<code>SSLStop</code>](#Apj+event_SSLStop)  
<a name="Apj+event_start"></a>

### "start"
Triggered on server start

**Kind**: event emitted by [<code>Apj</code>](#Apj)  
<a name="Apj+event_SSLStart"></a>

### "SSLStart"
Triggered on SSL server start

**Kind**: event emitted by [<code>Apj</code>](#Apj)  
<a name="Apj+event_stop"></a>

### "stop"
Triggered on server stop

**Kind**: event emitted by [<code>Apj</code>](#Apj)  
<a name="Apj+event_SSLStop"></a>

### "SSLStop"
Triggered on SSL server stop

**Kind**: event emitted by [<code>Apj</code>](#Apj)  
<a name="Apj..apj"></a>

### Apj~apj : <code>object</code>
Apj instance

**Kind**: inner typedef of [<code>Apj</code>](#Apj)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>app</td><td><code>object</code></td><td><p>Koa instance</p>
</td>
    </tr><tr>
    <td>router</td><td><code>object</code></td><td><p>router object</p>
</td>
    </tr><tr>
    <td>server</td><td><code>object</code></td><td><p>server instance</p>
</td>
    </tr><tr>
    <td>SSLServer</td><td><code>object</code></td><td><p>SSL server instance</p>
</td>
    </tr>  </tbody>
</table>


## Changelog
You can view the changelog <a target="_blank" href="https://github.com/fabioricali/apj/blob/master/CHANGELOG.md">here</a>

## License
Apj is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="http://rica.li">Fabio Ricali</a>