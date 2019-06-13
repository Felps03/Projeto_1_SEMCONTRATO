import { InputWrapper } from "./InputWrapper";

export function validate(el: InputWrapper, fn: (el: InputWrapper, ...opts: any) => string, ...opts: any): (event: Event) => boolean {

    return function (event: Event) {
        const err = fn(el, ...opts)

        if (err) {
            el.setMsg(err)
            event.preventDefault()

            return false
        }

        return true
    }
}