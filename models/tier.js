const { Schema } = require('mongoose')

const TierSchema = new Schema(
    {
        name: { type: String, required: true },
        emoji: { type: String, required: true },
        min_score: { type: Number, required: true, min: 0 },
        max_score: { type: Number },
    },
    { timestamps: true },
)

module.exports = TierSchema