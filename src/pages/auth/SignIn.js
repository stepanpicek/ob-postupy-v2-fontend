import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import useHttp from '../../hooks/use-http';
import useAuth from '../../hooks/use-auth';
import { Card } from 'react-bootstrap';
import useAlertWrapper from '../../hooks/use-alert';
import { i } from 'mathjs';

const SignIn = () => {
    const login = useRef('');
    const password = useRef('');
    const remember = useRef();
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
        let loginData = {
            userName: login.current.value,
            password: password.current.value,
            isPersistent: remember.current.checked
        };

        sendRequest({
            url: 'https://localhost:5001/Authenticate/login',
            method: 'POST',
            body: loginData,
            headers: { 'Content-Type': 'application/json', 'accept': '*/*' },
            responseType: 'text'
        }, (data) => {
            auth.login(data);
            navigate("/ucet");
            alert.success("Přihlášení proběhlo úspěšně.");
        }).then((status) => {
            if (status === 401 || status === 400) {
                alert.warning("Kombinace emailu a hesla není správná.");
            }
        });
    };

    return (
        <Container component="main" maxWidth="xs">
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
                            Přihlášení
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                inputRef={login}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Heslo"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={password}
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" />}
                                label="Pamatovat přihlášení"
                                inputRef={remember}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="success"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Přihlásit
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <NavLink to="/zapomenute-heslo">
                                        Zapomenuté heslo
                                    </NavLink>
                                </Grid>
                                <Grid item>
                                    {"Nemáte ještě účet?  "}
                                    <NavLink to="/registrace">
                                        {"Zaregistrujte se!"}
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

export default SignIn;