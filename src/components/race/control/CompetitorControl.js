import { Box, Button, IconButton } from "@mui/material";
import { useState } from "react";
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


const CompetitorControl = ({ competitor }) => {
    const dispatch = useDispatch();
    const [isPlayed, setIsPlayed] = useState(false);
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [color, setColor] = useState('#ff0000');
    const { isLoading, error, sendRequest } = useHttp();

    const handleUserPlay = () => {
        sendRequest({ url: `https://localhost:44302/paths/result?id=${competitor.id}` }, (data) => {
            dispatch(animationActions.addCompetitor(
                {
                    id: competitor.id,
                    offset: 0,
                    color: color,
                    name: `${competitor.person.firstName} ${competitor.person.lastName}`,
                    locations: data.locations.map((location) => [location.position.item1, location.position.item2])
                }));
            setIsPlayed((state) => !state);
        });
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
                            <Button size="small" sx={{ color: 'white' }} startIcon={<MyLocationIcon />}>Nahrát trasu</Button>
                        </>
                    }
                    {competitor.pathId != null &&

                        <Button size="small" sx={{ color: 'white' }} startIcon={<VisibilityIcon />}>Zobrazit trasu</Button>
                    }
                    <Button size="small" sx={{ color: 'white' }} startIcon={<BarChartIcon />}>Zobrazit statistiky</Button>
                </Box>
            }
        </Box>
    );
}

export default CompetitorControl;