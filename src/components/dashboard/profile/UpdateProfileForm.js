import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useRef } from 'react';

const UpdateProfileForm = () => {
    const firstName = useRef();
    const lastName = useRef();
    const nickName = useRef();
    const regNumber = useRef();
    const birthday = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column' }} autoComplete="off">
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        fullWidth
                        id="nickName"
                        label="Přezdívka"
                        name="nicknName"
                        autoComplete="family-name"
                        inputRef={nickName}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        disabled
                        fullWidth
                        id="email"
                        label="E-mail"
                        defaultValue="mail@stepanpicek.cz"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        id="regNumber"
                        label="ČSOB registrace"
                        name="regNumber"
                        autoComplete="family-name"
                        inputRef={regNumber}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        id="birthday"
                        name="birthday"
                        autoComplete="family-name"
                        label="Datum narození"
                        inputRef={birthday}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2, alignSelf: 'flex-end' }}
            >
                Aktualizovat
            </Button>
        </Box>
    );
}

export default UpdateProfileForm;