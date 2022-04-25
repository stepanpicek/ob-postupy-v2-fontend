import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../../hooks/use-http";
import { animationActions } from "../../../store/animation";
import ColorPicker from "../animation/ColorPicker";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CreateIcon from '@mui/icons-material/Create';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import classes from './Competitor.module.css';
import { manualPathActions } from "../../../store/manual-path";
import FileDropzone from "../../UI/FileDropzone";
import { uploadPathActions } from "../../../store/upload-path";
import { parseFIT, parseGPX } from "../../../services/parser";
import { showPathActions } from "../../../store/show-path";
import useAuth from "../../../hooks/use-auth";
import useAlertWrapper from "../../../hooks/use-alert";
import { DatePicker } from "@mui/lab";

const colorArray = [
    "#FF0000", "#0000FF", "#FFFF00", "#008000", "#F5A623", "#50E3C2", "#800080", "#7ED321", "#008080", "#D2691E", "#A9A9A9", "#EE82EE", "#00FA9A", "#000000"
];

const CompetitorControl = ({ competitor, initPlay }) => {
    const dispatch = useDispatch();
    const playAllTrigger = useSelector((state) => state.animation.playAllTrigger);
    const isAnimationOn = useSelector((state) => state.animation.isAnimationOn);
    const shownPaths = useSelector((state) => state.showPath.paths);
    const [isPlayed, setIsPlayed] = useState(false);
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const [color, setColor] = useState('#ff0000');
    const { isLoading, sendRequest } = useHttp();
    const isFirstRun = useRef(true);
    const auth = useAuth();
    const [isStravaAuth, setIsStravaAuth] = useState(false);
    const [stravaDate, setStravaDate] = useState(null);
    const [stravaActivities, setStravaActivities] = useState([]);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        if (isPlayed && isAnimationOn) {
            handleUserPlay();
        }
        if (!isPlayed && !isAnimationOn) {
            handleUserPlay();
        }
    }, [playAllTrigger]);

    const isPathShown = () => {
        var result = shownPaths.filter(path => path.id === competitor.id);
        return result && result.length > 0;
    };

    useEffect(() => {
        if (!openUploadDialog) return;

        sendRequest({
            url: `https://localhost:5001/strava/`,
            headers: { 'Authorization': `Bearer ${auth.token}` }
        }, (data) => {
            setIsStravaAuth(data.isAuth);
            if (data.isAuth) {
                setStravaDate(competitor.startTime);
            }
        });
    }, [openUploadDialog]);

    useEffect(() => {
        if (!stravaDate) return;

        sendRequest({
            url: `https://localhost:5001/strava/activities/${stravaDate}`,
            headers: { 'Authorization': `Bearer ${auth.token}` }
        }, (data) => {
            setStravaActivities(data.activities);
        });
    }, [stravaDate]);

    const handleUserPlay = () => {
        if (!isPlayed) {
            sendRequest({ url: `https://localhost:5001/path/by-result/${competitor.id}` }, (data) => {
                let playerColor = colorArray[(competitor.position - 1) % colorArray.length];
                dispatch(animationActions.addCompetitor(
                    {
                        id: competitor.id,
                        offset: 0,
                        color: playerColor,
                        name: `${competitor.firstName} ${competitor.lastName}`,
                        locations: data.locations
                    }));
                setColor(playerColor);
            });
        }
        else {
            dispatch(animationActions.addCompetitor(
                {
                    id: competitor.id,
                }));
        }
        setIsPlayed((state) => !state);
    }

    const handleChangeColor = (color) => {
        setColor(color.hex);
        dispatch(animationActions.changeSnakeColor({ id: competitor.id, color: color.hex }));
    }

    const handleManualPath = () => {
        dispatch(animationActions.reset());
        dispatch(manualPathActions.open({ id: competitor.id, name: `${competitor.firstName} ${competitor.lastName}` }));
    }

    const handleOpenUploadDialog = () => {
        setOpenUploadDialog(true);
    }

    const handleCloseUploadDialog = () => {
        setOpenUploadDialog(false);
    }

    const handleUploadStravaActivity = (id) => {
        sendRequest({
            url: `https://localhost:5001/strava/activity/${id}`,
            headers: { 'Authorization': `Bearer ${auth.token}` }
        }, (data) => {
            let points = data.locations.map(l => [l.lat, l.lon, l.timestamp]);
            handleCloseUploadDialog();
            dispatch(animationActions.reset());
            dispatch(uploadPathActions.open({ path: points, id: competitor.id }));
        });
    }

    const handleUploadFile = async (files) => {
        let file = files[0];
        let extension = file.name.split('.').pop();
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = e.target.result;
            handleSetUploadPath(text, extension);
        };

        if (extension === 'FIT' || extension === 'fit') {
            reader.readAsArrayBuffer(file)
        }
        else {
            reader.readAsText(file);
        }

    }

    const handleSetUploadPath = (file, extension) => {
        let points = null;
        switch (extension) {
            case 'gpx':
            case 'GPX':
                points = parseGPX(file);
                break;
            case 'fit':
            case 'FIT':
                parseFIT(file, data => { points = data; });
                break;
        }
        handleCloseUploadDialog();
        dispatch(animationActions.reset());
        if (points) {
            dispatch(uploadPathActions.open({ path: points, id: competitor.id }));
        }
        else {
            //ERROR
        }
    }

    const handleViewPath = () => {
        if (isPathShown()) {
            dispatch(showPathActions.remove(competitor.id))
        }
        else {
            sendRequest({ url: `https://localhost:5001/path/with-speeds/${competitor.id}` }, (data) => {
                dispatch(showPathActions.add(
                    {
                        id: competitor.id,
                        label: `${competitor.firstName} ${competitor.lastName}`,
                        locations: data.locations.map((location, index) => [...location, data.speed[index] ?? 0])
                    }
                ));
            });
        }
    }

    return (
        <Box sx={{ background: '#545454', m: '1px', px: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ flexGrow: 1, display: 'flex', mt: '5px' }}>

                    <p onClick={() => { setIsMenuOpened(state => !state) }} className={classes.competitorName}>
                        {competitor.status == "ok" ? `${competitor.position}.` : '  '} {competitor.firstName} {competitor.lastName}
                    </p>
                </Box>

                {isPlayed && <ColorPicker color={color} onChangeColor={handleChangeColor} />}
                {!competitor.isPathUploaded && !isPlayed && <IconButton onClick={handleUserPlay} style={{ color: 'white' }}><PlayArrowIcon /></IconButton>}
                {competitor.isPathUploaded && !isPlayed && <IconButton onClick={handleUserPlay} color="success"><PlayArrowIcon /></IconButton>}
                {isPlayed && <IconButton onClick={handleUserPlay} color="error"><PlayArrowIcon /></IconButton>}
            </Box>
            {isMenuOpened &&
                <Box sx={{ height: 'auto', display: 'flex', flexDirection: 'column' }}>
                    {!competitor.isPathUploaded &&
                        <>
                            <Button size="small" sx={{ color: 'white' }} startIcon={<CreateIcon />} onClick={handleManualPath}>Nakreslit trasu</Button>
                            <Button size="small" sx={{ color: 'white' }} startIcon={<MyLocationIcon />} onClick={handleOpenUploadDialog}>Nahrát trasu</Button>
                        </>
                    }
                    {competitor.isPathUploaded &&

                        <Button size="small" sx={{ color: 'white' }} startIcon={isPathShown() ? <VisibilityOffIcon /> : <VisibilityIcon />} onClick={handleViewPath}>
                            {isPathShown() ? "Skrýt trasu" : "Zobrazit trasu"}
                        </Button>
                    }
                    {
                        /*
                        <Button size="small" sx={{ color: 'white' }} startIcon={<BarChartIcon />}>Zobrazit statistiky</Button>
                        */
                    }
                </Box>
            }
            <Dialog open={openUploadDialog} onClose={handleCloseUploadDialog}>
                <DialogTitle>Nahrát trasu pro {competitor.firstName} {competitor.lastName}</DialogTitle>
                <DialogContent>
                    <FileDropzone formats={"GPX, FIT"} onDrop={handleUploadFile} />
                    <hr></hr>
                    <div className="d-flex flex-column justify-content-center mt-4">
                        {!isStravaAuth ? <p>Pro nahrání trasy ze Stravy se prosím přihlašte a v profilu propojte svůj účet se Stravou.</p> :
                            <>
                                <DatePicker
                                    mask='__.__.____'
                                    label="Datum aktivity"
                                    openTo="day"
                                    views={['year', 'month', 'day']}
                                    value={stravaDate}
                                    onChange={(newValue) => {
                                        setStravaDate(new Date(newValue).toDateString());
                                    }}
                                    renderInput={(params) => <TextField required fullWidth {...params} />}
                                />
                                <table className="table table-sm mt-4">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-3">Název</th>
                                            <th scope="col" className="px-3">Vzdálenost</th>
                                            <th scope="col" className="px-3">Čas</th>
                                            <th scope="col" className="px-3"></th>
                                        </tr>
                                    </thead>
                                    {!stravaActivities || stravaActivities.length == 0 ?
                                        <tr>
                                            <td colSpan={4}>V tento den není na Stravě žádná aktivita.</td>
                                        </tr> :
                                        stravaActivities?.map((activity) => {
                                            return (<tr>
                                                <td className="px-3">{activity.name}</td>
                                                <td className="px-3">{activity.distance}</td>
                                                <td className="px-3">{activity.time}</td>
                                                <td className="px-3">
                                                    <Button
                                                        color="success"
                                                        variant="outlined"
                                                        onClick={() => { handleUploadStravaActivity(activity.id) }}>
                                                        Nahrát ze Stravy
                                                    </Button>
                                                </td>
                                            </tr>)
                                        })}
                                </table>

                            </>}

                        <img src="/powerByStrava.png" className="align-self-end" alt="Powered by Strava"></img>
                    </div>
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default CompetitorControl;