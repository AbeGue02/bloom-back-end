const { Schema } = require('mongoose')

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, require: true, unique: true, dropDups: true },
        email: { type: String, required: true, unique: true, dropDups: true },
        password: { type: String, required: true },
        date_of_birth: { type: Date, required: true },
        profile_picture: { type: String, required: true, default: "https://i.imgur.com/6qrE6ek.jpeg" },
        score: { type: Number, required: true, default: 0, min: 0 },
        preferences: { 
            notifications: { type: Boolean, required: true, default: true }
        }
    },
    { timestamps: true },
)

module.exports = UserSchema