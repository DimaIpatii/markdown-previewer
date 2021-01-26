/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";

const EditorField = ({ stateContext }) => {
    const { state, saveFile, addText } = useContext(stateContext);
    const [selectedFile, setSelectedFile] = useState(state.files[0]);

    const getTextOnType = (event) => {
        setSelectedFile({ ...selectedFile, fileContent: event.target.value });
    };

    useEffect(() => {
        const currentFile = state.files.find((file) => file.selected === true);
        setSelectedFile(currentFile);
    }, [state.files]);

    useEffect(() => {
        addText({ fileId: selectedFile.id, text: selectedFile.fileContent });
    }, [selectedFile.fileContent]);

    return (
        <div
            key={selectedFile}
            className={`textarea textarea_editor ${state.themeColor.textAreaEditor}`}
        >
            <div
                className={`textarea-header ${state.themeColor.textAreaHeader}`}
            >
                <h2 className="caption_textarea">Editor</h2>
                <nav className="textarea-header__navigation editor-navigation">
                    <button
                        className="editor-navigation__btn btn btn_save"
                        onClick={() =>
                            saveFile({
                                id: selectedFile.id,
                                content: selectedFile.fileContent,
                            })
                        }
                    >
                        save
                    </button>
                </nav>
            </div>

            <textarea
                id="editor"
                className="textarea-filed"
                onChange={getTextOnType}
                value={selectedFile.fileContent}
            ></textarea>
        </div>
    );
};

export default EditorField;
