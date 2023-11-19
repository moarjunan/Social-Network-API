const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { userData, thoughtData } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected");

    let thoughtCheck = await connection.db
        .listCollections({ name: "thoughts" })
        .toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection("thoughts");
    }

    let userCheck = await connection.db
        .listCollections({ name: "users" })
        .toArray();
    if (userCheck.length) {
        await connection.dropCollection("users");
    }

    await User.insertMany(userData);
    await Thought.insertMany(thoughtData);

    console.info("Seeded successfully");
    process.exit(0);
});
