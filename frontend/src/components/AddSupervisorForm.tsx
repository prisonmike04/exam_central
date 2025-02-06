"use client";

import { useState } from "react";
import axios from "axios";

// Define form data type
interface FormData {
  name: string;
  email: string;
  availability_start: string;
  availability_end: string;
  specialization: string;
}

const AddSupervisorForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    availability_start: "",
    availability_end: "",
    specialization: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Validate email immediately if it's the email input field
    if (e.target.name === "email" && !validateEmail(e.target.value)) {
      setError("Invalid email format.");
    } else {
      setError(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous messages
    setError(null);
    setSuccessMessage(null);

    const { name, email, availability_start, availability_end, specialization } = formData;

    // Basic Validation
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

    try {
      setIsSubmitting(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/supervisors/add`, formData);
      setSuccessMessage(response.data.message);

      // Reset form fields
      setFormData({
        name: "",
        email: "",
        availability_start: "",
        availability_end: "",
        specialization: "",
      });
    } catch (err) {
      console.error("Error adding supervisor:", err);
      setError("Failed to add supervisor. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-lg">
      {/* Error and Success Messages */}
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      {successMessage && <p className="text-green-500 font-semibold">{successMessage}</p>}

      {/* Form Inputs */}
      <label className="block">
        <span className="text-gray-700">Name:</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 px-2 py-1 rounded w-full mt-1"
          required
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Email:</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 px-2 py-1 rounded w-full mt-1"
          required
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Availability Start:</span>
        <input
          type="date"
          name="availability_start"
          value={formData.availability_start}
          onChange={handleChange}
          className="border border-gray-300 px-2 py-1 rounded w-full mt-1"
          required
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Availability End:</span>
        <input
          type="date"
          name="availability_end"
          value={formData.availability_end}
          onChange={handleChange}
          className="border border-gray-300 px-2 py-1 rounded w-full mt-1"
          required
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Specialization:</span>
        <input
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="border border-gray-300 px-2 py-1 rounded w-full mt-1"
          required
        />
      </label>

      {/* Submit Button */}
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
