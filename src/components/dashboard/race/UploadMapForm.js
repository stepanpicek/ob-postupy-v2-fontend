import { Button, Card, CardMedia, Grid } from "@mui/material";
import { Box } from "@mui/system";
import FileDropzone from "../../UI/FileDropzone";

const UploadMapForm = ({ isUploaded, isCalibrated, raceId }) => {
    if (!isUploaded) {
        return (
            <FileDropzone formats={"KMZ, KML, JPG nebo PNG"} />
        );
    }

    return (
        <>
            <Grid container sx={{ p: 3,  mt:2 }}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="160"
                            image="https://web.williams.edu/Biology/Faculty_Staff/hwilliams/Orienteering/Images/map.gif" />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 'auto'}}>
                        {isCalibrated && <Button variant="outlined" color="success" sx={{mb:2, width: '100%'}} >Zobrazit na mapovém podkladu</Button>}
                        <Button variant="outlined" color="primary" sx={{mb:2, width: '100%'}}>Kalibrovat mapu</Button>
                        <Button variant="outlined" color="error" sx={{ width: '100%' }}>Smazat mapu</Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default UploadMapForm;