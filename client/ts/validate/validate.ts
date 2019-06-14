import { InputWrapper } from "./InputWrapper";

export function validate(input: InputWrapper, fn: (input: InputWrapper, ...opts: any) => string, ...opts: any): any {

    input.el.addEventListener('input', function (event: Event) {
        const msg = fn(input, ...opts)

        if (msg) {
            input.setValid(false, msg)
            event.preventDefault()

            return false
        }

        input.setValid(true)
        return true
    })
}