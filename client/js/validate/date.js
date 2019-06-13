"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function valDate(date) {
    const today = new Date();
    const inputDay = new Date(date.value);
    if (today.getFullYear() === inputDay.getFullYear()) {
        if (today.getMonth() === inputDay.getMonth()) {
            if (today.getDate() >= inputDay.getDate() - 1) {
                return 'Data deve ser pelo menos dois dias atrás.';
            }
        }
    }
    return null;
}
exports.valDate = valDate;
//# sourceMappingURL=date.js.map