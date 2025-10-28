import React from "react";

const CancelPage = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#fff5f5",
      color: "#c53030",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        Payment Cancelled!
      </h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
        Your payment has been cancelled. No charges were made.
      </p>
      <a
        href="/"
        style={{
          backgroundColor: "#e53e3e",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Go to Home
      </a>
    </div>
  );
};

export default CancelPage;
