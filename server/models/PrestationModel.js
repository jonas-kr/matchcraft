const mongoose = require('mongoose')
const PrestationSchema = mongoose.Schema(
    {
        arbitre: {
            type: Boolean,
            default: false
        },
        medcin: {
            type: Boolean,
            default: false
        },
        photograph: {
            type: Boolean,
            default: false
        },
    
    }, { timestamps: true }
)

const Prestation = mongoose.model('Prestation', PrestationSchema)

module.exports = Prestation
