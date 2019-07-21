/**
 * Options
 * @type {{responseErrorHandler: {allowNull: boolean, type: string, required: boolean}, helmetSettings: {default: {}, type: string}, use: {default: Array, type: string}, ctx: {default: {}, type: string}, logger: {default: boolean, type: string}, viewsSettings: {default: {extension: string, map: {hbs: string}}, type: string}, autoStart: {default: boolean, type: string}, structSettings: {default: {}, type: string}, serverOptions: {default: null, type: string}, viewsPath: {default: string, type: string}, port: {default: number, type: string}, bodySettings: {default: {}, type: string}, host: {default: string, type: string}, routerSettings: {default: {}, type: string}, staticPath: {default: string, type: string}, successSettings: {default: {}, type: string}, cacheSettings: {default: {}, type: string}, corsSettings: {default: {}, type: string}, loggerSettings: {default: {}, type: string}, sessionSettings: {default: {}, type: string}}}
 */
module.exports = {
    host: {
        type: 'string',
        default: 'localhost'
    },
    port: {
        type: 'number',
        default: 3000
    },
    serverOptions: {
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
    },
    bodySettings: {
        type: 'object',
        default: {}
    },
    successSettings: {
        type: 'object',
        default: {}
    },
    ctx: {
        type: 'object',
        default: {}
    },
    structSettings: {
        type: 'object',
        default: {}
    },
    loggerSettings: {
        type: 'object',
        default: {}
    },
    cacheSettings: {
        type: 'object',
        default: {}
    },
    corsSettings: {
        type: 'object',
        default: {}
    },
    sessionSettings: {
        type: 'object',
        default: {}
    },
    logger: {
        type: 'boolean',
        default: false
    },
    viewsSettings: {
        type: 'object',
        default: {
            map: {
                hbs: 'handlebars'
            },
            extension: 'hbs'
        }
    },
    viewsPath: {
        type: 'string',
        default: './views/'
    },
    responseErrorHandler: {
        type: 'function',
        allowNull: true, // see overwriteUndefined
        required: false
    }

};