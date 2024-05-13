const express = require("express")
const router = express.Router()
const { listings } = require("../models")
const { where } = require("sequelize")

router.get("/", async (req, res) => {
    const list = await listings.findAll()
    res.json(list)
})

router.get("/usr/:userId", async (req, res) => {
    const userId = req.params.userId
    const list = await listings.findAll({ where: { userId: userId}})
    res.json(list)
})

router.get("/:propId", async (req, res) => {
    const propId = req.params.propId
    const list = await listings.findAll({ where: { id: propId}})
    res.json(list)
})

router.get("/del/:propId", async (req, res) => {
    const propId = req.params.propId
    const list = await listings.destroy({ where: { id: propId}})
    res.json(list)
})

router.get("/search/:propTitle", async (req, res) => {
    const propTitle = req.params.propTitle
    const list = await listings.findAll({ where: { title: propTitle}})
    res.json(list)
})

router.post("/newListing", async (req, res) => {
    const listing = req.body
    await listings.create(listing)
    res.json(listings)
})

module.exports = router