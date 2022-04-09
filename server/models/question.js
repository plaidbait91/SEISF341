const mongoose = require('mongoose');
const _ = require('./user')
const answerSchema = require('./answer')
const userSchema = _.userSchema
const Schema = mongoose.Schema;

const questionSchema = new Schema({

    title: {
        type: String,
        required: true
    },

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

    answers: [answerSchema],

    tags: [String],

    upvoteList: [String],

    downvoteList: [String],

    reportList: [String]
    
}, { timestamps: true })

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;