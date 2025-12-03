import { Router } from "express";
const router = Router();

router.get("/wallet", (req, res) => {
  res.json({
    ok: true,
    coins: 1200,
    items: ["skin-tribal-chief", "emote-roar"]
  });
});

export default router;
