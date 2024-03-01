const request = require('supertest');
const app = require('../public/js/script');

// Now you can write your test
describe('Search functionality', () => {
  it('opens the search bar when search button is clicked', async () => {
    // Simulate a click event on the search button
    const searchButton = document.createElement('button');
    searchButton.classList.add('searchBtn');
    document.body.appendChild(searchButton);

    searchButton.click();

    // Assert that the search bar is visible and has the correct class
    const searchBar = document.querySelector('.searchBar');
    expect(searchBar.style.visibility).toBe('visible');
    expect(searchBar.classList.contains('open')).toBe(true);
  });

  it('closes the search bar when close button is clicked', async () => {
    // Simulate a click event on the close button
    const closeButton = document.createElement('button');
    closeButton.id = 'searchClose';
    document.body.appendChild(closeButton);

    closeButton.click();

    // Assert that the search bar is hidden and does not have the open class
    const searchBar = document.querySelector('.searchBar');
    expect(searchBar.style.visibility).toBe('hidden');
    expect(searchBar.classList.contains('open')).toBe(false);
  });

  it('focuses on the search input when search button is clicked', async () => {
    // Simulate a click event on the search button
    const searchButton = document.createElement('button');
    searchButton.classList.add('searchBtn');
    document.body.appendChild(searchButton);

    searchButton.click();

    // Assert that the search input has received focus
    const searchInput = document.getElementById('searchInput');
    expect(document.activeElement).toBe(searchInput);
  });
});



//   it('focuses on the search input when search button is clicked', async () => {
//     // Simulate a click event on the search button
//     const searchButton = document.createElement('button');
//     searchButton.classList.add('searchBtn');
//     document.body.appendChild(searchButton);

//     searchButton.click();

//     // Assert that the search input has received focus
//     const searchInput = document.getElementById('searchInput');
//     expect(document.activeElement).toBe(searchInput);
//   });
// });



