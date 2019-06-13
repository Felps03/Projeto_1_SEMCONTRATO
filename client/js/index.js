"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./validate/index");
const InputWrapper_1 = require("./validate/InputWrapper");
const dateInput = InputWrapper_1.InputWrapper.fromId('birthdate');
const passwordInput = InputWrapper_1.InputWrapper.fromId('password');
const passwordConfirmInput = InputWrapper_1.InputWrapper.fromId('passwordConfirm');
dateInput.el.addEventListener('input', index_1.validate(dateInput, index_1.valDate));
passwordInput.el.addEventListener('input', index_1.validate(passwordInput, index_1.valPasswordLength));
passwordInput.el.addEventListener('input', index_1.validate(passwordInput, index_1.valPasswordConfirm, passwordConfirmInput));
//# sourceMappingURL=index.js.map