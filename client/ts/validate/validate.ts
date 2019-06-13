import { InputWrapper } from "./InputWrapper";

export function validate(el: InputWrapper, fn: (el: InputWrapper, ...opts: any) => string, ...opts: any): (event: Event) => boolean {

    return function (event: Event) {
        const msg = fn(el, ...opts)

        if (msg) {
            el.setValid(false, msg)
            event.preventDefault()

            return false
        }

        el.setValid(true)
        return true
    }
}