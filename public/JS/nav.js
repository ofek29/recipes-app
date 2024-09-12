document.addEventListener('DOMContentLoaded', function () {
    loadNavbar();
});

function loadNavbar() {
    console.log('nav bar');

    fetch('/nav.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('nav-bar-div').innerHTML = html;
            // checkUserSignIn(); // After loading the navbar, update the username if the user is signed in
        })
        .catch(error => {
            console.error('Error loading the navbar:', error);
        });
}
