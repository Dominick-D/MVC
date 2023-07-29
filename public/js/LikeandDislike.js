document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const postId = this.getAttribute('data-id');
      const likeValue = true; 
      const dislikeValue = false;
  
      fetch(`/api/posts/like-dislike/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          like: likeValue,
          dislike: dislikeValue,
        }),
      }).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Error: ' + response.statusText);
        }
      }).then(post => {
        console.log('Post liked');
        const likeCount = document.querySelector(`#like-count-${postId}`);
        likeCount.textContent = post.likes - post.dislikes;
      });
    });
  });
  
  document.querySelectorAll('.dislike-button').forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const postId = this.getAttribute('data-id');
      const likeValue = false;
      const dislikeValue = true; 
  
      fetch(`/api/posts/like-dislike/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          like: likeValue,
          dislike: dislikeValue,
        }),
      }).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Error: ' + response.statusText);
        }
      }).then(post => {
        console.log('Post disliked');
        const likeCount = document.querySelector(`#like-count-${postId}`);
        likeCount.textContent = post.likes - post.dislikes;
      });
    });
  });
  