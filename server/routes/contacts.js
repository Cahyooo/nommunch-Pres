import express from "express";
import db from "../db.js";
import { getOrCreateVisitor } from "./visitor.js";

const router = express.Router();

// READ ALL
router.get("/", async (req, res) => {
    const [rows] = await db.query(`
        SELECT
            contacts.*,
            visitors.name,
            visitors.email
        FROM contacts
        JOIN visitors
            ON contacts.visitor_id = visitors.id
        ORDER BY contacts.created_at DESC
    `);

    res.json(rows);
});

// CREATE
router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    const visitor_id = await getOrCreateVisitor(name, email);

    await db.query(
        `
        INSERT INTO contacts
        (visitor_id, message)
        VALUES (?, ?)
        `,
        [visitor_id, message]
    );

    res.json({
        message: "Contact added",
    });
});

// DELETE
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    await db.query(
        "DELETE FROM contacts WHERE id = ?",
        [id]
    );

    res.json({
        message: "Contact deleted",
    });
});

export default router;