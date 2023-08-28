function removeIframesFromBlockedSites(blockedSites) {
  // Load blocked sites from storage and remove iframes from them
  chrome.storage.sync.get("blacklistedWebsites", function (data) {
    const blacklistedWebsites = data.allowedWebsites || "";
    const blockedSites = blacklistedWebsites.split("\n").map(site => site.trim().toLowerCase());

    const iframes = document.querySelectorAll("iframe");
    iframes.forEach(iframe => {
      const src = iframe.src.toLowerCase();
      if (blockedSites.some(site => src.includes(site))) {
        iframe.remove();
      }
    });
  });
}

// Initial removal on page load
removeIframesFromBlockedSites();

// Observe DOM mutations to detect dynamically added iframes
const observer = new MutationObserver(() => {
  removeIframesFromBlockedSites();
});

// Start observing the entire document for changes
observer.observe(document, { childList: true, subtree: true });