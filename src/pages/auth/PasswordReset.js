import React from 'react';
import { useSearchParams } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRef } from 'react';
import { Card } from '@mui/material';

const PasswordReset = () => {
    let [searchParams] = useSearchParams();
    const password = useRef();
    const passwordCheck = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            password: password.current.value,
        })
    };

    return (
        <Card variant="outlined">
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
                        Změna hesla pro {searchParams.get('email')}
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
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Změnit heslo
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Card>
    );
};

export default PasswordReset;