import ContentBox from "../../components/UI/ContentBox";
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import UpdateProfileForm from "../../components/dashboard/profile/UpdateProfileForm";
import ChangePasswordForm from "../../components/dashboard/profile/ChangePasswordForm";
import useAuth from "../../hooks/use-auth";
import useHttp from "../../hooks/use-http";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Profile = () => {
    const [isStravaAuth, setIsStravaAuth] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    const { isLoading, sendRequest } = useHttp();    

    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/strava`,
            headers: { 'Authorization': `Bearer ${auth.token}` }            
        }, (data) => {
            setIsStravaAuth(data.isAuth);
        }).catch((error) => {
        });
    }, []);

    const handleDeleteStravaAuth = () => {
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/strava`,
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${auth.token}` },
            responseType: 'empty'            
        })
        .then(() => {
            setIsStravaAuth(false);
        })
        .catch((error) => {
        });
    }

    return (
        <>
            <h1>Profil</h1>
            <ContentBox sx={{ mb: 2, mx: 2 }}>
                Základní údaje
                <UpdateProfileForm />
            </ContentBox>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <ContentBox sx={{ mb: 2, mx: 2 }}>
                        Změna hesla
                        <ChangePasswordForm />
                    </ContentBox>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ContentBox sx={{ mb: 2, mx: 2 }}>
                        {isStravaAuth &&
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                Váš účet je propojený se Stravou. Pokud chcete propojení zrušit, klikněte na následující tlačítko.
                                <Button variant="outlined" color="error" onClick={handleDeleteStravaAuth}>Zrušit propojení se Stravou</Button>       
                                <img src="/powerByStrava.png" className="img-fluid align-self-end" alt="Powered by Strava"></img>                       
                            </div> 
                        }   
                        {!isStravaAuth &&
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <div>Váš účet není propojený se Stravou. Pokud chcete svůj účet propojit se Stravou pro jednoduší nahrávání svých tras, 
                                    klikněte na následující tlačítko.</div>
                                <Button variant="outlined" color="success" onClick={() => {navigate("/ucet/strava")}}>Propojit se Stravou</Button>
                                <img src="/powerByStrava.png" className="img-fluid align-self-end" alt="Powered by Strava"></img>
                            </div>
                        }
                    </ContentBox>
                </Grid>
            </Grid>
        </>
    );
};

export default Profile;