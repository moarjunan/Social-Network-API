const { User } = require("../models");

const userController = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
            console.log(users);
        } catch (error) {
            handleServerError(res, error);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const user = await findUserById(req.params.userId);

            if (!user) {
                return handleNotFound(res, "No user with that ID");
            }

            res.json(user);
        } catch (error) {
            handleServerError(res, error);
        }
    },

    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (error) {
            handleServerError(res, error);
        }
    },

    updateUser: async (req, res) => {
        try {
            const user = await updateUserById(req.params.userId, req.body);

            if (!user) {
                return handleNotFound(res, "No user with that ID");
            }

            res.json(user);
        } catch (error) {
            handleServerError(res, error);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const deletedUser = await deleteUserById(req.params.userId);

            if (!deletedUser) {
                return handleNotFound(res, "No user with that ID");
            }
            res.json({ message: "User and thoughts deleted" });
        } catch (error) {
            handleServerError(res, error);
        }
    },

    addFriend: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);

            if (!user.friends.includes(req.params.friendId)) {
                user.friends.push(req.params.friendId);

                await user.save();

                res.status(200).json("Added friend successfully");
            } else {
                res.status(400).json("Already friends");
            }
        } catch (error) {
            handleServerError(res, error);
        }
    },

    deleteFriend: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);

            if (user.friends.includes(req.params.friendId)) {
                user.friends.pull(req.params.friendId);

                res.status(200).json("Removed friend successfully");
            } else {
                res.status(400).json("You were never friends");
            }
        } catch (error) {
            handleServerError(res, error);
        }
    },
};

// Helper functions

async function findUserById(userId) {
    return await User.findOne({ _id: userId });
}

async function updateUserById(userId, updateData) {
    return await User.findOneAndUpdate(
        { _id: userId },
        { $set: updateData },
        { runValidators: true, new: true }
    );
}

async function deleteUserById(userId) {
    return await User.findOneAndDelete({ _id: userId });
}

function handleNotFound(res, message) {
    return res.status(404).json({ message });
}

function handleServerError(res, error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
}

module.exports = userController;
