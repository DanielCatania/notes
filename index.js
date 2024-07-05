import app from "./app.js";
import "dotenv/config";
import connection from "./src/database/db.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("=> ".repeat(20), `SERVER ON PORT ${PORT}`, " <=".repeat(20));
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/new-note", (req, res) => {
  res.render("new-note");
});

app.post("/add-note", (req, res) => {
  res.json(req.body);
});

try {
  await connection.authenticate();
  console.log("***Connection has been established succesfully!***");
} catch (error) {
  console.error("#".repeat(20), "Unable to connect to the database: \n", error);
}
