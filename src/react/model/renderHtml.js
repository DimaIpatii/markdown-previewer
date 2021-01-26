const marked = require("marked");

export const renderHTML = (markedText) => {
    if (!markedText) return;

    marked.setOptions({
        breaks: true,
    });

    return { __html: marked(markedText) };
};
