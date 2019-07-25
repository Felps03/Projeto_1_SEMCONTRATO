const ConfiguracaoSchema = require('../models/configuration')

class configurationDAO {
    findByID(callback) {
        let _id = "5d3a07b931b2d929a846b69b"
        ConfiguracaoSchema.findOne({ _id }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs)
        })
    }
}

module.exports = configurationDAO;