import { Alert, Snackbar } from '@mui/material';
import React from 'react'

const AlertTemplate = ({ style, options, message, close }) => (
        <Alert variant="filled" style={style} severity={options.type} sx={{ width: '100%' }} onClose={close}>{message}</Alert>
)

export default AlertTemplate;