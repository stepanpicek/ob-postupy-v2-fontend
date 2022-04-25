import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import useHttp from '../../hooks/use-http';
import useAlertWrapper from '../../hooks/use-alert';

const PasswordResetRequest = () => {
    const email = useRef();
    const navigate = useNavigate();
    const { isLoading, sendRequest } = useHttp();
    const alert = useAlertWrapper();

    const handleSubmit = (event) => {
        event.preventDefault();
        sendRequest({
            url: 'https://localhost:5001/Authenticate/forgot-password',
            method: 'POST',
            body: {
                email: email.current.value,
            },
            headers: { 'Content-Type': 'application/json', 'accept': '*/*' },
            responseType: 'empty'
        }).then((status) => {
            if(status){
                if (status === 401 || status === 400) {
                    alert.warning("Zadaný email neexistuje");
                }
                return;
            }
            alert.info(`Email s odkazem na resetování hesla byl odeslán na ${email.current.value}`);
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
                            Zapomenuté heslo
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Emailová adresa"
                                name="email"
                                autoComplete="email"
                                inputRef={email}
                                autoFocus
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="success"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Resetovat heslo
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <NavLink to="/prihlasit">
                                        Přihlasit
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default PasswordResetRequest;