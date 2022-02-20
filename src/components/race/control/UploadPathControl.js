import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Box } from "@mui/system";
import { uploadPathActions } from "../../../store/upload-path";
import { Form } from "react-bootstrap";

const UploadPathControl = () => {
    const dispatch = useDispatch();
    const path = useSelector((state) => state.uploadPath.path);
    const startOffset = useSelector((state) => state.uploadPath.startOffset);
    const endOffset = useSelector((state) => state.uploadPath.endOffset);
    const name = useSelector((state) => state.uploadPath.name);
    const id = useSelector((state) => state.uploadPath.id);
    
    const handleChangeStartOffset = (event) => {
        dispatch(uploadPathActions.changeStartOffset(event.target.value));
    }

    const handleChangeEndOffset = (event) => {
        dispatch(uploadPathActions.changeEndOffset(event.target.value));
    }

    const handleGoBack = () => {
        dispatch(uploadPathActions.close());
    }
    return(
        <Box sx={{p:3}}>
            <Button sx={{color: 'white'}} startIcon={<ArrowCircleLeftIcon />} onClick={handleGoBack}>Vrátit se zpět</Button>
            <div>Úprava trasy pro:</div>
            <Typography variant="h6">{name}</Typography>

            <div style={{ display: 'flex' }}>Offset od startu: </div>
            <Form.Range value={startOffset} min={0} max={path.length} onChange={handleChangeStartOffset} />

            <div style={{ display: 'flex' }}>Offset od konce: </div>
            <Form.Range value={endOffset} min={0} max={path.length} onChange={handleChangeEndOffset} />
        </Box>
    );
}

export default UploadPathControl;