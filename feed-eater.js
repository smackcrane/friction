
function feedEater() {
    const elementsToEat = [
        'ytd-browse[page-subtype="home"]', // Home feed
        'ytd-shorts', // Shorts feed
    ]
    for (const selector of elementsToEat) {
        const feed = document.querySelector(selector)
        if (feed) {
            feed.remove()
            console.log(`${selector} feed removed`)
        }
    }
}

feedEater()

const observer = new MutationObserver(feedEater)
observer.observe(document.body, { childList: true, subtree: true })
