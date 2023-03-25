import React, { useEffect, useState } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import "./styles.css";
import { useMealsContext } from "./FetchMeals";
import MealCard from "./MealCard";

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
  const [alreadyReserved, setAlreadyReserved] = useState(0);
  const [isResLoading, setIsResLoading] = useState(true);
  const [fetchResError, setFetchResError] = useState(null);
  const { getMeal, isLoading, fetchError } = useMealsContext();

  // Reservation handling
  const [resName, setResName] = useState("");
  const [resEmail, setResEmail] = useState("");
  const [resPhone, setResPhone] = useState("");
  const [resGuest, setResGuest] = useState("");
  const changeOnResName = (e) => {
    setResName(e.target.value);
  };
  const changeOnResEmail = (e) => {
    setResEmail(e.target.value);
  };
  const changeOnResPhone = (e) => {
    setResPhone(e.target.value);
  };
  const changeOnResGuest = (e) => {
    setResGuest(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReservation = {
      meal_id: id,
      created_date: new Date().toJSON().slice(0, 10),
      contact_name: resName,
      contact_email: resEmail,
      number_of_guests: resGuest,
      contact_phonenumber: resPhone,
    };
    fetch("api/reservations", {
      method: "POST",
      body: JSON.stringify(newReservation),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => {
        alert("Reservation successfully done!!");
        history.push("/");
      })
      .catch((err) => {
        alert(err.message);
      });
    //console.log(newReservation);
    setResName("");
    setResEmail("");
    setResGuest("");
    setResPhone("");
  };

  // fetch reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        //setIsLoading(true);
        const response = await fetch(`api/reservations?mealId=${id}`);
        if (!response.ok) throw Error("Did not receive expected data!");
        const result = await response.json();
        const totalReservation = result
          .map((item) => item.number_of_guests)
          .reduce((prev, curr) => prev + curr, 0);
        setAlreadyReserved(totalReservation);
        setFetchResError(null);
      } catch (err) {
        setFetchResError(err.message);
      } finally {
        setIsResLoading(false);
      }
    };
    fetchReservations();
  }, []);

  if (isLoading | isResLoading) {
    return <h1>loading...</h1>;
  }
  const meal = getMeal(id);
  if (!meal) {
    return <Redirect to="/" />;
  }
  const availableSeats = meal.max_reservations - alreadyReserved;

  return (
    <div>
      <h3>{meal.title}</h3>
      <p>{meal.description}</p>
      <p>Max reservation : {meal.max_reservations}</p>
      <p>Available seats : {availableSeats}</p>
      <p>location : {meal.location}</p>
      <p>Price : {meal.price} DKK</p>
      <p>Date & Time : {dtFormat.format(new Date(meal.when))}</p>
      {availableSeats > 0 ? (
        <div>
          <p className="warning-msg">
            Attention you can book at most {availableSeats} seats !
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              value={resName}
              onChange={changeOnResName}
              minLength="4"
              id="name"
              placeholder="Your name.."
              required
            />

            <label htmlFor="email">E-mail : </label>
            <input
              type="email"
              value={resEmail}
              onChange={changeOnResEmail}
              id="email"
              placeholder="emailid@example.com"
              required
            />

            <label htmlFor="nGuest">Number of guests :</label>
            <input
              type="number"
              value={resGuest}
              onChange={changeOnResGuest}
              min="1"
              max={availableSeats}
              id="nGuest"
              required
            />

            <label htmlFor="phone">Phone :</label>
            <input
              type="number"
              value={resPhone}
              onChange={changeOnResPhone}
              id="phone"
              required
            />

            <input type="submit" value="Book Seat" />
          </form>
        </div>
      ) : (
        <p className="warning-msg">
          Sorry no seats are available for reservations !!
        </p>
      )}
    </div>
  );
}

export default MealDetails;
