import { InputWrapper } from '../InputWrapper'

export function valLastNameLength(lastName: InputWrapper): string {
    return lastName.value.length > 2 ? 'Sobrenome muito curto.' : null
}