import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../../hooks/use-http";
import { animationActions } from "../../../store/animation";
import ColorPicker from "../animation/ColorPicker";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CreateIcon from '@mui/icons-material/Create';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BarChartIcon from '@mui/icons-material/BarChart';
import classes from './Competitor.module.css';
import { manualPathActions } from "../../../store/manual-path";
import FileDropzone from "../../UI/FileDropzone";
import GpxParser from "gpxparser";
import { uploadPathActions } from "../../../store/upload-path";
import { parseFIT, parseGPX } from "../../../services/parser";

const colorArray = [
    "#FF0000", "#0000FF", "#FFFF00", "#008000", "#F5A623", "#50E3C2", "#800080", "#7ED321", "#008080", "#D2691E", "#A9A9A9", "#EE82EE", "#00FA9A", "#000000"
];

const CompetitorControl = ({ competitor, initPlay }) => {
    const dispatch = useDispatch();
    const playAllTrigger = useSelector((state) => state.animation.playAllTrigger);
    const isAnimationOn = useSelector((state) => state.animation.isAnimationOn);
    const [isPlayed, setIsPlayed] = useState(false);
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const [color, setColor] = useState('#ff0000');
    const { isLoading, error, sendRequest } = useHttp();
    const isFirstRun = useRef(true);

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


    const handleUserPlay = () => {
        if(!isPlayed){
            sendRequest({ url: `https://localhost:44302/paths/result?id=${competitor.id}` }, (data) => {
                let playerColor = colorArray[(competitor.position - 1) % colorArray.length];
                dispatch(animationActions.addCompetitor(
                    {
                        id: competitor.id,
                        offset: 0,
                        color: playerColor,
                        name: `${competitor.person.firstName} ${competitor.person.lastName}`,
                        locations: data.locations.map((location) => [location.position.item1, location.position.item2])
                    }));
                setColor(playerColor);
            });
        }
        else{
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
        dispatch(manualPathActions.addName(`${competitor.person.firstName} ${competitor.person.lastName}`));
        dispatch(manualPathActions.open());
    }

    const handleOpenUploadDialog = () => {
        setOpenUploadDialog(true);
    }

    const handleCloseUploadDialog = () => {
        setOpenUploadDialog(false);
    }

    const handleUploadFile = async (files) => {
        let file = files[0];
        let extension = file.name.split('.').pop();
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const text = e.target.result;
          handleSetUploadPath(text, extension);
        };

        if(extension === 'FIT' || extension === 'fit'){
            reader.readAsArrayBuffer(file)
        }
        else{
            reader.readAsText(file);
        }
            
    }

    const handleSetUploadPath = (file, extension) => {
        let points = null;
        switch(extension){
            case 'gpx':
            case 'GPX':
                points = parseGPX(file);
                break;
            case 'fit':
            case 'FIT':
                parseFIT(file, data => {points = data;});
                break;
        }        
        handleCloseUploadDialog();        
        dispatch(animationActions.reset());
        if(points){
            dispatch(uploadPathActions.open(points));
        }
        else{
            //ERROR
        }
    }

    return (
        <Box sx={{ background: '#545454', m: '1px', px: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ flexGrow: 1, display: 'flex', mt: '5px' }}>

                    <p onClick={() => { setIsMenuOpened(state => !state) }} className={classes.competitorName}>
                        {competitor.position}. {competitor.person.firstName} {competitor.person.lastName}
                    </p>
                </Box>

                {isPlayed && <ColorPicker color={color} onChangeColor={handleChangeColor} />}
                {competitor.pathId == null && !isPlayed && <IconButton onClick={handleUserPlay} style={{ color: 'white' }}><PlayArrowIcon /></IconButton>}
                {competitor.pathId != null && !isPlayed && <IconButton onClick={handleUserPlay} color="success"><PlayArrowIcon /></IconButton>}
                {isPlayed && <IconButton onClick={handleUserPlay} color="error"><PlayArrowIcon /></IconButton>}
            </Box>
            {isMenuOpened &&
                <Box sx={{ height: 'auto', display: 'flex', flexDirection: 'column' }}>
                    {competitor.pathId == null &&
                        <>
                            <Button size="small" sx={{ color: 'white' }} startIcon={<CreateIcon />} onClick={handleManualPath}>Nakreslit trasu</Button>
                            <Button size="small" sx={{ color: 'white' }} startIcon={<MyLocationIcon />} onClick={handleOpenUploadDialog}>Nahrát trasu</Button>
                        </>
                    }
                    {competitor.pathId != null &&

                        <Button size="small" sx={{ color: 'white' }} startIcon={<VisibilityIcon />}>Zobrazit trasu</Button>
                    }
                    <Button size="small" sx={{ color: 'white' }} startIcon={<BarChartIcon />}>Zobrazit statistiky</Button>
                </Box>
            }
            <Dialog open={openUploadDialog} onClose={handleCloseUploadDialog}>
                <DialogTitle>Nahrát trasu pro {competitor.person.firstName} {competitor.person.lastName}</DialogTitle>
                <DialogContent>
                    <FileDropzone formats={"GPX, FIT"} onDrop={handleUploadFile}/>
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default CompetitorControl;