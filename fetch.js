const originalFetch = window.fetch;

window.fetch = async function (...args) {
  // console.log("Intercepted fetch:", args);
  if (
    args?.[0]?.url ===
    "https://www.youtube.com/youtubei/v1/browse?prettyPrint=false"
  ) {
    // find the button we made
    const button = document.querySelector("button#friction-load-more");
    return await new Promise((resolve) => {
      button.addEventListener("click", async () => {
        button.remove();
        resolve(originalFetch.apply(this, args));
      });
    });
  } else {
    return originalFetch.apply(this, args);
  }
};
