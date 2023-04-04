import React, { useState, useEffect } from "react";
import { useMealsContext } from "./FetchMeals";
import { Link } from "react-router-dom";

function Reviews() {
  const [reviews, setReviews] = useState();
  const [isReviewLoading, setIsReviewLoading] = useState(true);
  const [fetchReviewError, setFetchReviewError] = useState(null);
  const { getMeal, isLoading, fetchError } = useMealsContext();

  // fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        //setIsLoading(true);
        const response = await fetch("api/reviews");
        if (!response.ok) throw Error("Did not receive expected data!");
        const result = await response.json();
        setReviews(result);
        setFetchReviewError(null);
      } catch (err) {
        setFetchReviewError(err.message);
      } finally {
        setIsReviewLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (isLoading | isReviewLoading) {
    return <h1>loading...</h1>;
  }
  console.log("getMeal", getMeal);
  return (
    <div className="container">
      <h2>All Reviews</h2>
      {reviews.length > 0 ? (
        <div className="review-list">
          {reviews.map((review) => {
            const mealValue = getMeal(review.meal_id);
            return (
              <div key={review.ID}>
                <p className="pTagTitle">
                  Meal:
                  <Link
                    to={`/meals/${review.meal_id}`}
                    className="Link"
                  >
                    {mealValue.title}
                  </Link>
                </p>
                <p>Description : {mealValue.description}</p>
                <p className="pTagTitle">Review Title: {review.title}</p>
                <p>Review Description : {review.description}</p>
                <p>Rating : {review.stars}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="warning-msg"> No reviews available</p>
      )}
    </div>
  );
}

export default Reviews;
