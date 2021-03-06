# Apj

Start with a complete Koa server with zero configuration.

<a href="https://travis-ci.org/fabioricali/apj" target="_blank"><img src="https://travis-ci.org/fabioricali/apj.svg?branch=master" title="Build Status"/></a>
<a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" title="License: MIT"/></a>

Apj includes Koa packages:

- <a href="https://github.com/dlau/koa-body" target="_blank">koa-body</a>
- <a href="https://github.com/venables/koa-helmet" target="_blank">koa-helmet</a>
- <a href="https://github.com/alexmingoia/koa-router" target="_blank">koa-router</a>
- <a href="https://github.com/koajs/static" target="_blank">koa-static</a>
- <a href="https://www.npmjs.com/package/koa-views" target="_blank">koa-views</a>
- <a href="https://www.npmjs.com/package/koa-logger" target="_blank">koa-logger</a>
- <a href="https://github.com/fabioricali/koa-json-success" target="_blank">koa-json-success</a>
- <a href="https://github.com/fabioricali/koa-struct" target="_blank">koa-struct</a>
- <a href="https://github.com/fabioricali/koa-incache" target="_blank">koa-incache</a>
- <a href="https://github.com/koajs/cors" target="_blank">@koa/cors@2</a>
- <a href="https://github.com/koajs/session" target="_blank">koa-session</a>

## Installation

```
npm install apj --save
```

## Example

```javascript
const Apj = require('apj');

new Apj().start(); // Listen on http://localhost:3000
```

Add routes
```javascript

const app = new Apj();

app.router.get('/my-route', ctx => {
    ctx.body = 'hello';
});

app.start();
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
        * [.start(port)](#Apj+start) ⇒ [<code>Apj</code>](#Apj)
        * [.stop()](#Apj+stop) ⇒ [<code>Apj</code>](#Apj)
        * ["start"](#Apj+event_start)
        * ["stop"](#Apj+event_stop)
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
    <td>[opt.port]</td><td><code>number</code></td><td><code>3000</code></td><td><p>port</p>
</td>
    </tr><tr>
    <td>[opt.serverOptions]</td><td><code>object</code></td><td></td><td><p>server options</p>
</td>
    </tr><tr>
    <td>[opt.helmetSettings]</td><td><code>object</code></td><td></td><td><p>koa-helmet settings</p>
</td>
    </tr><tr>
    <td>[opt.routerSettings]</td><td><code>object</code></td><td></td><td><p>koa-router settings</p>
</td>
    </tr><tr>
    <td>[opt.bodySettings]</td><td><code>object</code></td><td></td><td><p>koa-body settings</p>
</td>
    </tr><tr>
    <td>[opt.successSettings]</td><td><code>object</code></td><td></td><td><p>koa-json-success settings</p>
</td>
    </tr><tr>
    <td>[opt.structSettings]</td><td><code>object</code></td><td></td><td><p>koa-struct settings</p>
</td>
    </tr><tr>
    <td>[opt.cacheSettings]</td><td><code>object</code></td><td></td><td><p>koa-incache settings</p>
</td>
    </tr><tr>
    <td>[opt.corsSettings]</td><td><code>object</code></td><td></td><td><p>@koa/cors@2 settings</p>
</td>
    </tr><tr>
    <td>[opt.sessionSettings]</td><td><code>object</code></td><td></td><td><p>koa-session settings</p>
</td>
    </tr><tr>
    <td>[opt.viewsSettings]</td><td><code>object</code></td><td></td><td><p>koa-views settings</p>
</td>
    </tr><tr>
    <td>[opt.loggerSettings]</td><td><code>object</code></td><td></td><td><p>koa-logger settings</p>
</td>
    </tr><tr>
    <td>[opt.logger]</td><td><code>object</code></td><td><code>false</code></td><td><p>active koa-logger</p>
</td>
    </tr><tr>
    <td>[opt.ctx]</td><td><code>object</code></td><td></td><td><p>Koa context</p>
</td>
    </tr><tr>
    <td>[opt.viewsPath]</td><td><code>string</code></td><td><code>&quot;./views/&quot;</code></td><td><p>path to views</p>
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
    </tr><tr>
    <td>[opt.responseErrorHandler]</td><td><code>boolean</code></td><td></td><td><p>manipulate message and code</p>
</td>
    </tr><tr>
    <td>[opt.exposeError]</td><td><code>boolean</code></td><td></td><td><p>expose all errors</p>
</td>
    </tr>  </tbody>
</table>

<a name="Apj+start"></a>

### apj.start(port) ⇒ [<code>Apj</code>](#Apj)
Start server app

**Kind**: instance method of [<code>Apj</code>](#Apj)  
**Emits**: [<code>start</code>](#Apj+event_start)  
<table>
  <thead>
    <tr>
      <th>Param</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>port</td>
    </tr>  </tbody>
</table>

<a name="Apj+stop"></a>

### apj.stop() ⇒ [<code>Apj</code>](#Apj)
Stop server app

**Kind**: instance method of [<code>Apj</code>](#Apj)  
**Emits**: [<code>stop</code>](#Apj+event_stop)  
<a name="Apj+event_start"></a>

### "start"
Triggered on server start

**Kind**: event emitted by [<code>Apj</code>](#Apj)  
<a name="Apj+event_stop"></a>

### "stop"
Triggered on server stop

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
    </tr>  </tbody>
</table>


## Changelog
You can view the changelog <a target="_blank" href="https://github.com/fabioricali/apj/blob/master/CHANGELOG.md">here</a>

## License
Apj is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="https://rica.li">Fabio Ricali</a>