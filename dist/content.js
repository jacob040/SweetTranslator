chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateTranslation") {
      console.log("Content.js msg recieved");
      const app = document.createElement("div");
      app.id = "translationApp";
      document.body.appendChild(app);
  
      // Inject the React app into the content script
      const script = document.createElement("script");
      script.textContent = `
        const message = ${JSON.stringify(message)};
        ReactDOM.render(
          React.createElement(App, { message }),
          document.getElementById("translationApp")
        );
      `;
      document.body.appendChild(script);
    }
  });
  