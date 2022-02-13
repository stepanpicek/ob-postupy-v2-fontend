import { useTheme } from "@emotion/react";
import { Box, IconButton, Select, Slider, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import StopIcon from '@mui/icons-material/Stop';
import { Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { animationActions } from "../../store/animation";
import AnimationSlider from "./AnimationSlider";

const AnimationControlPanel = () => {
    const theme = useTheme();
    const [index, setIndex] = useState(0);
    const dispatch = useDispatch();
    
    const handleChangeSlider = (event) => {
        setIndex(event.target.value);
        dispatch(animationActions.updatePosition(event.target.value));
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100px',
            background: theme.palette.primary.main,
            color: 'white'
        }}>
            <Box sx={{ px: 3, width: '100%' }}>
                <AnimationSlider />
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                textOverflow: 'ellipsis',
            }}>
                <Form.Label>
                    Rychlost:
                </Form.Label>
                <Form.Select size="sm" className="mx-2"> 
                    <option>Small select</option>
                </Form.Select>
                <Typography variant="h6">
                    0:00:00
                </Typography>
                <IconButton><FastRewindIcon /></IconButton>
                <IconButton><PlayArrowIcon /></IconButton>
                <IconButton><StopIcon /></IconButton>
                <IconButton><FastForwardIcon /></IconButton>
                <Form.Label style={{flexShrink: 0}}>
                    Přehrávat od:
                </Form.Label>
                <Form.Select size="sm" className="mx-2">
                    <option>Small select</option>
                </Form.Select>
            </Box>
        </Box>
    );
}

export default AnimationControlPanel;