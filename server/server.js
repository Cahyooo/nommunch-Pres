import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/products.js";
import contactRoutes from "./routes/contacts.js";
import feedbackRoutes from "./routes/feedbacks.js";
import flavorRoutes from "./routes/flavors.js";
import visitorRoutes from "./routes/visitor.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static("uploads")
);

app.use("/api/products", productRoutes);

app.use("/api/contacts", contactRoutes);

app.use("/api/feedbacks", feedbackRoutes);

app.use("/api/flavors", flavorRoutes);

app.use("/api/visitors", visitorRoutes);

app.listen(process.env.PORT, () => {
    console.log(
        `Server running on port ${process.env.PORT}`
    );
});