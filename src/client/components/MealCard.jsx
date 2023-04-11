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
    <div className="meal-card">
      <Link to={`/meals/${meal.id}`} className="Link">
        <img
          src={require(`../assets/images/${meal.id}.png`).default}
          alt={meal.title}
          className="meal-card-img img"
        />
      </Link>
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
          <button onClick={handleWriteReview} className="display-block">
            {!writeReview ? "Write Review" : "Cancel Review"}
          </button>
          {writeReview && <ReviewForm mealId={meal.id} />}
        </>
      )}
      <button onClick={handleShowDetails} className="display-block">
        {!showDetails ? "Show Details" : "Hide Details"}
      </button>
    </div>
  );
}

export default MealCard;
