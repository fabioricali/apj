const jsonError = require('koa-json-error');
const jsonResponse = require('koa-json-success').response;

/**
 * JSON response error
 */
module.exports =  dev => {
    return jsonError(err => {

        let defaultError = 'server error';
        const notFound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR'];
        if (err.code && notFound.includes(err.code)) {
            defaultError = 'not found';
        }

        /** @namespace CONFIG.exposeError */
        return jsonResponse(
            false,
            dev ? err.message : defaultError,
            null,
            err.status || 500
        );
    });
};