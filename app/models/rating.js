var mongoosePaginate = require('mongoose-paginate');
const mongoose = require('../../database/index');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const RatingSchema = new mongoose.Schema({
    id_useChatBot: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    evaluation: {
        type: Boolean,
        required: true
    }
});

RatingSchema.plugin(mongoosePaginate);
RatingSchema.plugin(aggregatePaginate);

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;