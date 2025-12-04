import express from "express";
const router = express.Router();

// --- REGISTER (FAKE) ---
router.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
        return res.json({ ok: false, message: "Champs manquants" });
    }

    res.json({
        ok: true,
        message: `Compte créé (FAKE) pour ${email}`
    });
});

// --- LOGIN (FAKE) ---
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ ok: false, message: "Champs manquants" });
    }

    // Fake token
    res.json({
        ok: true,
        token: "FAKE_TOKEN_12345",
        email
    });
});

export default router;
