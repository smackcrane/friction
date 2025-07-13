function feedEater() {
  const elementsToEat = [
    "ytd-browse[page-subtype='home']", // youtube home feed
    "ytd-shorts", // youtube shorts feed
    "ytd-watch-next-secondary-results-renderer", // youtube watch next feed
    // 'div#secondary.ytd-watch-flexy', // youtube watch next feed, alternative selector
    "div.videowall-endscreen", // youtube end screen recommendations
    // 'div.html5-endscreen', // youtube end screen recommendations, alternative selector
    "shreddit-feed[reload-url^='/svc/shreddit/feeds/']", // reddit home feed, popular feed
    "shreddit-gallery-carousel", // reddit top bar recommendations
  ];
  for (const selector of elementsToEat) {
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
