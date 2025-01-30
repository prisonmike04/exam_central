"use client";

import { useState } from "react";
import axios from "axios";

const AddSupervisorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    availability_start: "",
    availability_end: "",
    specialization: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // ✅ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Optional: Validate email immediately after input
    if (e.target.name === "email" && !validateEmail(e.target.value)) {
      setError("Invalid email format.");
    } else {
      setError(null); // Clear error if input is valid
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous messages
    setError(null);
    setSuccessMessage(null);

    // ✅ Basic Validation
    const { name, email, availability_start, availability_end, specialization } = formData;

    if (!name || !email || !availability_start || !availability_end || !specialization) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (new Date(availability_start) >= new Date(availability_end)) {
      setError("Availability start date must be before the end date.");
      return;
    }

    console.log("Payload Sent to API:", formData);

    try {
      setIsSubmitting(true); // Prevent multiple submissions
      // Updated the URL to point to localhost:5000 (or your backend URL)
      const response = await axios.post("http://localhost:5000/api/supervisors/add", formData);
      setSuccessMessage(response.data.message);

      console.log("API Response:", response.data);

      // ✅ Reset Form Fields
      setFormData({
        name: "",
        email: "",
        availability_start: "",
        availability_end: "",
        specialization: "",
      });
    } catch (err: any) {
      console.error("Error adding supervisor:", err);

      // Handle network errors gracefully
      if (err.response) {
        setError(err.response?.data?.error || "Failed to add supervisor. Please try again.");
      } else {
        setError("Network error. Please check your connection or try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Helper function to validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-lg">
      {/* ✅ Error and Success Messages */}
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      {successMessage && <p className="text-green-500 font-semibold">{successMessage}</p>}

      {/* ✅ Form Inputs */}
      <label className="block">
        <span className="text-gray-700">Name:</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 px-2 py-1 rounded w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Email:</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border border-gray-300 px-2 py-1 rounded w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Availability Start:</span>
        <input
          type="date"
          name="availability_start"
          value={formData.availability_start}
          onChange={handleChange}
          required
          className="border border-gray-300 px-2 py-1 rounded w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Availability End:</span>
        <input
          type="date"
          name="availability_end"
          value={formData.availability_end}
          onChange={handleChange}
          required
          className="border border-gray-300 px-2 py-1 rounded w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Specialization:</span>
        <input
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
          className="border border-gray-300 px-2 py-1 rounded w-full mt-1"
        />
      </label>

      {/* ✅ Submit Button */}
      <button
        type="submit"
        className={`bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Add Supervisor"}
      </button>
    </form>
  );
};

export default AddSupervisorForm;
