import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_XXXX"); // replace with your publishable key

const CheckoutForm = ({ formData,prevStep }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("Payment Success", paymentMethod);
      // 🔗 send paymentMethod.id + bookingData to backend
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-2 border" />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Pay Now
      </button>

       
    </form>
  );
};

const Step7Payment = ({ formData, prevStep }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm formData={formData} />
    <div className="flex justify-between mt-4">
  <button
    onClick={prevStep}
    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
  >
    Previous
  </button>
  
</div>
  </Elements>
);

export default Step7Payment;
