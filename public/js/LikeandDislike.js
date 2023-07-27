// public\js\LikeandDislike.js

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
          return response.json();
        } else {
          alert('Error: ' + response.statusText);
        }
      }).then(data => {
        console.log('Post liked');
        const likeCount = document.querySelector(`#like-count-${postId}`);
        likeCount.textContent = data.likes - data.dislikes; 
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
          return response.json();
        } else {
          alert('Error: ' + response.statusText);
        }
      }).then(data => {
        console.log('Post disliked');
        const likeCount = document.querySelector(`#like-count-${postId}`);
        likeCount.textContent = data.likes - data.dislikes; 
      });
    });
  });
  