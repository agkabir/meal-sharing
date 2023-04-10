import React, { useState, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { initialReviewFormState,ReviewFormReducer } from "./ReviewFormReducer";
import { StarRating} from "./StarRating";

export function ReviewForm({mealId}) {
    // posting a review
  const history = useHistory();
  const [reviewState, reviewDispatch] = useReducer(
    ReviewFormReducer,
    initialReviewFormState
  );
  const handleStarRating = (actionType,payload) => {
  reviewDispatch({
    type: actionType,
    payload: payload,
  });  
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const newReview = {
      title: reviewState.reviewTitle,
      meal_id: mealId,
      description: reviewState.rewiewDescription,
      stars: Number(reviewState.starRating),
      created_date: new Date().toJSON().slice(0, 10),
    };
    fetch("api/reviews", {
      method: "POST",
      body: JSON.stringify(newReview),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        alert(response.message);
        history.push("/reviews");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
    return (
      <>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="title">Review Title :</label>
          <input
            type="text"
            name="reviewTitle"
            value={reviewState.reviewTitle}
            onChange={(e) =>
              reviewDispatch({
                type: "changeInput",
                payload: { name: e.target.name, value: e.target.value },
              })
            }
            minLength="4"
            id="title"
            placeholder="Review title..."
            required
          />
          <label htmlFor="description">Review Description : </label>
          <textarea
            value={reviewState.rewiewDescription}
            name="rewiewDescription"
            onChange={(e) =>
              reviewDispatch({
                type: "changeInput",
                payload: { name: e.target.name, value: e.target.value },
              })
            }
            id="description"
            placeholder="description..."
            required
          />
          <label htmlFor="rating">Choose a Rating :</label>
          <StarRating
            reviewFormState={reviewState}
            handleStarRating={handleStarRating}
          />
          <input type="submit" value="Post Review" />
        </form>
      </>
    );
}