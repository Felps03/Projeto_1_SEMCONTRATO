import { InputWrapper } from '../InputWrapper'

const ALLOWED_EXTS = ['png', 'jpg', 'jpeg']

export function valPhotoExt(file: InputWrapper): string {
    const fileExt = file.value.split('.').pop();

    if (typeof ALLOWED_EXTS.find(function (ext) { return fileExt === ext; }) === 'undefined') {
        return 'Formato de arquivo de imagem inválido.';
    } else {
        return null
    }
}