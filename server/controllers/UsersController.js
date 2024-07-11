const Collation = require("../models/CollationModel")
const Prestation = require("../models/PrestationModel")
const Reservation = require("../models/ReservationModel")
const Terrain = require("../models/TerrainModel")
const User = require("../models/UserModel")
const JWT = require('jsonwebtoken')
require('dotenv').config()


const createToken = (id) => {
    return JWT.sign({ id }, process.env.SECRET_PHRASE, { expiresIn: '7d' })
}
const registerUser = async (req, res) => {
    const { nom, prenom, email, mdp, numTel, adress } = req.body
    if (!email || !mdp || !prenom || !nom || !numTel || !adress) {
        return res.status(400).json({ message: "all the Fields must be filled" })
    }
    const existEmail = await User.findOne({ email })
    if (existEmail) {
        return res.status(400).json({ message: "email already taken" })
    }

    try {
        const user = await User.create({
            email, mdp,
            nom, prenom, numTel, adress
        })
        //Create JWT
        const token = createToken(user._id)
        res.status(200).json({ email, token, nom, prenom,id : user._id })
    } catch (error) {
        res.status(500).json({ message: `Error is ${error.message}` })
    }
}

const loginUser = async (req, res) => {
    const { email, mdp } = req.body
    if (!email || !mdp) {
        return res.status(400).json({ message: "Fields must be filled" })
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: "Incorrect Email" })
    }
    const match = (mdp === user.mdp)
    if (!match) {
        return res.status(400).json({ message: "Incorrect Password" })
    }

    try {
        //Create JWT
        const token = createToken(user._id)
        res.status(200).json({ email, token, nom: user.nom, prenom: user.prenom ,id : user._id })
    } catch (error) {
        res.status(500).json({ message: `Error is ${error.message}` })
    }

}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.status(200).json(user)

    } catch (error) {
        res.json({ message: `Error is ${error.message}` })
    }
}

const createCol = async (req, res) => {
    const { water, bananas, energyD, jusN, biscuits, pommes } = req.body
    if (!water || !bananas || !energyD || !jusN || !biscuits || !pommes) {
        return res.status(400).json({ message: "Fields must be filled" })
    }
    try {
        const collation = await Collation.create({ water, bananas, energyD, jusN, biscuits, pommes })
        res.status(200).json(collation)
    } catch (error) {
        res.json({ message: `Error is ${error.message}` })
    }
}
const createPre = async (req, res) => {
    const { medcin, arbitre, photograph } = req.body
    try {
        const prestation = await Prestation.create({ medcin, arbitre, photograph })
        res.status(200).json(prestation)
    } catch (error) {
        res.json({ message: `Error is ${error.message}` })
    }
}
const createRes = async (req, res) => {
    const { terrain, date, horaire, price, collation, prestation } = req.body
    if (!terrain || !date || !horaire || !price || !collation || !prestation) {
        return res.status(400).json({ message: "Fields must be filled" })
    }
    const check = await Reservation.findOne({ date, horaire, terrain })

    if (check) {
        return res.status(400).json({ message: "The Stadium is already Taken" })
    }
    const user = await User.findById(req.user._id)
    try {
        const reservation = await Reservation.create({
            user:
                user._id, terrain, date, horaire, price, collation, prestation
        })
        res.status(200).json({ message: "Reservation is Done" })
    } catch (error) {
        res.json({ message: `Error is ${error.message}` })
    }
}
const getStadiums = async (req, res) => {
    try {
        const terrains = await Terrain.find({})
        res.status(200).json(terrains)

    } catch (error) {
        res.json({ message: `Error is ${error.message}` })
    }
}

const updateUser = async (req, res) => {
    try {
        const {
            mdp
        } = req.body
        const { id } = req.params
        const user = await User.findByIdAndUpdate(id, { mdp })
        if (!user) {
            res.status(404).json({ message: `cannot find user to update ${id}` })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { registerUser, loginUser, updateUser, createCol, getUser, createRes, getStadiums, createPre }
