// For each domain, a list of css selectors for elements to remove, such as
// - algorithmic feeds and recommendations
// - login banners
// - cookie banners
const rolodex = {
  "www.youtube.com": [
    "ytd-browse[page-subtype='home']", // youtube home feed
    "ytd-shorts", // youtube shorts feed
    "ytd-watch-next-secondary-results-renderer", // youtube watch next feed
    // 'div#secondary.ytd-watch-flexy', // youtube watch next feed, alternative selector
    "div.videowall-endscreen", // youtube end screen recommendations
    // 'div.html5-endscreen', // youtube end screen recommendations, alternative selector
  ],
  "www.reddit.com": [
    "shreddit-feed[reload-url^='/svc/shreddit/feeds/']", // reddit home feed, popular feed
    "shreddit-gallery-carousel", // reddit top bar recommendations
    "div#credential_picker_container", // "sign in with google" pop-up
  ],
  "www.linkedin.com": [
    "div[data-finite-scroll-hotkey-context='FEED']", // linkedin homepage feed
  ],
  "www.stackexchange.com": [
    "div#credential_picker_container", // "sign in with google" pop-up
  ],
};

// Get the current domain and its associated selectors
const url = new URL(window.location.href);
const domain = url.hostname;
const selectors = rolodex[domain] ?? [];
console.log(
  "feedEater running on domain:",
  domain,
  "with selectors:",
  selectors
);

function feedEater() {
  for (const selector of selectors) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.remove();
      console.log(`${selector} removed`);
    });
  }
}

feedEater();

const observer = new MutationObserver(feedEater);
observer.observe(document.body, { childList: true, subtree: true });
