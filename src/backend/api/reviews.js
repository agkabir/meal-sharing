const express = require("express");
const reviewsRouter = express.Router();
const dbcon = require("../database");

// Returns all reviews.
reviewsRouter.get("/", async (request, response) => {
  let reviews = undefined;
  try {
    reviews = await dbcon("Review");
  } catch (error) {
    return response.status(500).send(error);
  }
  if (reviews.length < 1) {
    return response.send({});
  }
  response.send(reviews);
});

// Adds a new review to the database.
reviewsRouter.post("/", async (request, response) => {
  const review = request.body;
  try {
    await dbcon("Review").insert(review);
    response.json({ success: true, message: "The review successfully added!" });
  } catch (error) {
    return response.status(500).send(error);
  }
});

// get a review by id
reviewsRouter.get("/:id", async (request, response) => {
  let review = undefined;
  try {
    const { id } = request.params;
    [review] = await dbcon("Review").where({ id: id });
    response.send(review);
  } catch (error) {
    return response.status(500).send(error);
  }
  if (!review) {
    return response.status(204).send();
  }
});

// update a review by id
reviewsRouter.put("/:id", async (request, response) => {
  try {
    const [review] = await dbcon("Review").where({
      id: request.params.id,
    });
    if (!review) {
      return response.status(204).json({
        success: false,
        message: "Review with the given Id doesn't exist!",
      });
    } else {
      const updateInfo = request.body;
      await dbcon("Review").where({ id: request.params.id }).update(updateInfo);
      response.json({
        success: true,
        message: "Review with the given Id has been updated",
      });
    }
  } catch (error) {
    return response.status(500).send(error);
  }
});

// delete a review by id
reviewsRouter.delete("/:id", async (request, response) => {
  try {
    const [review] = await dbcon("Review").where({
      id: request.params.id,
    });
    if (!review) {
      return response.send("Review with the given Id doesn't exist at all!");
    } else {
      await dbcon("Review").where({ id: request.params.id }).del();
      response.send("Review with the given Id has been deleted successfully!");
    }
  } catch (error) {
    return response.status(500).send(error);
  }
});

module.exports = reviewsRouter;
