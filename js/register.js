var Cookies = null;
var email = '';
var fullname = '';

const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
const nameReg = /^[A-Za-z]+\s?\b([A-Za-z]+)?$/;

function validateEntries() {
    let result = true;

    $('.form__input-error').remove();

    if (fullname.length > 0) {
        if (!nameReg.test(fullname)) {
            $('#form-name').after('<span class="form__input-error">invalid name</span>');
            $('#form-name').addClass('input-error');
            result = false;
        } else {
            $('#form-name').removeClass('input-error');
        }
    } else {
        result = false;
        $('#form-name').removeClass('input-error');
    }

    if ($('#form-pass').val().length > 0) {
        if ($('#form-pass').val().length < 8) {
            $('#form-pass').after('<span class="form__input-error">invalid password</span>');
            $('#form-pass').addClass('input-error');
            result = false;
        } else {
            $('#form-pass').removeClass('input-error');
        }
    } else {
        result = false;
        $('#form-pass').removeClass('input-error');
    }

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

    if (!$('#form-checkbox').is(':checked')) {
        result = false;
    }

    if (!window.captchaToken || window.captchaToken === '') {
        result = false;
    }

    if (!result) {
        $('#create-account').addClass('disabled-btn');
    } else {
        $('#create-account').removeClass('disabled-btn');
    }

    return result;
}

function createAccount() {

    const hash = window.sha256($('#form-pass').val());

    $('#create-account > i').removeClass('d-none');

    $.ajax({
        url: 'https://curate-user-service.herokuapp.com/create',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            name: fullname,
            email: email,
            password: hash
        }),
        success: function (data, textStatus) {
            Cookies.set('user', data);

            Cookies.set('registered', true);

            window.location = 'userAccount.html';
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
            $('#create-account > i').addClass('d-none');
        }
    })

    $('#create-account').blur();
}

window.onload = function () {

    Cookies = window.Cookies;

    $('#form-name').on('input', function (e) {
        fullname = e.target.value;
        validateEntries();
    });

    $('#form-pass').on('input', function (e) {
        validateEntries();
    });

    $('#form-mail').on('input', function (e) {
        email = e.target.value;
        validateEntries();
    });

    $('#form-checkbox').on('change', function (e) {
        validateEntries();
    });

    $('#create-account').on('click', function (e) {
        e.preventDefault();

        if (validateEntries()) {
            $('#create-account').blur();
            $('#create-account > i').addClass('d-none');

            $.ajax({
                url: 'https://curate-user-service.herokuapp.com/captcha',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    token: window.captchaToken
                }),
                success: function (data, textStatus) {
                    createAccount();
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                    window.grecaptcha.reset(window.captchaWidgetId);
                    $('#create-account > i').addClass('d-none');
                }
            })
        }
    });
}
