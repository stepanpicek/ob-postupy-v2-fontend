import ContentBox from "../../components/UI/ContentBox";
import React from 'react';
import Grid from '@mui/material/Grid';
import UpdateProfileForm from "../../components/dashboard/profile/UpdateProfileForm";
import ChangePasswordForm from "../../components/dashboard/profile/ChangePasswordForm";

const Profile = () => {
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
                        Propojení se Stravou
                    </ContentBox>
                </Grid>
            </Grid>
        </>
    );
};

export default Profile;