const express = require("express");
const mealsRouter = express.Router();
const dbcon = require("../database");

// get all meals
mealsRouter.get("/", async (request, response) => {
  let meals = undefined;
  try {
    meals = await dbcon("Meal");
  } catch (error) {
    return response.status(400).send(error);
  }
  if (meals.length < 1) {
    return res.status(204).send();
  }
  response.send(meals);
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
      return response.send("Meal with the given Id doesn't exist at all!",
      );
    } else {  
        await dbcon("Meal").where({ id: request.params.id }).del();
        response.send("Meal with the given Id has been deleted successfully");
    }
  } catch (error) {
    return response.status(500).send(error);
  }
});


module.exports = mealsRouter;
