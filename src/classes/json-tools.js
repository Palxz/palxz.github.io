//load a JSON file and return a json object.
function loadJSON(filePath) {
    //Make a Promise 
    let result = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest(); //
      //Get from filePath in async mode
      xhr.open('GET', filePath, true);
      //When xhr loaded then perform.
      xhr.onload = () => {
        //check if json file has loaded
        if (xhr.status === 200) {
            //if loaded then parse the file.
            resolve(JSON.parse(xhr.responseText));
        } else {
            //if not loaded then reject the load and give a Error
          reject(new Error(`Error loading JSON: ${xhr.statusText}`));
        }
      };
      //if a error is found then reject the promise and give the error 
      xhr.onerror = () => reject(new Error('Error loading JSON'));
      //when no errors occurred then send the resolved json. when error send send reject.
      xhr.send();
    });
    return result
}

export { loadJSON };


