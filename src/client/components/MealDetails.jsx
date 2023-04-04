import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ReservationForm } from "./ReservationForm";

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
  const [reservedMeal, setReservedMeal] = useState();
  const [isResLoading, setIsResLoading] = useState(true);
  const [fetchResError, setFetchResError] = useState(null);
  //console.log(reservedMeal);

  // fetch reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        //setIsLoading(true);
        const response = await fetch(`api/meals/${id}/reservations`);
        if (!response.ok) throw Error("Did not receive expected data!");
        const result = await response.json();
        const [data] = result ;
        setReservedMeal(data);
        setFetchResError(null);
      } catch (err) {
        setFetchResError(err.message);
      } finally {
        setIsResLoading(false);
      }
    };
    fetchReservations();
  }, []);

  if (isResLoading) {
    return <h1>loading...</h1>;
  }
  
  const availableSeats =
    Number(reservedMeal.max_reservations) - Number(reservedMeal.already_reserved);

  return (
    <div>
      <h3>{reservedMeal.title}</h3>
      <p>{reservedMeal.description}</p>
      <p>Max reservation : {reservedMeal.max_reservations}</p>
      <p>Available seats : {availableSeats}</p>
      <p>location : {reservedMeal.location}</p>
      <p>Price : {reservedMeal.price} DKK</p>
      <p>Date & Time : {dtFormat.format(new Date(reservedMeal.when))}</p>
      {availableSeats > 0 ? (
        <ReservationForm
          id={id}
          setReservedMeal={setReservedMeal}
          availableSeats={availableSeats}
        />
      ) : (
        <p className="warning-msg">
          Sorry no seats are available for reservations !!
        </p>
      )}
    </div>
  );
}

export default MealDetails;
