import { Box } from "@mui/material";
import { useState } from "react";
import { PhotoshopPicker, SketchPicker } from "react-color";
import classes from "./ColorPicker.module.css";

const ColorPicker = ({ color, onChangeColor, style }) => {
    const [isOpened, setIsOpened] = useState(false);

    const handlePicker = () => {
        setIsOpened((state) => !state);
    }

    const handleClose = () => {
        setIsOpened(false);
    };

    return (
        <div>
            <Box className={classes.swatch} onClick={handlePicker} sx={{ background: color, mt: '12px', ...style }} />
            {isOpened &&
                <div style={{position:'absolute', bottom: 0, left: 0, right:0, top: 0}}>
                    <div className={classes.popover}>
                        <SketchPicker color={color} onChange={onChangeColor} on/>
                    </div>                    
                    <div className={classes.cover} onClick={handleClose} />
                </div>
            }
        </div>
    );
}

export default ColorPicker;