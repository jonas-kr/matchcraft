const express = require('express')
const User = require('../models/UserModel')
const { registerUser, loginUser, getUser, createRes, getStadiums, createCol, updateUser, createPre } = require('../controllers/UsersController')
const auth = require('../middlewares/Auth')
const Reservation = require('../models/ReservationModel')
const router = express.Router()



router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

router.get('/one', auth, getUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/update', updateUser)

router.get('/reservations/:id', async (req, res) => {
    const { id } = req.params
    try {
        const reservations = await Reservation.find({user:id})
        res.status(200).json(reservations)

    } catch (error) {
        res.json({ message: `Error is ${error.message}` })
    }
})

router.post('/reserver', auth, createRes)
router.post('/collation', createCol)
router.post('/prestation', createPre)



module.exports = router
