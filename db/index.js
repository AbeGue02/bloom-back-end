const mongoose = require('mongoose')
require('dotenv').config()

mongoose
    .connect(process.env.ATLAS_CONNECTION_STRING, { dbName: "Bloom" })
    .then(() => {
        console.log('Successfully connected to MongoDB.')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })
mongoose.set({debug: true}) //returns console.logs when it does something

const db = mongoose.connection

module.exports = db