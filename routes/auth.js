import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// INSCRIPTION (REGISTER)
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password)
            return res.json({ ok: false, message: "Champs manquants" });

        // Email ou user déjà existants
        const existUser = await User.findOne({ email });
        if (existUser)
            return res.json({ ok: false, message: "Email déjà utilisé" });

        const hashed = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashed,
            coins: 0,
            items: []
        });

        res.json({ ok: true, message: "Compte créé avec succès !" });

    } catch (error) {
        res.json({ ok: false, message: error.message });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.json({ ok: false, message: "Champs manquants" });

        const user = await User.findOne({ email });
        if (!user)
            return res.json({ ok: false, message: "Utilisateur introuvable" });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.json({ ok: false, message: "Mot de passe incorrect" });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            ok: true,
            token,
            user: {
                username: user.username,
                email: user.email,
                coins: user.coins,
                items: user.items
            }
        });

    } catch (error) {
        res.json({ ok: false, message: error.message });
    }
});

export default router;
