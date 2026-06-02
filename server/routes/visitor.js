import express from "express";
import db from "../db.js";

const router = express.Router();

// READ ALL
router.get("/", async (req, res) => {
    const [rows] = await db.query(
        "SELECT * FROM visitors ORDER BY created_at DESC"
    );

    res.json(rows);
});

// CREATE
router.post("/", async (req, res) => {
    const { name, email } = req.body;

    // Check if email already exists in visitors table
    const [visitor] = await db.query(
        "SELECT * FROM visitors WHERE email = ?",
        [email]
    );

    if (visitor.length > 0) {
        return res.status(400).json({
            message: "Email already exists",
        });
    }

    await db.query(
        `
        INSERT INTO visitors
        (name, email)
        VALUES (?, ?)
        `,
        [name, email]
    );

    res.json({
        message: "Visitor added",
    });
});

// DELETE
// router.delete("/:id", async (req, res) => {
//     const { id } = req.params;

//     await db.query(
//         "DELETE FROM visitors WHERE id = ?",
//         [id]
//     );

//     res.json({
//         message: "Visitor deleted",
//     });
// });

export async function getOrCreateVisitor(name, email) {
    const [visitor] = await db.query(
        "SELECT id FROM visitors WHERE email = ?",
        [email]
    );

    if (visitor.length > 0) {
        return visitor[0].id;
    }

    const [result] = await db.query(
        `
        INSERT INTO visitors (name, email)
        VALUES (?, ?)
        `,
        [name, email]
    );

    return result.insertId;
}

export default router;