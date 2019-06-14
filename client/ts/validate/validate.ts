import { InputWrapper } from "./InputWrapper";

export function validate(input: InputWrapper, fn: (input: InputWrapper, ...opts: any) => string, ...opts: any): (event: Event) => boolean {

    return function (event: Event) {
        const msg = fn(input, ...opts)

        if (msg) {
            input.setValid(false, msg)
            event.preventDefault()

            return false
        }

        input.setValid(true)
        return true
    }
}