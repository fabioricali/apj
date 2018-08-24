/**
 * Options
 * @type {{host: {type: string, default: string}, port: {type: string, default: number}, devPort: {type: string, default: number}, dev: {type: string, default: boolean}, SSLPort: {type: string, default: number}, serverOptions: {type: string, default: null}, serverSSLOptions: {type: string, default: null}, helmetSettings: {type: string, default: {}}, routerSettings: {type: string, default: {}}, staticPath: {type: string, default: string}, use: {type: string, default: Array}, autoStart: {type: string, default: boolean}}}
 */
module.exports = {
    host: {
        type: 'string',
        default: 'localhost'
    },
    port: {
        type: 'number',
        default: 80
    },
    devPort: {
        type: 'number',
        default: 3000
    },
    dev: {
        type: 'boolean',
        default: false
    },
    SSLPort: {
        type: 'number',
        default: 443
    },
    serverOptions: {
        type: 'any',
        default: null
    },
    serverSSLOptions: {
        type: 'any',
        default: null
    },
    helmetSettings: {
        type: 'object',
        default: {}
    },
    routerSettings: {
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
    },
    autoStart: {
        type: 'boolean',
        default: false
    }

};