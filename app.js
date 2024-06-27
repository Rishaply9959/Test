// Fetch videos and display dynamically in index.html
const videoCardContainer = document.querySelector('.video-container');

const api_key = "your_api_key"; // Replace with your YouTube Data API key
const video_http = "https://www.googleapis.com/youtube/v3/videos?";
const channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN' // Adjust region code as needed
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    const videoCard = document.createElement('div');
    videoCard.classList.add('video');
    videoCard.innerHTML = `
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    `;
    videoCard.addEventListener('click', () => {
        window.location.href = `https://youtube.com/watch?v=${data.id}`;
    });
    videoCardContainer.appendChild(videoCard);
}

// Handle form submission for video upload in create.html
const uploadForm = document.getElementById('uploadForm');

uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(uploadForm);
    const response = await fetch('/upload-video', {
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
    
