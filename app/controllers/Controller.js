class Controller {

    constructor() {}

    add() {
        throw new Error('O método adiciona deve ser implementado');
    }

    update() {
        throw new Error('O método atualizar deve ser implementado');
    }

    listDate() {
        throw new Error('O método lista por data deve ser implementado');
    }

    /*listUser() {
        throw new Error('O método lista por data deve ser implementado');
    }

    listDateUser() {
        throw new Error('O método lista por data deve ser implementado');
    }

    listAll() {
        throw new Error('O método lista por data deve ser implementado');
    }*/

    remove() {
        throw new Error('O método deletar deve ser implementado');
    }
}

exports.Controller = Controller;