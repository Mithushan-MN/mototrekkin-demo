import React from "react";
import { CheckCircle } from "lucide-react"; // install: npm install lucide-react
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white px-6 text-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 w-20 h-20" />
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-3">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your payment has been successfully processed.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition"
        >
          Go to Home
        </button>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        A confirmation email has been sent to your inbox.
      </p>
    </div>
  );
};

export default SuccessPage;
