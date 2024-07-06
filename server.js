const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use CORS middleware
app.use(cors());

// Create a new Prisma client
const prisma = new PrismaClient();

// Routes

// GET all items
app.get("/submit-form", async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET an item by ID
app.get("/submit-form/:id", async (req, res) => {
  // Added :id to the route
  const id = parseInt(req.params.id);
  try {
    const item = await prisma.item.findUnique({
      where: { id: id }
    });
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new item
app.post("/submit-form", async (req, res) => {
  try {
    const newItem = await prisma.item.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        referralCode: req.body.referralCode,
        refereeName: req.body.refereeName,
        phoneNo: req.body.phoneNo
      }
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) an item by ID
app.put("/submit-form/:id", async (req, res) => {
  // Note: Added :id to the route
  const id = parseInt(req.params.id);
  try {
    const updatedItem = await prisma.item.update({
      where: { id: id },
      data: req.body
    });
    res.json(updatedItem);
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(500).json({ error: err.message });
  }
});

// DELETE an item by ID
app.delete("/submit-form/:id", async (req, res) => {
  // Note: Added :id to the route
  const id = parseInt(req.params.id);
  try {
    await prisma.item.delete({
      where: { id: id }
    });
    res.status(204).send();
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
