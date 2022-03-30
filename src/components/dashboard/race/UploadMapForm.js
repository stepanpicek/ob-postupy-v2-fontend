import { Button, Card, CardMedia, Grid } from "@mui/material";
import { Box } from "@mui/system";
import useAuth from "../../../hooks/use-auth";
import useHttp from "../../../hooks/use-http";
import FileDropzone from "../../UI/FileDropzone";

const UploadMapForm = ({ isUploaded, isCalibrated, raceId, onUpdate }) => {
    const { isLoading, error, sendRequest } = useHttp();
    const auth = useAuth();

    const handleMapUpload = (files) => {
        if (files.length == 1) {
            let formData = new FormData();
            formData.append('RaceKey', raceId);
            formData.append('File', files[0], files[0].name);

            sendRequest({
                url: `https://localhost:5001/map/`,
                method: 'POST',
                headers: { 'Authorization': `Bearer ${auth.token}` },
                body: formData,
                responseType: 'empty'
            }).then(() => {
                onUpdate();
            });
        }
    }

    const handleDeleteMap = () => {
        sendRequest({
            url: `https://localhost:5001/map/${raceId}`,
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${auth.token}` },
            responseType: 'empty'
        }).then(() => {
            onUpdate();
        });
    }


    if (!isUploaded) {
        return (
            <FileDropzone formats={"KMZ, KML, JPG nebo PNG"} onDrop={handleMapUpload} />
        );
    }

    return (
        <>
            <Grid container sx={{ p: 3, mt: 2 }}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="160"
                            image={`https://localhost:5001/map/image/${raceId}`} />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 'auto' }}>
                        {isCalibrated && <Button variant="outlined" color="success" sx={{ mb: 2, width: '100%' }} >Zobrazit na mapovém podkladu</Button>}
                        <Button variant="outlined" color="primary" sx={{ mb: 2, width: '100%' }}>Kalibrovat mapu</Button>
                        <Button variant="outlined" color="error" sx={{ width: '100%' }} onClick={handleDeleteMap}>Smazat mapu</Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default UploadMapForm;