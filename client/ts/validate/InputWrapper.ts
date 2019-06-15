export class InputWrapper {
    public readonly msgDiv: HTMLElement

    constructor(public readonly el: HTMLInputElement) {
        this.msgDiv = <HTMLElement>el.nextElementSibling
    }

    public setValid(valid: boolean, msg?: string): void {
        if (
            !(
                (this.el.classList.contains('is-valid') && valid) ||
                (this.el.classList.contains('is-invalid') && !valid)
            )
        ) {
            this.el.classList.remove('is-valid')
            this.el.classList.remove('is-invalid')

            this.el.classList.add(valid ? 'is-valid' : 'is-invalid')

            this.msgDiv.className = valid
                ? 'valid-feedback'
                : 'invalid-feedback'
        }

        if (msg) this.setMsg(msg)
    }

    public setMsg(msg: string): void {
        this.msgDiv.textContent = msg
    }

    get value() {
        return this.el.value
    }

    public static fromId(id: string): InputWrapper {
        return new InputWrapper(<HTMLInputElement>document.getElementById(id))
    }
}
