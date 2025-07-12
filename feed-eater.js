
function feedEater() {
    const elementsToEat = [
        'ytd-browse[page-subtype="home"]', // Home feed
        'ytd-shorts', // Shorts feed
        'ytd-watch-next-secondary-results-renderer', // Watch next feed
        // 'div#secondary.ytd-watch-flexy', // Watch next feed, alternative selector
        'div.videowall-endscreen', // End screen recommendations
        // 'div.html5-endscreen', // End screen recommendations, alternative selector
    ]
    for (const selector of elementsToEat) {
        const elements = document.querySelectorAll(selector)
        elements.forEach(element => {
            element.remove()
            console.log(`${selector} removed`)
        })
    }
}

feedEater()

const observer = new MutationObserver(feedEater)
observer.observe(document.body, { childList: true, subtree: true })
