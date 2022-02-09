import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useRef } from 'react';

const ChangePasswordForm = () => {    
    const passwordOld = useRef();
    const password = useRef();
    const passwordCheck = useRef();

    const handleChangePasswordSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <Box component="form" onSubmit={handleChangePasswordSubmit} noValidate sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="oldPassword"
                label="Staré heslo"
                name="oldPassword"
                autoComplete="password-old"
                inputRef={passwordOld}
                type="password"
                autoFocus
            />
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
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2, alignSelf: 'flex-end' }}
            >
                Změnit heslo
            </Button>
        </Box>
    );
};

export default ChangePasswordForm;