import React, { useState, useEffect } from "react";

function Reviews() {
    const [reviews, setReviews] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    // fetch reviews
    useEffect(() => {
      const fetchReviews = async () => {
        try {
          //setIsLoading(true);
          const response = await fetch("api/reviews");
          if (!response.ok) throw Error("Did not receive expected data!");
          const result = await response.json();
          setReviews(result);
          setFetchError(null);
        } catch (err) {
          setFetchError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchReviews();
    }, []);

    if (isLoading) {
      return <h1>loading...</h1>;
    }
    return (
      <div className="container">
        <h2>All Reviews</h2>
        {reviews.length > 0 ? (
          <div className="review-list">
            {reviews.map((review) => (
              <div key={review.ID}>
                <p className="pTagTitle">{review.title}</p>
                <p>Meal Id : {review.meal_id}</p>
                <p>Review Description : {review.description}</p>
                <p>Rating : {review.stars}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="warning-msg"> No reviews available</p>
        )}
      </div>
    );
}

export default Reviews;