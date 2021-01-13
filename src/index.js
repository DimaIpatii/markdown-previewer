/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// Clear DevTool [HMR] messages:
import {setLogLevel} from 'webpack/hot/log';
setLogLevel('error');

// Sass:
import './sass/main.scss';

//React:
import React from 'react';
import ReactDOM from 'react-dom';

import {initialState} from './initialState.js';

// *********************************************
// Themes:
// *********************************************
const themeWhite = {
    navigation : 'nav-white',
    textAreaHeader : 'textarea-header_white',
  }
  const themeGrey = {
    navigation : 'nav-grey',
    navDivider : 'dividers-grey',
    textAreaHeader : 'textarea-header_grey',
    textAreaEditor : 'textarea_editor_grey',
    textEditorFullScreenButtom : 'textarea-arrow-grey',
    addButton : 'add-button-grey'
  }
  const themeBlack = {
    navigation : 'nav-black',
    navDivider : 'dividers-black',
    textAreaHeader : 'textarea-header_black',
    textAreaEditor : 'textarea_editor_black',
    textEditorFullScreenButtom : 'textarea-arrow-black',
    addButton : 'add-button-black'
  }
  
  
  // *********************************************
  // State:
  // *********************************************
  
  
  const THEME_WHITE = 'WHITE';
  const THEME_GREY = 'GREY';
  const THEME_BLACK = 'BLACK';
  
  const ADD_FILE = 'ADD_FILE';
  const REMOVE_FILE = 'REMOVE_FILE';
  const SELECTED_FILE = 'SELECTED_FILE';
  const SAVE_FILE = 'SAVE_FILE';
  
  // *******************************************
  // Reducer:
  // *******************************************
  
  const reducer = (state,action) => {
    // ****************************************
    if(action.type == THEME_WHITE){
      state.themeColorState = action.playload.color;
      state.themeColor = themeWhite;
      return {...state};
    }
    
    if(action.type == THEME_GREY){
      state.themeColorState = action.playload.color;
      state.themeColor = themeGrey;
      return {...state};
    }
    
    if(action.type == THEME_BLACK){
      state.themeColorState = action.playload.color;
      state.themeColor = themeBlack;
      return {...state};
    }
    
    // ****************************************
    
    if(action.type == ADD_FILE){
      
      if(!action.playload.name){
        const files = [...state.files, {id : action.playload.id, name : '', fileContent : ''} ];
        return {...state,files}
      
      }else{
        
        const files = state.files.filter(file => {
            if(file.id === action.playload.id){
              file.name = action.playload.name;
            }
            return file;
        })
        
        return {...state, files}
      }
    }
    
    
    if(action.type == REMOVE_FILE){
      
      state.files = state.files.filter(file => file.id != action.playload.id);
      return {...state};
    }
   
    
    // ****************************************
    
    if(action.type === SELECTED_FILE){
      
      const files = state.files.map(file => {
        
        if(file.id === action.playload.selectedFile){ 
          file.selected = true;
        }else{ 
          file.selected = false;  
        }
          
        return file;
      });
      
      return {...state, files};
    }
    
    // ****************************************
    if(action.type === SAVE_FILE){
      const files = state.files.map(file => {
        if(file.id === action.playload.id){
          file.fileContent = action.playload.editor;
        }
        return file;
      })
      return {...state,files}  
    }
    
    // ****************************************
    
    return state;
  }
  
  
    
  // *********************************************
  // Context:
  // *********************************************
  const StateContext = React.createContext();
  
  const StateProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    
    // Theme Changing
    //  *****************************
    const setThemeColor = (selectedColor) => {
        
         if(selectedColor == 'white'){
            return dispatch({
              type : THEME_WHITE,
              playload : {
                color : selectedColor,
                selected : true,
              }
            })
        }
      
        if(selectedColor == 'grey'){
            return dispatch({
              type : THEME_GREY,
              playload : {
                color : selectedColor,
                selected : true,
              }
            })
          }
  
        if(selectedColor == 'black'){
            return dispatch({
              type : THEME_BLACK,
              playload : {
                color : selectedColor,
                selected : true,
              }
            })
        }  
    }
    
    // Add New file:
    //  *****************************
    const addNewFile = ({name = '',id = 0, selected = true}) => {
      
      return dispatch({
        type : ADD_FILE,
        playload : {
          id : id,
          name : name,
          selected : selected,
          fileContent : ''
        }
      })
    }
    
    // Remove File:
    //  *****************************
    const removeFile = (id = 0) => {  
      return dispatch({
        type : REMOVE_FILE,
        playload : {
          id : id,
        }
      })
    }
    
    // Remove File:
    //  *****************************
    const selectFile = (id = 0) => {
      
        return dispatch({
            type : SELECTED_FILE,
            playload : {
              selectedFile : id
            },
        });
    }
    
    // Save File:
    // **************************************
    
    const saveFile = (file) => {
      return dispatch({
        type : SAVE_FILE,
        playload : {
          editor : file.editorText,
          id : file.id
        }
      });
    }
    
    
    const appState = {state,setThemeColor,addNewFile,removeFile,selectFile,saveFile};
    
    return (
      <StateContext.Provider value={appState}>
        {children}
      </StateContext.Provider>
    )
  };
  
  
  
  
  // *********************************************
  // Add New File:
  // *********************************************
  const NewFile = ({file, removeFile}) => {
    
    const {state,addNewFile,selectFile} = React.useContext(StateContext);
    const [name, setName] = React.useState(file.name);
    const [submit, setSubmit] = React.useState(false);
    
    // **************************************************
    const addText = (event) => setName(event.target.value);
    const submitText = (event) => {
      event.preventDefault();
      
      setSubmit(true);
      if(name.length == 0 ) return;
  
      const id = Number(event.target.closest('li').id);
      
      selectFile(id);
      addNewFile({ id : id, name : name});
    };
    
     const deleteFile = (event) => {
       selectFile(Number(event.target.closest('li').id - 1));
       removeFile(Number(event.target.closest('li').id));
     };
    
    const selectItem = (event) => selectFile(Number(event.target.closest('li').id));
    
    
    // **************************************************
    
    React.useEffect(() => {
      
      setSubmit(() => {
        if(file.name.length > 0){
          return true;
        }  
      });
      
      setName(file.name);
    }, [file.name]);
   
    // **************************************************
    
    return (
      <li key={file.id} id={file.id} 
        className={`files-list__item list-item ${file.selected || state.files.length === 1 ? 'selected' : ''}`}>
        
          {
            !file.id == 0 
              ? <button className="btn btn__del" onClick={deleteFile} ><p>x</p></button> 
              : ''
          }
        
          <div className="list-item__icon list-item-icon" onClick={selectItem}>
            <i className="list-item-line list-item-line_short"></i>
            <i className="list-item-line"></i>
            <i className="list-item-line"></i>
            <i className="list-item-line"></i>
            <i className="list-item-line"></i>
            <i className="list-item-line"></i>
            <i className="list-item-line"></i>
          </div>
          {!submit
           ?(
              <form onSubmit={submitText} className="new-file-form">
                <input type="text" value={name} className="new-file-form__text-field" onChange={addText}/>
                <input type='submit' value="✓" className="btn btn_add-file-caption"/>
              </form>
            )
           :(<h3 className="list-item__name">{file.name.length > 0 ? file.name : 'unnamed' }</h3>)
           }
      </li>
    )
  }
  
  
  
  // *********************************************
  // Header:
  // *********************************************
  const Header = () => {
    const {state,setThemeColor,addNewFile,removeFile,selectFile} = React.useContext(StateContext);
    const [selectedTheme, setSelectedTheme] = React.useState(state.themeColorState);
    
    // *******************************************
    
    const getThemeColor = (event) => {
      const color = event.target.value;
      setSelectedTheme(color);
      setThemeColor(color);
    };
    
    const createNewFile = () => {
      let newId;
      
      if(state.files.length > 0){
         newId = state.files[state.files.length - 1].id + 1;
      }else{
        newId = 1;
      }
      
      addNewFile({id : Number(newId)});
      selectFile(Number(newId));
    };
    
    const removeFileItem = (id) => removeFile(id);
    
    
    // *******************************************
    
    return (
   
        <header className="app-wrapper__header header">
            <nav className={ `navigation ${state.themeColor.navigation }`} >
            {/*Navigation*/}
              <div className="theme">
                <h2 className="navigation__caption caption_navigation">Theme</h2>
  
                <div className="theme-navigation" onChange={getThemeColor}>
                  
                   <label 
                     htmlFor="theme-color-white" 
                     className={`theme-navigation__label theme-label theme-label_white 
                     ${selectedTheme == 'white' ? 'selected' : ''}`} 
                     >
                     <input type="radio" name="theme-color" value="white" id="theme-color-white"  className="theme-input"/>
                   </label>
  
                  <label 
                    htmlFor="theme-color-grey" 
                    className={`theme-navigation__label theme-label theme-label_grey 
                    ${selectedTheme == 'grey' ? 'selected' : ''}`} 
                    >
                    <input type="radio"  name="theme-color" value="grey" id="theme-color-grey" className="theme-input" />
                  </label>
  
                  <label 
                    htmlFor="theme-color-black" 
                    className={`theme-navigation__label theme-label theme-label_black
                    ${selectedTheme == 'black' ? 'selected' : ''}`} 
                    >
                     <input  type="radio" name="theme-color" value="black" id="theme-color-black" className="theme-input" />
                  </label>
  
                </div>
              </div>
  
            {/*Divider*/}
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
  
            {/*Files List:*/}
            <div className="files">
              <h2 className="files__caption caption_navigation">Files</h2>
              <ul className="files__list files-list">
                
                { state.files.map( file =>  <NewFile key={file.id} file={file} removeFile={removeFileItem}/> ) }
                
              </ul>
              <button 
                className={`btn btn_add-new-file ${state.themeColor.addButton || ''}`}
                onClick={createNewFile}
                ></button>
            </div>
          </nav>
      </header>
    )
  }
  
  
  // *********************************************
  // Main:
  // *********************************************
  const renderHTML = (markedText) => {
    marked.setOptions({
        breaks: true
      })
    
    return {__html: marked(markedText)}
  }
  
  const Main = () => {
    const {state,saveFile} = React.useContext(StateContext);
    const [editedText,setEditedText] = React.useState(state.files[0].fileContent);
    
    
    const getText = (word) => {
      setEditedText(word);
    }
    
    const getFile = (editor) => {
      saveFile({
        id : editor.id,
        editorText : editor.text,
        
      });
    }
    
    
    return (
      <main className="app-wrapper__main main">
        {/*Editor*/}
        { state.files.map(file => {
          
          if(file.selected){
            return <FileEidtor key={file.id} selectedFile={file} getText={getText} saveText={getFile}/>  
          }
        })}
         
          <div className="divider"></div>
            {/*Preview*/}
          <div className={ `textarea textarea_editor ${state.themeColor.textAreaEditor}`}>

            <div className= {`textarea-header ${state.themeColor.textAreaHeader}`}>
              <h2 className="caption_textarea">Preview</h2>
            </div>
            
            <p id="preview" className="textarea-filed textarea-filed_preview" dangerouslySetInnerHTML={renderHTML(editedText)}></p>
        </div>
       </main>
    );
  }
  
  
  const FileEidtor = ({selectedFile, getText,saveText}) => {
    const {state} = React.useContext(StateContext);
    const [textContent, setTextContent] = React.useState(selectedFile.fileContent);
    
    const saveFile = () => saveText({id : selectedFile.id,text : textContent});
    
    const typeText = (event) => {
      getText(event.target.value);
      setTextContent(event.target.value)
    };
    
   React.useEffect(() => {
      getText(selectedFile.fileContent);
    }, [state.files]);
    
    
    return (
      <div key={selectedFile.id} className={`textarea textarea_editor ${state.themeColor.textAreaEditor}`}>
            
            <div className= {`textarea-header ${state.themeColor.textAreaHeader}`}>
              
              <h2 className="caption_textarea">Editor</h2>
              <nav className="textarea-header__navigation editor-navigation">
                <button className="editor-navigation__btn btn btn_save" onClick={saveFile}>save</button>
              </nav>
            </div>
            
              <textarea id="editor" className="textarea-filed" onChange={typeText} value={textContent}></textarea>
            
          </div>
    )
  }
  
  
  
  // *********************************************
  // Controller:
  // *********************************************
  
  const App = () => {  
   
    return (
      <div className="app-wrapper">
        
          <Header />
          <Main />
        
      </div>
    )
  };
  
  ReactDOM.render(
      <StateProvider>
        <App />
     </StateProvider>
       ,document.getElementById('root'));
  
module.hot.accept();