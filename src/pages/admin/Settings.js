import { ContentState, convertFromHTML, convertToRaw, EditorState } from "draft-js";
import { stateToHTML } from 'draft-js-export-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";
import WysiwygEditor from "../../components/UI/WysiwygEditor";
import useHttp from "../../hooks/use-http";
import useAuth from "../../hooks/use-auth";
import useAlertWrapper from "../../hooks/use-alert";
import { Button, Divider } from "@mui/material";
import Table from "../../components/UI/Table";
import ContentBox from "../../components/UI/ContentBox";
import FileDropzone from "../../components/UI/FileDropzone";
import CloseIcon from '@mui/icons-material/Close';

const Settings = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [info, setInfo] = useState(null);
    const { isLoading, sendRequest } = useHttp();
    const [rows, setRows] = useState([]);
    const auth = useAuth();
    const alert = useAlertWrapper();

    const handleUpdateInfo = () => {
        let formData = new FormData();
        formData.append('Info', stateToHTML(editorState?.getCurrentContent()));
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/settings/update-info`,
            method: 'POST',
            body: formData,
            headers: { 'Authorization': `Bearer ${auth.token}` },
            responseType: 'empty'
        }).then((status) => {
            if (!status) {
                alert.success("Informace byly uloženy.")
            }
        });
    }

    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/settings/info`,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        }, (data) => {
            setInfo(data);
            let content = ContentState.createFromBlockArray(convertFromHTML(data.info ?? ' '));
            setEditorState(() => EditorState.createWithContent(content))
        });

        updateFiles();
    }, []);

    const updateFiles = () => {
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/settings/files`,
            headers: { 'Authorization': `Bearer ${auth.token}` }
        }, (data) => {
            setRows(data.files);
        });
    }

    const handleDeleteFile = (id) => {
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/settings/file/${id}`,
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${auth.token}` },
            responseType: 'empty'
        }).then((status) => {
            if (!status) {
                alert.success("Soubor byl smazán.");
                updateFiles();
            }
        });
    }

    const handleFileUpload = (files) => {
        if (files.length == 1) {
            let formData = new FormData();
            formData.append('File', files[0], files[0].name);

            sendRequest({
                url: `${process.env.REACT_APP_BACKEND_URI}/settings/upload`,
                method: 'POST',
                headers: { 'Authorization': `Bearer ${auth.token}` },
                body: formData,
                responseType: 'empty'
            }).then((status) => {
                if(!status){
                    alert.success("Soubor byl nahrán.");
                    updateFiles();
                }
            });
        }
    }

    const filesDef = [
        {
            Header: ' ',
            columns: [
                {
                    Header: 'Soubor',
                    accessor: 'path',
                    Cell: (props) => {
                        return <a href={`${process.env.REACT_APP_BACKEND_URI}/files/${props.value}`} target="_blank">{props.value}</a>;
                    }
                },
                {
                    id: 'delete',
                    accessor: 'id',
                    Cell: (props) => {                        
                        return <Button variant="outlined" startIcon={<CloseIcon />} color="error" onClick={() => { handleDeleteFile(props.value) }}>Smazat</Button>;
                    }
                }
            ],
        }
    ];

    return (
        <div className="d-flex flex-column">
            <h1>Nastavení</h1>
            <h6>Informace na hlavní straně:</h6>
            <WysiwygEditor state={editorState} onChange={setEditorState} />
            <Button color="success" variant="outlined" onClick={handleUpdateInfo} className="align-self-end">Aktualizovat Info </Button>
            <h6>Nahrané soubory:</h6>
            <ContentBox>
                <FileDropzone formats={""} onDrop={handleFileUpload} />   
                <Divider sx={{my:3}} />         
                {rows && rows.length > 0 && <Table columns={filesDef} data={rows} />}
                {rows && rows.length === 0 && <p className="align-self-center">Žádný soubor nenalezen.</p>}
            </ContentBox>
        </div>);
};

export default Settings;