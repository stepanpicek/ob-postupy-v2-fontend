import { Toolbar, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import useWindowDimensions from '../../hooks/use-windows-dimensions';
import DashboardMenu from './DashboardMenu';
import TopMenu from './TopMenu';


const DashboardLayout = () => {
    const [isOpened, setIsOpened] = useState(false);
    const { width } = useWindowDimensions();
    const theme = useTheme();
    const sm = theme.breakpoints.values.sm;

    const openMenuHandler = () => {
        setIsOpened(state => !state);
    }

    useEffect(()=>{
        if(width > sm) setIsOpened(false);
    }, [width]);

    return (
        <Box sx={{ display: 'flex'}}>
            <TopMenu isToggled={true} onOpenMenu={openMenuHandler} />
            <DashboardMenu width={250} isToggled={width <= sm} isOpened={width <= sm ? isOpened : true}  onOpenMenu={openMenuHandler}/>
            <Box component="div" sx={{ flexGrow: 1, p: 3, overflow: 'auto', width: '100%' }}>
                <Toolbar />
                <Outlet />                
            </Box>
        </Box>);
}

export default DashboardLayout;