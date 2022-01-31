import TopMenu from "./TopMenu";
import Box from '@mui/material/Box';
import { Toolbar} from "@mui/material";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return(
        <Box sx={{ display: 'flex' }}>
            <TopMenu />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>            
        </Box>
    );
};

export default MainLayout;