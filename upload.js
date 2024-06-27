document.getElementById('upload-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const file = document.getElementById('file').files[0];

    const reader = new FileReader();
    reader.onload = function (event) {
        const videoList = JSON.parse(localStorage.getItem('videoList')) || [];
        videoList.push({
            title: title,
            username: username,
            description: description,
            src: event.target.result,
            thumbnail: 'thumbnail-placeholder.jpg'
        });
        localStorage.setItem('videoList', JSON.stringify(videoList));
        window.location.href = 'index.html';
    };
    reader.readAsDataURL(file);
});
