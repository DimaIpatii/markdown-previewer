/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from "react";

const Navigation = ({ stateContext }) => {
    const { state, addNewFile } = useContext(stateContext);

    // *******************************************

    return (
        <nav className={`navigation ${state.themeColor.navigation}`}>
            {/*Navigation*/}
            <div className="theme">
                <h2 className="navigation__caption caption_navigation">
                    Theme
                </h2>

                <ThemeNavigation stateContext={stateContext} />
            </div>

            <DividerDots state={state} />

            {/*Files List:*/}
            <div className="files">
                <h3 className="files__caption caption_navigation">Files</h3>
                <ul className="files__list files-list">
                    {state.files.map((file) => (
                        <NewFile
                            key={file.id}
                            file={file}
                            stateContext={stateContext}
                        />
                    ))}
                </ul>
                <button
                    className={`btn btn_add-new-file ${
                        state.themeColor.addButton || ""
                    }`}
                    onClick={() => addNewFile("ADD_FILE")}
                >
                    <i className="btn_add-new-file-icon">
                        <ion-icon name="add-outline"></ion-icon>
                    </i>
                </button>
            </div>
        </nav>
    );
};

export default Navigation;

/***************************************************************************/
/***************************************************************************/

const NewFile = ({ file, stateContext }) => {
    const { removeFile, selectFile, addName } = useContext(stateContext);

    const [name, setName] = React.useState(file.name);
    const [submit, setSubmit] = React.useState(false);
    const selectedIcon = React.useRef(null);
    // **************************************************

    const addFileName = (e) => {
        e.preventDefault();

        setSubmit(true);
        if (name.length == 0) return;

        const fileId = Number(selectedIcon.current.id);

        selectFile(fileId);
        addName({ id: fileId, name: name });
    };
    const selectItem = () => selectFile(Number(selectedIcon.current.id));
    const deleteItem = (e, fileState) =>
        removeFile({
            id: Number(e.target.closest("li").id),
            state: fileState,
        });

    // **************************************************

    React.useEffect(() => {
        setSubmit(() => {
            if (file.name.length > 0) {
                return true;
            }
        });

        setName(file.name);
    }, [file.name]);

    // **************************************************

    return (
        <li
            id={file.id}
            className={`files-list__item list-item ${
                file.selected ? "selected" : ""
            }`}
            ref={selectedIcon}
        >
            {!file.id == 0 ? (
                <button
                    className="btn btn__del"
                    onClick={(event) => deleteItem(event, file.selected)}
                >
                    <span>x</span>
                </button>
            ) : null}
            <div onClick={selectItem}>
                {/* <div className="list-item__icon list-item-icon">
                    <i className="list-item-line list-item-line_short"></i>
                    <i className="list-item-line"></i>
                    <i className="list-item-line"></i>
                    <i className="list-item-line"></i>
                    <i className="list-item-line"></i>
                    <i className="list-item-line"></i>
                    <i className="list-item-line"></i>
                </div> */}
                <div className="list-item__icon list-item-icon">
                    <i className="icon">
                        <ion-icon name="document-text-outline"></ion-icon>
                    </i>
                </div>

                {!submit ? (
                    <form onSubmit={addFileName} className="new-file-form">
                        <input
                            type="text"
                            value={name}
                            className="new-file-form__text-field"
                            onChange={(event) => setName(event.target.value)}
                        />
                        <input
                            type="submit"
                            value="add"
                            className="btn btn_add-file-caption"
                        />
                    </form>
                ) : (
                    <h4 className="list-item__name">
                        {file.name.length > 0 ? file.name : "unnamed"}
                    </h4>
                )}
            </div>
        </li>
    );
};

/***************************************************************************/
/***************************************************************************/

const ThemeNavigation = ({ stateContext }) => {
    const { state, setThemeColor } = useContext(stateContext);
    const [selectedTheme, setSelectedTheme] = React.useState(
        state.themeColor.color
    );

    // *******************************************

    useEffect(() => {
        setThemeColor(selectedTheme);
    }, [selectedTheme]);

    return (
        <div
            className="theme-navigation"
            onChange={(e) => {
                setSelectedTheme(e.target.value);
            }}
        >
            <label
                htmlFor="theme-color-white"
                className={`theme-navigation__label theme-label theme-label_white 
        ${selectedTheme == "white" ? "selected" : ""}`}
            >
                <input
                    type="radio"
                    name="theme-color"
                    value="white"
                    id="theme-color-white"
                    className="theme-input"
                />
            </label>

            <label
                htmlFor="theme-color-grey"
                className={`theme-navigation__label theme-label theme-label_grey 
    ${selectedTheme == "grey" ? "selected" : ""}`}
            >
                <input
                    type="radio"
                    name="theme-color"
                    value="grey"
                    id="theme-color-grey"
                    className="theme-input"
                />
            </label>

            <label
                htmlFor="theme-color-black"
                className={`theme-navigation__label theme-label theme-label_black
    ${selectedTheme == "black" ? "selected" : ""}`}
            >
                <input
                    type="radio"
                    name="theme-color"
                    value="black"
                    id="theme-color-black"
                    className="theme-input"
                />
            </label>
        </div>
    );
};

/***************************************************************************/
/***************************************************************************/

const DividerDots = ({ state }) => (
    <div className="navigation__divider navigation-divider">
        <i className={`divider-icon ${state.themeColor.navDivider}`}></i>
        <i className={`divider-icon ${state.themeColor.navDivider}`}></i>
        <i className={`divider-icon ${state.themeColor.navDivider}`}></i>
        <i className={`divider-icon ${state.themeColor.navDivider}`}></i>
        <i className={`divider-icon ${state.themeColor.navDivider}`}></i>
        <i className={`divider-icon ${state.themeColor.navDivider}`}></i>
        <i className={`divider-icon ${state.themeColor.navDivider}`}></i>
        <i className={`divider-icon ${state.themeColor.navDivider}`}></i>
    </div>
);
