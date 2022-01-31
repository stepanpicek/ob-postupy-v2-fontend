import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Chip } from "@mui/material";

const UploadedAlert = ({ isSuccessful, text }) => {
    return (
        <Chip icon={isSuccessful ? <CheckIcon /> : <CloseIcon />} label={text} variant="outlined" color={isSuccessful ? "success" : "error"} />
    );
}

export default UploadedAlert;