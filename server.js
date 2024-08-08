const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get("/submit-form", async (req, res) => {
  try {
    await prisma.$connect();
    res.send("Database connection successful!");
  } catch (err) {
    res
      .status(500)
      .json({ error: "Database connection failed", details: err.message });
  }
});

app.post("/submit-form", async (req, res) => {
  console.log("Received request data:", req.body);
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
    console.error("Error creating new item:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
