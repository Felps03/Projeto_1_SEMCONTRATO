"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("./validate/validate");
const FORM_ELEMENT = document.getElementById('user-register');
FORM_ELEMENT.addEventListener('submit', (event) => {
    console.log(validate_1.validate(FORM_ELEMENT, new Map([
        ['oi', (el) => 'oi']
    ])));
});
//# sourceMappingURL=index.js.map