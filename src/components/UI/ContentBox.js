import { Box } from "@mui/system";

const ContentBox = ({ children, sx }) => {
    return (
        <Box
            sx={{
                width: "auto",
                height: "auto",
                border: '1px dashed grey',
                p: 3,
                backgroundColor: 'white',
                ...sx
            }}
        >{children}
        </Box>);
}

export default ContentBox;