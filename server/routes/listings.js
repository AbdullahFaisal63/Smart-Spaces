const express = require("express")
const router = express.Router()
const { listings } = require("../models")
const { where } = require("sequelize")
const { Op } = require('sequelize');

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
    const propTitle = req.params.propTitle;
    const list = await listings.findAll({ 
        where: { 
            title: { 
                [Op.like]: `${propTitle}%` 
            }
        }
    });
    res.json(list);
});

router.post("/newListing", async (req, res) => {
    const listing = req.body
    await listings.create(listing)
    res.json(listings)
})

router.post("/update/:propId", async (req, res) => {
    const propId = req.params.propId; // Get the propId from the route parameter
    const updatedListingData = req.body; // Assuming req.body contains the updated data

    try {
        // Assuming 'listings' is your Sequelize model
        const updatedListing = await listings.update(updatedListingData, {
            where: {
                id: propId // Update the listing where propId matches the provided propId
            }
        });

        res.json(updatedListing); // Return the updated listing
    } catch (error) {
        console.error('Error updating listing:', error);
        res.status(500).json({ error: 'Failed to update listing' });
    }
});


module.exports = router