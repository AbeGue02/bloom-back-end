const { User, Tier } = require('../models')

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
        const user = await User.findById(req.params.userID).populate('tier')
        if (user) {
            res.json(user)
        }
    } catch (error) {
        return res.status(500).send('User with the specified ID does not exists');
    }
}

const createUser = async (req,res) => {
    try {
        const minTier = await Tier.find({ min_score: 0 })
        let user = new User(req.body)
        user.tier = minTier[0]._id
        const matchingUsers = await User.find({ $or: [{username: req.body.username}, {email: req.body.email}] })
        console.log(user)
        if (!matchingUsers.length) {
            await user.save()
            return res.status(201).json({
                user,
            })
        } else {
            return res.status(403).send("User already exists with that email or username")
        }
        
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.find({email: email, password: password})
        user.length ? res.status(201).json(user[0]) : res.status(403).send('User with credentials could not be found')
    } catch (error) {
        return res.status(500).send("An error has occured")
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
    loginUser,
    updateUser,
    deleteUser
}