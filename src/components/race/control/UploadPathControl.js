import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Box } from "@mui/system";
import { uploadPathActions } from "../../../store/upload-path";
import { Form } from "react-bootstrap";
import useHttp from "../../../hooks/use-http";
import { ThreeDots } from "react-loader-spinner";
import useAlertWrapper from "../../../hooks/use-alert";

const UploadPathControl = () => {
    const dispatch = useDispatch();
    const path = useSelector((state) => state.uploadPath.path);
    const startOffset = useSelector((state) => state.uploadPath.startOffset);
    const endOffset = useSelector((state) => state.uploadPath.endOffset);
    const name = useSelector((state) => state.uploadPath.name);
    const id = useSelector((state) => state.uploadPath.id);
    const { isLoading, sendRequest } = useHttp();
    const alert = useAlertWrapper();

    const handleChangeStartOffset = (event) => {
        dispatch(uploadPathActions.changeStartOffset(event.target.value));
    }

    const handleChangeEndOffset = (event) => {
        dispatch(uploadPathActions.changeEndOffset(event.target.value));
    }

    const handleGoBack = () => {
        dispatch(uploadPathActions.close());
    }

    const handleSavePath = () => {
        let pathForUpload = path.slice(startOffset, path.length - endOffset).map((position) => {
            return {
                lat: position[0],
                lon: position[1],
                timestamp: position[2]
            };
        });

        sendRequest({ url: `https://localhost:5001/path/upload`, method: 'POST', body: {
            personResultId: id,
            path: pathForUpload
        }, responseType: 'empty', 
        headers: { 'Content-Type': 'application/json', 'accept': '*/*' } })
        .then((status) => {
            if(!status){
                alert.success("Trasa byla uložena.");
            }
            handleGoBack();
        });
    }

    if (isLoading) {
        return (
            <ThreeDots color="#2e7d32" height={80} width={80} />
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Button sx={{ color: 'white' }} startIcon={<ArrowCircleLeftIcon />} onClick={handleGoBack}>Vrátit se zpět</Button>
            <div>Úprava trasy pro:</div>
            <Typography variant="h6">{name}</Typography>

            <div style={{ display: 'flex' }}>Offset od startu: </div>
            <Form.Range value={startOffset} min={0} max={path.length} onChange={handleChangeStartOffset} />

            <div style={{ display: 'flex' }}>Offset od konce: </div>
            <Form.Range value={endOffset} min={0} max={path.length} onChange={handleChangeEndOffset} />

            <Button variant="contained" color="success" sx={{ marginLeft: 'auto' }} onClick={handleSavePath}>Uložit trasu</Button>
        </Box>
    );
}

export default UploadPathControl;