import themes from "./themes.js";

const THEME_WHITE = "WHITE";
const THEME_GREY = "GREY";
const THEME_BLACK = "BLACK";

const ADD_FILE = "ADD_FILE";
const ADD_NAME = "ADD_NAME";
const EDIT_DOCUMENT = "EDIT_DOCUMENT";
const REMOVE_FILE = "REMOVE_FILE";
const SELECTED_FILE = "SELECTED_FILE";
const SAVE_FILE = "SAVE_FILE";

// *******************************************
// Reducer:
// *******************************************

const reducer = (state, action) => {
    // ****************************************
    if (action.type === THEME_WHITE) {
        state.themeColor = themes.themeWhite;
        return { ...state };
    }

    if (action.type === THEME_GREY) {
        state.themeColor = themes.themeGrey;
        return { ...state };
    }

    if (action.type === THEME_BLACK) {
        state.themeColor = themes.themeBlack;
        return { ...state };
    }

    // ****************************************

    if (action.type === ADD_FILE) {
        const newFileID = state.files[state.files.length - 1].id + 1;
        state.files.map((file) => (file.selected = false));
        const newFile = {
            id: newFileID,
            name: "",
            fileContent: "",
            selected: true,
        };

        return { ...state, files: [...state.files, newFile] };
    }

    if (action.type === REMOVE_FILE) {
        const deletedFileID = action.playload.id;
        const deletedFileSelected = action.playload.selected;

        const index = state.files.findIndex((el) => el.id === deletedFileID);

        // if file's position is the last && is selected = select prev file:
        if (deletedFileSelected === true && index === state.files.length - 1) {
            state.files[index - 1].selected = true;
        }
        // if file has next sibling && is selected = select next file:
        else if (deletedFileSelected === true) {
            state.files[index + 1].selected = true;
        }

        // Remove element from the list
        const newFiles = state.files.filter((file) => file.id != deletedFileID);

        return { ...state, files: [...newFiles] };
    }

    // ****************************************

    if (action.type === SELECTED_FILE) {
        const files = state.files.map((file) => {
            if (file.id === action.playload.selectedFileId) {
                file.selected = true;
            } else {
                file.selected = false;
            }

            return file;
        });

        return { ...state, files };
    }

    // ****************************************
    if (action.type === SAVE_FILE) {
        const files = state.files.map((file) => {
            if (file.id === action.playload.id) {
                file.fileContent = action.playload.fileContent;
            }
            return file;
        });
        return { ...state, files };
    }

    if (action.type === ADD_NAME) {
        const files = state.files.map((file) => {
            if (file.id === action.playload.id) {
                file.name = action.playload.name;
            }
            return file;
        });

        return { ...state, files };
    }

    if (action.type === EDIT_DOCUMENT) {
        const files = state.files.map((file) => {
            if (file.id === action.playload.id) {
                file.fileContent = action.playload.fileContent;
            }
            return file;
        });

        return { ...state, files };
    }

    // ****************************************

    return state;
};

export default reducer;
