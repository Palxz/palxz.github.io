// Function that generates html compatible string.
// You feed it data and type
// name = Displayed Text.
// href = Link opened on click.
// type = Project, update-strong, update-linked or update-dated
// date = Date in format "{Month} {Day}, {Year}"
function generateItemHTML(name, href, type, date) {
  //define the output
  let html = '';
  //switch statement for the type of list
  switch (type) {
    //If its a project
    case 'project':
      html = `<li><a href="${href}">${name}</a></li>`;
      break;
    //If its a update filter by type
    case 'update-strong':
      html = `<li><strong>${name}</strong></li>`;
      break;
    case 'update-linked':
      html = '<li><a href="${href}">'+ name +'</a></li>';
      break;
    case 'update-dated':
      html = '<li href='+href+'><strong>'+ date +'</strong> - '+ name +'</li>';
      break;
    default:
      html = '<a>Invalid Type</a>'
      console.log("Invalid Type");
    break;
  }
  //return the patched html
  return html;
}
  //Get the JSON File and make it into an object

  import { loadJSON } from "./classes/json-tools.js";
  const data = await loadJSON('./src/pages/data.json');

  console.log("JSON Resolved");

  //Decode the json into HTML Lines

  let projects = [];

  for (let i = 0; i < Object.keys(data.projects).length; i++) {
    const {displayName, href} = data.projects[i];
    // console.log(JSON.stringify(displayName));
    // console.log(JSON.stringify(href));
    // console.log(`displayName: ${displayName}, href: ${href}`);
    // let dataHTML = generateItemHTML(displayName,href,"project");
    projects.push(generateItemHTML(displayName,href,"project"))
  }

  let updates = [];

  for (let i = 0; i < Object.keys(data.updates).length; i++) {
    const {displayName, href, type, date} = data.updates[i];
    // console.log(JSON.stringify(displayName));
    // console.log(JSON.stringify(href));
    // console.log(`displayName: ${displayName}, href: ${href}`);
    updates.push(generateItemHTML(displayName,href,"update-" + type.toLowerCase(),date))
  }

  //add HTML Lines to the HTML Feed

  const projectsList = document.getElementById('project-list');
  const updatesList = document.getElementById('update-list');

  for (let i = 0; i < projects.length; i++) {
    projectsList.innerHTML += projects[i];
  }

  for (let i = 0; i < updates.length; i++) {
    updatesList.innerHTML += updates[i];
  }






