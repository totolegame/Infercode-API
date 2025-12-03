import { Router } from "express";
const router = Router();

router.post("/register", (req, res) => {
  const { email } = req.body;
  res.json({ ok: true, message: `Compte créé (FAKE) pour ${email}` });
});

router.post("/login", (req, res) => {
  const { email } = req.body;
  res.json({
    ok: true,
    message: `Connexion (FAKE) pour ${email}`,
    token: "token-demo-123"
  });
});

export default router;
