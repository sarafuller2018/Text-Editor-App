const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Adds an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    butInstall.style.visibility = "visible";

    // Implements a click event handler on the `butInstall` element
    butInstall.addEventListener('click', async () => {
        event.prompt();
        butInstall.setAttribute("disabled", true);
        butInstall.textContent = "Installed!";
    });
});

// Adds an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log("App successfully installed", event);
});