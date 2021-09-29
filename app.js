const mainWindow = document.getElementById('window');
const windowHeader = document.getElementById('window-header');
const aboutTab = document.getElementById('about-tab');
const projectsTab = document.getElementById('projects-tab');
const contactTab = document.getElementById('contact-tab');
const switcher = document.getElementById('header-switcher');
const circle = document.getElementById('switcher-circle');

let moved = false;
let aboutTabActive = true;
let projectsTabActive = false;
let contactTabActive = false;

const aboutPage = document.getElementById('about-pg');
const projectsPage = document.getElementById('projects-pg');
const contactPage = document.getElementById('contact-pg');

const form = document.getElementById('my-form');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const messageField = document.getElementById('message-field');


// TAB CONTROL
aboutTab.addEventListener('click', function () {
  aboutTabActive = true;
  projectsTabActive = false;
  contactTabActive = false;
  aboutPage.classList.add('show');
  projectsPage.classList.remove('show');
  contactPage.classList.remove('show');
  if (moved && aboutTabActive) {
    aboutTab.classList.add('active-light');
    projectsTab.classList.remove('active-light');
    contactTab.classList.remove('active-light');
  } else {
    aboutTab.classList.add('active');
    projectsTab.classList.remove('active');
    contactTab.classList.remove('active');
  }
});
projectsTab.addEventListener('click', function () {
  aboutTabActive = false;
  projectsTabActive = true;
  contactTabActive = false;
  projectsPage.classList.add('show');
  aboutPage.classList.remove('show');
  contactPage.classList.remove('show');
  if (!moved && projectsTabActive) {
    projectsTab.classList.add('active');
    aboutTab.classList.remove('active');
    contactTab.classList.remove('active');
  } else {
    projectsTab.classList.add('active-light');
    aboutTab.classList.remove('active-light');
    contactTab.classList.remove('active-light');
  }
});
contactTab.addEventListener('click', function () {
  aboutTabActive = false;
  projectsTabActive = false;
  contactTabActive = true;
  contactPage.classList.add('show');
  aboutPage.classList.remove('show');
  projectsPage.classList.remove('show');
  if (!moved && contactTabActive) {
    contactTab.classList.add('active');
    aboutTab.classList.remove('active');
    projectsTab.classList.remove('active');
  } else {
    contactTab.classList.add('active-light');
    aboutTab.classList.remove('active-light');
    projectsTab.classList.remove('active-light');
  }
});

// THEME SWITCHER
switcher.addEventListener('click', function () {
  if (!moved) {
    circle.classList.remove('move-left');
    circle.classList.add('move-right');
    windowHeader.classList.add('light-theme');
    mainWindow.classList.add('light-theme');
    aboutTab.classList.add('light-tab');
    projectsTab.classList.add('light-tab');
    contactTab.classList.add('light-tab');
    if (aboutTabActive) {
      aboutTab.classList.add('active-light');
    } else if (projectsTabActive) {
      projectsTab.classList.add('active-light');
    } else if (contactTabActive) {
      contactTab.classList.add('active-light');
    }
    aboutTab.classList.remove('active');
    projectsTab.classList.remove('active');
    contactTab.classList.remove('active');
    moved = true;
  } else if (moved) {
    circle.classList.remove('move-right');
    circle.classList.add('move-left');
    windowHeader.classList.remove('light-theme');
    mainWindow.classList.remove('light-theme');
    aboutTab.classList.remove('light-tab');
    projectsTab.classList.remove('light-tab');
    contactTab.classList.remove('light-tab');
    if (aboutTabActive) {
      aboutTab.classList.add('active');
    } else if (projectsTabActive) {
      projectsTab.classList.add('active');
    } else if (contactTabActive) {
      contactTab.classList.add('active');
    }
    aboutTab.classList.remove('active-light');
    projectsTab.classList.remove('active-light');
    contactTab.classList.remove('active-light');
    moved = false;
  }
});


// FORM SUBMISSION
async function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const statusBar = document.getElementById('status-bar');
  const name = nameInput.value;
  const email = emailInput.value;
  const message = messageField.value;
  const nameExp = /^[a-z ,.'-]+$/i;
  const emailExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (
    !nameExp.test(name) ||
    name.length <= 1 ||
    !emailExp.test(email) ||
    email == '' ||
    message === ''
  ) {
    statusBar.innerHTML = 'Please fill all fields correctly!';
    statusBar.classList.add('error');
  } else {
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => {
        statusBar.innerHTML = 'Message sent successfully!';
        statusBar.classList.add('success');
        form.reset();
      })
      .catch(error => {});
  }
}

form.addEventListener('submit', handleSubmit);
