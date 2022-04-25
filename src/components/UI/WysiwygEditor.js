import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classes from "./WysiwygEditor.module.css";

const WysiwygEditor = ({state, onChange}) => {
    return (
        <>
            <Editor
                editorState={state}
                toolbarClassName={classes.editor}
                editorClassName={classes.editor}
                onEditorStateChange={onChange} />
        </>);
}

export default WysiwygEditor;