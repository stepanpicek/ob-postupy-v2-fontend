import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#313131',
    borderStyle: 'dashed',
    backgroundColor: '#ffffff',
    color: '#313131',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    marginTop: '8px'
};

const focusedStyle = {
    borderColor: '#313131',
    borderStyle: 'solid',
    backgroundColor: '#f1f1f1',
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const FileDropzone = ({ children, formats }) => {
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({ onDrop: (file) => { console.log(file) } });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragAccept ? focusedStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    return (
        <section className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <Box sx={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center'}}>
                    <Typography variant="subtitle1">
                        Přesuňte zde soubor z počítače
                    </Typography>
                    <Typography variant="caption" align="center">
                        nebo
                    </Typography>
                    <Button variant="outlined" color="secondary">Vybrat soubor</Button>
                    <Typography variant="caption" align="center" mt={1}>
                      Povolené formáty:  {formats}
                    </Typography>
                </Box>
            </div>
        </section>
    );
}

export default FileDropzone;