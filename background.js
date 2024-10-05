chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url.includes("web.whatsapp.com")
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: () => {
        const sidebar = document.querySelector("#side")?.parentElement;
        if (sidebar) sidebar.style.display = "none";

        const secondarybar = document.querySelector("._aohf");
        if (secondarybar) secondarybar.style.display = "none";

        const main = document.querySelectorAll("[class='_aigv _aigz']")[1];
        main.style.maxWidth = `calc(100vw - var(--navbar-width))`;

        const side = document.querySelector("[class='_aigv _aigw']");
        side.style.minWidth = "380px";

        const toggleSideBar = () => {
          if (sidebar) {
            if (secondarybar.style.display != "none") {
              secondarybar.style.display = "none";
            }
            sidebar.style.display =
              sidebar.style.display === "none" ? "" : "none";
          }
        };

        const toggleSecondarySideBar = () => {
          if (secondarybar) {
            if (sidebar.style.display != "none") {
              sidebar.style.display = "none";
            }
            secondarybar.style.display =
              secondarybar.style.display === "none" ? "" : "none";
          }
        };

        const app = document.querySelector(".app-wrapper-web ._aigs");

        if (app) {
          Object.assign(app.style, {
            top: "0px",
            "max-width": "100%",
            "max-height": "100%",
            height: "100%",
            width: "100%",
          });
        }

        document.body.addEventListener("click", (e) => {
          let target = e.target;
          let label = e.target.getAttribute("data-icon");
          while (target) {
            let role = target.role;
            if (role) {
              if (role == "listitem") {
                toggleSideBar();
              } else if (role == "button") {
                if (label == "chats-filled") {
                  toggleSideBar();
                } else {
                  toggleSecondarySideBar();
                }
                break;
              }
            }
            target = target.parentElement;
          }
        });
      },
    });
  }
});
