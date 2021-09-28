const aboutTab = document.getElementById('about-tab');
const projectsTab = document.getElementById('projects-tab');
const contactTab = document.getElementById('contact-tab');

const aboutPage = document.getElementById('about-pg');
const projectsPage = document.getElementById('projects-pg');
const contactPage = document.getElementById('contact-pg');

const togglePage = tab => {
  if (tab === projectsTab) {
    projectsPage.classList.add('show');
    aboutPage.classList.remove('show');
    contactPage.classList.remove('show');
  } else if (tab === 'contact') {
    contactPage.classList.add('show');
    aboutPage.classList.remove('show');
    projectsPage.classList.remove('show');
  }
};

aboutTab.addEventListener('click', function () {
  aboutPage.classList.add('show');
  projectsPage.classList.remove('show');
  contactPage.classList.remove('show');
});
projectsTab.addEventListener('click', function () {
  projectsPage.classList.add('show');
  aboutPage.classList.remove('show');
  contactPage.classList.remove('show');
});
contactTab.addEventListener('click', function () {
  contactPage.classList.add('show');
  aboutPage.classList.remove('show');
  projectsPage.classList.remove('show');
});
