import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Success.scss"; // Import the SCSS file

const Success = () => {
  const { search } = useLocation();//get search in query parameter
  const navigate = useNavigate();
  const params = new URLSearchParams(search);// Capture a specific URL part
  const payment_intent = params.get("payment_intent");// get `payment_intent` from query params

  //function to update BE about succcessful payment
  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 3000);// Use a 3 second timeout while navigating to orders page
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-icon">&#10004;</div>
        <h1 className="success-message">Payment Successful!</h1>
        <p className="success-text">
          You are being redirected to the orders page. Please do not close this
          page.
        </p>
      </div>
    </div>
  );
};

export default Success;
