document.addEventListener('DOMContentLoaded', function() {
    // Set default theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = savedTheme;
        document.getElementById('themeSelector').value = savedTheme; // Update theme selector
    } else {
        document.body.className = 'theme-purple';
    }

    // Set default search engine
    const savedSearchEngine = localStorage.getItem('searchEngine');
    if (savedSearchEngine) {
        document.getElementById('searchEngine').value = savedSearchEngine;
    } else {
        document.getElementById('searchEngine').value = 'google';
    }
});

document.getElementById('submitButton').addEventListener('click', function() {
    const input = document.getElementById('inputBox').value.trim().toLowerCase();
    const searchEngine = document.getElementById('searchEngine').value;
    let redirectUrl;

    // Filter links based on input
    const filteredLinks = Object.keys(links).filter(link => link.startsWith(input));

    if (filteredLinks.length > 0) {
        // If there are matching links, redirect to the first one
        redirectUrl = links[filteredLinks[0]];
    } else {
        // If no matching links found, redirect to search engine
        if (searchEngine === 'google') {
            redirectUrl = 'https://www.google.com/search?q=';
        } else if (searchEngine === 'bing') {
            redirectUrl = 'https://www.bing.com/search?q=';
        } else if (searchEngine === 'duckduckgo') {
            redirectUrl = 'https://duckduckgo.com/?q=';
        } else if (searchEngine === 'yahoo') {
            redirectUrl = 'https://search.yahoo.com/search?p=';
        }
        redirectUrl += encodeURIComponent(input);
    }
    window.location.href = redirectUrl;

    // Clear input after search
    document.getElementById('inputBox').value = '';
});

// Handling enter key press
document.getElementById('inputBox').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('submitButton').click();
    }
});

// Theme Selector
document.getElementById('themeSelector').addEventListener('change', function() {
    const selectedTheme = document.getElementById('themeSelector').value;
    document.body.className = "";
    document.body.classList.add(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
});

// Search Engine Selector
document.getElementById('searchEngine').addEventListener('change', function() {
    const selectedEngine = document.getElementById('searchEngine').value;
    localStorage.setItem('searchEngine', selectedEngine);
});

// Settings toggle
document.getElementById('settingsButton').addEventListener('click', function() {
    const settingsContent = document.getElementById('settingsContent');
    const settingsButton = document.getElementById('settingsButton');
    settingsButton.style.display = 'none';
    settingsContent.style.display = 'block';
});

// Finish Settings button
document.getElementById('finishSettingsButton').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent click event from bubbling up
    const settingsContent = document.getElementById('settingsContent');
    const settingsButton = document.getElementById('settingsButton');
    settingsContent.style.display = 'none';
    settingsButton.style.display = 'block';
    settingsButton.style.margin = '0 auto'; // Center the settings button
});

// Close settings when clicking outside
document.addEventListener('click', function(event) {
    const settingsContent = document.getElementById('settingsContent');
    const settingsButton = document.getElementById('settingsButton');
    if (!settingsContent.contains(event.target) && !settingsButton.contains(event.target)) {
        settingsContent.style.display = 'none';
        settingsButton.style.display = 'block';
        settingsButton.style.margin = '0 auto'; // Center the settings button
    }
});
