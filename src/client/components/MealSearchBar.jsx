import React from "react";
// get our fontawesome imports
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export function MealSearchBar({ state, handleChange, handleSortDirection }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by meal title"
        onChange={handleChange}
        name="title"
        id="title"
        value={state.title}
      />
      <label htmlFor="sortBy">Sort By:</label>
      <select
        onChange={handleChange}
        name="sortBy"
        id="sortBy"
        disabled={!state.title}
        value={state.sortBy}
      >
        <option value="when">When</option>
        <option value="max_reservations">Max Reservations</option>
        <option value="price">Price</option>
      </select>
      <button
        onClick={handleSortDirection}
        type="button"
        className="btn-unclickable"
        disabled={!state.title}
      >
        {!state.sortDir ? (
          <FontAwesomeIcon icon={faArrowUp} />
        ) : (
          <FontAwesomeIcon icon={faArrowDown} />
        )}
      </button>
    </div>
  );
}
