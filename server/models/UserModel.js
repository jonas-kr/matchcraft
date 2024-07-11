const mongoose = require('mongoose')
const UserSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            required: true,
        },
        prenom: {
            type: String,
            required: true,
        },
        numTel: {
            type: String ,           
            required: true,
            default : "0554265298"
        },
        adress: {
            type: String ,           
            required: true,
            default : "wialaya,commune"
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        mdp: {
            type: String,
            required: true,
        },
        statut: {
            type: Boolean,
            required: true,
            default: 0
        },
    }, { timestamps: true }
)

const User = mongoose.model('User',UserSchema)

module.exports = User
