import React, { useEffect, useState } from "react";
import "./Pay.scss"; // Link to your SCSS file
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51QR7KiP18RPeydx7auBrxHYVIinFHuAcIYv6ynp0oVicAehE3GlvQK85y08DGqmLgGOv5ciOR2ev6Heiym4sLmm7005aBDcHFe"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(`/orders/create-payment-intent/${id}`);
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, [id]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      <div className="payment-container">
        <h1 className="payment-title">Complete Your Payment</h1>
        {clientSecret && (
          <div className="payment-form">
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pay;
