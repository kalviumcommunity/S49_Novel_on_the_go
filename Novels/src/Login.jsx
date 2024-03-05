import React, { useState } from "react";
import "./login.css"; // Importing the CSS file

// Function component for the registration form
export default function RegForm() {
  // State variables for form fields, submission status, and validation errors
  const [field, setField] = useState({
    name:"",
    email:"",
    password:"",
    repeatPassword:""
  });
  const [submitted, setSubmit] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: ""
  });

  // Function to validate the form fields
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validation rules for each field
    if (!field.name || field.name.length < 3 || field.name.length > 30) {
      errors.name = "Name should be between 3 and 30 characters";
      isValid = false;
    }

    if (!field.email || !field.email.includes("@")) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!field.password || field.password.length < 10 || !/[!@#$%^&*(),.?":{}|<>]/.test(field.password)) {
      errors.password = "Password should be at least 10 characters long and contain at least one special character";
      isValid = false;
    }

    if (field.password !== field.repeatPassword) {
      errors.repeatPassword = "Passwords do not match";
      isValid = false;
    }

    // Set the validation errors and return the validation status
    setValidationErrors(errors);
    return isValid;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // If the form is valid, set the submission status to true
      setSubmit(true);
      
      // Set a timeout to reset the submission status and redirect after 2 seconds
      setTimeout(() => {
        setSubmit(false); 
        window.location.href = "/"; // Redirect to the home page
      }, 1000); 
    }
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
          onChange={(e)=>{setField({...field, name:e.target.value})}}
        />
        {validationErrors.name && <span className="error">{validationErrors.name}</span>}

        <input
          id="email"
          className="form1"
          type="text"
          placeholder="Email"
          name="email"
          value={field.email}
          onChange={(e)=>{setField({...field, email:e.target.value})}}
        />
        {validationErrors.email && <span className="error">{validationErrors.email}</span>}

        <input
          id="password"
          className="form1"
          type="password"
          placeholder="Password"
          name="password"
          value={field.password}
          onChange={(e)=>{setField({...field, password:e.target.value})}}
        />
        {validationErrors.password && <span className="error">{validationErrors.password}</span>}

        <input
          id="repeat-password"
          className="form1"
          type="password"
          placeholder="Repeat Password"
          name="repeatPassword"
          value={field.repeatPassword}
          onChange={(e)=>{setField({...field, repeatPassword:e.target.value})}}
        />
        {validationErrors.repeatPassword && <span className="error">{validationErrors.repeatPassword}</span>}

        {/* Button for form submission */}
        <button className="form-fields" type="submit">
          Sign Up 
        </button>
      </form>
    </div>
  );
}
