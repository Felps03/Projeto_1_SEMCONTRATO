"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./validate/index");
const InputWrapper_1 = require("./validate/InputWrapper");
const dateInput = new InputWrapper_1.InputWrapper(document.getElementById('birthdate'));
const passwordInput = new InputWrapper_1.InputWrapper(document.getElementById('password'));
const passwordConfirmInput = new InputWrapper_1.InputWrapper(document.getElementById('passwordConfirm'));
dateInput.el.addEventListener('input', index_1.validate(dateInput, index_1.valDate));
passwordInput.el.addEventListener('input', index_1.validate(passwordInput, index_1.valPasswordLength));
passwordInput.el.addEventListener('input', index_1.validate(passwordInput, index_1.valPasswordConfirm, passwordConfirmInput));
//# sourceMappingURL=index.js.map