window.onload = function () {
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    let email = '';
    let rememberMe = window.localStorage.getItem('remembered'); // TODO: Initialize

    $('#form-checkbox').prop('checked', rememberMe);

    if (rememberMe) {
        email = window.localStorage.getItem('email');
        $('#form-mail').val(email);
    }

    $('#form-pass').on('input', function (e) {
        validateEntries();
    });

    $('#form-mail').on('input', function (e) {
        email = e.target.value;
        validateEntries();
    });

    $('#form-checkbox').on('change', function (e) {
        rememberMe = $('#form-checkbox').is(':checked');
    });

    $('#login-button').on('click', function (e) {
        e.preventDefault();

        if (validateEntries()) {
            login();
        }
    });

    function validateEntries() {
        let result = true;

        $('.form__input-error').remove();

        if (email.length > 0) {
            if (!emailReg.test(email)) {
                $('#form-mail').after('<span class="form__input-error">invalid e-mail</span>');
                result = false;
            }
        } else {
            result = false;
        }

        if ($('#form-pass').val().length == 0) {
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

        const hash = window.web3.sha3($('#form-pass').val());

        $.ajax({
            url: 'http://localhost:3000/login',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                email: email,
                password: hash.substr(2)
            }),
            success: function (data, textStatus) {
                window.sessionStorage.setItem('user', JSON.stringify(data));

                if (rememberMe) {
                    window.localStorage.setItem('remembered', true);
                    window.localStorage.setItem('email', email);
                } else {
                    window.localStorage.removeItem('remembered');
                    window.localStorage.removeItem('email');
                }

                window.location = 'userAccount.html';
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
                // TODO: Handle errors
            }
        })
    }
}
