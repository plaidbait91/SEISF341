const mongoose = require('mongoose');
const _ = require('./user')
const userSchema = _.userSchema
const Schema = mongoose.Schema;

const answerSchema = new Schema({

    body: {
        type: String,
        required: true
    },

    postedBy: {
        type: userSchema,
        required: true
    },

    upvotes: {
        type: Number,
        default: 0
    },

    reports: {
        type: Number,
        default: 0
    },

    approved: {
        type: Boolean,
        default: false
    },

    upvoteList: [String],

    downvoteList: [String]
    
}, { timestamps: true })

module.exports = answerSchema;