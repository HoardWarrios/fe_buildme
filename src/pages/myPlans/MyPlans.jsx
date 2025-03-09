import React from "react";
import { Link } from "react-router-dom";
import "./MyPlans.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyPlans() {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myPlans"],
    queryFn: () =>
      newRequest.get(`/plans?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (_id) => {
      return newRequest.delete(`/plans/${_id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myPlans"]);
    },
  });

  const handleDelete = (_id) => {
    mutation.mutate(_id);
  };

  return (
    <div className="myPlans">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>My Plans</h1>
          </div>
          <table>
            <tr>
              <th>Plan</th>
              <th>Title</th>
              <th>Builder</th>
              <th>Payment</th>
              <th>Cancel</th>
            </tr>
            {data.map((plan) => (
              <tr key={plan._id}>
                <td>
                <div className="planCard">
                <img src={plan.cover} alt="" />
                </div>
                </td>
                <td>{plan.title}</td>
                <td>{plan.deliveryTime}</td>
                <td>{plan.shortDesc}</td>
                <td>
                  <img
                    className="delete"
                    src="./img/cancel.jpg"
                    alt=""
                    onClick={() => handleDelete(plan._id)}
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

export default MyPlans;