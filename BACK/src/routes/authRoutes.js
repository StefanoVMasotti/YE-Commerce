import express from 'express'

const router = express.Router()

router.post('/register', (req, res) => {
    console.log('hiciste una peticion POST a /register')

    res.json({ message: 'hiciste una peticion POST a /register' })
})

router.post('/login', (req, res) => {
    console.log('hiciste una peticion POST a /login')

    res.json({ message: 'hiciste una peticion POST a /login' })
})
router.post('/logout', (req, res) => {
    console.log('hiciste una peticion POST a /logout')

    res.json({ message: 'hiciste una peticion POST a /logout' })
})

router.get('/profile', (req, res) => {
    console.log('hiciste una peticion GET a /profile')

    res.json({ message: 'hiciste una peticion GET a /profile' })
})

export default router
