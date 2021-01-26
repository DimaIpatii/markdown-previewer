/* eslint-disable react/prop-types */
import React, { useReducer, createContext } from "react";

import reducer from "./reducer.js";
import initialState from "./initialState.js";

const StateContext = createContext();
// ******************************************
// States:
// ******************************************
const THEME_WHITE = "WHITE";
const THEME_GREY = "GREY";
const THEME_BLACK = "BLACK";

const ADD_FILE = "ADD_FILE";
const ADD_NAME = "ADD_NAME";
const EDIT_DOCUMENT = "EDIT_DOCUMENT";
const REMOVE_FILE = "REMOVE_FILE";
const SELECTED_FILE = "SELECTED_FILE";
const SAVE_FILE = "SAVE_FILE";

// ******************************************
// Context:
// ******************************************

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Theme Changing
    //  *****************************
    const setThemeColor = (selectedColor = "white") => {
        if (selectedColor === "white") {
            return dispatch({
                type: THEME_WHITE,
            });
        }

        if (selectedColor === "grey") {
            return dispatch({
                type: THEME_GREY,
            });
        }

        if (selectedColor === "black") {
            return dispatch({
                type: THEME_BLACK,
            });
        }
    };

    // Add New file:
    //  *****************************
    const addNewFile = ({ name = "", id = 0, selected = true }) => {
        return dispatch({
            type: ADD_FILE,
            playload: {
                id: id,
                name: name,
                selected: selected,
                fileContent: "",
            },
        });
    };

    // Remove File:
    //  *****************************
    const removeFile = ({ id = 0, state }) => {
        return dispatch({
            type: REMOVE_FILE,
            playload: {
                id: id,
                selected: state,
            },
        });
    };

    // Remove File:
    //  *****************************
    const selectFile = (id = 0) => {
        return dispatch({
            type: SELECTED_FILE,
            playload: {
                selectedFileId: id,
            },
        });
    };

    // Save File:
    // **************************************

    const saveFile = (file = {}) => {
        return dispatch({
            type: SAVE_FILE,
            playload: {
                fileContent: file.content,
                id: file.id,
            },
        });
    };

    const addName = (file = {}) => {
        return dispatch({
            type: ADD_NAME,
            playload: {
                id: file.id,
                name: file.name,
            },
        });
    };

    const addText = ({ fileId = 0, text = "" }) => {
        return dispatch({
            type: EDIT_DOCUMENT,
            playload: {
                fileContent: text,
                id: fileId,
            },
        });
    };

    const appState = {
        state,
        setThemeColor,
        addNewFile,
        addName,
        addText,
        removeFile,
        selectFile,
        saveFile,
    };

    return (
        <StateContext.Provider value={appState}>
            {children}
        </StateContext.Provider>
    );
};

export { StateProvider, StateContext };
