const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#newPostTitle').value.trim();
    const content = document.querySelector('#newPostContent').value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        const newPost = await response.json();
        document.location.replace(`/post/${newPost.id}`);
      } else {
        alert('Failed to create post');
      }
    }
  };
  const newPostForm = document.querySelector('.new-post-form');
  if (newPostForm) {
  newPostForm.addEventListener('submit', newFormHandler);
  }