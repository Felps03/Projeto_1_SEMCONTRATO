import { InputWrapper } from '../InputWrapper'

export function valNameFormat(name: InputWrapper): string {
    return /[A-Z][a-z]+/.test(name.value) ? 'Nome inválido. Dica: acentos não são permitidos.' : null
}