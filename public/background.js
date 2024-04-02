chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === "change-color") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs && tabs.length > 0) {
        const tabId = tabs[0].id;
        if (tabId) {
          console.log("chrome?.scripting", chrome?.scripting);
          chrome?.scripting
            ?.executeScript({
              target: { tabId: tabId },
              function: function(color) {
                console.log("scriptColor", color);
                document.body.style.backgroundColor = color;
              },
              args: [message.color],
            })
            .then(() => {
              console.log("Script executed successfully.");
            })
            .catch((error) => {
              console.error("Script execution failed:", error);
            });
        } else {
          console.error("Failed to get tab ID.");
        }
      } else {
        console.error("No active tabs found.");
      }
    });
  }
});
