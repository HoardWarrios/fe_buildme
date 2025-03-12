import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  // Use quary to get orders
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

// Generating combined id's for conversation
  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      //Get converstaion/message
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);//navigate to message
      }
    }
  };


  //Get plan to view it
  const handlePlan = async (order) => {
    const planId = order.planId;

    try {
      const res = await newRequest.get(`/plans/single/${planId}`);
      navigate(`/viewPlan/${planId}`);//navigate to viewPlan
    } catch (err) {
    }
  };

//ODERS PAGE DESIGN
  return (
    <div className="orders">
      {isLoading ? ("loading") : error ? ("error") : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          {/* Oders table */}
          <table>
            <tr>
              <th>Image</th>
              <th>Builder Name</th>
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
                 <td>{order.sellerName}</td>

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
