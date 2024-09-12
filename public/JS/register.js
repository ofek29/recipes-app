//---- sign-up management ----//
document.getElementById('sign-up-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        userName: document.getElementById('user-name-su').value,
        email: document.getElementById('email-su').value,
        password: document.getElementById('password-su').value,
        phone: document.getElementById('phone-su').value,
        confirmPassword: document.getElementById('confirm-password-su').value
    }
    if (formData.password !== formData.confirmPassword) { //what to do?
        alert('Passwords do not match!');
        return;
    };
    try {
        const response = await fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const result = await response.json;
        if (response.ok) {
            console.log('Success registration - signup successful');

            Window.location.href = 'login.html'; // TODO check for auto login
        }
    } catch (error) {
        alert(error.message, 'sing in failed'); // TODO error handling
    }
});
