var Cookies = null;
var email = '';
const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

function validateEntries() {
    let result = true;

    $('.form__input-error').remove();

    email = $('#form-mail').val();

    if (email.length > 0) {
        if (!emailReg.test(email)) {
            $('#form-mail').after('<span class="form__input-error">invalid e-mail</span>');
            $('#form-mail').addClass('input-error');
            result = false;
        } else {
            $('#form-mail').removeClass('input-error');
        }
    } else {
        result = false;
        $('#form-mail').removeClass('input-error');
    }

    if ($('#form-pass').val().length == 0) {
        if ($('#form-pass:-webkit-autofill').length === 0) {
            result = false;
        }
    }

    if (!window.captchaToken || window.captchaToken === '') {
        result = false;
    }

    if (!result) {
        $('#login-button').addClass('disabled-btn');
    } else {
        $('#login-button').removeClass('disabled-btn');
    }

    return result;
}

function login() {

    $('#login-button').blur();
    $('#login-button > i').removeClass('d-none');

    const hash = window.sha256($('#form-pass').val());

    $.ajax({
        url: 'https://curate-user-service.herokuapp.com/login',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            email: email,
            password: hash
        }),
        success: function (data, textStatus) {
            Cookies.set('user', JSON.stringify(data));

            if (rememberMe) {
                Cookies.set('remembered', true);
                Cookies.set('email', email);
            } else {
                Cookies.remove('remembered');
                Cookies.remove('email');
            }

            window.location = 'userAccount.html';
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
            $('#form-pass').after('<span class="form__input-error">invalid login</span>');
            $('#login-button > i').addClass('d-none');
        }
    })
}

window.onload = function () {

    Cookies = window.Cookies;

    let rememberMe = Cookies.get('remembered');

    $('#form-checkbox').prop('checked', rememberMe);

    if (rememberMe) {
        email = Cookies.get('email');
        $('#form-mail').val(email);
    }

    $('#form-pass').on('input', function (e) {
        validateEntries();
    });

    $('#form-mail').on('input', function (e) {
        // email = e.target.value;
        validateEntries();
    });

    $('#form-checkbox').on('change', function (e) {
        rememberMe = $('#form-checkbox').is(':checked');
    });

    $('#login-button').on('click', function (e) {
        e.preventDefault();

        if (validateEntries()) {
            $.ajax({
                url: 'https://curate-user-service.herokuapp.com/captcha',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    token: window.captchaToken
                }),
                success: function (data, textStatus) {
                    login();
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                    $('#form-pass').after('<span class="form__input-error">invalid login</span>');
                    $('#login-button > i').addClass('d-none');
                }
            })
        }
    });
}