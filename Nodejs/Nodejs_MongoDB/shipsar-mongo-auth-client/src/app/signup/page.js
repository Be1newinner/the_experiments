"use client";

import LoginLayout from "@/components/LoginLayout";
import { Button, TextField, Box } from "@mui/material";
import React, { useState } from "react"; // Import React and useState

const SignUp = () => {
  // Define state variables to hold form data and validation errors
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate name
    if (!isValidName(formData.fullName)) {
      setValidationErrors({
        ...validationErrors,
        fullName: "Enter a valid fullName.",
      });
      return;
    }

    // Validate phone
    if (!isValidPhone(formData.phone)) {
      setValidationErrors({
        ...validationErrors,
        phone: "Enter a valid 10 Digit Phone Number.",
      });
      return;
    }

    // Validate email
    if (!isValidEmail(formData.email)) {
      setValidationErrors({
        ...validationErrors,
        email: "Enter a valid email address.",
      });
      return;
    }

    // Validate password
    if (!isValidPassword(formData.password)) {
      setValidationErrors({
        ...validationErrors,
        password: "Password must be at least 8 characters long.",
      });
      return;
    }

    // Validate confirm password
    if (formData.password !== formData.cpassword) {
      setValidationErrors({
        ...validationErrors,
        cpassword: "Passwords do not match.",
      });
      return;
    }

    // If all validations pass, submit the form
    console.log(formData);
  };

  // Validation functions
  const isValidName = (fullName) => {
    const fullNameRegex = /^[A-Za-z ]+$/;
    const isValidLength = fullName.length > 3 && fullName.length < 15;
    return fullNameRegex.test(fullName) && isValidLength;
  };
  // Validation functions
  const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };
  // Validation functions
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  // Handle input changes and update form data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear validation error for the input that's being changed
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };

  return (
    <LoginLayout title={false}>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Your Full Name"
          name="fullName"
          autoComplete="fullName"
          autoFocus
          helperText={validationErrors.fullName} // Display validation error message
          error={!!validationErrors.fullName} // Apply error style if there's an error
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="phone"
          label="Phone Number"
          name="phone"
          autoComplete="phone"
          autoFocus
          helperText={validationErrors.phone} // Display validation error message
          error={!!validationErrors.phone} // Apply error style if there's an error
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          helperText={validationErrors.email} // Display validation error message
          error={!!validationErrors.email} // Apply error style if there's an error
          onChange={handleInputChange}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="password"
          helperText={validationErrors.password} // Display validation error message
          error={!!validationErrors.password} // Apply error style if there's an error
          onChange={handleInputChange}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="cpassword"
          label="Confirm Password"
          type="password"
          id="cpassword"
          autoComplete="cpassword"
          helperText={validationErrors.cpassword} // Display validation error message
          error={!!validationErrors.cpassword} // Apply error style if there's an error
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </LoginLayout>
  );
};

export default SignUp;
