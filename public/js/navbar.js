document.addEventListener('DOMContentLoaded', () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });

        });
    }
});


fetch('/latest-user')
  .then(response => response.json())
  .then(user => {
    // Update the banner message with the latest user's username
    const bannerMessage = `Today is ${new Date().toLocaleDateString()}, Welcome our latest user, ${user.username}! Post your tech related questions, news, or anything about anything that uses electricity! Hope you enjoy your stay!`;
    document.getElementById('banner-text').textContent = bannerMessage;
  })
  .catch(error => console.error('Error:', error));



