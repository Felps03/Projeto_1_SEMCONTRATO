import { InputWrapper } from '../InputWrapper'

export function valEmailFormat(email: InputWrapper): string {
    return !/[a-z]+@[a-z]+\.(com|edu|mil|gov|org)(\\.[a-z]{2})?/.test(email.value) ? '' : null
}