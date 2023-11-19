const { Thought } = require("../models");

const thoughtController = {
    getThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
            console.log(thoughts);
        } catch (error) {
            handleServerError(res, "Error fetching thoughts");
        }
    },

    getSingleThought: async (req, res) => {
        try {
            const thought = await findThoughtById(req.params.thoughtId);

            if (!thought) {
                return handleNotFound(res, "Thought not found with the provided ID");
            }

            res.json(thought);
        } catch (error) {
            handleServerError(res, "Error fetching thought");
        }
    },

    createThought: async (req, res) => {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (error) {
            handleServerError(res, "Error creating thought");
        }
    },

    updateThought: async (req, res) => {
        try {
            const thought = await updateThoughtById(req.params.thoughtId, req.body);

            if (!thought) {
                return handleNotFound(res, "Thought not found with the provided ID");
            }

            res.json(thought);
        } catch (error) {
            handleServerError(res, "Error updating thought");
        }
    },

    deleteThought: async (req, res) => {
        try {
            const deletedThought = await deleteThoughtById(req.params.thoughtId);

            if (!deletedThought) {
                return handleNotFound(res, "Thought not found with the provided ID");
            }

            res.json({ message: "Thought and associated reactions deleted" });
        } catch (error) {
            handleServerError(res, "Error deleting thought");
        }
    },

    addReaction: async (req, res) => {
        try {
            const thought = await addReactionToThought(req.params.thoughtId, req.body);

            if (!thought) {
                return handleNotFound(res, "Thought not found with the provided ID");
            }

            res.json(thought);
        } catch (error) {
            handleServerError(res, "Error adding reaction");
        }
    },

    removeReaction: async (req, res) => {
        try {
            const thought = await removeReactionFromThought(req.params.thoughtId, req.params.reactionId);

            if (!thought) {
                return handleNotFound(res, "Thought not found with the provided ID");
            }

            res.json(thought);
        } catch (error) {
            handleServerError(res, "Error removing reaction");
        }
    },
};

// Helper functions

async function findThoughtById(thoughtId) {
    return await Thought.findOne({
        _id: thoughtId,
    });
}

async function updateThoughtById(thoughtId, updateData) {
    return await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $set: updateData },
        { runValidators: true, new: true }
    );
}

async function deleteThoughtById(thoughtId) {
    return await Thought.findOneAndDelete({
        _id: thoughtId,
    });
}

async function addReactionToThought(thoughtId, reactionData) {
    return await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $push: { reactions: reactionData } },
        { runValidators: true, new: true }
    );
}

async function removeReactionFromThought(thoughtId, reactionId) {
    return await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { reactionId: reactionId } } },
        { runValidators: true, new: true }
    );
}

function handleNotFound(res, message) {
    return res.status(404).json({ message });
}

function handleServerError(res, message) {
    console.error(message);
    return res.status(500).json({ error: "Internal Server Error" });
}

module.exports = thoughtController;
