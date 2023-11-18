const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: [true, "Reaction body is required"],
        maxlength: [280, "Reaction body must be at most 280 characters"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = reactionSchema;
