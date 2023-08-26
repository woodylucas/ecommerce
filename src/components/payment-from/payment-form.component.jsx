import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { PaymentFormContainer, FormContainer } from "./payment-form.styles";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const handlePaymentSubmit = async (evt) => {
    evt.preventDefault();

    if (!stripe || !elements) {
      return;
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer>
        <h2>Credit Card Payment: </h2>
        <CardElement />
      </FormContainer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
