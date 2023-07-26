document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const postId = this.getAttribute('data-id');
        fetch(`/api/posts/like/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.ok) {
                console.log('Post liked');
                //Update the UI here
            } else {
                alert('Error: ' + response.statusText);
            }
        });
    });
});

document.querySelectorAll('.dislike-button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const postId = this.getAttribute('data-id');
        fetch(`/api/posts/dislike/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.ok) {
                console.log('Post disliked');
                //Update the UI here
            } else {
                alert('Error: ' + response.statusText);
            }
        });
    });
});
