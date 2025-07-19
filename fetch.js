const originalFetch = window.fetch;

window.fetch = async function (...args) {
  // full observed URL: "https://www.youtube.com/youtubei/v1/browse?prettyPrint=false"
  if (args?.[0]?.url?.includes("youtubei/v1/browse")) {
    // find the button we made
    const button = document.querySelector("button#friction-load-more");
    // suspend the fetch until the button is clicked, then release it
    return await new Promise((resolve, reject) => {
      // if we didn't find the button, or the button already has a listener, reject
      if (!button || button.listenerAttached) {
        reject();
      } else {
        button.listenerAttached = true; // mark the button as having a listener
        button.addEventListener("click", async () => {
          button.remove();
          resolve(originalFetch.apply(this, args));
        });
      }
    });
  } else {
    return originalFetch.apply(this, args);
  }
};
