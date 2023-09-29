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
            const sidebar = document.querySelector("#side");
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
            const sidebar = document.querySelector("#side");
            if (sidebar) {
              sidebar.parentElement.style.display =
                sidebar.parentElement.style.display === "none" ? "" : "none";
            }
          },
        });
      }
    });
  }
});
