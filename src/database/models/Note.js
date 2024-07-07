import { DataTypes } from "sequelize";
import connection from "../db.js";

const Note = connection.define("Note", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

Note.sync({ force: false });

export default Note;
