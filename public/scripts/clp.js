

// Category Landing Page - Script

function handleModelClick(modelElemet) {
    const modelId = modelElemet.getAttribute('data-model-id');
    window.location.href = `/model/${modelId}`;
}