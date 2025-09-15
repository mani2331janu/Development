import React, { useState } from "react";
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Typography,
    TextField,
    Button,
    Paper,
    Grid
} from "@mui/material";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const paperStyle = {
        width: 400,
        margin: "20px auto",
        padding: "20px",
    };

    const [showPassword, seShowPassword] = useState(false)

    let navigate = useNavigate();

    let schema = Yup.object().shape({
        email: Yup.string().required("Email is Required").matches(/^[a-z]+@[a-z]{3,5}\.[a-z]{2,4}$/, "Enter Valid Email"),
        password: Yup.string().required("Enter a Password")
    })

    let { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    let handleCheck = (data) => {
        alert(2)
        console.log(data);
        navigate("/")
    }

    let handleNavigate = () => {
        alert(1)
        navigate("/sign_up")
    }


    return (
        <div>
            <Paper style={paperStyle} elevation={3} component="form" onSubmit={handleSubmit(handleCheck)}>
                <Typography
                    variant="h4"
                    align="center"
                    fontWeight="bold"
                    gutterBottom

                >
                    Login
                </Typography>

                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    {...register("email")}
                    helperText={errors.email?.message}
                    error={!!errors.email}
                />
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
                    <Button onClick={() => { seShowPassword(!showPassword) }}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "1.2rem"
                        }}
                    > {showPassword ? "🙈" : "👁️"}</Button>
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    Login
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ mt: 3 }}
                    type="button"
                    onClick={handleNavigate}
                >
                    Sig-up
                </Button>
            </Paper>
        </div>
    );
};

export default Login;
