chrome.runtime.onMessage.addListener((message) => {
  const toggle = document.getElementById("toggle");

  if (message.sidebarDisplay === "") {
    toggle.click();
  }

  toggle.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
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
    });
  });
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    function: () => {
      const sidebar = document.querySelector("#side");
      if (sidebar) {
        chrome.runtime.sendMessage({
          sidebarDisplay: sidebar.parentElement.style.display,
        });
      }
    },
  });
});
