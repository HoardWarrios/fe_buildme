import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));//get current user from local storage which data represent as json format in db

  const navigate = useNavigate();

  // geting orders data using React Query
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {//get orders from order
        return res.data;
      }),
  });

// to handle messaging with seller or buyer
  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;// create a unique conversation ID seller+buyer

    // if a conversation exists, navigates to it
    try {
      //Get converstaion/message
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        // otherwise, creates a new one  
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);//navigate to message
      }
    }
  };


   // to view a specific plan
  const handlePlan = async (order) => {
    const planId = order.planId;

    // get plan details according to plan id and navigate to the viewplan page
    try {
      const res = await newRequest.get(`/plans/single/${planId}`);
      navigate(`/viewPlan/${planId}`);//navigate to viewPlan
    } catch (err) {
    }
  };

//ODERS PAGE DESIGN
  return (
    <div className="orders">
      {/* Display loading message while geting data */}
      {isLoading ? ("loading") : error ? ("error") : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          {/* Oders table */}
          <table>
            <tr>
              <th>Image</th>
              <th>{!currentUser.isSeller ? "Builder Name" : "House owner Name"}</th>
              <th>Description</th>
              <th>View Plan</th>
              <th>Contact</th>
            </tr>
            {data.map((order) => (//Get order data & map to order
              // get order unique key
              <tr key={order._id}>

                {/* get order image*/}
                <td>
                  <img className="image" src={order.img} alt="" />
                </td>

                 {/* get builder name */}
                 <td>{!currentUser.isSeller ? order.sellerName : order.buyerName}</td>

                {/* get order title*/}
                <td>{order.title}</td>

                {/* Image click to view plan */}
                <td>                 
                  <img
                    className="message"
                    src="./img/plan4.jpg"
                    alt=""
                    onClick={() => handlePlan(order)}
                  />
                </td>

                {/* Image click to message*/}
                <td>
                  <img
                    className="message"
                    src="./img/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                  />
                </td>

              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
