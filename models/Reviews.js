const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    name: {
        type: String
    },
    rating: {
        type: String
    },
    message: {
        type: String
    },
    image: {
        type: String
    },
    datePosted: {
        type: Date,
        default: new Date()
    }
})

const Reviews = mongoose.model('Reviews', ReviewSchema);
module.exports = Reviews