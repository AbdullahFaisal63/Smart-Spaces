const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const { users } = require("../models")

router.get("/", async (req, res) => {
    const list = await users.findAll()
    res.json(list)
})

router.post("/", async (req, res) => {
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

module.exports = router