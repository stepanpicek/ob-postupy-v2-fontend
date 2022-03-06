import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import useAuth from '../../../hooks/use-auth';
import useHttp from '../../../hooks/use-http';

const ChangePasswordForm = () => {    
    const [passwordOld, setPasswordOld] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const auth = useAuth();
    const { isLoading, error, sendRequest } = useHttp();

    const handleChangePasswordSubmit = (event) => {
        event.preventDefault();
        
        let inputData = {
            oldPassword: passwordOld,
            newPassword: password
        };

        sendRequest({
            url: 'https://localhost:5001/Authenticate/password',
            method: 'POST',
            body: inputData,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        })
        .then(() => {            
            setPasswordOld("");
            setPassword("");
            setPasswordCheck("");
            auth.logout();
        });
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
                value={passwordOld}
                onChange = {(input) => {setPasswordOld(input.target.value)}}
                type="password"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Nové heslo"
                name="password"
                autoComplete="password-new"
                value={password}
                onChange = {(input) => {setPassword(input.target.value)}}
                type="password"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="password-check"
                label="Nové heslo pro ověření"
                name="password-check"
                autoComplete="password-new"
                value={passwordCheck}
                onChange = {(input) => {setPasswordCheck(input.target.value)}}
                type="password"
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