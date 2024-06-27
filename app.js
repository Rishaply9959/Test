// Handle form submission for video upload in create.html
const uploadForm = document.getElementById('uploadForm');

uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(uploadForm);
    const response = await fetch('/upload-video', { // Replace with your server endpoint
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        alert('Video uploaded successfully!');
        // Redirect to index.html or handle as needed
        window.location.href = '/index.html';
    } else {
        alert('Failed to upload video.');
    }
});
