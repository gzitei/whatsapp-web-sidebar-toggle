let popupIsOpen = false;

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "popup") {
    popupIsOpen = true;
    port.onDisconnect.addListener(() => {
      popupIsOpen = false;
    });
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (popupIsOpen) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => {
            const sidebar = document.querySelector("#side")?.parentElement;
            if (sidebar) {
              chrome.runtime.sendMessage({
                toggleSidebarCommandPressed: true,
              });
            }
          },
        });
      } else {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => {
            const sidebar = document.querySelector("#side")?.parentElement;
            if (sidebar) {
              sidebar.style.display =
                sidebar.style.display === "none" ? "" : "none";
              const header = sidebar.parentElement?.querySelector("header");
              if (header) {
                header.style.display =
                  header.style.display === "none" ? "" : "none";
              }
            }
          },
        });
      }
    });
  }
});
