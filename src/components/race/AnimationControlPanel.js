import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AnimationSlider from "./animation/AnimationSlider";
import PlayControl from "./animation/PlayControl";

const AnimationControlPanel = () => {
    const theme = useTheme();
    const [index, setIndex] = useState(0);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '70px',
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
                <PlayControl />
            </Box>            
        </Box>
    );
}

export default AnimationControlPanel;