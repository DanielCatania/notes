import express from "express";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

export default app;
