const mongoose = require('mongoose')
const ReservationSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        terrain: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Terrain"
        },
        collation: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Collation"
        },
        prestation: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Prestation"
        },
        date: {
            type: String,
            required: true
        },
        horaire: {
            type: String,
            required: true
        },
        price:{
            type: String
        }

    }, { timestamps: true }
)

const Reservation = mongoose.model('Reservation', ReservationSchema)

module.exports = Reservation