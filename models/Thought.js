const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, "Thought text is required"],
            minlength: [1, "Thought text must be at least 1 character"],
            maxlength: [280, "Thought text must be at most 280 characters"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: [true, "Username is required"],
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        console.log(this);
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
