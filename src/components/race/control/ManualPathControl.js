import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { manualPathActions } from '../../../store/manual-path'
import { Box } from "@mui/system";
import useHttp from "../../../hooks/use-http";
import useAlertWrapper from "../../../hooks/use-alert";

const ManualPathControl = () => {
    const dispatch = useDispatch();
    const name = useSelector((state) => state.manualPath.name);
    const path = useSelector((state) => state.manualPath.points);
    const isEnd = useSelector((state) => state.manualPath.isEnd);
    const id = useSelector((state) => state.manualPath.id);
    const { isLoading, sendRequest } = useHttp();
    const alert = useAlertWrapper();

    const handleGoBack = () => {
        dispatch(manualPathActions.close());
    }

    const handleRemoveLastPoint = () => {
        dispatch(manualPathActions.removeLastPoint());
    }

    const handleRemoveAllPoints = () => {
        dispatch(manualPathActions.removeAllPoints());
    }

    const handleSavePath = () => {
        if (!isEnd) return;

        let splitPaths = [];
        let splits = [];
        let i = 0;
        path.forEach((position, index) => {
            splits.push({ lat: position.center[0], lon: position.center[1] });
            if (position.isControl && index != 0 && index != path.length - 1) {
                splitPaths.push({ order: i++, positions: splits });
                splits = [];
                splits.push({ lat: position.center[0], lon: position.center[1] })
            }
        });
        splitPaths.push({ order: i++, positions: splits });
        console.log(splitPaths);
        sendRequest(
            {
                url: `${process.env.REACT_APP_BACKEND_URI}/path/draw`,
                method: 'POST',
                body: {
                    personResultId: id,
                    splitPaths: splitPaths
                },
                responseType: 'empty',
                headers: { 'Content-Type': 'application/json', 'accept': '*/*' }
            })
            .then((status) => {
                if(!status){
                    alert.success("Trasa byla uložena.");
                }
                handleGoBack();
            });
    }

    return (
        <Box sx={{ p: 3 }}>
            <Button sx={{ color: 'white' }} startIcon={<ArrowCircleLeftIcon />} onClick={handleGoBack}>Vrátit se zpět</Button>
            <div>Nakreslení trasy pro:</div>
            <Typography variant="h6">{name}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='small' sx={{ color: 'white' }} onClick={handleRemoveLastPoint}>Smazat poslední bod</Button>
                <Button size='small' sx={{ color: 'white' }} onClick={handleRemoveAllPoints}>Smazat celou trasu</Button>
            </Box>
            <Button variant="contained" color="success" sx={{ marginLeft: 'auto' }} onClick={handleSavePath} disabled={!isEnd}>Uložit trasu</Button>
        </Box>
    );
}

export default ManualPathControl;