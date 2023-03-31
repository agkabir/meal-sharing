import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export function ReviewForm({mealId}) {
    // posting a review
    const history = useHistory();
  const [reviewTitle, setReviewTitle] = useState("");
  const [rewiewDescription, setRewiewDescription] = useState("");
  const [rating, setRating] = useState('5');
  
  const changeOnReviewTitle = (e) => {
    setReviewTitle(e.target.value);
  };
  const changeOnRewiewDescription = (e) => {
    setRewiewDescription(e.target.value);
  };
  const changeOnRating = (e) => {
    setRating(e.target.value);
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReview = {
      title: reviewTitle,
      meal_id: mealId,
      description: rewiewDescription,
      stars: Number(rating),
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Review Title :</label>
        <input
          type="text"
          value={reviewTitle}
          onChange={changeOnReviewTitle}
          minLength="4"
          id="title"
          placeholder="Review title..."
          required
        />
        <label htmlFor="description">Review Description : </label>
        <textarea
          value={rewiewDescription}
          onChange={changeOnRewiewDescription}
          id="description"
          placeholder="description..."
          required
        />
        <label htmlFor="rating">Choose a Rating :</label>
        <select id="rating" onChange={changeOnRating}>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>

        <input type="submit" value="Post Review" />
            </form>
        </>
    );
}