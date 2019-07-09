const mongoosePaginate = require('mongoose-paginate');
const mongoose = require('../../database/index');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const HelpCenterSchema = new mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
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
HelpCenterSchema.plugin(aggregatePaginate);


const HelpCenter = mongoose.model('HelpCenter', HelpCenterSchema);

module.exports = HelpCenter;