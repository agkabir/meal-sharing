import React, { useEffect, useState } from "react";

export function ReservationForm({ id, handleReservationUpdate, availableSeats }) {
  const [formState, setFormState] = useState({
    resName: "",
    resEmail: "",
    resGuest: "",
    resPhone: "",
  });

  const changeOnFormState = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReservation = {
      meal_id: id,
      created_date: new Date().toJSON().slice(0, 10),
      contact_name: formState.resName,
      contact_email: formState.resEmail,
      number_of_guests: formState.resGuest,
      contact_phonenumber: formState.resPhone,
    };
    fetch("api/reservations", {
      method: "POST",
      body: JSON.stringify(newReservation),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        alert(response.message);
        handleReservationUpdate(formState.resGuest);
        if (availableSeats - Number(formState.resGuest) > 0) {
          setFormState({
            resName: "",
            resEmail: "",
            resGuest: "",
            resPhone: "",
          });
        }
        
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div>
      <p className="warning-msg">
        Attention you can book at most {availableSeats} seats !
      </p>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="resName">Name :</label>
        <input
          type="text"
          name="resName"
          value={formState.resName}
          onChange={changeOnFormState}
          minLength="4"
          id="resName"
          placeholder="Your name.."
          required
        />

        <label htmlFor="resEmail">E-mail : </label>
        <input
          type="email"
          name="resEmail"
          value={formState.resEmail}
          onChange={changeOnFormState}
          id="resEmail"
          placeholder="emailid@example.com"
          required
        />

        <label htmlFor="resGuest">Number of guests :</label>
        <input
          type="number"
          name="resGuest"
          value={formState.resGuest}
          onChange={changeOnFormState}
          min="1"
          max={availableSeats}
          id="resGuest"
          required
        />

        <label htmlFor="resPhone">Phone :</label>
        <input
          type="number"
          value={formState.resPhone}
          name="resPhone"
          onChange={changeOnFormState}
          id="resPhone"
          required
        />

        <input type="submit" value="Book Seat" />
      </form>
    </div>
  );
}
