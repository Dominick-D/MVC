const logout = async () => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to log out');
  }
};

document.querySelector('.logout-button').addEventListener('click', logout);
