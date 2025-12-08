import { Router } from "express";
import prisma from "../prisma";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

// CREATE reservation
router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { tableId, partySize, startTime, endTime } = req.body;

    const reservation = await prisma.reservation.create({
      data: {
        userId: req.userId!,
        tableId,            // optional
        partySize,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: "booked",
      },
    });

    res.json({ reservation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// LIST reservations for logged-in user
router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const reservations = await prisma.reservation.findMany({
      where: { userId: req.userId! },
      include: { table: true }, // optional: fetch table info
    });

    res.json({ reservations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/:id/status", authMiddleware, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const reservation = await prisma.reservation.update({
      where: { id },
      data: { status },
    });

    res.json({ reservation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
