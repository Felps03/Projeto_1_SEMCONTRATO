"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validate(el, fn, ...opts) {
    return function (event) {
        const err = fn(el, ...opts);
        if (err) {
            el.setMsg(err);
            event.preventDefault();
            return false;
        }
        return true;
    };
}
exports.validate = validate;
//# sourceMappingURL=validate.js.map