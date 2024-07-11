const express = require('express')
const Terrain = require('../models/TerrainModel')
const Reservation = require('../models/ReservationModel')
const router = express.Router()


router.post('/new', async (req, res) => {
    const { nom, type, prix, location, covered, ground ,image} = req.body
    if (!prix || !type || !nom || !location || !ground) {
        return res.status(400).json({ message: "all the Fields must be filled" })
    }
    try {
        const terrain = await Terrain.create({ nom, image, type, prix, location, covered, ground })
        res.status(200).json(terrain)
    } catch (error) {
        res.status(500).json({ message: `Error is ${error.message}` })
    }
})

router.get('/reservations', async (req, res) => {
    try {
        const reservation = await Reservation.find({}).sort({ "createdAt": -1 })
        res.status(200).json(reservation)
    } catch (error) {
        res.status(500).json({ message: `Error is ${error.message}` })
    }
})

router.get('/stadiums', async (req, res) => {
    try {
        const terrains = await Terrain.find({})
        res.status(200).json(terrains)

    } catch (error) {
        res.json({ message: `Error is ${error.message}` })
    }
})

router.get('/stadium/:id', async (req, res) => {
    const { id } = req.params
    try {
        const terrain = await Terrain.findById(id)
        res.status(200).json(terrain)

    } catch (error) {
        res.json({ message: `Error is ${error.message}` })
    }
})

module.exports = router
