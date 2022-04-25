import React from 'react';
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import AlertTemplate from './AlertTemplate';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#313131'
        },
        secondary: {
            main: '#1976d2'
        }
    }
});

const MainTheme = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <AlertProvider template={AlertTemplate} position={positions.MIDDLE_LEFT}>
                {children}
            </AlertProvider>
        </ThemeProvider>
    );
}

export default MainTheme;