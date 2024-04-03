const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const { sign } = require("jsonwebtoken")
const { users } = require("../models")
const validateToken = require("../middlewares/auth")

router.get("/", async (req, res) => {
    const list = await users.findAll()
    res.json(list)
})

router.post("/register", async (req, res) => {
    const { firstname, lastname, email, username, password, phone, address } = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        users.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: hash,
            phone: phone,
            address: address
        })
    })
    res.json(req.body)
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await users.findOne({ where: {email: email}})
    if(!user) res.json({error: 'user doesnt exist'})
    else {
        bcrypt.compare(password, user.password).then((match) => {
            if(!match){
                res.json({error:"wrong password"})
            }
            else{
                const accessToken = sign({username: user.username, id: user.id}, "asdflkjh", { expiresIn: '1m' })
                res.json({ accessToken: accessToken, username: user.username })
            }
        
        })

    }


})

router.get('/check', validateToken, (req, res) => {
    // console.log(req.user)
    res.json(req.user)

})

module.exports = router