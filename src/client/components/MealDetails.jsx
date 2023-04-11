import React, { useEffect, useState, useReducer } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ReservationForm } from "./ReservationForm";
import { MealDetailsReducer, initialState } from "./MealDetailsReducer";

const dtFormat = new Intl.DateTimeFormat("default", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
});

function MealDetails() {
  const history = useHistory();
  const { id } = useParams();
  const [state, dispatch] = useReducer(MealDetailsReducer, initialState);
  const handleReservationUpdate = (resGuest) => {
    const newReservedMeal = {
      ...state.reservedMeal,
      already_reserved: state.reservedMeal.already_reserved
        ? Number(state.reservedMeal.already_reserved) + Number(resGuest)
        : Number(resGuest),
    };
    dispatch({
      type: "updateState",
      payload: { name: "reservedMeal", value: newReservedMeal },
    });
  };

  // fetch reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        dispatch({ type: "fetchData" });
        const response = await fetch(`api/meals/${id}/reservations`);
        if (!response.ok) throw Error("Did not receive expected data!");
        const result = await response.json();
        const [data] = result;
        dispatch({ type: "success", payload: data });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      }
    };
    fetchReservations();
  }, []);

  if (state.isResLoading) {
    return <h1>loading...</h1>;
  }
  const availableSeats =
    Number(state.reservedMeal.max_reservations) -
    Number(state.reservedMeal.already_reserved);

  return (
    <section className="meal-details-container">
      <div className="meal-details">
        <img
          src={require(`../assets/images/${id}.png`).default}
          alt={state.reservedMeal.title}
          className="meal-card-img img"
        />
        <h3>{state.reservedMeal.title}</h3>
        <p>{state.reservedMeal.description}</p>
        <p>Max reservation : {state.reservedMeal.max_reservations}</p>
        <p>Available seats : {availableSeats}</p>
        <p>location : {state.reservedMeal.location}</p>
        <p>Price : {state.reservedMeal.price} DKK</p>
        <p>
          Date & Time : {dtFormat.format(new Date(state.reservedMeal.when))}
        </p>
      </div>
      <div className="make-reservation">
        {availableSeats > 0 ? (
          <ReservationForm
            id={id}
            handleReservationUpdate={handleReservationUpdate}
            availableSeats={availableSeats}
          />
        ) : (
          <p className="warning-msg">
            Sorry no seats are available for reservations !!
          </p>
        )}
      </div>
    </section>
  );
}

export default MealDetails;
