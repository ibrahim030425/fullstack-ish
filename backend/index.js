const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const { Client } = require("pg");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(path.resolve(), "dist")));

const client = new Client({
  connectionString: process.env.PGURI,
});

client
  .connect()
  .then(() => console.log("Ansluten till databasen"))
  .catch((err) => console.error("DB-fel:", err));

app.get("/api/players", async (_req, res) => {
  try {
    const { rows } = await client.query(
      "SELECT name, goals FROM players ORDER BY goals DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("DB Query error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(port, () => {
  console.log(`Server redo på http://localhost:3000/`);
});
