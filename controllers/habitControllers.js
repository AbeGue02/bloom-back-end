const { Habit } = require('../models')

const getHabits = async (req, res) => {
    try {
        const habits = await Habit.find()
        res.json(habits)
    } catch (error) {
        return res.status(500).send("An error has occured")
    }
}

const getHabitById = async (req,res) => {
    try {
        const habit = await Habit.findById(req.params.habitID)
        if (habit) {
            res.json(habit)
        }
    } catch (error) {
        return res.status(500).send('Habit with the specified ID does not exists');
    }
}

const getHabitsFromUser = async (req,res) => {
    try {
        const habits = await Habit.find({user: req.params.userID})
        if (habits) {
            res.status(201).json(habits)
        }
    } catch (error) {
        return res.status(500).send('Habits with the specified User do not exists');
    }
}

const createHabit = async (req,res) => {
    try {
        const habit = await new Habit(req.body)
        await habit.save()
        return res.status(201).json({
            habit,
        })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const updateHabit = async (req, res) => {
    try {
        let { habitID } = req.params
        let habit = await Habit.findByIdAndUpdate(habitID, req.body, { new: true })
        if (habit) {
            return res.status(200).json(habit)
        }
        throw new Error("Habit could not be found. Maybe id is wrong?")
    } catch(e) {
        return res.status(500).send(error.message)
    }
}

const deleteHabit = async (req,res) => {
    try {
        const { habitID } = req.params
        const deleted = await Habit.findByIdAndDelete(habitID)
        if (deleted) {
            return res.status(200).send("Habit has been deleted")
        }
        throw new Error("Habit could not be found. Maybe id is wrong?")
    } catch (e) {
        return res.status(500).send(error.message)
    }
}


module.exports = {
    getHabits,
    getHabitById,
    getHabitsFromUser,
    createHabit,
    updateHabit,
    deleteHabit
}