import React from "react";
import { View, Text } from "react-native";
import { Stripe } from "../../../key.json";
import { StripeCheckout } from "expo-stripe-checkout";
const Payment = () => {
  const onPaymentSuccess = token => {
    // send the stripe token to your backend!
  };

  const onClose = () => {
    // maybe navigate to other screen here?
  };
  return (
    <StripeCheckout
      publicKey={Stripe}
      amount={100000}
      imageUrl="https://pbs.twimg.com/profile_images/778378996580888577/MFKh-pNn_400x400.jpg"
      storeName="Stripe Checkout"
      description="Test"
      currency="USD"
      style={{ flex: 1 }}
      allowRememberMe={false}
      prepopulatedEmail="test@test.com"
      onClose={this.onClose}
      onPaymentSuccess={this.onPaymentSuccess}
    />
  );
};

export default Payment;
