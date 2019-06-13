"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function valPasswordLength(pw) {
    return (pw.value.length < 6 || pw.value.length > 8) ?
        'Senha deve ter tamanho entre 6 e 8 dígitos.' : null;
}
exports.valPasswordLength = valPasswordLength;
//# sourceMappingURL=passwordLength.js.map