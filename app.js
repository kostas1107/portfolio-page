const aboutTab = document.getElementById('about-tab');
const projectsTab = document.getElementById('projects-tab');
const contactTab = document.getElementById('contact-tab');

const aboutPage = document.getElementById('about-pg');
const projectsPage = document.getElementById('projects-pg');
const contactPage = document.getElementById('contact-pg');

const form = document.getElementById('my-form');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const messageField = document.getElementById('message-field');

aboutTab.addEventListener('click', function () {
  aboutPage.classList.add('show');
  projectsPage.classList.remove('show');
  contactPage.classList.remove('show');
  aboutTab.classList.add('active');
  projectsTab.classList.remove('active');
  contactTab.classList.remove('active');
});
projectsTab.addEventListener('click', function () {
  projectsPage.classList.add('show');
  aboutPage.classList.remove('show');
  contactPage.classList.remove('show');
  projectsTab.classList.add('active');
  aboutTab.classList.remove('active');
  contactTab.classList.remove('active');
});
contactTab.addEventListener('click', function () {
  contactPage.classList.add('show');
  aboutPage.classList.remove('show');
  projectsPage.classList.remove('show');
  contactTab.classList.add('active');
  aboutTab.classList.remove('active');
  projectsTab.classList.remove('active');
});

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
