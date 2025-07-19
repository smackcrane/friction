// inject fetch monkey patch
var s = document.createElement("script");
s.src = chrome.runtime.getURL("fetch.js");
s.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);

// manage "load more" button
function loadMoreButton() {
  const existingButton = document.querySelector("button#friction-load-more");
  if (existingButton) {
    // if button already exists, do nothing
    return;
  }
  const sentinel = document.querySelector("ytd-continuation-item-renderer");
  if (!sentinel) {
    // if no sentinel found, do nothing
    return;
  }
  // create a button and insert it at the end of the sentinel
  const button = document.createElement("button");
  button.textContent = "Load More";
  button.id = "friction-load-more";
  styleLoadMoreButton(button);
  sentinel.appendChild(button);
  // get rid of loading spinner
  const spinner = document.querySelector(
    "tp-yt-paper-spinner.ytd-continuation-item-renderer"
  );
  spinner?.remove();
}

loadMoreButton();

//TODO: probably just observe the button or something insetead of the whole body
const observer = new MutationObserver(loadMoreButton);
observer.observe(document.body, { childList: true, subtree: true });

// style for button
function styleLoadMoreButton(button) {
  Object.assign(button.style, {
    display: "block",
    margin: "24px auto",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "4px",
    backgroundColor: "var(--yt-spec-base-background)",
    color: "var(--yt-spec-text-primary)",
    border: "1px solid grey",
    cursor: "pointer",
  });

  button.onmouseenter = () => {
    button.style.backgroundColor = "var(--yt-spec-base-hover)";
  };
  button.onmouseleave = () => {
    button.style.backgroundColor = "var(--yt-spec-base-background)";
  };
}
