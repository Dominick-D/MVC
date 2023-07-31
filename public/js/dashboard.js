document.addEventListener('DOMContentLoaded', () => {
  const passwordUpdateForm = document.querySelector('.password-update-form');
  if (passwordUpdateForm) {
    passwordUpdateForm.addEventListener('submit', passwordUpdateFormHandler);
  }
});

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
      alert('Password changed successfully');
      document.location.reload();
    } else {
      console.log(await response.json());
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


document.querySelectorAll('.edit-post-form').forEach(form => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');
    const title = document.querySelector(`#post-title-${id}`).value.trim();
    const content = document.querySelector(`#post-content-${id}`).value.trim();

    if (title && content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to update post');
      }
    }
  });
});


