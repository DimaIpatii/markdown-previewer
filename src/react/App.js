import React from "react";

/* Layout */
import Navigation from "./view/Navigation.js";
import EditorField from "./view/EditorField.js";
import PreviewField from "./view/PreviewField.js";

/* Context */
import { StateProvider, StateContext } from "./model/StateProvider.js";

import { renderHTML } from "./model/renderHtml.js";

const App = () => {
    return (
        <div className="app-wrapper">
            <StateProvider>
                <header className="app-wrapper__header header">
                    <Navigation stateContext={StateContext} />
                </header>
                <main className="app-wrapper__main main">
                    <EditorField stateContext={StateContext} />
                    <div className="divider"></div>
                    <PreviewField
                        renderMarkup={renderHTML}
                        stateContext={StateContext}
                    />
                </main>
            </StateProvider>
        </div>
    );
};

export default App;
