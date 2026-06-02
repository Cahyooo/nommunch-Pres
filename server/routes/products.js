import express from "express";
import db from "../db.js";

import upload from "../middleware/upload.js";

const router = express.Router();


// READ ALL
router.get("/", async (req, res) => {

    const [rows] = await db.query(
        `
        SELECT
            products.id,
            products.name,
            products.price,
            products.description,
            products.image_url,
            products.created_at,

            flavors.name AS flavor,
            flavors.id AS flavor_id

        FROM products

        JOIN flavors
        ON products.flavor_id = flavors.id

        ORDER BY products.created_at DESC
        `
    );

    res.json(rows);
});


// CREATE
router.post(
  "/",
  upload.single("image"),
  async (req, res) => {

    const {
      flavor_id,
      name,
      price,
      description,
    } = req.body;

    const image_url =
      req.file
        ? `http://localhost:3000/uploads/${req.file.filename}`
        : "";

    await db.query(
      `
      INSERT INTO products
      (
        flavor_id,
        name,
        price,
        description,
        image_url
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        flavor_id,
        name,
        price,
        description,
        image_url,
      ]
    );

    res.json({
      message: "Product created",
    });
  }
);


// UPDATE
router.put(
  "/:id",
  upload.single("image"),
  async (req, res) => {

    const {
      flavor_id,
      name,
      price,
      description,
    } = req.body;

    // ambil product lama
    const [oldProduct] = await db.query(
      `
      SELECT image_url
      FROM products
      WHERE id = ?
      `,
      [req.params.id]
    );

    // kalau upload image baru
    // pakai image baru
    // kalau tidak -> pakai lama
    const image_url = req.file
      ? `http://localhost:3000/uploads/${req.file.filename}`
      : oldProduct[0].image_url;

    await db.query(
      `
      UPDATE products
      SET
        flavor_id = ?,
        name = ?,
        price = ?,
        description = ?,
        image_url = ?
      WHERE id = ?
      `,
      [
        flavor_id,
        name,
        price,
        description,
        image_url,
        req.params.id,
      ]
    );

    res.json({
      message: "Product updated",
    });
  }
);


// DELETE
router.delete("/:id", async (req, res) => {

    await db.query(
        `
        DELETE FROM products
        WHERE id = ?
        `,
        [req.params.id]
    );

    res.json({
        message: "Product deleted",
    });
});

export default router;