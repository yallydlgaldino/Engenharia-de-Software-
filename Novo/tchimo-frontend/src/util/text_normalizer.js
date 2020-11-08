function replaceBySpace (text) {
    return text.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g," ");
}

function replaceAccents (text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function replaceUpperCase (text) {
    return text.toLowerCase();
}

function replaceMultipleSpaces(text) {
    return text.replace(/ +/g, " ");
}

function replaceSpaceByHiphen(text) {
    return text.replace(/ /g, "-");
}

export default function getNormalizedText(text) {
    text = replaceBySpace(text);
    text = replaceAccents(text);
    text = replaceUpperCase(text);
    text = replaceMultipleSpaces(text);
    text = text.trim();
    text = replaceSpaceByHiphen(text);
    return text;
}