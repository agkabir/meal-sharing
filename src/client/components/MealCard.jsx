import React from 'react';
function MealCard({ meal }) {
    return (
      <div>
        <h5>{meal.title}</h5>
        <p>{meal.description}</p>
        <p>Max reservation : {meal.max_reservations}</p>
        <p>location : {meal.location}</p>
        <p>Price : {meal.price} DKK</p>
      </div>
    );
}

export default MealCard;