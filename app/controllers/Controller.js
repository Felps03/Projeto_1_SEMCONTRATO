class Controller {

    constructor() {}

    list() {
        throw new Error('O método lista deve ser implementado');
    }

    add() {
        throw new Error('O método adiciona deve ser implementado');
    }

    update() {
        throw new Error('O método atualizar deve ser implementado');
    }

    remove() {
        throw new Error('O método deletar deve ser implementado');
    }
}

exports.Controller = Controller;