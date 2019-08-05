window.onload = function() {

    const user = JSON.parse(window.sessionStorage.getItem('user'));
    console.log(JSON.stringify(user));

    $('#user-name, #user-avatar-label').text(user.name);
    $('#user-email').text(user.email);
    $('#user-created').text(new Date(user.created).toLocaleDateString());
}
