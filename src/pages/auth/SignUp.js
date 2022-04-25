import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { NavLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRef } from 'react';
import useHttp from '../../hooks/use-http';
import useAuth from '../../hooks/use-auth';
import { Card } from 'react-bootstrap';
import useAlertWrapper from '../../hooks/use-alert';

const SignUp = () => {
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();
    const passwordCheck = useRef();
    const { isLoading, sendRequest } = useHttp();
    const auth = useAuth();
    const navigate = useNavigate();
    const alert = useAlertWrapper();

    useEffect(() => {
        if (auth.isLoggedIn) {
            navigate("/ucet");
        }
    }, [auth.isLoggedIn]);

    const handleSubmit = (event) => {
        event.preventDefault();

        let registerData = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            email: email.current.value,
            password: password.current.value,
        };

        console.log(registerData);

        sendRequest({
            url: 'https://localhost:5001/Authenticate/register',
            method: 'POST',
            body: registerData,
            headers: { 'Content-Type': 'application/json' },
            responseType: 'text'
        }).then((status) => {
            if(status === 400){
                alert.warning("Zadané údaje nejsou správné.");
            }
        });
    };

    return (
        <Container component="main" maxWidth="sm">
            <Card className='p-4'>
                <Card.Body>
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Registrace
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="Jméno"
                                        inputRef={firstName}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Příjmení"
                                        name="lastName"
                                        autoComplete="family-name"
                                        inputRef={lastName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        inputRef={email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Heslo"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        inputRef={password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password-check"
                                        label="Heslo pro ověření"
                                        type="password"
                                        id="password-check"
                                        autoComplete="new-password"
                                        inputRef={passwordCheck}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                color="success"
                            >
                                Registrovat
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    {"Již máte zaregistrovaný účet? "}
                                    <NavLink to="/prihlasit">
                                        Přihlaste se!
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SignUp;