"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validate(form, inputMap) {
    let errs = [];
    Array.from(form.children).forEach((realInput) => {
        if (inputMap.has(realInput.id)) {
            const err = inputMap.get(realInput.id)(realInput);
            if (err)
                errs.push(err);
        }
    });
    return errs || null;
}
exports.validate = validate;
//# sourceMappingURL=validate.js.map