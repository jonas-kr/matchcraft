const mongoose = require('mongoose')
const TerrainSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        prix: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        covered: {
            type: Boolean,
            required: true,
        },
        ground: {
            type: String,
            required: true,
        },
        
    }, { timestamps: true }
)

const Terrain = mongoose.model('Terrain', TerrainSchema)

module.exports = Terrain