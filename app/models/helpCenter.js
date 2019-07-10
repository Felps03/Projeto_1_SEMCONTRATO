var mongoosePaginate = require('mongoose-paginate');
const mongoose = require('../../database/index');

const HelpCenterSchema = new mongoose.Schema({
    id_user: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

HelpCenterSchema.plugin(mongoosePaginate);

const HelpCenter = mongoose.model('HelpCenter', HelpCenterSchema);

module.exports = HelpCenter;