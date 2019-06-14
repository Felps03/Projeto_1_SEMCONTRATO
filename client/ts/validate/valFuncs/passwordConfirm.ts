import { InputWrapper } from '../InputWrapper'

export function valPasswordConfirm(pw: InputWrapper, confirm: InputWrapper): string {
    return pw.value === confirm.value ? 'Senhas não batem' : null
}