const featuredAppsContainer = document.getElementById('featuredApps');
const appListContainer = document.getElementById('appList');

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function createAppElement(app) {
  const appContainer = document.createElement('div');
  appContainer.className = 'appContainer';

  const appName = document.createElement('div');
  appName.className = 'appName';
  appName.textContent = app.appName;

  const installButton = document.createElement('button');
  installButton.className = 'installButton';
  installButton.textContent = 'Install';
  installButton.addEventListener('click', () => installApp(app.downloadLink));

  const screenshotsContainer = document.createElement('div');
  screenshotsContainer.className = 'screenshotsContainer';

  app.screenshots.forEach((screenshotLink) => {
    const screenshot = document.createElement('img');
    screenshot.className = 'screenshot';
    screenshot.src = screenshotLink;
    screenshot.alt = 'Screenshot';
    screenshot.addEventListener('click', () => openFullScreenImage(screenshotLink));

    screenshotsContainer.appendChild(screenshot);
  });

  appContainer.appendChild(appName);
  appContainer.appendChild(installButton);
  appContainer.appendChild(screenshotsContainer);

  return appContainer;
}

function renderAppList(apps) {
  appListContainer.innerHTML = '';

  apps.forEach((app, index) => {
    appListContainer.appendChild(createAppElement(app));

    // Add a divider between apps, except for the last one
    if (index < apps.length - 1) {
      const divider = document.createElement('div');
      divider.className = 'divider';
      appListContainer.appendChild(divider);
    }
  });
}

function createFeaturedAppElement(app) {
  const featuredAppContainer = document.createElement('div');
  featuredAppContainer.className = 'featuredBanner';
  featuredAppContainer.style.backgroundImage = `url(${app.screenshots[0]})`;

  const appName = document.createElement('div');
  appName.className = 'featuredAppName';
  appName.textContent = app.appName;

  featuredAppContainer.appendChild(appName);
  featuredAppContainer.addEventListener('click', () => installApp(app.downloadLink));

  return featuredAppContainer;
}

function renderFeaturedApps(featuredApps) {
  featuredAppsContainer.innerHTML = '';

  featuredApps.forEach((app) => {
    featuredAppsContainer.appendChild(createFeaturedAppElement(app));
  });
}

async function init() {
  const appsData = await fetchData('https://raw.githubusercontent.com/DauntingEmperor/winsource/main/source/apps.json');
  const featuredAppsData = await fetchData('https://raw.githubusercontent.com/DauntingEmperor/winsource/main/source/featured-apps.json');

  renderAppList(appsData);
  renderFeaturedApps(featuredAppsData);
}

init();
