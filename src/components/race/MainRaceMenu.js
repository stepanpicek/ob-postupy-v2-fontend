import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import CategoriesControl from './control/CategoriesControl';
import SettingsControl from './control/SettingsControl';
import TabPanel from '../UI/TabPanel';
import { useSelector } from 'react-redux';
import ManualPathControl from './control/ManualPathControl';

const MainRaceMenu = ({ width, isSmall, isOpened, onOpenMenu }) => {
    const [value, setValue] = useState(0);
    const isCalibration = useSelector((state) => state.manualPath.isOpened);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Drawer
            sx={{
                width: width,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: width, boxSizing: 'border-box' }
            }}
            variant={isSmall ? "temporary" : "persistent"}
            anchor="left"
            open={isOpened}
            onClose={onOpenMenu}
        >
            <Toolbar />
            <Box sx={(theme) => ({
                overflow: 'auto',
                height: '100%',
                width: '100%',
                backgroundColor:
                    theme.palette.primary.main,
                color: 'white'
            })}>
                <div style={{ display: !isCalibration ? 'none' : 'block' }}>
                    <ManualPathControl />
                </div>
                {!isCalibration &&
                    <>
                        <Tabs value={value} onChange={handleChange} variant="fullWidth" textColor="secondary" >
                            <Tab icon={<DirectionsRunIcon />} label="Závodníci" />
                            <Tab icon={<SettingsIcon />} label="Nastavení" />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <CategoriesControl />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <SettingsControl />
                        </TabPanel>
                    </>
                }
            </Box>
        </Drawer>);
}

export default MainRaceMenu;