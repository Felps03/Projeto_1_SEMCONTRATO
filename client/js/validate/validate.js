"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validate(el, fn, ...opts) {
    return function (event) {
        const msg = fn(el, ...opts);
        if (msg) {
            el.setValid(false, msg);
            event.preventDefault();
            return false;
        }
        el.setValid(true);
        return true;
    };
}
exports.validate = validate;
//# sourceMappingURL=validate.js.map