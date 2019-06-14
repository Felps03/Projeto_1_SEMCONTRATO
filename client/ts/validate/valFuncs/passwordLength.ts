import { InputWrapper } from '../InputWrapper'

export function valPasswordLength(pw: InputWrapper): string {
    return (pw.value.length < 6 || pw.value.length > 8) ?
        'Senha deve ter tamanho entre 6 e 8 dígitos.' : null
}