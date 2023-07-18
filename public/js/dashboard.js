const passwordUpdateFormHandler = async (event) => {
    event.preventDefault();
  
    const password = document.querySelector('#password-update').value.trim();
  
    if (password) {
      const response = await fetch('/api/users/update-password', {
        method: 'PUT',
        body: JSON.stringify({ password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert('Password updated successfully');
      } else {
        alert('Failed to update password');
      }
    }
  };
  
  document
    .querySelector('.password-update-form')
    .addEventListener('submit', passwordUpdateFormHandler);
  