const passwordUpdateFormHandler = async (event) => {
  event.preventDefault();

  const currentPassword = document.querySelector('#current-password').value.trim();
  const newPassword = document.querySelector('#password-change').value.trim();

  if (currentPassword && newPassword) {
    const response = await fetch('/api/users/update-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const passwordUpdateForm = document.querySelector('.password-update-form');
      if (passwordUpdateForm) {
        passwordUpdateForm.addEventListener('submit', passwordUpdateFormHandler);
      }
    } else {
      alert('Failed to update password');
    }
  }
};

document.querySelectorAll('.delete-post').forEach(button => {
  button.addEventListener('click', async (event) => {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete post');
    }
  });
});
