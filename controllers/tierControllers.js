const { Tier } = require('../models')

const getTiers = async (req, res) => {
    try {
        const tiers = await Tier.find()
        res.json(tiers)
    } catch (error) {
        return res.status(500).send("An error has occured")
    }
}

const getTierById = async (req,res) => {
    try {
        const tier = await Tier.findById(req.params.id)
        if (tier) {
            res.json(tier)
        }
    } catch (error) {
        return res.status(500).send('Tier with the specified ID does not exists');
    }
}

const createTier = async (req,res) => {
    try {
        const tier = await new Tier(req.body)
        await tier.save()
        return res.status(201).json({
            tier,
        })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const updateTier = async (req, res) => {
    try {
        let { id } = req.params
        let tier = await Tier.findByIdAndUpdate(id, req.body, { new: true })
        if (tier) {
            return res.status(200).json(tier)
        }
        throw new Error("Tier could not be found. Maybe id is wrong?")
    } catch(e) {
        return res.status(500).send(error.message)
    }
}

const deleteTier = async (req,res) => {
    try {
        const { id } = req.params
        const deleted = await Tier.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Tier has been deleted")
        }
        throw new Error("Tier could not be found. Maybe id is wrong?")
    } catch (e) {
        return res.status(500).send(error.message)
    }
}


module.exports = {
    getTiers,
    getTierById,
    createTier,
    updateTier,
    deleteTier
}