window.onload = function () {

    const nameReg = /^[A-Za-z]+\s?\b([A-Za-z]+)?$/;
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    let fullname = '';
    let email = '';

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
            createAccount();
        }
    });

    function validateEntries() {
        let result = true;

        $('.form__input-error').remove();

        if (fullname.length > 0) {
            if (!nameReg.test(fullname)) {
                $('#form-name').after('<span class="form__input-error">invalid name</span>');
                result = false;
            }
        } else {
            result = false;
        }

        if ($('#form-pass').val().length > 0) {
            if ($('#form-pass').val().length < 8) {
                $('#form-pass').after('<span class="form__input-error">invalid password</span>');
                result = false;
            }
        } else {
            result = false;
        }

        if (email.length > 0) {
            if (!emailReg.test(email)) {
                $('#form-mail').after('<span class="form__input-error">invalid e-mail</span>');
                result = false;
            }
        } else {
            result = false;
        }

        if (!$('#form-checkbox').is(':checked')) {
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

        const hash = window.web3.sha3($('#form-pass').val());

        $.ajax({
            url: 'http://localhost:3000/create',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                name: fullname,
                email: email,
                password: hash.substr(2)
            }),
            success: function (data, textStatus) {
                window.sessionStorage.setItem('user', JSON.stringify(data));

                window.localStorage.setItem('registered', true);

                window.location = 'userAccount.html';
            },
            error: function(jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
                // TODO: Handle errors
            }
        })

        $('#create-account').blur();
    }
}
