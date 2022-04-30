import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRef } from 'react';
import { Card } from '@mui/material';
import useHttp from '../../hooks/use-http';
import useAlertWrapper from '../../hooks/use-alert';

const PasswordReset = () => {
    let [searchParams] = useSearchParams();
    const password = useRef();
    const passwordCheck = useRef();
    const navigate = useNavigate();
    const { isLoading, sendRequest } = useHttp();
    const alert = useAlertWrapper();

    const handleSubmit = (event) => {
        event.preventDefault();
        var token = searchParams.get('token');
        var email = searchParams.get('email');
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/Authenticate/reset-password`,
            method: 'POST',
            body: {
                email: email,
                token: token,
                password: password.current.value
            },
            headers: { 'Content-Type': 'application/json', 'accept': '*/*' },
            responseType: 'empty'
        })
            .then((status) => {
                if(status){
                    alert.warning("Údaje nejsou v pořádku. Zkuste to znovu.")
                }
                else{
                    alert.success("Heslo bylo změněno. Nyní se prosím přihlašte.");
                    navigate('/prihlasit');
                }
            });
    };

    useEffect(() => {
        if (!searchParams.get('email') || !searchParams.get('token')) {
            navigate('/prihlasit');
        }
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <Card variant="outlined" className='p-4'>
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Změna hesla pro
                    </Typography>
                    <Typography component="p" variant="subtitle1">
                         <strong>{searchParams.get('email')}</strong>
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Nové heslo"
                            name="password"
                            autoComplete="password-new"
                            inputRef={password}
                            type="password"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password-check"
                            label="Nové heslo pro ověření"
                            name="password-check"
                            autoComplete="password-new"
                            inputRef={passwordCheck}
                            type="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="success"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Změnit heslo
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Container>
    );
};

export default PasswordReset;