import { InputWrapper } from '../InputWrapper'

const ALLOWED_EXTS = ['png', 'jpg', 'jpeg']

export function valPhotoExt(file: InputWrapper): string {
    const fileExt = file.value.split('.').pop()

    if (ALLOWED_EXTS.indexOf(fileExt) !== -1) {
        return 'Formato de arquivo de imagem inválido.'
    } else {
        return null
    }
}
