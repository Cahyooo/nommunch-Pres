import express from "express";
import db from "../db.js";

const router = express.Router();


// READ ALL
router.get("/", async (req, res) => {

    const [rows] = await db.query(
        "SELECT * FROM flavors ORDER BY created_at DESC"
    );

    res.json(rows);
});


// CREATE
router.post("/", async (req, res) => {

    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    await db.query(
        `
        INSERT INTO flavors (name)
        VALUES (?)
        `,
        [name]
    );

    res.json({
        message: "Flavor created",
    });
});


// UPDATE
router.put("/:id", async (req, res) => {

    const { name } = req.body;

    await db.query(
        `
        UPDATE flavors
        SET name = ?
        WHERE id = ?
        `,
        [name, req.params.id]
    );

    res.json({
        message: "Flavor updated",
    });
});


// DELETE
router.delete("/:id", async (req, res) => {

    await db.query(
        `
        DELETE FROM flavors
        WHERE id = ?
        `,
        [req.params.id]
    );

    res.json({
        message: "Flavor deleted",
    });
});

export default router;