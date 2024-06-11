import React, { useState } from "react";
import "./FormRegistration.css";
import axios from "axios";

const FormRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateEmail(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!validatePassword(password)) {
      newErrors.password = "Password must be 8 characters length";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password did not match";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted Successfully");
      try {
        const response = await axios.post(
          "https://your-api-endpoint/register",
          {
            email,
            password,
          }
        );
        if (response.status === 200) {
          setSuccessMessage("Registration Successful");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        } else {
          setErrors({ apiError: "Registration Failed. Please try again." });
        }
      } catch (error) {
        setErrors({ apiError: "An error occured, please try again" });
      }
    }
  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="text"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>
      {errors.apiError && <span>{errors.apiError}</span>}
      {successMessage && <span>{successMessage}</span>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormRegistration;
