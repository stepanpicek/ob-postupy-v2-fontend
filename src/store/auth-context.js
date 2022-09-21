import jwtDecode from 'jwt-decode';
import { useState, useEffect, useCallback, createContext } from 'react';

let logoutTimer;
const TOKEN_NAME = 'obpostupy.token';

const AuthContext = createContext({
    token: '',
    id: null,
    roles: [],
    isLoggedIn: false,  
    login: (token) => { },
    logout: () => { },
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = Date.parse(expirationTime);
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
            id: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
        };
    }
    return null;
};

export const AuthContextProvider = (props) => {    
        
    const [token, setToken] = useState(null);
    const [roles, setRoles] = useState(null);
    const [id, setId] = useState(null);

    const userIsLoggedIn = !!token;
    
    useEffect(() => {
        const tokenData = retrieveStoredToken();
        if (tokenData) {
            setToken(tokenData.token);
            setRoles(tokenData.roles);
            setId(tokenData.id);
        }
    }, []);

    const logoutHandler = useCallback(() => {
        setToken(null);
        setRoles(null);
        setId(null);
        localStorage.removeItem(TOKEN_NAME);

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token) => {
        localStorage.setItem(TOKEN_NAME, token);        
        setToken(token);
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        setRoles(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
        setId(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
        const remainingTime = calculateRemainingTime(decodedToken["expiration"]);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    const contextValue = {
        token: token,
        roles: roles,
        id: id,
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