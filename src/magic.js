// Magic.js
import {loadJSON} from "./classes/json-tools.js";
/**
 * Generate HTML compatible string based on the provided data and type.
 * @param {string} name - The displayed text.
 * @param {string} type - The type of the item: 'project', 'update-strong', 'update-linked', or 'update-dated'.
 * @param {object} data - The additional data object.
 * @param {string} data.href - The link opened on click.
 * @param {string} data.date - The date in the format "{Month} {Day}, {Year}".
 * @returns {string} - The generated HTML string.
 */
function generateItemHTML(name, type, data) {
  // If data is null, initialize it as an empty object.
  if (data == null) {
    data = {};
  }

  // Get the href and date values from the data object, or use default values if they are null.
  let href = data.href || "there is a null href";
  let date = data.date || "there is a null date";
  let img = data.img || "https://placehold.co/1280x720";

  // Generate HTML based on the type of the item
  let project = `<li class="centered-parent"><a href="${href}"><img class="project-image" src="${img}"><p class="centered image-button-text --text-4">${name}</p></a></li>`;
  let updateStrong = `<li><a href="${href}}" target="_blank"><strong>${name}</strong></a></li>`;
  let updateLinked = `<li><a href="${href}">${name}</a></li>`;
  let updateDated = `<li href="${href}"><strong>${date}</strong> - ${name}</li>`;

  let html = '';

  // Determine the appropriate HTML based on the type.
  switch (type) {
    case 'project':
      html = project;
      break;
    case 'update-strong':
      html = updateStrong;
      break;
    case 'update-linked':
      html = updateLinked;
      break;
    case 'update-dated':
      html = updateDated;
      break;
    default:
      html = '<a>Invalid Type</a>';
      break;
  }

  return html;
}

// Load JSON data from file.
const jsonData = await loadJSON('./src/pages/data.json');

let projects = [];
// Iterate through each project in the JSON data.
for (let i = 0; i < Object.keys(jsonData.projects).length; i++) {
  const {displayName, type ,data} = jsonData.projects[i];
  // Push generated HTML for the project into the projects array.
  projects.push(generateItemHTML(displayName, "project", data))
}

let updates = [];
// Iterate through each update in the JSON data.
for (let i = 0; i < Object.keys(jsonData.updates).length; i++) {
  const {displayName, type, data} = jsonData.updates[i];
  // Push generated HTML for the update into the updates array.
  updates.push(generateItemHTML(displayName, "update-" + type.toLowerCase(), data))
}

const projectsList = document.getElementById('project-list');
const updatesList = document.getElementById('update-list');

// Insert the generated HTML for the projects into the projectsList element.
projectsList.insertAdjacentHTML('beforeend', projects.join(''));
// Insert the generated HTML for the updates into the updatesList element.
updatesList.insertAdjacentHTML('beforeend', updates.join(''));





