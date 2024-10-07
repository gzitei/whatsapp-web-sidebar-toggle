chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url.includes("web.whatsapp.com")
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: () => {
        let currentView = "";

        const views = [
          "chats",
          "newsletter",
          "community",
          "status",
          "settings",
          "profile",
        ];

        const sidebar = document.querySelector("#side")?.parentElement;
        if (sidebar) {
          sidebar.style.display = "none";

          sidebar.addEventListener("click", (e) => {
            let el = e.target;
            do {
              var role = el.role;
              if (role == "listitem") {
                if (currentView == views[0]) {
                  toggleSideBar();
                  currentView = "";
                  return;
                }
                if (currentView != views[0] && views.includes(currentView)) {
                  toggleSecondarySideBar();
                  currentView = "";
                  return;
                }
              }
              el = el.parentElement;
            } while (el);
          });

          sidebar.parentElement
            .querySelector("header")
            .addEventListener("click", (e) => {
              let el = e.target;

              do {
                var label = el.dataset?.icon;
                if (el.tagName.toUpperCase() == "IMG") {
                  label = "profile";
                }
                if (label) break;
                el = el.parentElement;
              } while (el);

              if (!label) return;

              let selected = label.split("-")[0];
              if (!views.includes(selected)) return;

              if (currentView == "") {
                if (selected == views[0]) {
                  toggleSideBar();
                } else {
                  toggleSecondarySideBar();
                }
                currentView = selected;
                return;
              }

              if (selected == currentView) {
                if (selected == views[0]) {
                  toggleSideBar();
                } else {
                  toggleSecondarySideBar();
                }
                currentView = "";
                return;
              }

              if (currentView == views[0] && selected != views[0]) {
                toggleSideBar();
                toggleSecondarySideBar();
                currentView = selected;
                return;
              }

              if (currentView != views[0] && selected == views[0]) {
                toggleSecondarySideBar();
                toggleSideBar();
                currentView = selected;
                return;
              }

              currentView = selected;
            });
        }

        const secondarybar = document.querySelector("._aohf");
        if (secondarybar) secondarybar.style.display = "none";

        const main = document.querySelectorAll("[class='_aigv _aigz']")[1];
        if (main) {
          main.style.maxWidth = `calc(100vw - var(--navbar-width))`;
          main.addEventListener("click", () => {
            switch (currentView) {
              case "": {
                break;
              }
              case views[0]: {
                toggleSideBar();
                currentView = "";
                break;
              }
              default: {
                toggleSecondarySideBar();
                currentView = "";
                break;
              }
            }
          });
        }

        const side = document.querySelector("[class='_aigv _aigw']");
        if (side) {
          side.style.minWidth = "380px";
        }

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
            "overflow-x": "hidden",
          });
        }
      },
    });
  }
});
