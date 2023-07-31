document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const postId = this.getAttribute('data-id');
        sendInteraction(postId, 'like');
    });
});

document.querySelectorAll('.dislike-button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const postId = this.getAttribute('data-id');
        sendInteraction(postId, 'dislike');
    });
});

async function sendInteraction(postId, action) {
    try {
        const response = await fetch(`/api/likes/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action }),
        });

        const data = await response.json();

        if (response.ok) {
            // update likes and dislikes on page
            document.querySelector(`#like-count-${postId}`).textContent = data.likes - data.dislikes;
        } else {
            console.error(data);
        }
    } catch (error) {
        console.error(error);
    }
}
