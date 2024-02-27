document.addEventListener('DOMContentLoaded', function() {

    const allButtons = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener('click', function() {
            searchBar.style.visibility = 'visible';
            searchBar.classList.add('open');
            this.setAttribute('aria-expanded', 'true');
            searchInput.focus();
        });
    }

    searchClose.addEventListener('click', function() {
        searchBar.style.visibility = 'hidden';
        searchBar.classList.remove('open');
        this.setAttribute('aria-expanded', 'false');
      });
});

// jQuery implementation of the 'Search' button/bar

// document.addEventListener('DOMContentLoaded', function() {

//     const allButtons = document.querySelectorAll('.searchBtn');
//     const searchBar = document.querySelector('.searchBar');
//     const searchInput = document.getElementById('searchInput');
//     const searchClose = document.getElementById('searchClose');

//     // Add event listeners for search button and close button
//     for (var i = 0; i < allButtons.length; i++) {
//         allButtons[i].addEventListener('click', function() {
//             toggleSearchBar(true);
//         });
//     }

//     searchClose.addEventListener('click', function() {
//         toggleSearchBar(false);
//     });

//     // Function to toggle search bar visibility
//     function toggleSearchBar(visible) {
//         searchBar.style.visibility = visible ? 'visible' : 'hidden';
//         searchBar.classList.toggle('open', visible);
//         searchInput.focus();
//     }

//     // Function to fetch search results using AJAX
//     function fetchSearchResults(query) {
//         // Make an AJAX request to the server
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', '/search?q=' + encodeURIComponent(query), true);

//         xhr.onreadystatechange = function() {
//             if (xhr.readyState === XMLHttpRequest.DONE) {
//                 if (xhr.status === 200) {
//                     // If request successful, handle search results
//                     handleSearchResults(xhr.responseText);
//                 } else {
//                     // If request fails, handle error
//                     console.error('Error fetching search results:', xhr.status);
//                 }
//             }
//         };

//         xhr.send();
//     }

//     // Function to handle search results
//     function handleSearchResults(response) {
//         // Replace this logic with how you want to handle search results
//         console.log('Search results:', response);
//     }

//     // Add event listener for search input
//     searchInput.addEventListener('input', function() {
//         const query = this.value.trim(); // Trim whitespace from the input
//         if (query.length > 0) {
//             // If query is not empty, fetch search results
//             fetchSearchResults(query);
//         } else {
//             // If query is empty, clear search results
//             handleSearchResults(''); // Clear search results
//         }
//     });

// });
