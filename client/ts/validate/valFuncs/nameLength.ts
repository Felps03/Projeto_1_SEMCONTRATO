import { InputWrapper } from '../InputWrapper'

export function valNameLength(name: InputWrapper): string {
    return name.value.length > 2 ? 'Nome muito curto.' : null
}