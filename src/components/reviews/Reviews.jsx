import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";

// Get reviews for gigId
const Reviews = ({ gigId }) => {

  //Using a quary to get reviews for a gig
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  // Using mutation function to create, update reviews
  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["reviews"])//Passing unique Quary Key to quary client
    }
  });

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isSeller = currentUser.isSeller;

  const handleSubmit = (e) => {
    // Get input event e
    e.preventDefault();
    const desc = e.target[0].value;// Get description from input
    const star = e.target[1].value;// Get stars from select
    mutation.mutate({ gigId, desc, star });
  };



  return (
    <div className="reviews">

      {/* Display given reviews */}
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        // Map review data to the  review component
        : data.map((review) => <Review key={review._id} review={review} />)}

       {/* Add a review option*/}
      {!isSeller && (
      <div className="add">
        <h3>Add a review</h3>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="write your opinion" />
          {/* Selecting start no */}
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Send</button>
        </form>
      </div>
       )}
    </div>
  );
};

export default Reviews;
