import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Chip } from "@mui/material";

const UploadedAlert = ({ type, text }) => {
    let typeIcon;
    switch (type) {
        case "success":
            typeIcon = <CheckIcon />;
            break;
        case "error":  
            typeIcon = <CloseIcon />;
            break;
        case "warning":            
            typeIcon = <NotificationImportantIcon />;
            break;
    }

    return (
        <Chip icon={typeIcon} label={text} variant="outlined" color={type} />
    );
}

export default UploadedAlert;