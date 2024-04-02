const { Schema } = require('mongoose')

const HabitSchema = new Schema(
    {
        title: { type: String, required: true },
        emoji: { type: String, required: true },
        frequency: { type: String, required: true, default: 'daily' },
        notes: { type: String, required: true, default: "" },
        completions: { type: [Date], required: true, default: [] },
        reminders: { type: Boolean, required: true, default: true },
        reminder_time: { type: Date, required: false, default: new Date(0,0,0,9) },
        start_date: { type: Date, required: true, default: Date.now() },
        end_date: { type: Date, required: false }
    },
    { timestamps: true },
)

module.exports = HabitSchema