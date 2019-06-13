"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InputWrapper {
    constructor(el) {
        this.el = el;
        this.msgDiv = el.nextElementSibling;
    }
    setMsg(msg, type = 'happy') {
        this.msgDiv.className = type === 'happy' ? 'valid-feedback' : 'invalid-feedback';
        this.msgDiv.textContent = msg;
    }
    get value() {
        return this.el.value;
    }
    static fromId(id) {
        return new InputWrapper(document.getElementById(id));
    }
}
exports.InputWrapper = InputWrapper;
//# sourceMappingURL=InputWrapper.js.map