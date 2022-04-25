import { Button, Card, CardMedia, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { memo, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import useAlertWrapper from "../../../hooks/use-alert";
import useAuth from "../../../hooks/use-auth";
import useHttp from "../../../hooks/use-http";
import AlertDialog from "../../UI/AlertDialog";
import FileDropzone from "../../UI/FileDropzone";
import ShowMapDialog from "./ShowMapDialog";

const UploadMapForm = ({ isUploaded, isCalibrated, raceId, onUpdate }) => {
    const { isLoading, sendRequest } = useHttp();
    const auth = useAuth();
    const [mapImage, setMapImage] = useState(null);
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [mapData, setMapData] = useState(null);
    const alert = useAlertWrapper();
    const [alertDialog, setAlertDialog] = useState(false);    
    const [alertDialogContent, setAlertDialogContent] = useState(null);    
    const [alertDialogConfirm, setAlertDialogConfirm] = useState(null);

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
        var confirm = () => () => {
            sendRequest({
                url: `https://localhost:5001/map/${raceId}`,
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${auth.token}` },
                responseType: 'empty'
            }).then((status) => {
                if(!status){
                    alert.success("Mapa byla smazána.");
                }
                onUpdate();
            });
            setAlertDialog(false);
        }
        setAlertDialogConfirm(confirm);
        setAlertDialogContent(<>Opravdu chcete smazat mapu?</>);
        setAlertDialog(true);        
    }

    useEffect(() => {
        if (isUploaded && mapImage == null) {
            sendRequest({
                url: `https://localhost:5001/map/image/${raceId}`,
                responseType: 'blob'
            }, (image) => { 
                setMapImage(image);
                sendRequest({
                    url: `https://localhost:5001/map/info/${raceId}`
                }, (data) => { setMapData({corners: data.position, image: URL.createObjectURL(image)}) })
                    .catch(() => { });
            
            }).catch(() => { });

            
        }
        else if (!isUploaded) {
            setMapImage(null);
        }
    }, [isUploaded]);
    
    if (isLoading) {
        return (
            <ThreeDots color="#2e7d32" height={80} width={80} />
        );
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
                        {mapImage &&
                            <a href={`https://localhost:5001/map/image/${raceId}`} target="_blank">
                                <CardMedia
                                    component="img"
                                    height="160"
                                    image={URL.createObjectURL(mapImage)} />
                            </a>
                        }
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 'auto' }}>
                        {isCalibrated &&
                            <Button
                                variant="outlined"
                                color="success"
                                sx={{ mb: 2, width: '100%' }}
                                onClick={() => { setOpenDialog(true) }}>Zobrazit na mapovém podkladu
                            </Button>}
                        <Button variant="outlined" color="primary" sx={{ mb: 2, width: '100%' }} onClick={() => { navigate(`/ucet/kalibrovat-mapu/${raceId}`) }}>Kalibrovat mapu</Button>
                        <Button variant="outlined" color="error" sx={{ width: '100%' }} onClick={handleDeleteMap}>Smazat mapu</Button>
                    </Box>
                </Grid>
            </Grid>
            <ShowMapDialog open={openDialog} onClose={() => { setOpenDialog(state => !state) }} data={mapData} />
            <AlertDialog open={alertDialog} close={() => {setAlertDialog(false)}} confirm={alertDialogConfirm} content={alertDialogContent} />
        </>
    );
}
export default memo(UploadMapForm);