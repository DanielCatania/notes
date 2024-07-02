import app from "./app.js";

const PORT = 3000;

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`SERVER ON PORT ${PORT}`);
});
