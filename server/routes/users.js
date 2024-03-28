const express = require("express")
const router = express.Router()
const { users } = require("../models")

router.get("/", async (req, res) => {
    const list = await users.findAll()
    res.json(list)
})

router.post("/", async (req, res) => {
    const user = req.body;
    await users.create(user)
    res.json(user)
})

module.exports = router