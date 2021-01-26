/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";

const PreviewField = ({ renderMarkup, stateContext }) => {
    const { state } = useContext(stateContext);
    const [document, setDocumnet] = useState(state.files[0]);

    useEffect(() => {
        const selectedFile = state.files.find((file) => file.selected === true);
        setDocumnet(selectedFile);
    }, [state.files]);

    return (
        <div
            className={`textarea textarea_editor ${state.themeColor.textAreaEditor}`}
        >
            <div
                className={`textarea-header ${state.themeColor.textAreaHeader}`}
            >
                <h2 className="caption_textarea">Preview</h2>
            </div>

            <p
                id="preview"
                className="textarea-filed textarea-filed_preview"
                dangerouslySetInnerHTML={renderMarkup(document.fileContent)}
            ></p>
        </div>
    );
};

export default PreviewField;
