import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import classes from './TopMenu.module.css';

const TopMenu = (props) => {
    const auth = true;
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const AuthMenu =
        <>
            <Button color="inherit" onClick={handleMenu} aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" startIcon={<AccountCircle />}>Můj účet</Button>

            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { navigate("/ucet") }}>Profil</MenuItem>
                <MenuItem onClick={() => { }}>Moje závody</MenuItem>
                <MenuItem onClick={() => { }}>Odhlásit se</MenuItem>
            </Menu>
        </>;

    const NonAuthMenu =
        <>
            <Button color="inherit" startIcon={<LoginIcon />} onClick={() => { navigate("/prihlasit") }}>Přihlásit se</Button>
        </>;

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                {props.isToggled &&
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={props.onOpenMenu}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <NavLink className={classes.topLink} to="/" >OB Postupy</NavLink>
                </Typography>
                {auth && AuthMenu}
                {!auth && NonAuthMenu}
                <Button color="inherit" startIcon={<InfoIcon />}>Info</Button>
            </Toolbar>
        </AppBar>
    );
}

export default TopMenu;