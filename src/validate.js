const Validator = require('valify');

module.exports = function (struct, obj) {
    new Validator(struct)(obj);
};