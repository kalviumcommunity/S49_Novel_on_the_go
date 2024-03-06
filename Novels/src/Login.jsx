import React, { useState } from "react";
import "./login.css"; // Importing the CSS file

// Function component for the registration form
export default function RegForm() {
  // State variables for form fields and submission status
  const [field, setField] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: ""
  });
  const [submitted, setSubmit] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Handle form submission logic here
    
    // Set a timeout to reset the submission status and redirect after 2 seconds
    setTimeout(() => {
      setSubmit(false);
      window.location.href = "/"; // Redirect to the home page
    }, 1000);
  };

  // JSX code for the registration form
  return (
    <div className="container2">
      <form className="register" onSubmit={handleSubmit}>

        {/* Show a success message if the form is submitted successfully */}
        {submitted && (
          <div className="success-message">You have successfully registered ✅</div>
        )}

        {/* Input fields for name, email, password, and repeat password */}
        <input
          id="name"
          className="form1"
          type="text"
          placeholder="Name"
          name="name"
          value={field.name}
          onChange={(e) => { setField({ ...field, name: e.target.value }) }}
        />

        <input
          id="email"
          className="form1"
          type="text"
          placeholder="Email"
          name="email"
          value={field.email}
          onChange={(e) => { setField({ ...field, email: e.target.value }) }}
        />

        <input
          id="password"
          className="form1"
          type="password"
          placeholder="Password"
          name="password"
          value={field.password}
          onChange={(e) => { setField({ ...field, password: e.target.value }) }}
        />

        <input
          id="repeat-password"
          className="form1"
          type="password"
          placeholder="Repeat Password"
          name="repeatPassword"
          value={field.repeatPassword}
          onChange={(e) => { setField({ ...field, repeatPassword: e.target.value }) }}
        />

        {/* Button for form submission */}
        <button className="form-fields" type="submit">
          Sign Up 
        </button>
      </form>
    </div>
  );
}
