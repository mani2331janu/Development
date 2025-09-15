import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const handleSave = (data) => {
    console.log(data);
  };

  const paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
    display: "grid",
    gap: "20px"
  };

  return (
    <Paper
      style={paperStyle}
      elevation={3}
      component="form"
      onSubmit={handleSubmit(handleSave)}
    >
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Sign Up
      </Typography>

      <TextField
        label="Name"
        fullWidth
        margin="normal"
        {...register("name")}
        helperText={errors.name?.message}
        error={!!errors.name}
      />

      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        {...register("email")}
        helperText={errors.email?.message}
        error={!!errors.email}
      />

      {/* Password field with a simple toggle button outside */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          {...register("password")}
          helperText={errors.password?.message}
          error={!!errors.password}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.2rem"
          }}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <TextField
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          fullWidth
          margin="normal"
          {...register("confirm_password")}
          helperText={errors.confirm_password?.message}
          error={!!errors.confirm_password}
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.2rem"
          }}
        >
          {showConfirm ? "🙈" : "👁️"}
        </button>
      </div>

      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ mt: 2 }}
        type="submit"
      >
        Create Account
      </Button>

      <Button
        variant="outlined"
        fullWidth
        onClick={() => navigate("/login")}
      >
        Log In
      </Button>
    </Paper>
  );
};

export default Signup;
