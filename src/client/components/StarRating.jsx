import React from "react";
export const StarRating = ({ reviewFormState, handleStarRating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={
              index <= ((reviewFormState.starRating && reviewFormState.starHover) || reviewFormState.starHover)
                ? "on"
                : "off"
            }
            onClick={() => handleStarRating("onStarClick", index)}
            onMouseEnter={() => handleStarRating("onStarHover", index)}
            onMouseLeave={() =>
              handleStarRating("onStarHover", reviewFormState.starRating)
            }
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export const DisplayStarRating = ({ ratingScore }) => {
    return (
      <>
        <span className="display-star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= ratingScore ? "on" : "off"}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </span>
      </>
    );
};
