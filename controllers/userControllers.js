const { User } = require('../models')

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        return res.status(500).send("An error has occured")
    }
}

const getUserById = async (req,res) => {
    try {
        const user = await User.findById(req.params.userID)
        if (user) {
            res.json(user)
        }
    } catch (error) {
        return res.status(500).send('User with the specified ID does not exists');
    }
}

const createUser = async (req,res) => {
    try {
        const user = await new User(req.body)
        await user.save()
        return res.status(201).json({
            user,
        })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const updateUser = async (req, res) => {
    try {
        let { userID } = req.params
        let user = await User.findByIdAndUpdate(userID, req.body, { new: true })
        if (user) {
            return res.status(200).json(user)
        }
        throw new Error("User could not be found. Maybe userID is wrong?")
    } catch(e) {
        return res.status(500).send(error.message)
    }
}

const deleteUser = async (req,res) => {
    try {
        const { userID } = req.params
        const deleted = await User.findByIdAndDelete(userID)
        if (deleted) {
            return res.status(200).send("User has been deleted")
        }
        throw new Error("User could not be found. Maybe userID is wrong?")
    } catch (e) {
        return res.status(500).send(error.message)
    }
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}