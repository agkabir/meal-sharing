import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReviewForm } from "./ReviewForm";
const dtFormat = new Intl.DateTimeFormat("default", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
});

function MealCard({ meal }) {
  const [showDetails, setShowDetails] = useState(false);
  const [writeReview, setWriteReview] = useState(false);
  
  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };
  const handleWriteReview = () => {
    setWriteReview(!writeReview);
  };

  

  return (
    <div>
      <Link to={`/meals/${meal.id}`} className="Link">
        <h3>{meal.title}</h3>
      </Link>
      <p>{meal.description}</p>
      {showDetails && (
        <>
          <p>Max reservation : {meal.max_reservations}</p>
          <p>location : {meal.location}</p>
          <p>Price : {meal.price} DKK</p>
          <p>Date & Time : {dtFormat.format(new Date(meal.when))}</p>
          <p className="info-msg">Want to write a review for this meal </p>
          {writeReview && <ReviewForm mealId={meal.id} />}
          <button onClick={handleWriteReview}>
            {!writeReview ? "Write Review" : "Cancel"}
          </button>
          <p></p>
        </>
      )}
      <button onClick={handleShowDetails}>
        {!showDetails ? "Show Details" : "Hide Details"}
      </button>
    </div>
  );
}

export default MealCard;
