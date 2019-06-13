import { validate, InputWrapper } from './validate/index'
import { valDate, valPasswordConfirm, valPasswordLength } from './validate/valFuncs'

const dateInput = InputWrapper.fromId('birthdate')
const passwordInput = InputWrapper.fromId('password')
const passwordConfirmInput = InputWrapper.fromId('passwordConfirm')

dateInput.el.addEventListener('input', validate(dateInput, valDate))
passwordInput.el.addEventListener('input', validate(passwordInput, valPasswordLength))
passwordInput.el.addEventListener('input', validate(passwordInput, valPasswordConfirm, passwordConfirmInput))