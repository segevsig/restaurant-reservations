import { Router } from "express";
import prisma from "../prisma";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - partySize
 *               - startTime
 *               - endTime
 *             properties:
 *               tableId:
 *                 type: string
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               partySize:
 *                 type: integer
 *                 example: 4
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-15T19:00:00Z"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-15T21:00:00Z"
 *     responses:
 *       200:
 *         description: Reservation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reservation:
 *                   type: object
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Get all reservations for the logged-in user
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reservations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       tableId:
 *                         type: string
 *                       partySize:
 *                         type: integer
 *                       startTime:
 *                         type: string
 *                         format: date-time
 *                       endTime:
 *                         type: string
 *                         format: date-time
 *                       status:
 *                         type: string
 *                       table:
 *                         type: object
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const reservations = await prisma.reservation.findMany({
      where: { userId: req.userId! },
      include: { table: true }, 
    });

    res.json({ reservations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/reservations/{id}/status:
 *   patch:
 *     summary: Update reservation status
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: "confirmed"
 *                 enum: [booked, confirmed, cancelled, completed]
 *     responses:
 *       200:
 *         description: Reservation status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reservation:
 *                   type: object
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Internal server error
 */
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
