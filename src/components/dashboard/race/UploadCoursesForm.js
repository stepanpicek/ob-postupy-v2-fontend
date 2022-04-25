import { Button, Card, CardMedia, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import useAlertWrapper from "../../../hooks/use-alert";
import useAuth from "../../../hooks/use-auth";
import useHttp from "../../../hooks/use-http";
import AlertDialog from "../../UI/AlertDialog";
import FileDropzone from "../../UI/FileDropzone";
import CoursesToCategoriesDialog from "./CoursesToCategoriesDialog";

const UploadCoursesForm = ({ isUploaded, raceId, onUpdate }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const { isLoading, sendRequest } = useHttp();
    const [courseToCategory, setCourseToCategory] = useState(null);
    const auth = useAuth();
    const alert = useAlertWrapper();
    const [alertDialog, setAlertDialog] = useState(false);    
    const [alertDialogContent, setAlertDialogContent] = useState(null);    
    const [alertDialogConfirm, setAlertDialogConfirm] = useState(null);
    
    const handleCoursesUpload = (files) => {
        if (files.length == 1) {
            let formData = new FormData();
            formData.append('RaceKey', raceId);
            formData.append('File', files[0], files[0].name);

            sendRequest({
                url: `https://localhost:5001/course/`,
                method: 'POST',
                headers: { 'Authorization': `Bearer ${auth.token}` },
                body: formData,
                responseType: 'empty'
            }).then(() => {
                onUpdate();
            });
        }
    }

    const handleDeleteCourses = () => {
        var confirm = () => () => {
            sendRequest({
                url: `https://localhost:5001/course/${raceId}`,
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${auth.token}` },
                responseType: 'empty'
            }).then((status) => {
                if(!status){
                    alert.success("Tratě byly smazány.")
                }
                onUpdate();
            });
            setAlertDialog(false);
        }
        setAlertDialogConfirm(confirm);
        setAlertDialogContent(<>Opravdu chcete smazat tratě?</>);
        setAlertDialog(true);        
    }

    if (isLoading) {
        return (
            <ThreeDots color="#2e7d32" height={80} width={80} />
        );
    }

    if (!isUploaded) {
        return (
            <FileDropzone formats={"XML"} onDrop={handleCoursesUpload}/>
        );
    }

    const handleChangeCoursesToCategory = (data) => {
        sendRequest({
            url: `https://localhost:5001/course/course-category/`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'accept': '*/*', 'Authorization': `Bearer ${auth.token}` },
            body: {raceKey: raceId, courseCategories: data},
            responseType: 'empty'
        }).then(() => {
            onUpdate();
            setOpenDialog(false);
        });
    }

    const handleOpenChangeCoursesToCategory = () => {
        setOpenDialog(true);
        sendRequest({
            url: `https://localhost:5001/course/course-category/${raceId}`,
            headers: {'Authorization': `Bearer ${auth.token}` }
        }, (data) => {
            setCourseToCategory(data);
        });
    }


    return (
        <>
            <p>Tratě a kontroly jsou úspěšně nahrány a uloženy. Přejete si je upravit?</p>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
            }}
            >
                <Button variant="outlined" color="primary" sx={{ mr: 2 }} onClick={handleOpenChangeCoursesToCategory}>Přiřadit tratě ke kategoriím</Button>
                <Button variant="outlined" color="error" onClick={handleDeleteCourses}>Smazat tratě a kontroly</Button>
            </Box>
            <CoursesToCategoriesDialog open={openDialog} onChange={handleChangeCoursesToCategory} onClose={() => {setOpenDialog(state => !state)}} data={courseToCategory}/>            
            <AlertDialog open={alertDialog} close={() => {setAlertDialog(false)}} confirm={alertDialogConfirm} content={alertDialogContent} />
        </>
    );
}

export default UploadCoursesForm;