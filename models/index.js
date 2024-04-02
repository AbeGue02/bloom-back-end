const mongoose = require('mongoose')
const tierSchema = require('./tier')
const userSchema = require('./user')
const habitSchema = require('./habit')

const Tier = mongoose.model('Tier', tierSchema, `Tier`)
const User = mongoose.model('User', userSchema, `User`)
const Habit = mongoose.model('Habit', habitSchema, `Habit`)

module.exports = {
    Tier,
    User,
    Habit,
}