import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser();//Get current user from local storage

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {//Get current user id
        return res.data;
      }),
  });

  //Pass gigId to delete a gig
  const mutation = useMutation({
    mutationFn: (_id) => {
      return newRequest.delete(`/gigs/${_id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);//update myGigs
    },
  });

  //Delete function using gigId
  const handleDelete = (_id) => {
    mutation.mutate(_id);
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Projects</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Add New Project</button>
              </Link>
            )}
          </div>

          {/* Gig info table */}
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>

            {/* Get Gig info map to gig */}
            {data.map((gig) => (
              <tr key={gig._id}>
                <td>
                <div className="gigCard">
                <img src={gig.cover} alt="" />
                </div>
                </td>
                <td>{gig.title}</td>
                <td>{gig.price}</td>
                <td>{gig.sales}</td>
                <td>
                  <img
                    className="delete"
                    src="./img/delete.png"
                    alt=""
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;