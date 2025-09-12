import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  let paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
    display: "grid",
    gap: "20px"
  };

  let { register, handleSubmit, formState: { errors } } = useForm()
  let handleSave = ()=>{

  }

  let handleNavigate = () => {
    navigate("/login")
  }
  return (

    <Paper
      style={paperStyle}
      elevation={3}
      sx={{ p: 4, borderRadius: 3, width: "100%", maxWidth: 400 }}
      component="form"
      onSubmit={handleSubmit(handleSave)}
    >
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        gutterBottom
      >
        Sign Up
      </Typography>


      <TextField
        label="Name"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ mt: 3 }}
        type="submit"
      >
        Create Account
      </Button>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleNavigate}
      >
        LogIn
      </Button>

      

    </Paper>

  );
};

export default Signup;
