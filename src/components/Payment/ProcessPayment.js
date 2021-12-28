import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';

const stripePromise = loadStripe('pk_test_pS06V8JIFXeKVNV03PxEcd3Y00uNbBWVhq');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise} ClassName="card">
            <SimpleCardForm handlePayment={handlePayment} ></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;