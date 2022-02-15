import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {manualPathActions} from '../../../store/manual-path'
import { Box } from "@mui/system";

const ManualPathControl = () => {
    const dispatch = useDispatch();
    const name = useSelector((state) => state.manualPath.name);
    
    const handleGoBack = () => {
        dispatch(manualPathActions.close());
    }

    const handleRemoveLastPoint = () =>{
        dispatch(manualPathActions.removeLastPoint());
    }

    const handleRemoveAllPoints = () =>{
        dispatch(manualPathActions.removeAllPoints());
    }

    return(
        <Box sx={{p:3}}>
            <Button sx={{color: 'white'}} startIcon={<ArrowCircleLeftIcon />} onClick={handleGoBack}>Vrátit se zpět</Button>
            <div>Nakreslení trasy pro:</div>
            <Typography variant="h6">{name}</Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button size='small' sx={{color: 'white'}} onClick={handleRemoveLastPoint}>Smazat poslední bod</Button>
                <Button size='small' sx={{color: 'white'}} onClick={handleRemoveAllPoints}>Smazat celou trasu</Button>
            </Box>
        </Box>
    );
}

export default ManualPathControl;