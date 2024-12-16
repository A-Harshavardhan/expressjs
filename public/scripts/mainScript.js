
// Script for Navigation template

function handleCategoryClick(categoryElement) {
    const categoryId = categoryElement.getAttribute('data-catid');
    window.location.href = `/models/${categoryId}`;
}

function homepage() {
    window.location.href = '/';
}