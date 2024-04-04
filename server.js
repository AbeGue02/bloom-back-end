//Necessary Imports
const express = require('express');
const db = require('./db');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getTiers, getTierById, createTier, updateTier, deleteTier } = require('./controllers/tierControllers');
const { getUsers, getUserById, createUser, updateUser, deleteUser, loginUser } = require('./controllers/userControllers');
const { getHabits, getHabitById, createHabit, updateHabit, deleteHabit, getHabitsFromUser } = require('./controllers/habitControllers');
require('dotenv').config()

//Controller functions

//Set up for Express
const PORT = process.env.PORT || 3001;
const app = express();

//middleware here
app.use(cors()) //Necessary for some HTTP methods while working on local network
app.use(bodyParser.json()) //Allows you to use the body of requests
app.use(logger('dev')) //Better logs

//Set up and homepage
app.listen(PORT, process.env.HOST_NAME, () => console.log(`Listening at: ${process.env.HOST_NAME}:${PORT}`))

app.get('/', async (req,res) => {
    res.send("<h1>Bloom Server</h1>")
})

//Endpoints
app.get('/tiers', getTiers)
app.get('/tiers/:id', getTierById)
app.post('/tiers/create', createTier)
app.put('/tiers/:id/update', updateTier)
app.delete('/tiers/:id/delete', deleteTier)

app.get('/users', getUsers)
app.get('/users/:userID', getUserById)
app.post('/users/create', createUser)
app.post('/users/login', loginUser)
app.put('/users/:userID/update', updateUser)
app.delete('/users/:userID/delete', deleteUser)

app.get('/habits', getHabits)
app.get('/habits/:habitID', getHabitById)
app.get('/users/:userID/habits', getHabitsFromUser)
app.post('/habits/create', createHabit)
app.put('/habits/:habitID/update', updateHabit)
app.delete('/habits/:habitID/delete', deleteHabit)

// Handle 404 errors
app.get('/*', async (req,res) => {
    res.send('An error has occurred. Try again later (404)')
})