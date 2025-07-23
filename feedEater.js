/**
 * For each domain, a list of css selectors for elements to remove, such as
 * - algorithmic feeds and recommendations
 * - AI overview
 * - login / use the app banners
 * - cookie banners
 */
const rolodex = {
  "www.youtube.com": [
    "ytd-browse[page-subtype='home']", // youtube home feed
    "ytd-shorts", // youtube shorts feed
    "ytd-watch-next-secondary-results-renderer", // youtube watch next feed
    "div.videowall-endscreen", // youtube end screen recommendations
  ],
  "m.youtube.com": [
    "div.tab-content[tab-title='Home'][tab-identifier='FEwhat_to_watch']", // youtube mobile home feed
    "shorts-page", // youtube mobile shorts feed
    "ytm-single-column-watch-next-results-renderer > ytm-item-section-renderer", // youtube mobile watch next feed
  ],
  // www.reddit works for desktop and mobile
  "www.reddit.com": [
    "shreddit-feed[reload-url^='/svc/shreddit/feeds/']", // reddit home feed, popular feed
    "shreddit-gallery-carousel", // reddit top bar recommendations
    "faceplate-bottom-sheet#xpromo-bottom-sheet", // reddit mobile "View in Reddit app" banner
  ],
  // www.linkedin works for desktop and mobile, but need different selectors
  "www.linkedin.com": [
    "div[data-finite-scroll-hotkey-context='FEED'] ~ div", // divs following linkedin desktop homepage feed, i.e. "Show more feed updates" button
    "div[data-finite-scroll-hotkey-context='FEED']", // linkedin desktop homepage feed
    "div#feed-news-module", // linkedin desktop news feed
    "div.upsell-bottom", // linkedin mobile "Use the LinkedIn app" banner
    "ol.feed-container > li.new-feed", // linkedin mobile homepage feed
  ],
  "www.facebook.com": [
    "div.xgmub6v", // facebook top bar reels feed (1 of 3 classes, test to see if it works persistently)
    "div.x1unhpq9", // facebook home page feed (1 of 3 classes, test to see if it works persistently)
  ],
  "m.facebook.com": [
    // there don't seem to be any identifiable css selectors for facebook mobile, so we'll have to find another way
  ],
  "ww.google.com": [
    // ai overview disappeared for me? disable for now, return to it later
    // "div:has(+div#center_col)", // the thing just before google search results, i.e. AI overview
  ],
};
const universal = [
  "div#credential_picker_container", // "sign in with google" pop-up
];

// Get the current domain and its associated selectors
const url = new URL(window.location.href);
const domain = url.hostname;
const selectors = universal.concat(rolodex[domain] ?? []);
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
