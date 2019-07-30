const mongoose = require('../../database/index');

const ConfigurationSchema = new mongoose.Schema({
    recaptcha: {
        type: Boolean,
        default: false
    }
})

const Configuration = mongoose.model('Configuracao', ConfigurationSchema);

module.exports = Configuration;