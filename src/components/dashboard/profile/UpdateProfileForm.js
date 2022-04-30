import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/use-auth';
import useHttp from '../../../hooks/use-http';
import { DatePicker } from '@mui/lab';
import { ThreeDots } from 'react-loader-spinner';
import useAlertWrapper from '../../../hooks/use-alert';

const UpdateProfileForm = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nickName, setNickName] = useState("");
    const [regNumber, setRegNumber] = useState("");
    const [birthday, setBirthday] = useState(null);
    const [email, setEmail] = useState("");
    const auth = useAuth();
    const { isLoading, sendRequest } = useHttp();
    const alert = useAlertWrapper();

    const handleSubmit = (event) => {
        event.preventDefault();

        let inputData = {
            userId: props.userId ? props.userId : null,
            firstName: firstName,
            lastName: lastName,
            nickName: nickName,
            regNumber: regNumber,
            birthdate: birthday
        };
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/Profile/update-profile`,
            method: 'POST',
            body: inputData,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` },
            responseType: 'empty'
        })
        .then((status) => {
            if(!status){
                alert.success("Profil byl aktualizován.");
            }
            else{
                if( status < 500){
                    alert.warning("Zadaná data nejsou v pořádku.");
                }
            }
        });
    };

    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/Profile/${props.userId ? props.userId : ''}`,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        }, (data) => {
            if (data.firstName) setFirstName(data.firstName);
            if (data.lastName) setLastName(data.lastName);
            if (data.nickName) setNickName(data.nickName);
            if (data.regNumber) setRegNumber(data.regNumber);
            if (data.birthdate) setBirthday(data.birthdate);
            if (data.email) setEmail(data.email);
        }).catch(() => {
            alert.error("Nepovedlo se načíst profilové informace.", true);
        });
    }, []);

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column' }} autoComplete="off">
            {isLoading ? <ThreeDots color="#2e7d32" height={80} width={80} /> :
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="Jméno"
                                value={firstName}
                                onChange={(input) => { setFirstName(input.target.value); }}
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
                                value={lastName}
                                onChange={(input) => { setLastName(input.target.value); }}
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
                                value={nickName}
                                onChange={(input) => { setNickName(input.target.value); }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled
                                fullWidth
                                id="email"
                                label="E-mail"
                                value={email}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="regNumber"
                                label="ČSOB registrace"
                                name="regNumber"
                                autoComplete="family-name"
                                value={regNumber}
                                onChange={(input) => { setRegNumber(input.target.value); }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DatePicker
                                mask='__.__.____'
                                label="Datum narození"
                                openTo="day"
                                views={['year', 'month', 'day']}
                                value={birthday}
                                onChange={(input) => {
                                    try{
                                        setBirthday(new Date(input).toISOString());
                                    }
                                    catch(e){}
                                }}
                                renderInput={(params) => <TextField fullWidth {...params} />}
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
                </>}
        </Box>
    );
}

export default UpdateProfileForm;