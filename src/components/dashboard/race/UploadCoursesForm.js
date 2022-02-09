import { Button, Card, CardMedia, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import FileDropzone from "../../UI/FileDropzone";
import CoursesToCategoriesDialog from "./CoursesToCategoriesDialog";

const UploadCoursesForm = ({ isUploaded, raceId }) => {
    const [openDialog, setOpenDialog] = useState(false);

    if (!isUploaded) {
        return (
            <FileDropzone formats={"XML"} />
        );
    }

    const handleChangeCoursesToCategory = () => {

    }

    return (
        <>
            <p>Tratě a kontroly jsou úspěšně nahrány a uloženy. Přejete si je upravit?</p>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
            }}
            >
                <Button variant="outlined" color="primary" sx={{ mr: 2 }} onClick={() => {setOpenDialog(state => !state)}}>Přiřadit tratě ke kategoriím</Button>
                <Button variant="outlined" color="error">Smazat tratě a kontroly</Button>
            </Box>
            <CoursesToCategoriesDialog open={openDialog} onChange={handleChangeCoursesToCategory} onClose={() => {setOpenDialog(state => !state)}} />
        </>
    );
}

export default UploadCoursesForm;