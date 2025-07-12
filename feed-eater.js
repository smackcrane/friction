
function feedEater() {
    const elementsToEat = [
        'ytd-browse[page-subtype="home"]', // Home feed
        'ytd-shorts', // Shorts feed
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
