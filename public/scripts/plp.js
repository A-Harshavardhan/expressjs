
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownList = document.querySelector('.dropdown-list');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const displaySpan = dropdownBtn.querySelector('span');

const overlay = document.querySelector('.overlay');
const flyout = document.querySelector('.filters-section');

// Reading the model_id
const mid = document.querySelector('.model-name').getAttribute('data-mid');

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
        dropdownItems.forEach( i => i.classList.remove('active'));
        item.classList.add('active'); // adding active class for selected option

        dropdownBtn.parentElement.classList.remove('open'); // Close the dropdown
        overlay.classList.remove('active');

        fetch(`/updateGrid/${selectedValue}`, {
            method: 'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({mid : mid})
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
document.querySelector('.filter-btn').addEventListener('click', function() {
    flyout.classList.add('active');
    overlay.classList.add('active');
});

document.querySelector('.close-icon').addEventListener('click', () => {
    flyout.classList.remove('active');
    overlay.classList.remove('active');
});

