const express = require("express");
const mealsRouter = express.Router();
const dbcon = require("../database");

// get meals with query string
mealsRouter.get("/", async (request, response) => {
  let mealQuery = dbcon("Meal");
  // all the query strings
  const { maxPrice } = request.query;
  const { availableReservations } = request.query;
  const { title } = request.query;
  const { dateAfter } = request.query;
  const { dateBefore } = request.query;
  const { sortKey } = request.query;
  const { sortDir } = request.query;
  const { limit } = request.query;

  // Condition check for maxPrice
  if (maxPrice) {
    if (maxPrice.match(/^\d+(.\d*)?$/)) {
      mealQuery = mealQuery.where("price", "<=", maxPrice);
    } else {
      return response.status(400).json({
        error: "No character only numeric value for maxPrice, please!",
      });
    }
  }
  // Condition check for availableReservations
  if (availableReservations) {
    if (availableReservations.toString().toLowerCase() === "true") {
      mealQuery = mealQuery
        .join("Reservation", {
          "Meal.id": "Reservation.meal_id",
        })
        .select("Meal.id", "Meal.title", "Meal.max_reservations")
        .sum({ already_reserved: "Reservation.number_of_guests" })
        .groupBy("Reservation.meal_id")
        .havingRaw("Meal.max_reservations > already_reserved");
      // i can not figure out why having is not working
      //.having("Meal.max_reservations", ">", "already_reserved");
    } else if (availableReservations.toString().toLowerCase() === "false") {
      mealQuery = mealQuery
        .join("Reservation", "Meal.id", "=", "Reservation.meal_id")
        .select("Meal.id", "Meal.title", "Meal.max_reservations")
        .sum("Reservation.number_of_guests as already_reserved")
        .groupBy("Reservation.meal_id")
        .havingRaw("already_reserved >= Meal.max_reservations");
    } else {
      return response.status(400).json({
        error: "Only true or false (boolean), please!",
      });
    }
  }

  // Condition check for title
  if (title) {
    if (title.match(/('--|;\s*--|;DROP TABLE|=\s*1)/i)) {
      return response.status(400).json({
        error: "Invalid query!",
      });
    } else {
      mealQuery = mealQuery.where("title", "like", `%${title}%`);
    }
  }

  // Condition check for dateAfter
  if (dateAfter) {
    if (!isNaN(new Date(dateAfter).getTime())) {
      mealQuery = mealQuery.where("when", ">=", dateAfter);
    } else {
      return response.status(400).json({
        error: "Provide a valid date, please!",
      });
    }
  }
  // Condition check for dateBefore
  if (dateBefore) {
    if (!isNaN(new Date(dateBefore).getTime())) {
      mealQuery = mealQuery.where("when", "<=", dateBefore);
    } else {
      return response.status(400).json({
        error: "Provide a valid date, please!",
      });
    }
  }

  // Condition check for sortKey
  if (sortKey) {
    if (sortKey.match(/^[A-Za-z_]+$/)) {
      // Condition check for sortDir
      if (sortDir) {
        if (sortDir.match(/^(asc|desc)$/i)) {
          mealQuery = mealQuery.orderBy(sortKey.toString(), sortDir.toString());
        } else {
          return response.status(400).json({
            error: "Provide asc or desc only for sortDir, please!",
          });
        }
      } else {
        mealQuery = mealQuery.orderBy(sortKey.toString());
      }
    } else {
      return response.status(400).json({
        error: "No special character in sort key except underscore(_), please!",
      });
    }
  }

  // Condition check for limit
  if (limit) {
    if (limit.match(/^\d+$/)) {
      mealQuery = mealQuery.limit(limit);
    } else {
      return response.status(400).json({
        error: "Provide a integer value, please!",
      });
    }
  }

  console.log("SQL", mealQuery.toSQL().sql);
  try {
    const data = await mealQuery;
    response.json({ data });
    //response.send("ok");
  } catch (error) {
    return response.status(500).json({ error: "Internal server error" });
  }
});

// post a meal
mealsRouter.post("/", async (request, response) => {
  const meal = request.body;
  try {
    await dbcon("Meal").insert(meal);
  } catch (error) {
    return response.status(500).send(error);
  }
  response.send("ok");
});

// get a meal by id
mealsRouter.get("/:id", async (request, response) => {
  let meal = undefined;
  try {
    const { id } = request.params;
    [meal] = await dbcon("Meal").where({ id: id });
  } catch (error) {
    return response.status(400).send();
  }
  if (!meal) {
    return response.status(204).send();
  }
  response.send(meal);
});

// update a meal by id
mealsRouter.put("/:id", async (request, response) => {
  try {
    const [meal] = await dbcon("Meal").where({ id: request.params.id });
    if (!meal) {
      return response.status(204).json({
        success: false,
        message: "Meal with the given Id doesn't exist!",
      });
    } else {
      const updateInfo = request.body;
      await dbcon("Meal").where({ id: request.params.id }).update(updateInfo);
      response.json({
        success: true,
        message: "Meal with the given Id has been updated",
      });
    }
  } catch (error) {
    return response.status(500).send(error);
  }
});

// update a meal by id
mealsRouter.delete("/:id", async (request, response) => {
  try {
    const [meal] = await dbcon("Meal").where({ id: request.params.id });
    if (!meal) {
      return response.send("Meal with the given Id doesn't exist at all!");
    } else {
      await dbcon("Meal").where({ id: request.params.id }).del();
      response.send("Meal with the given Id has been deleted successfully");
    }
  } catch (error) {
    return response.status(500).send(error);
  }
});

// Returns all reviews for a specific meal
mealsRouter.get("/:meal_id/reviews", async (request, response) => {
  let review = undefined;
  try {
    const { meal_id } = request.params;
    review = await dbcon("Review").where({ meal_id: meal_id });
  } catch (error) {
    return response.status(500).send();
  }
  if (review.length < 1) {
    return response.status(204).send();
  }
  response.send(review);
});

module.exports = mealsRouter;
