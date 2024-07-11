const mongoose = require('mongoose')
const CollationSchema = mongoose.Schema(
    {
        water: {
            type: String,
            default: "0"
        },
        bananas: {
            type: String,
            default: "0"
        },
        energyD: {
            type: String,
            default: "0"
        },
        jusN: {
            type: String,
            default: "0"
        },
        biscuits: {
            type: String,
            default: "0"
        },
        pommes: {
            type: String,
            default: "0"
        },
    }, { timestamps: true }
)

const Collation = mongoose.model('Collation', CollationSchema)

module.exports = Collation
