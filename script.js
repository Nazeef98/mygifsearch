document.getElementById('searchButton').addEventListener('click', function() {
    // Get the search term from the input field
    const searchTerm = document.getElementById('searchInput').value.trim();
    const apiKey = 'lMiE2pL77HmmCQa8yHFbeXTyykXuyjQJ'; // Your Giphy API key
    
    // Construct the API URL with the search term
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

    // Fetch GIFs from the Giphy API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const gifContainer = document.getElementById('gifContainer');
            gifContainer.innerHTML = ''; // Clear previous GIFs

            // Check if there are results
            if (data.data.length === 0) {
                gifContainer.innerHTML = '<p>No GIFs found. Try a different search term!</p>';
                return;
            }

            // Display each GIF
            data.data.forEach(gif => {
                const img = document.createElement('img');
                img.src = gif.images.fixed_height.url; // Use the URL of the GIF
                img.alt = gif.title; // Set alt text for accessibility
                gifContainer.appendChild(img); // Add the image to the container
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const gifContainer = document.getElementById('gifContainer');
            gifContainer.innerHTML = '<p>There was an error fetching GIFs. Please try again later.</p>';
        });
});
