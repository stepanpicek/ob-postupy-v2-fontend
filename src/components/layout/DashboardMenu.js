import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { Chip, ListItemButton, ListItemIcon } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useLocation, useNavigate } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import useAuth from '../../hooks/use-auth';

const listButtonStyle = {
    mx: 2,
    my: 1,
    '&:hover': {
        borderRadius: '5px',
        color: '#f1f1f1',
        background: 'rgb(55, 55, 55)'
    },
    '&.Mui-selected:hover': {
        borderRadius: '5px',
        background: '#2e7d32'
    },
    '&.Mui-selected': {
        borderRadius: '5px',
        background: '#2e7d32'
    },
};

const MENU_ITEMS = [
    { title: 'Nástěnka', url: '/ucet', icon: <DashboardIcon /> },
    { title: 'Moje závody', url: '/ucet/moje-zavody', icon: <EventIcon /> },
    { title: 'Vytvoření závodu', url: '/ucet/vytvorit-zavod', icon: <AddBoxIcon /> },
    { title: 'Profil', url: '/ucet/profil', icon: <PersonIcon /> },
];

const ADMIN_ITEMS = [
    { title: 'Uživatelé', url: '/ucet/uzivatele', icon: <PeopleIcon /> },
    { title: 'Všechny závody', url: '/ucet/vsechny-zavody', icon: <CalendarTodayIcon /> },
    { title: 'Nastavení', url: '/ucet/nastaveni', icon: <SettingsIcon /> },
];
const DashboardMenu = ({ width, isToggled, isOpened, onOpenMenu }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    return (
        <Drawer
            sx={{
                width: width,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: width, boxSizing: 'border-box' }
            }}
            variant={isToggled ? "temporary" : "persistent"}
            anchor="left"
            open={isOpened}
            onClose={onOpenMenu}
        >
            <Toolbar />
            <Box sx={(theme) => ({
                overflow: 'auto',
                height: '100%',
                backgroundColor:
                    theme.palette.primary.main,
                color: 'white'
            })}>
                <List sx={{ mt: 3 }}>
                    {MENU_ITEMS.map((item, index) => (
                        <ListItemButton key={item.title} selected={item.url === location.pathname} onClick={() => navigate(item.url)} sx={{ ...listButtonStyle }}>
                            <ListItemIcon sx={{ color: 'white' }} >{item.icon}</ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    ))}
                </List>
                {((Array.isArray(auth.roles) && auth.roles.includes("Avast")) || auth.roles == "Admin") && <>
                    <Divider><Chip label="Administrace" icon={<AdminPanelSettingsIcon />} variant='outlined' sx={{ color: 'white' }} /></Divider>
                    <List>
                        {ADMIN_ITEMS.map((item, index) => (
                            <ListItemButton key={item.title} selected={item.url === location.pathname} onClick={() => navigate(item.url)} sx={{ ...listButtonStyle }}>
                                <ListItemIcon sx={{ color: 'white' }} >{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        ))}
                    </List>
                </>}
            </Box>
        </Drawer>);
}

export default DashboardMenu;