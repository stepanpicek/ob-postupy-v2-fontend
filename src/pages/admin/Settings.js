import { ContentState, convertFromHTML, convertToRaw, EditorState } from "draft-js";
import {stateToHTML} from 'draft-js-export-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";
import WysiwygEditor from "../../components/UI/WysiwygEditor";
import useHttp from "../../hooks/use-http";
import useAuth from "../../hooks/use-auth";
import useAlertWrapper from "../../hooks/use-alert";
import { Button } from "@mui/material";

const Settings = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [info, setInfo] = useState(null);    
    const { isLoading, sendRequest } = useHttp();
    const auth = useAuth();
    const alert = useAlertWrapper();

    const handleUpdateInfo = () => {
        let formData = new FormData();
        formData.append('Info', stateToHTML(editorState?.getCurrentContent()));
        sendRequest({
            url: `https://localhost:5001/settings/update-info`,
            method: 'POST',
            body: formData,
            headers: { 'Authorization': `Bearer ${auth.token}` },
            responseType: 'empty'
        }).then((status) => {
            if(!status){
                alert.success("Informace byly uloženy.")
            }
        });
    }

    useEffect(() => {
        sendRequest({
            url: `https://localhost:5001/settings/info`,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        }, (data) => {
            setInfo(data);
            let content = ContentState.createFromBlockArray(convertFromHTML(data.info ?? ' '));
            setEditorState(()=>EditorState.createWithContent(content))
        });
    }, []);

    return (
        <div className="d-flex flex-column">
            <h1>Nastavení</h1>
            <h6>Informace na hlavní straně:</h6>
            <WysiwygEditor state={editorState} onChange={setEditorState} />
            <Button color="success" variant="outlined" onClick={handleUpdateInfo} className="align-self-end">Aktualizovat Info </Button>
        </div>);
};

export default Settings;