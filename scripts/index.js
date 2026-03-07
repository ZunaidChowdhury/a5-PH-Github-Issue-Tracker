console.log('index.js connected');

document.querySelector('#sign-in-btn').addEventListener('click', e => {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    if (username === 'admin' && password === 'admin123') {
        window.location.assign('./pages/home.html');
    }
    else {
        alert('Sign in failed. Please check your username and password.');
    }
});
