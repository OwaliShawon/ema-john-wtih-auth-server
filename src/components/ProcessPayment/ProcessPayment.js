import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitForm from './SplitForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IeFjPFXFvekkyYxj17rrQV74JfvyIIJOrN4E5m6fL7mShQicjb9u8SN1hCuf7zMrGj9zeFoqLZYsLNMuL9Fs1uc007XnfPRnm');

const ProcessPayment = ({ handlePayment }) => {

    return (
        <div>
            <Elements stripe={stripePromise}>
                <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
            </Elements>

        </div>
    );
};

export default ProcessPayment;