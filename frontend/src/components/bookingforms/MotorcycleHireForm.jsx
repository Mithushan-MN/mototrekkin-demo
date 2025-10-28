import React, { useState } from "react";
import axios from "../../axiosConfig"; // Use the configured axios instance
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { loadStripe } from "@stripe/stripe-js";
import Mlogo from "../../assets/services/mlogo.webp";
import agreementpdf from "../../assets/MT-CUSTOM-MOLDED-EAR-PROTECTION.pdf";
import imgCrf250 from "../../assets/bikes/HONDA CRF250 RALLY.jpg";
import imgBmw310 from "../../assets/bikes/BMW 310 GS.jpg";
import imgCb500x from "../../assets/bikes/HONDA CB500X.jpg";

const stripePromise = loadStripe("pk_test_51Q5xX9FSb9wGlBwSQN4WE9bFcWqUxWeJ8EmyimzBG77QPTPEhvd62fXTxkr1qipe5Z4OZAlWZyw3otmiQRTPZiIA008HheOzhj");

const BikeBookingForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const [formData, setFormData] = useState({
    // Step 1: Dates
    pickupDate: null,
    returnDate: null,
    pickupTime: "",
    returnTime: "",
    totalDays: 0,

    // Step 2: Bike & Gear
    bikeModel: "",
    gearOption: "Bike hire only",
    gear: { helmet: false, jacket: false, gloves: false },
    addOns: { excessReduction: false, tyreProtection: false, windscreen: false },
    subGearOption: "",
    bikePrice: 0,
    bikeSpecs: {},
    bikeImg: "",

    // Step 3: Rider Details
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    confirmEmail: "",
    birthday: "",
    occupation: "",
    mobile: "",
    landline: "",
    streetAddress: "",
    streetAddress2: "",
    city: "",
    postCode: "",
    country: "",
    state: "",

    // Step 4: Emergency Contact & Driver's Licence
    emergencyFirstName: "",
    emergencyLastName: "",
    emergencyEmail: "",
    emergencyMobile: "",
    emergencyLandline: "",
    emergencyRelation: "",
    
    licenceDetails: {
      licenceValid: "Yes",
      licenceNumber: "",
      licenceExpiry: null,
      licenceState: "",
      licenceFile: null,
    },

    // Step 5: Agreement
    agreementAccepted: false,

    // Step 6: Summary
    paymentOption: "Full Payment",
  });

  const countryStateMap = {
    Australia: [
      "New South Wales",
      "Victoria",
      "Queensland",
      "Tasmania",
      "Western Australia",
      "South Australia",
      "Northern Territory",
      "Australian Capital Territory",
    ],
    NewZealand: [
      "Auckland",
      "Wellington",
      "Canterbury",
      "Otago",
      "Waikato",
      "Bay of Plenty",
      "Manawatu-Wanganui",
      "Hawke's Bay",
    ],
  };

  // Handle Inputs
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name.startsWith("gear.")) {
      const gearKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        gear: { ...prev.gear, [gearKey]: checked },
      }));
    } else if (name.startsWith("addOns.")) {
      const addOnKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        addOns: { ...prev.addOns, [addOnKey]: checked },
      }));
    } else if (name === "agreementAccepted") {
      setFormData((prev) => ({ ...prev, agreementAccepted: checked }));
    } else if (name === "licenceFile") {
      setFormData((prev) => ({
        ...prev,
        licenceDetails: { ...prev.licenceDetails, licenceFile: files[0] },
      }));
    } else if (name === "paymentOption") {
      setFormData((prev) => ({ ...prev, paymentOption: value }));
    } else if (name.startsWith("licenceDetails.")) {
      const licenceKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        licenceDetails: {
          ...prev.licenceDetails,
          [licenceKey]: type === "number" ? Number(value) : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
        riderDetails: {
          ...prev.riderDetails,
          [name]: type === "number" ? Number(value) : value,
        },
      }));
    }
  };

  // Date Change
  const handleDateChange = (key, date) => {
    const updated = { ...formData, [key]: date };

    if (key === "pickupDate" || key === "returnDate") {
      if (updated.pickupDate && updated.returnDate) {
        const days = (updated.returnDate - updated.pickupDate) / (1000 * 60 * 60 * 24) + 1;
        updated.totalDays = days > 0 ? Math.floor(days) : 0;
      }
    } else if (key === "licenceExpiry") {
      updated.licenceDetails = { ...updated.licenceDetails, licenceExpiry: date };
    }

    setFormData(updated);
  };

  // Navigation
  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  // Validation
  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          formData.pickupDate &&
          formData.returnDate &&
          formData.pickupTime &&
          formData.returnTime
        );
      case 2:
        return formData.bikeModel && formData.gearOption;
      case 3:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.gender &&
          formData.email &&
          formData.confirmEmail &&
          formData.email === formData.confirmEmail &&
          formData.birthday &&
          formData.occupation &&
          formData.mobile &&
          formData.streetAddress &&
          formData.city &&
          formData.postCode &&
          formData.country &&
          formData.state
        );
      case 4:
        return (
          formData.emergencyFirstName &&
          formData.emergencyLastName &&
          formData.emergencyEmail &&
          formData.emergencyMobile &&
          formData.emergencyRelation &&
          formData.licenceDetails.licenceValid &&
          formData.licenceDetails.licenceNumber &&
          formData.licenceDetails.licenceExpiry &&
          formData.licenceDetails.licenceState &&
          formData.licenceDetails.licenceFile
        );
      case 5:
        return formData.agreementAccepted;
      case 6:
        return formData.paymentOption;
      case 7:
        return true;
      default:
        return true;
    }
  };

  // Calculate Total Cost
  const calculateTotal = () => {
    let total = formData.bikePrice * formData.totalDays;
    if (formData.gearOption === "Bike hire + gear") {
      if (formData.subGearOption === "Package Option - $100/day") {
        total += 100 * formData.totalDays;
      } else if (formData.subGearOption === "Individually") {
        if (formData.gear.helmet) total += 45 * formData.totalDays;
        if (formData.gear.jacket) total += 65 * formData.totalDays;
        if (formData.gear.gloves) total += 25 * formData.totalDays;
      }
    }
    if (formData.addOns.excessReduction) total += 32 * formData.totalDays;
    if (formData.addOns.tyreProtection) total += 23 * formData.totalDays;
    if (formData.addOns.windscreen) total += 10 * formData.totalDays;
    return total;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!formData.licenceDetails.licenceNumber.trim()) {
      alert("Licence number is required.");
      setLoading(false);
      return;
    }
    if (!formData.licenceDetails.licenceExpiry) {
      alert("Licence expiry date is required.");
      setLoading(false);
      return;
    }

    try {
      console.log("axios defaults:", axios.defaults); // Verify baseURL
      if (!formData.totalDays || formData.totalDays <= 0) {
        throw new Error("Total days must be set and greater than 0");
      }
      const payload = {
        pickupDate: formData.pickupDate ? new Date(formData.pickupDate) : null,
        returnDate: formData.returnDate ? new Date(formData.returnDate) : null,
        pickupTime: formData.pickupTime,
        returnTime: formData.returnTime,
        totalDays: formData.totalDays,
        bikeModel: formData.bikeModel,
        bikePrice: formData.bikePrice,
        gearOption: formData.gearOption,
        subGearOption: formData.subGearOption,
        gear: formData.gear,
        addOns: formData.addOns,
        riderDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
          email: formData.email,
          birthday: formData.birthday,
          occupation: formData.occupation,
          mobile: formData.mobile,
          landline: formData.landline,
          streetAddress: formData.streetAddress,
          streetAddress2: formData.streetAddress2,
          city: formData.city,
          postCode: formData.postCode,
          country: formData.country,
          state: formData.state,
        },
        emergencyContact: {
          firstName: formData.emergencyFirstName,
          lastName: formData.emergencyLastName,
          email: formData.emergencyEmail,
          mobile: formData.emergencyMobile,
          landline: formData.emergencyLandline,
          relation: formData.emergencyRelation,
        },
        licenceValid: formData.licenceDetails.licenceValid,
        licenceNumber: formData.licenceDetails.licenceNumber,
        licenceExpiry: formData.licenceDetails.licenceExpiry,
        licenceState: formData.licenceDetails.licenceState,
        agreementAccepted: formData.agreementAccepted,
        paymentOption: formData.paymentOption,
      };

      const formDataToSend = new FormData();
      if (formData.licenceDetails.licenceFile instanceof File) {
        formDataToSend.append("licenceFile", formData.licenceDetails.licenceFile);
      }
      for (const key in payload) {
        if (key === "pickupDate" || key === "returnDate" || key === "licenceExpiry") {
          formDataToSend.append(key, payload[key] ? format(payload[key], "yyyy-MM-dd") : "");
        } else if (typeof payload[key] === "object" && key !== "licenceFile") {
          formDataToSend.append(key, JSON.stringify(payload[key]));
        } else {
          formDataToSend.append(key, payload[key] || "");
        }
      }

      console.log("Submitting FormData:");
      for (let pair of formDataToSend.entries()) {
        console.log(`${pair[0]}: ${pair[1] instanceof File ? "File Object" : pair[1]}`);
      }

      console.log("Submitting to:", `${axios.defaults.baseURL}/api/bikeBookings/create`);
      const bookingResponse = await axios.post("/api/bikeBookings/create", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { bookingId, emailStatus, paymentSessionId } = bookingResponse.data;
      console.log("Booking created with ID:", bookingId);

      let message = "Bike booking submitted successfully!";
      if (emailStatus) {
        const { userEmailSent, adminEmailSent, errors } = emailStatus;
        if (userEmailSent && adminEmailSent) {
          message += " Confirmation emails sent to you and the admin.";
        } else if (userEmailSent) {
          message += " Confirmation email sent to you, but admin email failed.";
        } else if (adminEmailSent) {
          message += " Confirmation email sent to admin, but user email failed.";
        } else {
          message += " Email notifications failed.";
        }
        if (errors && errors.length > 0) {
          console.warn("BikeBookingForm: Email errors", errors);
          message += " Some email notifications could not be sent.";
        }
      } else {
        message += " Email notifications could not be sent.";
      }

      alert(message);
      setStep(1);
      setFormData({
        pickupDate: null,
        returnDate: null,
        pickupTime: "",
        returnTime: "",
        totalDays: 0,
        bikeModel: "",
        bikePrice: 0,
        gearOption: "Bike hire only",
        subGearOption: "",
        gear: { helmet: false, jacket: false, gloves: false },
        addOns: { excessReduction: false, tyreProtection: false, windscreen: false },
        bikeSpecs: {},
        bikeImg: "",
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        confirmEmail: "",
        birthday: "",
        occupation: "",
        mobile: "",
        landline: "",
        streetAddress: "",
        streetAddress2: "",
        city: "",
        postCode: "",
        country: "",
        state: "",
        emergencyFirstName: "",
        emergencyLastName: "",
        emergencyEmail: "",
        emergencyMobile: "",
        emergencyLandline: "",
        emergencyRelation: "",
        licenceDetails: {
          licenceValid: "Yes",
          licenceNumber: "",
          licenceExpiry: null,
          licenceState: "",
          licenceFile: null,
        },
        agreementAccepted: false,
        paymentOption: "Full Payment",
      });

      if (paymentSessionId) {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId: paymentSessionId });
        if (error) throw new Error(error.message);
      } else {
        console.warn("No payment session ID received, skipping checkout");
        alert("Booking created, but payment setup failed. Please contact support.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      const message = err.response?.data?.message || "Failed to submit booking or initiate payment. Please try again.";
      setApiError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // Button Style
  const getButtonClass = (enabled) =>
    `px-6 py-2 rounded ${
      enabled ? "bg-[#edab1a] text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-20 font-sans">
      <div className="mb-8">
        <img src={Mlogo} alt="Bike Hire" className="mx-auto w-48 h-auto rounded-lg" />
      </div>

      <form className="w-full space-y-8" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">BOOK A BIKE</h2>

        {/* Step Progress Bar */}
        <div className="flex justify-between mb-8" role="progressbar" aria-valuenow={step} aria-valuemin="1" aria-valuemax="7">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 mx-1 ${step >= s ? "bg-[#edab1a]" : "bg-gray-300"}`}
              aria-label={`Step ${s} ${step >= s ? "completed" : "incomplete"}`}
            />
          ))}
        </div>

        {/* Step 1: Hire Dates */}
        {step === 1 && (
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold">Choose Hire Date</h3>
            <hr className="w-full" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="font-medium text-sm sm:text-base">Pickup Date</label>
                <DatePicker
                  selected={formData.pickupDate}
                  onChange={(date) => handleDateChange("pickupDate", date)}
                  selectsStart
                  startDate={formData.pickupDate}
                  endDate={formData.returnDate}
                  minDate={new Date()}
                  className="w-full border p-2 rounded text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="font-medium text-sm sm:text-base">Return Date</label>
                <DatePicker
                  selected={formData.returnDate}
                  onChange={(date) => handleDateChange("returnDate", date)}
                  selectsEnd
                  startDate={formData.pickupDate}
                  endDate={formData.returnDate}
                  minDate={formData.pickupDate || new Date()}
                  className="w-full border p-2 rounded text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="font-medium">Pickup Time</label>
                <select
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Pickup Time</option>
                  <option>08:00 AM</option>
                  <option>10:00 AM</option>
                  <option>12:00 PM</option>
                  <option>02:00 PM</option>
                  <option>04:00 PM</option>
                </select>
              </div>
              <div>
                <label className="font-medium">Return Time</label>
                <select
                  name="returnTime"
                  value={formData.returnTime}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Return Time</option>
                  <option>08:00 AM</option>
                  <option>10:00 AM</option>
                  <option>12:00 PM</option>
                  <option>02:00 PM</option>
                  <option>04:00 PM</option>
                </select>
              </div>
              <div>
                <label className="font-medium">Total Days</label>
                <input
                  type="text"
                  value={formData.totalDays}
                  disabled
                  className="w-full border p-2 rounded bg-gray-100"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={!isStepValid() || loading}
                onClick={handleNext}
                className={getButtonClass(isStepValid() && !loading)}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Bike & Gear */}
        {step === 2 && (
          <div className="space-y-6 px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-800">Choose Bike & Gear</h3>
            <hr className="border-t border-gray-300" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  name: "CRF250 RALLY",
                  price: 205,
                  available: true,
                  remaining: 1,
                  img: imgCrf250,
                  specs: { engine: "250cc Liquid-cooled", weight: "155 kg", fuel: "10.1 L" },
                },
                {
                  id: 2,
                  name: "BMW G310 GS",
                  price: 215,
                  available: false,
                  remaining: 0,
                  img: imgBmw310,
                  specs: { engine: "649cc Parallel Twin", weight: "216 kg", fuel: "21 L" },
                },
                {
                  id: 3,
                  name: "HONDA CB500X",
                  price: 230,
                  available: true,
                  remaining: 1,
                  img: imgCb500x,
                  specs: { engine: "471cc Parallel Twin", weight: "197 kg", fuel: "17.7 L" },
                },
              ].map((bike) => (
                <div
                  key={bike.id}
                  className={`border-2 rounded-xl p-4 cursor-pointer shadow-md transition duration-300 ease-in-out hover:shadow-lg ${
                    formData.bikeModel === bike.name ? "border-yellow-500 bg-yellow-50" : "border-gray-200"
                  } ${!bike.available ? "opacity-60 cursor-not-allowed bg-gray-100" : ""}`}
                  onClick={() =>
                    bike.available &&
                    setFormData((prev) => ({
                      ...prev,
                      bikeModel: bike.name,
                      bikePrice: bike.price,
                      bikeSpecs: bike.specs,
                      bikeImg: bike.img,
                    }))
                  }
                >
                  <img
                    src={bike.img}
                    alt={bike.name}
                    className="w-full h-32 sm:h-40 object-cover rounded-lg mb-3"
                  />
                  <h4 className="text-lg font-bold text-gray-800 truncate">{bike.name}</h4>
                  <p className={`text-xs ${bike.available ? "text-green-600" : "text-red-500"} font-medium mt-1`}>
                    {bike.available ? `(${bike.remaining} remaining)` : "SOLD OUT"}
                  </p>
                  <p className="text-xl font-extrabold text-blue-600 mt-2">${bike.price}<span className="text-sm font-normal text-gray-500">/day</span></p>
                </div>
              ))}
            </div>

            {formData.bikeModel && (
              <div className="flex flex-col md:flex-row mt-8 p-4 border rounded-xl shadow-lg bg-white gap-6 items-center md:items-start">
                <img
                  src={formData.bikeImg}
                  alt={formData.bikeModel}
                  className="w-full md:w-1/3 h-auto md:h-48 object-cover rounded-lg shadow-md"
                />
                <div className="w-full md:w-2/3">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Selected Bike</h3>
                  <p className="text-lg font-semibold text-gray-700 mb-3">
                    {formData.bikeModel} - <span className="text-blue-600">${formData.bikePrice}/day</span>
                  </p>
                  <h4 className="text-md font-semibold text-gray-600 mb-1">Key Specifications:</h4>
                  <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700">
                    <li>Engine: <span className="font-medium">{formData.bikeSpecs?.engine}</span></li>
                    <li>Weight: <span className="font-medium">{formData.bikeSpecs?.weight}</span></li>
                    <li>Fuel Capacity: <span className="font-medium">{formData.bikeSpecs?.fuel}</span></li>
                  </ul>
                </div>
              </div>
            )}

            <h4 className="text-xl font-bold mt-8 text-gray-800">Choose to Hire Gear</h4>
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition duration-150">
                <input
                  type="radio"
                  name="gearOption"
                  value="Bike hire only"
                  checked={formData.gearOption === "Bike hire only"}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-yellow-500"
                />
                <span className="text-base font-medium">Bike hire only</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition duration-150">
                <input
                  type="radio"
                  name="gearOption"
                  value="Bike hire + gear"
                  checked={formData.gearOption === "Bike hire + gear"}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-yellow-500"
                />
                <span className="text-base font-medium">Bike hire + gear</span>
              </label>
            </div>

            {formData.gearOption === "Bike hire + gear" && (
              <div className="ml-0 sm:ml-6 mt-4 space-y-4 p-4 border rounded-lg bg-yellow-50">
                <h5 className="font-semibold text-gray-700">Gear Rental Option:</h5>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="subGearOption"
                    value="Package Option - $100/day"
                    checked={formData.subGearOption === "Package Option - $100/day"}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-yellow-500"
                  />
                  <span className="text-sm sm:text-base">Package Option - <span className="font-semibold text-green-600">$100/day</span> (Helmet, Jacket, Gloves)</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="subGearOption"
                    value="Individually"
                    checked={formData.subGearOption === "Individually"}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-yellow-500"
                  />
                  <span className="text-sm sm:text-base">Individually</span>
                </label>

                {formData.subGearOption === "Individually" && (
                  <div className="ml-0 sm:ml-6 mt-4 space-y-3 p-3 border-t border-gray-200">
                    <h6 className="font-semibold text-sm mb-2">Select Individual Items:</h6>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="gear.helmet"
                        checked={formData.gear.helmet}
                        onChange={handleChange}
                        className="form-checkbox h-4 w-4 text-yellow-500 rounded"
                      />
                      <span className="text-sm">Helmet - $45/day</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="gear.jacket"
                        checked={formData.gear.jacket}
                        onChange={handleChange}
                        className="form-checkbox h-4 w-4 text-yellow-500 rounded"
                      />
                      <span className="text-sm">Jacket - $65/day</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="gear.gloves"
                        checked={formData.gear.gloves}
                        onChange={handleChange}
                        className="form-checkbox h-4 w-4 text-yellow-500 rounded"
                      />
                      <span className="text-sm">Gloves - $25/day</span>
                    </label>
                  </div>
                )}
              </div>
            )}

            <h4 className="text-xl font-bold mt-8 text-gray-800">Add-On Options</h4>
            <div className="space-y-3 p-4 border rounded-lg bg-white shadow-sm">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="addOns.excessReduction"
                  checked={formData.addOns.excessReduction}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-500 rounded"
                />
                <span className="text-base">Excess Reduction - <span className="font-medium text-blue-600">$32/day</span></span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="addOns.tyreProtection"
                  checked={formData.addOns.tyreProtection}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-500 rounded"
                />
                <span className="text-base">Tyre Protection - <span className="font-medium text-blue-600">$23/day</span></span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="addOns.windscreen"
                  checked={formData.addOns.windscreen}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-500 rounded"
                />
                <span className="text-base">Touring Windscreen (Tall) - <span className="font-medium text-blue-600">$10/day</span></span>
              </label>
            </div>

            <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
              <button type="button" onClick={handlePrev} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-lg transition duration-150 shadow-md">
                Previous
              </button>
              <button
                type="button"
                disabled={!isStepValid() || loading}
                onClick={handleNext}
                className={getButtonClass(isStepValid() && !loading)}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Rider Details */}
        {step === 3 && (
          <div className="space-y-8 px-4 sm:px-8 lg:px-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800">Rider Details</h3>
            <hr className="border-t border-gray-300" />
            <p className="text-base text-gray-600">
              Enter your personal information, contact details, and current address.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                  required
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                  required
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                  Birthday
                </label>
                <input
                  id="birthday"
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700">
                  Confirm Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirmEmail"
                  type="email"
                  name="confirmEmail"
                  value={formData.confirmEmail}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full p-3 border rounded-lg shadow-sm transition duration-150 ${
                    formData.email && formData.confirmEmail && formData.email !== formData.confirmEmail
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                  }`}
                  required
                />
                {formData.email && formData.confirmEmail && formData.email !== formData.confirmEmail && (
                  <p className="text-red-500 text-xs mt-1">Emails do not match.</p>
                )}
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+94 77 123 4567"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                />
              </div>
              <div>
                <label htmlFor="landline" className="block text-sm font-medium text-gray-700">
                  Landline (Optional)
                </label>
                <input
                  id="landline"
                  type="tel"
                  name="landline"
                  value={formData.landline}
                  onChange={handleChange}
                  placeholder="+94 11 234 5678"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
                  Occupation
                </label>
                <input
                  id="occupation"
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Software Developer"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                />
              </div>
              <div className="sm:col-span-2 space-y-8 pt-8 border-t border-gray-200">
                <div>
                  <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <input
                    id="streetAddress"
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                  />
                </div>
                <div>
                  <label htmlFor="streetAddress2" className="block text-sm font-medium text-gray-700">
                    Street Address Line 2 (Optional)
                  </label>
                  <input
                    id="streetAddress2"
                    type="text"
                    name="streetAddress2"
                    value={formData.streetAddress2}
                    onChange={handleChange}
                    placeholder="Apartment, suite, unit, etc."
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Colombo"
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                    />
                  </div>
                  <div>
                    <label htmlFor="postCode" className="block text-sm font-medium text-gray-700">
                      Post Code
                    </label>
                    <input
                      id="postCode"
                      type="text"
                      name="postCode"
                      value={formData.postCode}
                      onChange={handleChange}
                      placeholder="00100"
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={(e) => {
                        handleChange(e);
                        setFormData((prev) => ({ ...prev, state: "" }));
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                      required
                    >
                      <option value="" disabled>Select Country</option>
                      {Object.keys(countryStateMap).map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State / Province <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-yellow-500 focus:border-yellow-500 transition duration-150 disabled:bg-gray-100 disabled:text-gray-500"
                      required
                      disabled={!formData.country}
                    >
                      <option value="" disabled>
                        {formData.country ? "Select State" : "Select a Country first"}
                      </option>
                      {formData.country &&
                        countryStateMap[formData.country].map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-12 pt-4 border-t border-gray-200">
              <button type="button" onClick={handlePrev} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-lg transition duration-150 shadow-md">
                Previous
              </button>
              <button
                type="button"
                disabled={!isStepValid() || loading}
                onClick={handleNext}
                className={getButtonClass(isStepValid() && !loading)}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Emergency Contact & Driver's Licence Details */}
        {step === 4 && (
          <div className="space-y-10 px-4 sm:px-8 lg:px-12 max-w-4xl mx-auto">
            <div className="space-y-6 p-6 sm:p-8 border border-gray-200 rounded-xl shadow-lg bg-white">
              <h3 className="text-2xl font-bold text-gray-800">Emergency Contact</h3>
              <hr className="border-t border-gray-300" />
              <p className="text-base text-gray-600">Provide details of a person to contact in case of an emergency. All fields are required.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label htmlFor="emergencyFirstName" className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="emergencyFirstName"
                    type="text"
                    name="emergencyFirstName"
                    value={formData.emergencyFirstName}
                    onChange={handleChange}
                    placeholder="Jane"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="emergencyLastName" className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="emergencyLastName"
                    type="text"
                    name="emergencyLastName"
                    value={formData.emergencyLastName}
                    onChange={handleChange}
                    placeholder="Smith"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="emergencyEmail" className="block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="emergencyEmail"
                    type="email"
                    name="emergencyEmail"
                    value={formData.emergencyEmail}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="emergencyMobile" className="block text-sm font-medium text-gray-700">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="emergencyMobile"
                    type="tel"
                    name="emergencyMobile"
                    value={formData.emergencyMobile}
                    onChange={handleChange}
                    placeholder="+94 77 123 4567"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="emergencyLandline" className="block text-sm font-medium text-gray-700">
                    Landline (Optional)
                  </label>
                  <input
                    id="emergencyLandline"
                    type="tel"
                    name="emergencyLandline"
                    value={formData.emergencyLandline}
                    onChange={handleChange}
                    placeholder="+94 11 234 5678"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                  />
                </div>
                <div>
                  <label htmlFor="emergencyRelation" className="block text-sm font-medium text-gray-700">
                    Relationship <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="emergencyRelation"
                    type="text"
                    name="emergencyRelation"
                    value={formData.emergencyRelation}
                    onChange={handleChange}
                    placeholder="Friend, Family, Spouse, etc."
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 p-6 sm:p-8 border border-gray-200 rounded-xl shadow-lg bg-white">
              <h3 className="text-2xl font-bold text-gray-800">Driver's Licence Details</h3>
              <hr className="border-t border-gray-300" />
              <p className="text-base text-gray-600">Provide your driver's licence information and supporting documents.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Is your licence currently valid? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center text-base">
                      <input
                        type="radio"
                        name="licenceDetails.licenceValid"
                        value="Yes"
                        checked={formData.licenceDetails.licenceValid === "Yes"}
                        onChange={handleChange}
                        className="h-4 w-4 text-yellow-500 border-gray-300 accent-[#edab1a]"
                        required
                      />
                      <span className="ml-2 text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center text-base">
                      <input
                        type="radio"
                        name="licenceDetails.licenceValid"
                        value="No"
                        checked={formData.licenceDetails.licenceValid === "No"}
                        onChange={handleChange}
                        className="h-4 w-4 text-yellow-500 border-gray-300 accent-[#edab1a]"
                        required
                      />
                      <span className="ml-2 text-gray-700">No</span>
                    </label>
                  </div>
                  {formData.licenceDetails.licenceValid === "No" && (
                    <p className="text-red-500 text-sm mt-2 font-medium">
                      A valid driver's licence is required to proceed with the booking.
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <label htmlFor="licenceNumber" className="block text-sm font-medium text-gray-700">
                      Licence Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="licenceNumber"
                      type="text"
                      name="licenceDetails.licenceNumber"
                      value={formData.licenceDetails.licenceNumber}
                      onChange={handleChange}
                      placeholder="12345678"
                      className={`w-full p-3 border rounded-lg shadow-sm transition duration-150 ${
                        formData.licenceDetails.licenceNumber ? "border-gray-300 focus:ring-yellow-500 focus:border-yellow-500" : "border-red-500"
                      }`}
                      required
                    />
                    {!formData.licenceDetails.licenceNumber && (
                      <p className="text-red-500 text-xs mt-1">Licence number is required.</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="licenceExpiry" className="block text-sm font-medium text-gray-700">
                      Licence Expiry Date <span className="text-red-500">*</span>
                    </label>
                    <DatePicker
                      id="licenceExpiry"
                      selected={formData.licenceDetails.licenceExpiry}
                      onChange={(date) => handleDateChange("licenceExpiry", date)}
                      minDate={new Date()}
                      placeholderText="Select Date"
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="licenceState" className="block text-sm font-medium text-gray-700">
                      State of Issue <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="licenceState"
                      name="licenceDetails.licenceState"
                      value={formData.licenceDetails.licenceState}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-yellow-500 focus:border-yellow-500 transition duration-150 disabled:bg-gray-100 disabled:text-gray-500"
                      required
                      disabled={!formData.country}
                    >
                      <option value="" disabled>
                        {formData.country ? "Select State" : "Select Country in Step 3"}
                      </option>
                      {formData.country &&
                        countryStateMap[formData.country].map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="licenceFile" className="block text-sm font-medium text-gray-700">
                      Upload ID (Front & Back) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="licenceFile"
                      type="file"
                      name="licenceFile"
                      accept="image/*,.pdf"
                      onChange={handleChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 transition duration-150"
                      required
                    />
                    {formData.licenceDetails.licenceFile?.name && (
                      <p className="text-xs text-gray-500 mt-1">
                        Selected: {formData.licenceDetails.licenceFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-10 pt-4 border-t border-gray-200">
              <button type="button" onClick={handlePrev} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-lg transition duration-150 shadow-md">
                Previous
              </button>
              <button
                type="button"
                disabled={!isStepValid() || formData.licenceDetails.licenceValid === "No" || loading}
                onClick={handleNext}
                className={getButtonClass(isStepValid() && formData.licenceDetails.licenceValid === "Yes" && !loading)}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Agreement */}
        {step === 5 && (
          <div className="space-y-8 px-4 sm:px-8 lg:px-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800">Rental Agreement</h3>
            <hr className="border-t border-gray-300" />
            <p className="text-base text-gray-600">
              Please **review the rental agreement below** and accept the terms & conditions to proceed to payment.
            </p>

            <div className="p-6 sm:p-8 border border-gray-200 rounded-xl shadow-lg bg-white space-y-4">
              <h4 className="text-xl font-semibold text-gray-800">Review Document</h4>
              <iframe
                src={agreementpdf}
                title="Rental Agreement"
                className="w-full h-[600px] border border-gray-300 rounded-lg shadow-inner"
                style={{ minHeight: "600px" }}
              ></iframe>
              <p className="text-sm text-gray-600 pt-2">
                If the document is not visible, you can also{" "}
                <a
                  href="/assets/rental-agreement.pdf"
                  download
                  className="text-yellow-600 hover:text-yellow-700 font-medium hover:underline transition duration-150"
                >
                  Download the Rental Agreement PDF
                </a>
                .
              </p>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 text-lg font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreementAccepted"
                  checked={formData.agreementAccepted}
                  onChange={handleChange}
                  className="h-5 w-5 text-yellow-500 border-gray-300 rounded accent-[#edab1a] focus:ring-yellow-500 transition duration-150"
                  required
                />
                <span>
                  I **confirm that I have read and agree** to the terms and conditions of the rental agreement.
                  <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            <div className="flex justify-between mt-10 pt-4 border-t border-gray-200">
              <button type="button" onClick={handlePrev} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-lg transition duration-150 shadow-md">
                Previous
              </button>
              <button
                type="button"
                disabled={!isStepValid() || loading}
                onClick={handleNext}
                className={getButtonClass(isStepValid() && !loading)}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Summary */}
        {step === 6 && (
          <div className="space-y-8 px-4 sm:px-8 lg:px-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800">Booking Summary</h3>
            <hr className="border-t border-gray-300" />
            <p className="text-base text-gray-600">
              Please **review all booking and payment details** below before proceeding to the final checkout.
              <br />
              This summary was generated on **{format(new Date(), "MMMM dd, yyyy 'at' hh:mm a z")}**.
            </p>

            <div className="p-6 sm:p-8 border border-gray-200 rounded-xl shadow-lg bg-white space-y-6">
              <h4 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-3">Itemized Purchase Details</h4>
              <div className="hidden sm:grid grid-cols-6 text-sm font-semibold text-gray-500 border-b pb-2">
                <div className="col-span-3">Item</div>
                <div className="col-span-1 text-center">Days</div>
                <div className="col-span-2 text-right">Total Price</div>
              </div>

              <div className="space-y-4">
                {formData.bikeModel && (
                  <div className="grid grid-cols-6 items-center text-gray-700">
                    <strong className="col-span-3">
                      {formData.bikeModel}
                      <span className="block text-xs font-normal text-gray-500">(Motorbike Rental)</span>
                    </strong>
                    <div className="col-span-1 text-center font-medium">{formData.totalDays}</div>
                    <div className="col-span-2 text-right font-semibold text-lg">
                      ${(formData.bikePrice * formData.totalDays).toFixed(2)}
                    </div>
                  </div>
                )}

                {formData.gearOption === "Bike hire + gear" &&
                  formData.subGearOption === "Package Option - $100/day" && (
                    <div className="grid grid-cols-6 items-center text-gray-700">
                      <strong className="col-span-3">
                        Gear Package
                        <span className="block text-xs font-normal text-gray-500">($100/day)</span>
                      </strong>
                      <div className="col-span-1 text-center font-medium">{formData.totalDays}</div>
                      <div className="col-span-2 text-right font-semibold text-lg">
                        ${(100 * formData.totalDays).toFixed(2)}
                      </div>
                    </div>
                  )}

                {formData.gearOption === "Bike hire + gear" &&
                  formData.subGearOption === "Individually" && (
                    <div className="space-y-2 border-t pt-4 mt-4">
                      <p className="text-sm font-semibold text-gray-600">Individual Gear Rentals:</p>
                      {formData.gear.helmet && (
                        <div className="grid grid-cols-6 items-center text-gray-700 text-sm">
                          <span className="col-span-3 ml-4">Helmet ($45/day)</span>
                          <div className="col-span-1 text-center">{formData.totalDays}</div>
                          <div className="col-span-2 text-right">${(45 * formData.totalDays).toFixed(2)}</div>
                        </div>
                      )}
                      {formData.gear.jacket && (
                        <div className="grid grid-cols-6 items-center text-gray-700 text-sm">
                          <span className="col-span-3 ml-4">Jacket ($65/day)</span>
                          <div className="col-span-1 text-center">{formData.totalDays}</div>
                          <div className="col-span-2 text-right">${(65 * formData.totalDays).toFixed(2)}</div>
                        </div>
                      )}
                      {formData.gear.gloves && (
                        <div className="grid grid-cols-6 items-center text-gray-700 text-sm">
                          <span className="col-span-3 ml-4">Gloves ($25/day)</span>
                          <div className="col-span-1 text-center">{formData.totalDays}</div>
                          <div className="col-span-2 text-right">${(25 * formData.totalDays).toFixed(2)}</div>
                        </div>
                      )}
                    </div>
                  )}

                {(formData.addOns.excessReduction || formData.addOns.tyreProtection || formData.addOns.windscreen) && (
                  <div className="space-y-2 border-t pt-4 mt-4">
                    <p className="text-sm font-semibold text-gray-600">Selected Add-Ons:</p>
                    {formData.addOns.excessReduction && (
                      <div className="grid grid-cols-6 items-center text-gray-700 text-sm">
                        <span className="col-span-3 ml-4">Excess Reduction ($32/day)</span>
                        <div className="col-span-1 text-center">{formData.totalDays}</div>
                        <div className="col-span-2 text-right">${(32 * formData.totalDays).toFixed(2)}</div>
                      </div>
                    )}
                    {formData.addOns.tyreProtection && (
                      <div className="grid grid-cols-6 items-center text-gray-700 text-sm">
                        <span className="col-span-3 ml-4">Tyre Protection ($23/day)</span>
                        <div className="col-span-1 text-center">{formData.totalDays}</div>
                        <div className="col-span-2 text-right">${(23 * formData.totalDays).toFixed(2)}</div>
                      </div>
                    )}
                    {formData.addOns.windscreen && (
                      <div className="grid grid-cols-6 items-center text-gray-700 text-sm">
                        <span className="col-span-3 ml-4">Touring Windscreen ($10/day)</span>
                        <div className="col-span-1 text-center">{formData.totalDays}</div>
                        <div className="col-span-2 text-right">${(10 * formData.totalDays).toFixed(2)}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 sm:p-8 border border-gray-200 rounded-xl shadow-lg bg-gray-50 space-y-6">
              <h4 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-3">Payment Summary</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Option <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center text-base">
                    <input
                      type="radio"
                      name="paymentOption"
                      value="Full Payment"
                      checked={formData.paymentOption === "Full Payment"}
                      onChange={handleChange}
                      className="h-4 w-4 text-yellow-500 border-gray-300 accent-[#edab1a]"
                      required
                    />
                    <span className="ml-2 text-gray-700 font-medium">Full Payment</span>
                  </label>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-lg text-gray-700">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 border-b pb-3">
                  <span className="font-normal">Merchant Fee (1.5% + $0.02)</span>
                  <span className="font-normal text-right">${((calculateTotal() * 0.015) + 0.02).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl text-gray-800 pt-3">
                  <strong className="font-bold">TOTAL TO PAY</strong>
                  <strong className="font-bold text-yellow-600">
                    ${(calculateTotal() + (calculateTotal() * 0.015) + 0.02).toFixed(2)}
                  </strong>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4 pt-4 border-t">
                Upon clicking "**Next**," you'll be directed to the Stripe Checkout form for a secure payment experience.
              </p>
            </div>

            <div className="flex justify-between mt-10 pt-4 border-t border-gray-200">
              <button type="button" onClick={handlePrev} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-lg transition duration-150 shadow-md">
                Previous
              </button>
              <button
                type="button"
                disabled={!isStepValid() || loading}
                onClick={handleNext}
                className={getButtonClass(isStepValid() && !loading)}
              >
                Next (Go to Payment)
              </button>
            </div>
          </div>
        )}

        {/* Step 7: Finalize Payment */}
        {step === 7 && (
          <div className="space-y-8 px-4 sm:px-8 lg:px-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800">Finalize Payment</h3>
            <hr className="border-t border-gray-300" />
            <p className="text-base text-gray-600">
              Your total payment is **${(calculateTotal() + calculateTotal() * 0.015 + 0.02).toFixed(2)}**. 
              You will be redirected to Stripe's secure checkout page.
            </p>
            <div className="flex justify-between mt-10 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-lg transition duration-150 shadow-md"
                disabled={loading}
              >
                Previous
              </button>
              <button
                type="submit"
                disabled={loading || !isStepValid()}
                className={getButtonClass(!loading && isStepValid())}
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BikeBookingForm;