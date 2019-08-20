var mongoosePaginate = require('mongoose-paginate');
const mongoose = require('../../database/index');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const UseChatBotSchema = new mongoose.Schema({
    id_access: {
        type: mongoose.Schema.Types.String,
        required: true
    }
});

UseChatBotSchema.plugin(mongoosePaginate);
UseChatBotSchema.plugin(aggregatePaginate);

const UseChatBot = mongoose.model('UseChatBot', UseChatBotSchema);

module.exports = UseChatBot;