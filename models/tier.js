const { Schema } = require('mongoose')

const TierSchema = new Schema(
    {
        name: { type: String, required: true },
        emoji: { type: String, required: true },
        min_score: { type: Number, required: true },
        max_score: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = TierSchema