const { Schema } = require('mongoose')

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, require: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        date_of_birth: { type: Date, required: false, default: Date.now() },
        profile_picture: { type: String, required: false, default: "https://i.imgur.com/6qrE6ek.jpeg" },
        score: { type: Number, required: false, default: 0, min: 0 },
        tier: { type: Schema.Types.ObjectId, ref: "Tier", required: true },
        preferences: { 
            notifications: { type: Boolean, required: false, default: true }
        }
    },
    { timestamps: true },
)

module.exports = UserSchema