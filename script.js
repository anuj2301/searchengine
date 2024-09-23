document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchHistoryList = document.getElementById('search-history');
    const clearHistoryButton = document.getElementById('clear-history-button');
    const backgroundColorPicker = document.getElementById('background-color-picker');
    const backgroundImagePicker = document.getElementById('background-image-picker');

    // Load search history from local storage
    const loadSearchHistory = () => {
        const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        searchHistoryList.innerHTML = '';
        history.forEach(term => {
            const li = document.createElement('li');
            li.textContent = term;
            searchHistoryList.appendChild(li);
        });
    };

    // Save search term to local storage
    const saveSearchTerm = (term) => {
        const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        history.push(term);
        localStorage.setItem('searchHistory', JSON.stringify(history));
        loadSearchHistory();
    };

    // Clear search history
    const clearSearchHistory = () => {
        localStorage.removeItem('searchHistory');
        loadSearchHistory();
    };

    // Load background settings from local storage
    const loadBackgroundSettings = () => {
        const backgroundColor = localStorage.getItem('backgroundColor');
        const backgroundImage = localStorage.getItem('backgroundImage');
        if (backgroundColor) {
            document.body.style.backgroundColor = backgroundColor;
            backgroundColorPicker.value = backgroundColor;
        }
        if (backgroundImage) {
            document.body.style.backgroundImage = `url(${backgroundImage})`;
        }
    };

    // Save background color to local storage
    const saveBackgroundColor = (color) => {
        localStorage.setItem('backgroundColor', color);
    };

    // Save background image to local storage
    const saveBackgroundImage = (image) => {
        localStorage.setItem('backgroundImage', image);
    };

    // Event listeners
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            saveSearchTerm(searchTerm);
            searchInput.value = '';
        }
    });

    clearHistoryButton.addEventListener('click', clearSearchHistory);

    // Change background color
    backgroundColorPicker.addEventListener('input', (event) => {
        const color = event.target.value;
        document.body.style.backgroundColor = color;
        saveBackgroundColor(color);
    });

    // Change background image
    backgroundImagePicker.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                document.body.style.backgroundImage = `url(${imageUrl})`;
                saveBackgroundImage(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    });

    // Initial load
    loadSearchHistory();
    loadBackgroundSettings();
});