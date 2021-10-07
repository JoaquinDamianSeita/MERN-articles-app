const express = require("express");
const routerUsers = express.Router();

const bcrypt = require("bcrypt");
const User = require("../models/user");

routerUsers.post("/", async (req,res) => {
    const {body} = req;
    const {username,name,password} = body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password,saltRounds);

    const user = new User({
        username,
        name,
        passwordHash,
    });

    user.save().then(savedUser => res.json(savedUser));
})

module.exports = routerUsers;