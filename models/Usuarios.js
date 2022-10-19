const  mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    persona:{
        type: Schema.Types.ObjectId,
        ref: 'Persona'
    },
   tipo:{
        type: String,
        required: true
    },
    nick : {
            type: String,
            required: true
        },
    password : {
        type: String,
        required: true
    },
    avatar : {
        type: String
    },
    fechaCreacion : {
        type:Date,
        default: Date.now()
    },
})

module.exports = User = mongoose.model('user', UserSchema)