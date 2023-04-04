const express = require("express");
const reservationsRouter = express.Router();
const dbcon = require("../database");

// get all reservations
reservationsRouter.get("/", async (request, response) => {
  let reservationQuery = dbcon("Reservation");
  let reservations = undefined;
  // all the query strings
  const { mealId } = request.query;

  // Condition check for maxPrice
  if (mealId) {
    if (mealId.match(/^\d+$/)) {
      reservationQuery = reservationQuery.where("meal_id", "=", mealId);
    } else {
      return response.status(400).json({
        error: "No character only numeric value for mealId, please!",
      });
    }
  }

  try {
    reservations = await reservationQuery;
  } catch (error) {
    return response.status(400).send(error);
  }
  if (reservations.length < 1) {
    return response.send([]);
  }
  response.send(reservations);
});

// post a reservation
reservationsRouter.post("/", async (request, response) => {
  const reservation = request.body;
  try {
    await dbcon("Reservation").insert(reservation);
    response.json({
      success: true,
      message: "Reservation successfully done!!",
    });
  } catch (error) {
    return response.status(500).send(error);
  }
});

// get a reservation by id
reservationsRouter.get("/:id", async (request, response) => {
  let reservation = undefined;
  try {
    const { id } = request.params;
    [reservation] = await dbcon("Reservation").where({ id: id });
  } catch (error) {
    return response.status(400).send();
  }
  if (!reservation) {
    return response.status(204).send();
  }
  response.send(reservation);
});

// update a reservation by id
reservationsRouter.put("/:id", async (request, response) => {
  try {
    const [reservation] = await dbcon("Reservation").where({
      id: request.params.id,
    });
    if (!reservation) {
      return response.status(204).json({
        success: false,
        message: "Reservation with the given Id doesn't exist!",
      });
    } else {
      const updateInfo = request.body;
      await dbcon("Reservation")
        .where({ id: request.params.id })
        .update(updateInfo);
      response.json({
        success: true,
        message: "Reservation with the given Id has been updated",
      });
    }
  } catch (error) {
    return response.status(500).send(error);
  }
});

// update a reservation by id
reservationsRouter.delete("/:id", async (request, response) => {
  try {
    const [reservation] = await dbcon("Reservation").where({
      id: request.params.id,
    });
    if (!reservation) {
      return response.send(
        "Reservation with the given Id doesn't exist at all!"
      );
    } else {
      await dbcon("Reservation").where({ id: request.params.id }).del();
      response.send(
        "Reservation with the given Id has been deleted successfully"
      );
    }
  } catch (error) {
    return response.status(500).send(error);
  }
});

module.exports = reservationsRouter;
