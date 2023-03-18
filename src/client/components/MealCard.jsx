import React, { useState } from "react";
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

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div>
      <h5>{meal.title}</h5>
      <p>{meal.description}</p>
      {showDetails && (
        <>
          <p>Max reservation : {meal.max_reservations}</p>
          <p>location : {meal.location}</p>
          <p>Price : {meal.price} DKK</p>
          <p>Date & Time : {dtFormat.format(new Date(meal.when))}</p>
        </>
      )}
      <button onClick={handleShowDetails}>
        {!showDetails ? "Show Details" : "Hide Details"}
      </button>
    </div>
  );
}

export default MealCard;
