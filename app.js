import express from "express";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

export default app;
