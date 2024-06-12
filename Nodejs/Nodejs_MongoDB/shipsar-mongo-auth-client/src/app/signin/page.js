"use client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LoginLayout from "@/components/LoginLayout";
import { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate name
    if (!isValidEmail(formData.email)) {
      setValidationErrors({
        ...validationErrors,
        email: "Enter a Email Address.",
      });
      return;
    }

    // Validate name
    if (!isValidPassword(formData.password)) {
      setValidationErrors({
        ...validationErrors,
        password: "Invalid Password.",
      });
      return;
    }

    console.log(formData);
  };

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
    <LoginLayout>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </LoginLayout>
  );
};

export default SignIn;
