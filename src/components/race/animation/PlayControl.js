import { Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { animationActions } from "../../../store/animation";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';

const PlayControl = () => {
    const isPlayed = useSelector((state) => state.animation.isPlayed);
    const speed = useSelector((state) => state.animation.speed);
    const isFromStart = useSelector((state) => state.animation.isFromStart);
    const dispatch = useDispatch();
    const [intervalId, setIntervalId] = useState();

    useEffect(() => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(0);
        }

        if (!isPlayed) {
            return;
        }

        const newIntervalId = setInterval(() => {
            dispatch(animationActions.updatePosition({ isSliding: false }));
        }, 1000 / speed);

        setIntervalId(newIntervalId);

    }, [isPlayed, speed]);

    const handlePlayButton = () => {
        dispatch(animationActions.changeIsPlayed(!isPlayed));
    }

    const handleStopButton = () => {
        dispatch(animationActions.changeIsPlayed(false));
        dispatch(animationActions.updatePosition({ id: 0 }));
    }

    const handleBackButton = () => {
        dispatch(animationActions.updateBackPosition());
    }

    const handleForwardButton = () => {
        dispatch(animationActions.updateForwardPosition());
    }

    const handleStartFromStart = () => {
        dispatch(animationActions.startFromStart());
    }

    return (
        <>
            {!isFromStart && <Button size="small" style={{ color: 'white' }} onClick={handleStartFromStart}>Začít od startu</Button>}
            <IconButton onClick={handleBackButton}><FastRewindIcon htmlColor="white" /></IconButton>
            <IconButton onClick={handlePlayButton}>
                {!isPlayed && <PlayArrowIcon htmlColor="white" />}
                {isPlayed && <PauseIcon htmlColor="white" />}
            </IconButton>
            <IconButton onClick={handleStopButton}><StopIcon htmlColor="white" /></IconButton>
            <IconButton onClick={handleForwardButton}><FastForwardIcon htmlColor="white" /></IconButton>
        </>
    );
}

export default PlayControl;