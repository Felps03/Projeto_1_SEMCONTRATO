var mongoosePaginate = require('mongoose-paginate');
const mongoose = require('../../database/index');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const AccessSchema = new mongoose.Schema({
    // id_user: {
    //     type: String,
    //     required: true
    // },
    date: {
        type: Date,
        required: true
    }
});

AccessSchema.plugin(mongoosePaginate);
AccessSchema.plugin(aggregatePaginate);

const Access = mongoose.model('Access', AccessSchema);

module.exports = Access;