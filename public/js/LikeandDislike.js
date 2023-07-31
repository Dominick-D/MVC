document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const postId = this.getAttribute('data-id');
        sendInteraction(postId, 'like');
    });
});

document.querySelectorAll('.dislike-button').forEach(button => {
    button.addEventListener('click', function (event) {
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
            // Update the likes count using likeDislikeSum property
            const likeCount = document.querySelector(`#like-count-${postId}`);
            likeCount.textContent = data.likeDislikeSum;;
        } else {
            console.error(data);
        }

        // Store the current action as the previous action for the next interaction
        previousAction = action;
    } catch (error) {
        console.error(error);
    }
}
