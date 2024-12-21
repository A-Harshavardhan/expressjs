
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownList = document.querySelector('.dropdown-list');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const displaySpan = dropdownBtn.querySelector('span');

const overlay = document.querySelector('.overlay');
const flyout = document.querySelector('.filters-section');

// Toggle dropdown visibility
dropdownBtn.addEventListener('click', () => {
    // Toggle the 'open' class to show/hide the dropdown
    dropdownBtn.parentElement.classList.toggle('open');
    overlay.classList.add('active');
});

// Change the displayed option when a dropdown item is clicked
dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        const selectedValue = item.getAttribute('data-value');
        displaySpan.textContent = item.textContent;  // Update the display text

        // Removing class active for all items
        dropdownItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active'); // adding active class for selected option

        dropdownBtn.parentElement.classList.remove('open'); // Close the dropdown
        overlay.classList.remove('active');

        // Reading the model_id
        const mid = document.querySelector('.model-name').getAttribute('data-mid');

        fetch(`/products/${selectedValue}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mid: mid })
        })
            .then(response => response.json())  // make sure you are parsing the response as JSON
            .then(data => {
                // Ensure that the server is sending `productsGridHtml`
                if (data.productsGridHtml) {
                    // document.querySelector('.products-grid').innerHTML = '';
                    document.querySelector('.products').innerHTML = data.productsGridHtml;
                } else {
                    console.error('Error: productsGridHtml is not defined');
                }
            })
            .catch(err => {
                console.error('Error fetching content:', err);
                contentDiv.innerHTML = '<p>Error fetching content.</p>';
            });
    });
});

// Filter section flyout for mobile
document.querySelector('.filter-btn').addEventListener('click', function () {
    flyout.classList.add('active');
    overlay.classList.add('active');
});

document.querySelector('.close-icon').addEventListener('click', () => {
    flyout.classList.remove('active');
    overlay.classList.remove('active');
});


// Filter section
// ------------------
const filters = document.querySelectorAll('.filter-models');

filters.forEach(filter => {
    filter.addEventListener('click', () => {

        // Read mode_id
        const mid = filter.getAttribute('data-mid');

        filters.forEach(filter => filter.classList.remove('active'));
        filter.classList.add('active');

        fetch(`/products/filter/${mid}`)
            .then(response => response.json())  // make sure you are parsing the response as JSON
            .then(data => {
                // Ensure that the server is sending `productsGridHtml`
                if (data.filteredProductsGridHtml) {
                    // document.querySelector('.products-grid').innerHTML = '';
                    document.querySelector('.products').innerHTML = data.filteredProductsGridHtml;
                } else {
                    console.error('Error: filteredProductsGridHtml is not defined');
                }
            })
            .catch(err => {
                console.error('Error fetching content:', err);
                contentDiv.innerHTML = '<p>Error fetching content.</p>';
            });

        flyout.classList.remove('active');
        overlay.classList.remove('active');

        displaySpan.textContent = 'Select an option';
        dropdownItems.forEach(i => i.classList.remove('active'));
    });
});

// add to wishlist button in PLP
// const addToWishlistBtn = document.querySelectorAll('.products-grid .product-tile .add-to-wishlist');
// addToWishlistBtn.forEach(wishlist => {
//     wishlist.addEventListener('click', () => {
//         if(wishlist.classList.contains('bi-heart')) {
//             wishlist.classList.remove('bi-heart');
//             wishlist.classList.add('bi-heart-fill');
//         } else {
//             wishlist.classList.remove('bi-heart-fill');
//             wishlist.classList.add('bi-heart');
//         }
//     });
// });

const productGrid = document.querySelector('.products-grid');

productGrid.addEventListener('click', (event) => {
    if (event.target && event.target.matches('.product-tile .add-to-wishlist')) {
        const wishlist = event.target;
        if (wishlist.classList.contains('bi-heart')) {
            wishlist.classList.remove('bi-heart');
            wishlist.classList.add('bi-heart-fill');
        } else {
            wishlist.classList.remove('bi-heart-fill');
            wishlist.classList.add('bi-heart');
        }
    }
});
