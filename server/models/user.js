const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
 
    fullName: {
        type: String,
        required: true
    },
 
    email: {
        type: String,
        required: true
    },

    questions: [String],

    answers: [{
        qId: String,
        aId: String
    }],

    upvotes: {
        type: Number,
        default: 0
    }
    
})
 
const User = mongoose.model('User', userSchema);
module.exports = {
    userSchema, 
    User
}