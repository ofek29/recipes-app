// sign-in management
document.getElementById('sign-in-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        email: document.getElementById('email-si').value,
        password: document.getElementById('password-si').value,
    };

    try {
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json(); //??

        if (response.ok) {
            // console.log(`${JSON.stringify(response.cookies)}`);
            const username = result.username;
            console.log(username); // add jtw as cookie foe returning user name
            // updateNavbarUsername(username);// todo add sign in check func from cookie- done!
            window.location.href = 'index.html';
        }
    } catch (error) {
        alert(error.message, 'Sign in failed'); // TODO error handling
    }
});
