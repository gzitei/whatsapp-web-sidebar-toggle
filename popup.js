chrome.runtime.connect({ name: "popup" });

let eventListenerWasAdded = false;

const addEventListener = (element, type) => {
  element.addEventListener(type, () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
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
    });
  });
  eventListenerWasAdded = true;
};

chrome.runtime.onMessage.addListener((message) => {
  const toggle = document.getElementById("toggle");
  if (message.toggleSidebarCommandPressed) {
    toggle.click();
    if (!eventListenerWasAdded) {
      addEventListener(toggle, "click");
    }
  } else if (message.onPopupOpen) {
    if (message.sidebarDisplayedOnPopupOpen) {
      toggle.click();
    }
    if (!eventListenerWasAdded) {
      addEventListener(toggle, "click");
    }
  }
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    function: () => {
      const sidebar = document.querySelector("#side")?.parentElement;
      if (sidebar) {
        chrome.runtime.sendMessage({
          onPopupOpen: true,
          sidebarDisplayedOnPopupOpen: sidebar.style.display === "",
        });
      }
    },
  });
});
