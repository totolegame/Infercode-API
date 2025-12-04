const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.json({ ok: false, message: "Champs manquants" });
    }

    try {
        const hashed = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashed
        });

        res.json({ ok: true, message: "Compte créé avec succès !" });
    } catch (err) {
        res.json({ ok: false, message: "Erreur serveur", error: err });
    }
});

module.exports = router;
