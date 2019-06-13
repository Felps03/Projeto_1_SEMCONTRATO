import { validate, valDate, valPasswordConfirm, valPasswordLength } from './validate/index'
import { InputWrapper } from './validate/InputWrapper';

const dateInput = new InputWrapper(<HTMLInputElement>document.getElementById('birthdate'));
const passwordInput = new InputWrapper(<HTMLInputElement>document.getElementById('password'));
const passwordConfirmInput = new InputWrapper(<HTMLInputElement>document.getElementById('passwordConfirm'));

dateInput.el.addEventListener('input', validate(dateInput, valDate))
passwordInput.el.addEventListener('input', validate(passwordInput, valPasswordLength))
passwordInput.el.addEventListener('input', validate(passwordInput, valPasswordConfirm, passwordConfirmInput))