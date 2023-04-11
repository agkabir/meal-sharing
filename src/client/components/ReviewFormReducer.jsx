export const initialReviewFormState = {
  reviewTitle: "",
  rewiewDescription: "",
  starHover: 0,
  starRating: 0,
};


export const ReviewFormReducer = (state, action) => {
  switch (action.type) {
    
    case "changeInput":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "onStarClick":
      return {
        ...state,
        starRating: action.payload,
      };
    case "onStarHover":
      return {
        ...state,
        starHover: action.payload,
      };
    default:
      return state;
  }
};
