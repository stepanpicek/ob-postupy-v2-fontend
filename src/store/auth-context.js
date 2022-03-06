import jwtDecode from 'jwt-decode';
import { useState, useEffect, useCallback, createContext } from 'react';

let logoutTimer;
const TOKEN_NAME = 'obpostupy.token';

const AuthContext = createContext({
    token: '',
    roles: [],
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem(TOKEN_NAME);
    if (storedToken) {
        const decodedToken = jwtDecode(storedToken);
        const remainingTime = calculateRemainingTime(decodedToken["expiration"]);
        if (remainingTime <= 3600) {
            localStorage.removeItem(TOKEN_NAME);
            return null;
        }
        return {
            token: storedToken,
            roles: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
            duration: remainingTime,
        };
    }
    return null;
};

export const AuthContextProvider = (props) => {
    
    const tokenData = retrieveStoredToken();
    let initialToken;
    let rolesToken;
    if (tokenData) {
        initialToken = tokenData.token;
        rolesToken = tokenData.roles;
    }
    
    const [token, setToken] = useState(initialToken);
    const [roles, setRoles] = useState(rolesToken);

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        setRoles(null);
        localStorage.removeItem(TOKEN_NAME);

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem(TOKEN_NAME, token);
        const decodedToken = jwtDecode(token);
        setRoles(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
        const remainingTime = calculateRemainingTime(decodedToken["expiration"]);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    const contextValue = {
        token: token,
        roles: roles,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;