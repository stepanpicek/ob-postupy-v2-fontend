import React from 'react';
import { useSearchParams } from "react-router-dom";

const PasswordResetConfirm = () => {
    let [searchParams, setSearchParams] = useSearchParams();


    return (
        <h1>Password reset confirm: email={searchParams.get("email")}, token={searchParams.get("token")}</h1>
    );
};

export default PasswordResetConfirm;