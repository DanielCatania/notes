import app from "./app.js";

const PORT = 3000;

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/new-note", (req, res) => {
  res.render("new-note");
});

app.post("/add-note", (req, res) => {
  res.json(req.body);
});

app.listen(PORT, () => {
  console.log(`SERVER ON PORT ${PORT}`);
});
