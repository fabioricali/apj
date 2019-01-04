const jsonError = require('koa-json-error');
const jsonResponse = require('koa-json-success').response;

/**
 * JSON response error
 */
module.exports =  (dev, responseErrorHandler) => {
    return jsonError(err => {

        let defaultError = 'server error';
        const notFound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR'];
        if (err.code && notFound.includes(err.code)) {
            defaultError = 'not found';
        }

        let message = dev ? err.message : defaultError;
        let code = err.status || 500;
        let result = {
            errorCode: code
        };

        if (responseErrorHandler) {
            const resultResponse = responseErrorHandler(err, dev);
            if (resultResponse && typeof resultResponse === 'object') {
                message = resultResponse.message || message;
                result.errorCode = resultResponse.errorCode || result.errorCode;
                code = resultResponse.code || code;
                err.status = code;
            }
        }

        /** @namespace CONFIG.exposeError */
        return jsonResponse(
            false,
            message,
            result,
            code
        );
    });
};