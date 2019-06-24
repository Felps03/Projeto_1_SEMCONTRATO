const mongoose = require('../../database/index');

/*
{ 
    "email": "email do usuario",
    "string": "string aleatória",
    "expires": "data da geração da string + 10minutos"
}
*/

const RecoverDataSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    randomString: {
        type: String,
        required: true
    },
    expires: {
        type: Date,
        required: true
    }
});

const RecoverData = mongoose.model('RecoverData', RecoverDataSchema);

module.exports = RecoverData;


