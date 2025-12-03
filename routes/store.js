import { Router } from "express";
const router = Router();

router.post("/buy-coins", (req, res) => {
  const { amount } = req.body;

  res.json({
    ok: true,
    message: `Achat FAKE de ${amount} Flammes validé`,
    newBalance: 5000 + amount
  });
});

export default router;
