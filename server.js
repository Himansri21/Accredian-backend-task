const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000; // process.env.PORT for Render deployment

// Middleware to parse JSON bodies
app.use(express.json());

// CORS middleware
app.use(cors());

// new Prisma client
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
