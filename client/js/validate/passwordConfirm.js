"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function valPasswordConfirm(pw, confirm) {
    return pw.value === confirm.value ? 'Senhas não batem' : null;
}
exports.valPasswordConfirm = valPasswordConfirm;
//# sourceMappingURL=passwordConfirm.js.map