window.onload = function () {

    var accountAvatar = document.getElementsByClassName("account__avatar")[0];
    var accountMenu = document.getElementsByClassName("account__menu")[0];
    var avatarAngle = document.getElementsByClassName("account__avatar-angle")[0];
    accountAvatar.addEventListener("click", function () {
        accountMenu.classList.toggle("account__menu--show");
        avatarAngle.classList.toggle("account__avatar-angle--show"); 
    });

    $('.account__menu-item--logout').on('click', function() {
        window.sessionStorage.removeItem('user');
        window.location = "../index.html";
    });

    const user = JSON.parse(window.sessionStorage.getItem('user'));
    console.log(JSON.stringify(user));

    $('#user-name, #user-avatar-label').text(user.name);
    $('#user-email').text(user.email);
    $('#user-created').text(new Date(user.created).toLocaleDateString());
}
