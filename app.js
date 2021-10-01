const mainWindow = document.getElementById('window');
const windowHeader = document.getElementById('window-header');
const aboutTab = document.getElementById('about-tab');
const projectsTab = document.getElementById('projects-tab');
const contactTab = document.getElementById('contact-tab');
const switcher = document.getElementById('header-switcher');
const circle = document.getElementById('switcher-circle');
const burgerBtn = document.getElementById('burger-btn');
const burgerMenu = document.getElementById('burger-menu');
const hamburgerAbout = document.getElementById('hamburger-about');
const hamburgerProjects = document.getElementById('hamburger-projects');
const hamburgerContact = document.getElementById('hamburger-contact');

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

function toggleBurger () {
  burgerMenu.classList.toggle('show');
}

function showPageHandler(show, hide1, hide2) {
  show.classList.add('show');
  hide1.classList.remove('show');
  hide2.classList.remove('show');
}

function movedAndActiveHandler(activeTab, tab1, tab2, tab3, style1, style2) {
  if (activeTab === aboutTabActive) {
    if (moved) {
      tab1.classList.add(style1);
      tab2.classList.remove(style1);
      tab3.classList.remove(style1);
    } else {
      tab1.classList.add(style2);
      tab2.classList.remove(style2);
      tab3.classList.remove(style2);
    }
  } else if (
    activeTab === projectsTabActive ||
    activeTab === contactTabActive
  ) {
    if (!moved) {
      tab1.classList.add(style1);
      tab2.classList.remove(style1);
      tab3.classList.remove(style1);
    } else {
      tab1.classList.add(style2);
      tab2.classList.remove(style2);
      tab3.classList.remove(style2);
    }
  }
}

burgerBtn.addEventListener('click', toggleBurger);

// TAB CONTROL
hamburgerAbout.addEventListener('click', function () {
  showPageHandler(aboutPage, projectsPage, contactPage);
  toggleBurger();
});

hamburgerProjects.addEventListener('click', function () {
  showPageHandler(projectsPage, contactPage, aboutPage);
  toggleBurger();
});

hamburgerContact.addEventListener('click', function () {
  showPageHandler(contactPage, aboutPage, projectsPage);
  toggleBurger();
});

aboutTab.addEventListener('click', function () {
  aboutTabActive = true;
  projectsTabActive = false;
  contactTabActive = false;
  showPageHandler(aboutPage, projectsPage, contactPage);
  movedAndActiveHandler(
    aboutTabActive,
    aboutTab,
    projectsTab,
    contactTab,
    'active-light',
    'active'
  );
});

projectsTab.addEventListener('click', function () {
  aboutTabActive = false;
  projectsTabActive = true;
  contactTabActive = false;
  showPageHandler(projectsPage, aboutPage, contactPage);
  movedAndActiveHandler(
    projectsTabActive,
    projectsTab,
    aboutTab,
    contactTab,
    'active',
    'active-light'
  );
});

contactTab.addEventListener('click', function () {
  aboutTabActive = false;
  projectsTabActive = false;
  contactTabActive = true;
  showPageHandler(contactPage, projectsPage, aboutPage);
  movedAndActiveHandler(
    contactTabActive,
    contactTab,
    projectsTab,
    aboutTab,
    'active',
    'active-light'
  );
});

function themeSwitcherHandler(switcher, removeDirection, addDirection) {
  switcher.classList.remove(removeDirection);
  switcher.classList.add(addDirection);
}

function themeColorHandler(
  element1,
  element2,
  element3,
  element4,
  element5,
  style1,
  style2
) {
  element1.classList.toggle(style1);
  element2.classList.toggle(style1);
  element3.classList.toggle(style2);
  element4.classList.toggle(style2);
  element5.classList.toggle(style2);
}

function activeTabThemeHandler(tab1, tab2, tab3, themeColor) {
  tab1.classList.remove(themeColor);
  tab2.classList.remove(themeColor);
  tab3.classList.remove(themeColor);
}

function currentActiveTabColorHandler(
  activeTab1,
  activeTab2,
  activeTab3,
  tabEl1,
  tabEl2,
  tabEl3,
  style
) {
  if (activeTab1) {
    tabEl1.classList.add(style);
  } else if (activeTab2) {
    tabEl2.classList.add(style);
  } else if (activeTab3) {
    tabEl3.classList.add(style);
  }
}

// THEME SWITCHER
switcher.addEventListener('click', function () {
  if (!moved) {
    themeSwitcherHandler(circle, 'move-left', 'move-right');
    themeColorHandler(
      windowHeader,
      mainWindow,
      aboutTab,
      projectsTab,
      contactTab,
      'light-theme',
      'light-tab'
    );
    currentActiveTabColorHandler(
      aboutTabActive,
      projectsTabActive,
      contactTabActive,
      aboutTab,
      projectsTab,
      contactTab,
      'active-light'
    );
    burgerMenu.classList.add('mobile-light-menu');
    activeTabThemeHandler(aboutTab, projectsTab, contactTab, 'active');
    moved = true;
  } else if (moved) {
    themeSwitcherHandler(circle, 'move-right', 'move-left');
    themeColorHandler(
      windowHeader,
      mainWindow,
      aboutTab,
      projectsTab,
      contactTab,
      'light-theme',
      'light-tab'
    );
    currentActiveTabColorHandler(
      aboutTabActive,
      projectsTabActive,
      contactTabActive,
      aboutTab,
      projectsTab,
      contactTab,
      'active'
    );
    burgerMenu.classList.remove('mobile-light-menu');
    activeTabThemeHandler(aboutTab, projectsTab, contactTab, 'active-light');
    moved = false;
  }
});

// FORM SUBMISSION
async function submitHandler(event) {
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

form.addEventListener('submit', submitHandler);
