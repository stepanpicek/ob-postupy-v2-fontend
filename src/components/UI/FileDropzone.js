import { useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#313131',
    borderStyle: 'dashed',
    backgroundColor: '#f0f0f0',
    color: '#313131',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#313131',
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const FileDropzone = ({children}) => {
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({ onDrop: (file) => {console.log(file)} });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
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
                <p>{children}</p>
            </div>
        </section>
    );
}

export default FileDropzone;