const {Schema , model} = require('mongoose')
const TodoSchema = require('./todo')

const UserSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    todos : [TodoSchema]
})

const User = model("User", UserSchema)

module.exports = User