/**
 * Loads JSON data from a specified file path.
 * 
 * @param {string} filePath - The path to the JSON file.
 * @returns {Promise} - A promise that resolves with the parsed JSON data.
 */
function loadJSON(filePath) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`Error loading JSON: ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => reject(new Error('Error loading JSON'));
    xhr.send();
  });
}

export { loadJSON };