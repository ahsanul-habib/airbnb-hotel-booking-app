const stringToFilename=(input)=> {
    return input.trim().replace(/\s+/g, '-').toLowerCase();
}

export default stringToFilename;