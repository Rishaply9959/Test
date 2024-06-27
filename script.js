document.addEventListener('DOMContentLoaded', function () {
    const videoList = JSON.parse(localStorage.getItem('videoList')) || [
        { title: 'Sample Video 1', username: 'User1', description: 'Description 1', src: 'sample-video.mp4', thumbnail: 'thumbnail1.jpg' },
        { title: 'Sample Video 2', username: 'User2', description: 'Description 2', src: 'sample-video2.mp4', thumbnail: 'thumbnail2.jpg' },
    ];

    const videoListElement = document.getElementById('video-list');
    const mainVideo = document.getElementById('main-video');
    const mainVideoSource = document.getElementById('main-video-source');
    const videoTitle = document.getElementById('video-title');
    const videoUsername = document.getElementById('video-username');
    const videoDescription = document.getElementById('video-description');

    function displayVideo(video) {
        mainVideoSource.src = video.src;
        mainVideo.load();
        mainVideo.play();
        videoTitle.textContent = video.title;
        videoUsername.textContent = `Uploaded by ${video.username}`;
        videoDescription.textContent = video.description;
    }

    function populateVideoList() {
        videoListElement.innerHTML = '';
        videoList.forEach(video => {
            const img = document.createElement('img');
            img.src = video.thumbnail;
            img.alt = video.title;
            img.addEventListener('click', () => displayVideo(video));
            videoListElement.appendChild(img);
        });
    }

    populateVideoList();
    displayVideo(videoList[0]);

    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        const filteredVideos = videoList.filter(video => video.title.toLowerCase().includes(query));
        
        videoListElement.innerHTML = '';
        filteredVideos.forEach(video => {
            const img = document.createElement('img');
            img.src = video.thumbnail;
            img.alt = video.title;
            img.addEventListener('click', () => displayVideo(video));
            videoListElement.appendChild(img);
        });
    });

    document.getElementById('upload-button').addEventListener('click', () => {
        window.location.href = 'upload.html';
    });
});
                
