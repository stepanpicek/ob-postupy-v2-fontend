import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Chip } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';

const RACE_ITEMS = [
    {title: 'Veřejné závody', url: 'verejne-zavody'},
    {title: 'Moje závody', url: 'moje-zavody'},
    {title: 'Vytvoření závodu', url: 'vytvorit-zavod'},
];

const USER_ITEMS = [
    {title: 'Profil', url: 'profil'},
    {title: 'Strava', url: 'strava'},
];

const ADMIN_ITEMS = [
    {title: 'Uživatelé', url: 'uzivatele'},
    {title: 'Všechny závody', url: 'vsechny-zavody'},
    {title: 'Nastavení', url: 'nastaveni'},
];
const DashboardMenu = ({width, isToggled, isOpened, onOpenMenu}) => {
    const navigate = useNavigate();

    return (
        <Drawer
            sx={{
                width: width,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: width, boxSizing: 'border-box' },
            }}
            variant={isToggled ? "temporary" : "persistent" }
            anchor="left"
            open={isOpened}
            onClose={onOpenMenu}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {RACE_ITEMS.map((item, index) => (
                        <ListItem button key={item.title} onClick={() => navigate(item.url)}>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {USER_ITEMS.map((item, index) => (
                        <ListItem button key={item.title} onClick={() => navigate(item.url)}>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    ))}
                </List> 

                <Divider><Chip label="Administrace" icon={<AdminPanelSettingsIcon />} variant='outlined'/></Divider>                
                <List>
                    {ADMIN_ITEMS.map((item, index) => (
                        <ListItem button key={item.title} onClick={() => navigate(item.url)}>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>);
}

export default DashboardMenu;