import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';

const SignIn = () => {
    const login = useRef('');
    const password = useRef('');
    const remember = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            email: login.current.value,
            password: password.current.value,
            remember: remember.current.checked
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
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
                        color = "success"
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
        </Container>
    );
};

export default SignIn;