const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, ".."))); // go up one level

// Path to data.json
const dataPath = path.join(__dirname, "../data/data.json");

// --- GET recommendations ---
app.get("/api/recommendations", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading data" });
    res.json(JSON.parse(data));
  });
});

// --- POST new recommendation ---
app.post("/api/recommendations", (req, res) => {
  const newRec = req.body;

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading data" });

    const recommendations = JSON.parse(data);
    recommendations.push(newRec);

    fs.writeFile(dataPath, JSON.stringify(recommendations, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error saving data" });
      res.status(201).json({ message: "Recommendation added!" });
    });
  });
});

// --- Default Route ---
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
