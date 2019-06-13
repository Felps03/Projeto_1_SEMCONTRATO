import { InputWrapper } from '../InputWrapper'

export function valDate(date: InputWrapper): string {
    const today = new Date()
    const inputDay = new Date(date.value)

    if (today.getFullYear() === inputDay.getFullYear()) {
        if (today.getMonth() === inputDay.getMonth()) {
            if (today.getDate() >= inputDay.getDate() - 1) {
                return 'Data deve ser pelo menos dois dias atrás.'
            }
        }
    }

    return null
}