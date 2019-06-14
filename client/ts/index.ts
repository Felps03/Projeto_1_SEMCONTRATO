import { validate, InputWrapper } from './validate/index'
import {
    valDatePast, valEmailFormat, valLastNameLength,
    valNameFormat, valNameLength, valPasswordConfirm,
    valPasswordLength, valPhotoExt
} from './validate/valFuncs'

const dateInput = InputWrapper.fromId('birthdate')
const emailInput = InputWrapper.fromId('email')
const lastNameInput = InputWrapper.fromId('lastname')
const nameInput = InputWrapper.fromId('name')
const passwordInput = InputWrapper.fromId('password')
const passwordConfirmInput = InputWrapper.fromId('passwordConfirm')
const photoInput = InputWrapper.fromId('photo')

validate(dateInput, valDatePast)
validate(emailInput, valEmailFormat)
validate(lastNameInput, valLastNameLength)
validate(nameInput, valNameLength)
validate(nameInput, valNameFormat)
validate(passwordInput, valPasswordLength)
validate(passwordInput, valPasswordConfirm, passwordConfirmInput)
validate(photoInput, valPhotoExt)