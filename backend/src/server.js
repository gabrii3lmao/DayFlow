const express = require("express");
const PORT = 3000;
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const seedDays = require("./seedDay");
const router = require("./routes/activityRoutes");
const expressLayouts = require("express-ejs-layouts");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.resolve(__dirname, "public"))); // carrega os elementos
// estaticos (css e js)
app.use(expressLayouts);
app.use(router);

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));


async function startServer() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/activities_db");
    console.log(`Connected to the database`);
    app.listen(PORT, async () => {
      await seedDays();
      console.log(`Server running on port: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(
      `There was an error trying to connect to the Database: ${error}`
    );
  }
}

startServer();
