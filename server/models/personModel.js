const mongoose = require('mongoose')

const Person = {
    name : String,
    age :  Number,
    email: String,
    profile: String
}

module.exports = mongoose.model('person',Person);