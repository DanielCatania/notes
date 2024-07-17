import app from "./app.js";
import "dotenv/config";
import connection from "./src/database/db.js";
import Note from "./src/database/models/Note.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("=> ".repeat(20), `SERVER ON PORT ${PORT}`, " <=".repeat(20));
});

try {
  await connection.authenticate();
  console.log("***Connection has been established succesfully!***");
} catch (error) {
  console.error("#".repeat(20), "Unable to connect to the database: \n", error);
}

app.get("/", async (req, res) => {
  try {
    const notes = await Note.findAll();

    res.render("index", { notes });
  } catch (error) {
    res.redirect("/500");
  }
});

app.get("/note/new", (req, res) => {
  res.render("new-note");
});

app.post("/note/add", async (req, res) => {
  try {
    const noteData = {
      title: req.body.title || "undefined",
      description: req.body.description || "no content",
    };

    const note = await Note.create(noteData);
    res.redirect(`/note/${note.id}`);
  } catch (error) {
    res.redirect("/500");
  }
});

app.get("/note/:id", async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);

    if (note === null) {
      throw new Error("404");
    }

    res.render("note", { note });
  } catch (error) {
    res.redirect("/404");
  }
});

app.get("/note/edit/:id", async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);

    if (note === null) {
      throw new Error("404");
    }

    res.render("edit-note", { note });
  } catch (error) {
    res.redirect("/404");
  }
});

app.post("/note/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const noteData = {
      title: req.body.title || "undefined",
      description: req.body.description || "no content",
    };
    await Note.update({ ...noteData }, { where: { id } });

    res.redirect(`/note/${id}`);
  } catch (error) {
    res.redirect("/404");
  }
});

app.get("/404", (req, res) => {
  res.send("Error 404: NOT FOUND");
});

app.get("/500", (req, res) => {
  res.send("Error 500: INTERNAL SERVER ERROR");
});
