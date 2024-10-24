chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getDescription") {
    chrome.tabs.query({ active: true }, ([tab]) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: () => {
            const element = document.querySelector(
              "body > div.air3-fullscreen-element > div > div.air3-fullscreen-container.is-scrolled-top.is-scrolled-bottom > div > div > div.air3-slider-body > div > div > div > div.job-details-card.d-flex.gap-0.air3-card.air3-card-outline.p-0.slider > div > section:nth-child(2)>div > p.text-body-sm"
            );
            return element ? element.innerText : null;
          },
        },
        (results) => {
          sendResponse({ description: results[0]?.result });
        }
      );
    });
    return true; // Indicates async sendResponse
  }
});
