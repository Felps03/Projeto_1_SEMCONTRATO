export class InputWrapper {
    public readonly msgDiv: HTMLElement

    constructor(
        public readonly el: HTMLInputElement
    ) {
        this.msgDiv = <HTMLElement>el.nextElementSibling
    }

    public setMsg(msg: string, type: string = 'happy'): void {
        this.msgDiv.className = type === 'happy' ? 'valid-feedback' : 'invalid-feedback'
        this.msgDiv.textContent = msg
    }

    get value() {
        return this.el.value
    }

    public static fromId(id: string): InputWrapper {
        return new InputWrapper(<HTMLInputElement>document.getElementById(id))
    }

}