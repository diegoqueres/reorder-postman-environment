class PostmanFileReader extends FileReader {
    static build(file) {
        const reader = new PostmanFileReader(file);
        reader.onload = (e) => {
            const textContent = e.target.result;
            const json = JSON.parse(textContent);
            const reorderedJson = reorderJsonElements(json);
            const processedTextContent = JSON.stringify(reorderedJson);
            processFileToDownload(file.name, processedTextContent);
            console.info('Reorder file process was completed!');
        }
        reader.onerror = (e) => {
            const error = e.target.error;
            console.error(`Error occured while reading file`, error);
        }
        return reader;
    }
}

const reorderJsonElements = (json) => {
    json.values = json.values.sort((a, b) => {
        if (a.key > b.key) {
            return 1;
        }
        if (a.key < b.key) {
            return -1;
        }
        return 0;  // a equal to b
    });
    return json;
}

const processFileToDownload = (filename, content) => {
    const blob = new Blob([content], {type:'text/plain'});
    const link = document.createElement("a");
    link.download = filename;
    link.innerHTML = "Download File";
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
}