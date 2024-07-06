const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies and enable CORS
app.use(express.json());
app.use(cors());

// Create a new Prisma client
const prisma = new PrismaClient();

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
    console.error("Error creating new item:", err); // Log the error details
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running`);
});
