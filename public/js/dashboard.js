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
      // Change the text of the message div
      document.querySelector('#passwordMessage').textContent = 'Password updated successfully';
    } else {
      alert('Failed to update password');
    }
  }
};
