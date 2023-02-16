const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
const reservationsRouter = require("./api/reservations");
const reviewsRouter = require("./api/reviews");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.CLIENT_PORT || 3500;
const cors = require("cors");
const knex = require("./database");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

// Meals and reservations routers
router.use("/meals", mealsRouter);
router.use("/reservations", reservationsRouter);
router.use("/reviews", reviewsRouter);

//future-meals
app.get("/future-meals", async (req, res) => {
  const [rows] = await knex.raw(
    "SELECT `id`, `title`, `when` FROM Meal WHERE `when` >=(SELECT NOW())"
  );

  res.json({
    futureMeals: rows,
  });
});
//past-meals
app.get("/past-meals", async (req, res) => {
  const [rows] = await knex.raw(
    "SELECT `id`, `title`, `when` FROM Meal WHERE `when` <= (SELECT NOW())"
  );

  res.json({
    pastMeals: rows,
  });
});
//all-meals
app.get("/all-meals", async (req, res) => {
  const [rows] = await knex.raw("SELECT * FROM Meal ORDER BY id");

  res.json({
    allMeals: rows,
  });
});
//first-meal
app.get("/first-meal", async (req, res) => {
  const [rows] = await knex.raw("SELECT * FROM Meal LIMIT 1");
  if (rows.length < 1) {
    return res.status(204).send();
  }
  res.json({
    firstMeal: rows,
  });
});
//last-meal
app.get("/last-meal", async (req, res) => {
  const [rows] = await knex.raw("SELECT * FROM Meal ORDER BY id DESC LIMIT 1");
  if (rows.length < 1) {
    return res.status(204).send();
  }
  res.json({
    lastMeal: rows,
  });
});

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file";
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
