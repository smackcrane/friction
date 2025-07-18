// function manualFetch() {
//   const sentinel = document.querySelector("ytd-continuation-item-renderer");
//   if (!sentinel?.data) {
//     console.log("No data yet");
//     return;
//   }
//   const token = sentinel.data.continuationEndpoint.continuationCommand.token;
//   console.log("Found continuation token:", token);
//   // ok, we found the sentinel
//   console.log("sentinel", sentinel);
//   const continuationToken =
//     sentinel.getAttributeNode("data").continuationEndpoint.continuationCommand
//       .token;
//   sentinel.remove();
//   console.log("Sentinel removed, continuation token:", continuationToken);
// }
//
// manualFetch();
//
// const observer = new MutationObserver(manualFetch);
// observer.observe(document.body, { childList: true, subtree: true });

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
  const button = document.createElement("button");
  button.textContent = "Load More";
  button.id = "friction-load-more";
  sentinel.after(button);
}

loadMoreButton();

//TODO: probably just observe the button or something insetead of the whole body
const observer = new MutationObserver(loadMoreButton);
observer.observe(document.body, { childList: true, subtree: true });
