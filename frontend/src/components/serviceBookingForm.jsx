import React, { useState, useContext } from "react";
import axios from "../axiosConfig";
import Mlogo from "../assets/services/mlogo.webp";
import { AuthContext } from "./AuthContext"

// Vertical Radio Button Component
const RadioField = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col space-y-2 w-full">
    <label className="font-medium">{label}</label>
    <div className="flex flex-col space-y-2 mt-1">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={onChange}
            className="accent-[#edab1a]"
          />
          <span className="capitalize">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

const ServiceBookingForm = () => {
  const { user } = useContext(AuthContext);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: user?.fullName?.split(" ")[0] || "",
    lastName: user?.fullName?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    mobileNumber: "",
    workPhone: "",
    homePhone: "",
    streetAddress: "",
    streetAddress2: "",
    city: "",
    state: "",
    postCode: "",
    motorcycleMake: "",
    motorcycleModel: "",
    motorcycleYear: "",
    registrationState: "",
    regoPlate: "",
    vinNumber: "",
    regoExpiry: "",
    currentKms: "",
    lastServiceDate: "",
    ongoingFaults: "",
    faultsDescription: "",
    summaryOfWork: "",
    newTyres: "no",
    tyreDetails: { Width: "", Height: "", rimSize: "", backWidth: "", backHeight: "", backrimSize: "" },
    newTube: "no",
    spokeCheck: "no",
    preFiltersInstalled: "no",
    uhfBluetooth: "no",
    extraGearFitted: "no",
    suspensionMods: "no",
    preferredDateTime: "",
    collectionNeeded: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("tyreDetails.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        tyreDetails: { ...prev.tyreDetails, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const payload = {
      userId: user?.id, // Changed from user.userId to user.id
      ...formData,
      preferredDateTime: formData.preferredDateTime ? new Date(formData.preferredDateTime) : null,
      lastServiceDate: formData.lastServiceDate ? new Date(formData.lastServiceDate) : null,
      regoExpiry: formData.regoExpiry ? new Date(formData.regoExpiry) : null,
      currentKms: formData.currentKms ? Number(formData.currentKms) : undefined,
    };

    console.log("ServiceBookingForm: Submitting booking", { userId: user?.id, payload });

    const response = await axios.post("http://localhost:5000/api/bookings", payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("ServiceBookingForm: Booking submitted successfully", response.data);

    // Construct success message based on email status
    let message = "Booking submitted successfully!";
    if (response.data.emailStatus) {
      const { userEmailSent, adminEmailSent, errors } = response.data.emailStatus;
      if (userEmailSent && adminEmailSent) {
        message += " Confirmation emails sent to you and the admin.";
      } else if (userEmailSent) {
        message += " Confirmation email sent to you, but admin email failed.";
      } else if (adminEmailSent) {
        message += " Confirmation email sent to admin, but user email failed.";
      } else {
        message += " Email notifications failed.";
      }
      if (errors.length > 0) {
        console.warn("ServiceBookingForm: Email errors", errors);
        message += " Some email notifications could not be sent.";
      }
    } else {
      message += " Email notifications could not be sent.";
    }

    alert(message);
    setStep(1);
    setFormData({
      firstName: user?.fullName?.split(" ")[0] || "",
      lastName: user?.fullName?.split(" ").slice(1).join(" ") || "",
      email: user?.email || "",
      mobileNumber: "",
      workPhone: "",
      homePhone: "",
      streetAddress: "",
      streetAddress2: "",
      city: "",
      state: "",
      postCode: "",
      motorcycleMake: "",
      motorcycleModel: "",
      motorcycleYear: "",
      registrationState: "",
      regoPlate: "",
      vinNumber: "",
      regoExpiry: "",
      currentKms: "",
      lastServiceDate: "",
      ongoingFaults: "",
      faultsDescription: "",
      summaryOfWork: "",
      newTyres: "no",
      tyreDetails: { Width: "", Height: "", rimSize: "", backWidth: "", backHeight: "", backrimSize: "" },
      newTube: "no",
      spokeCheck: "no",
      preFiltersInstalled: "no",
      uhfBluetooth: "no",
      extraGearFitted: "no",
      suspensionMods: "no",
      preferredDateTime: "",
      collectionNeeded: "",
    });
  } catch (error) {
    console.error("ServiceBookingForm: Failed to submit booking", error.response?.data || error.message);
    alert(error.response?.data?.message || "Failed to submit booking.");
  }
};

  const renderInput = (label, name, type = "text", required = false, readOnly = false) => (
    <div className="flex flex-col w-full">
      <label className="font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full p-3 border-b border-gray-400 focus:outline-none focus:border-[#edab1a]"
        required={required}
        readOnly={readOnly}
      />
    </div>
  );

  const renderStateSelect = (label, name, required = false) => (
    <div className="flex flex-col w-full">
      <label className="font-medium">{label}</label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full p-3 border-b border-gray-400 focus:outline-none focus:border-[#edab1a]"
        required={required}
      >
        <option value="">Select</option>
        {["ACT", "NSW", "VIC", "QLD", "NT", "WA", "TAS", "SA"].map((st) => (
          <option key={st} value={st}>{st}</option>
        ))}
      </select>
    </div>
  );

  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.mobileNumber &&
          formData.streetAddress &&
          formData.city &&
          formData.state &&
          formData.postCode
        );
      case 2:
        const faultOk =
          formData.ongoingFaults === "no" ||
          (formData.ongoingFaults === "yes" && formData.faultsDescription);
        return formData.motorcycleMake && formData.motorcycleModel && formData.registrationState && faultOk;
      case 3:
        return (
          formData.summaryOfWork &&
          formData.newTyres &&
          (formData.newTyres === "no" || Object.values(formData.tyreDetails).every((v) => v !== ""))
        );
      case 4:
        return formData.preferredDateTime && formData.collectionNeeded;
      default:
        return false;
    }
  };

  const getButtonClass = (enabled) =>
    `px-6 py-2 ${enabled ? "bg-[#edab1a] text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-20" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <div className="mb-8">
        <img src={Mlogo} alt="Motorcycle Service" className="mx-auto w-48 h-auto rounded-lg" />
      </div>
      <form className="w-full space-y-8" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          BOOK A MOTORCYCLE SERVICE OR REPAIR
        </h2>
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`flex-1 h-1 mx-1 ${step >= s ? "bg-[#edab1a]" : "bg-gray-300"}`} />
          ))}
        </div>
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">PERSONAL DETAILS</h3>
            <hr className="border-t border-gray-300 mt-2 mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderInput("First Name", "firstName", "text", true, true)}
              {renderInput("Last Name", "lastName", "text", true, true)}
            </div>
            <div className="w-full">{renderInput("Email", "email", "email", true, true)}</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderInput("Mobile Number", "mobileNumber", "text", true)}
              {renderInput("Work Phone", "workPhone")}
              {renderInput("Home Phone", "homePhone")}
            </div>
            <div className="w-full">{renderInput("Street Address", "streetAddress", "text", true)}</div>
            <div className="w-full">{renderInput("Street Address 2", "streetAddress2")}</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderInput("City", "city", "text", true)}
              {renderStateSelect("State", "state", true)}
              {renderInput("Post Code", "postCode", "text", true)}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                disabled={!isStepValid()}
                onClick={handleNext}
                className={getButtonClass(isStepValid())}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">MOTORCYCLE DETAILS</h3>
            <hr className="border-t border-gray-300 mt-2 mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderInput("Motorcycle Make", "motorcycleMake", "text", true)}
              {renderInput("Motorcycle Model", "motorcycleModel", "text", true)}
              {renderInput("Motorcycle Year", "motorcycleYear")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderStateSelect("Registration State", "registrationState", true)}
              {renderInput("Rego Plate", "regoPlate")}
              {renderInput("VIN Number", "vinNumber")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderInput("Rego Expiry", "regoExpiry", "date")}
              {renderInput("Current KMs", "currentKms", "number")}
            </div>
            {renderInput("Last Service Date", "lastServiceDate", "date")}
            <h3 className="text-xl font-semibold mt-4">Ongoing Faults</h3>
            <RadioField
              label="Ongoing Faults"
              name="ongoingFaults"
              value={formData.ongoingFaults}
              onChange={handleChange}
              options={["yes", "no"]}
            />
            {formData.ongoingFaults === "yes" && (
              <div className="flex flex-col mt-2">
                <label className="font-medium">Faults Description</label>
                <textarea
                  name="faultsDescription"
                  value={formData.faultsDescription}
                  onChange={handleChange}
                  className="w-full p-3 border-b border-gray-400 focus:outline-none focus:border-[#edab1a]"
                  placeholder="Describe the ongoing faults..."
                />
              </div>
            )}
            <div className="flex justify-between mt-4">
              <button type="button" onClick={handlePrev} className="bg-gray-300 px-6 py-2">
                Previous
              </button>
              <button
                type="button"
                disabled={!isStepValid()}
                onClick={handleNext}
                className={getButtonClass(isStepValid())}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">SERVICE DETAILS</h3>
            <hr className="border-t border-gray-300 mt-2 mb-10" />
            <div className="flex flex-col">
              <label className="font-medium">Summary of Work Required:</label>
              <textarea
                name="summaryOfWork"
                value={formData.summaryOfWork}
                onChange={handleChange}
                className="w-full p-3 border rounded-md border-gray-400 focus:outline-none focus:border-[#edab1a]"
              />
            </div>
            <h1 className="font-black text-2xl">Do you require the following:</h1>
            <RadioField
              label="New Tyres"
              name="newTyres"
              value={formData.newTyres}
              onChange={handleChange}
              options={["yes", "no", "maybe"]}
            />
            {formData.newTyres !== "no" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["Width", "Height", "rimSize", "backWidth", "backHeight", "backrimSize"].map((f) => (
                  <div key={f} className="flex flex-col">
                    <label className="font-medium">{f}</label>
                    <input
                      type="text"
                      name={`tyreDetails.${f}`}
                      value={formData.tyreDetails[f]}
                      onChange={handleChange}
                      className="w-full p-3 border-b border-gray-400 focus:outline-none focus:border-[#edab1a]"
                    />
                  </div>
                ))}
              </div>
            )}
            {["newTube", "spokeCheck", "preFiltersInstalled", "uhfBluetooth", "extraGearFitted", "suspensionMods"].map(
              (key) => (
                <RadioField
                  key={key}
                  label={key.replace(/([A-Z])/g, " $1")}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  options={["yes", "no", "maybe"]}
                />
              )
            )}
            <div className="flex justify-between mt-4">
              <button type="button" onClick={handlePrev} className="bg-gray-300 px-6 py-2">
                Previous
              </button>
              <button
                type="button"
                disabled={!isStepValid()}
                onClick={handleNext}
                className={getButtonClass(isStepValid())}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">CHOOSE YOUR PREFERRED DROP OFF DATE AND TIME</h3>
            <hr className="border-t border-gray-300 mt-2 mb-10" />
            {renderInput("Preferred Date & Time", "preferredDateTime", "datetime-local", true)}
            <RadioField
              label="Collection Needed"
              name="collectionNeeded"
              value={formData.collectionNeeded}
              onChange={handleChange}
              options={["critical - Next few days", "urgent - Next 7 days", "soon - Next fortnight", "no hurry - Next 30 days"]}
            />
            <div className="flex justify-between mt-4">
              <button type="button" onClick={handlePrev} className="bg-gray-300 px-6 py-2">
                Previous
              </button>
              <button
                type="submit"
                disabled={!isStepValid()}
                className={getButtonClass(isStepValid())}
              >
                Submit Booking
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ServiceBookingForm;