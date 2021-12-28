import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { notifyError, notifySuccess } from "../../redux/notify/action";

const SimpleCardForm = ({ handlePayment }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      dispatch(notifyError(error.message));
    } else {
      handlePayment(paymentMethod.id);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement className="border border-primary p-3"/>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={!stripe}
        >
          Order Now
        </button>
      </form>
    </div>
  );
};

export default SimpleCardForm;
