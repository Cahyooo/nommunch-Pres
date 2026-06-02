import express from "express";
import db from "../db.js";
import { getOrCreateVisitor } from "./visitor.js";

const router = express.Router();

// READ ALL
router.get("/", async (req, res) => {
    const [rows] = await db.query(`
        SELECT
            feedbacks.*,
            visitors.name,
            visitors.email,
            products.name AS product_name
        FROM feedbacks
        JOIN visitors ON feedbacks.visitor_id = visitors.id
        JOIN products ON feedbacks.product_id = products.id
        ORDER BY feedbacks.created_at DESC
    `);

    res.json(rows);
});

// CREATE
router.post("/", async (req, res) => {
    const {
        name,
        email,
        product_id,
        message,
    } = req.body;

    const visitor_id = await getOrCreateVisitor(
        name,
        email
    );

    await db.query(
        `
        INSERT INTO feedbacks
        (visitor_id, product_id, message)
        VALUES (?, ?, ?)
        `,
        [visitor_id, product_id, message]
    );

    res.json({
        message: "Feedback added",
    });
});

// DELETE
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    await db.query(
        "DELETE FROM feedbacks WHERE id = ?",
        [id]
    );

    res.json({
        message: "Feedback deleted",
    });
});

export default router;