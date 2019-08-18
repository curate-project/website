window.onload = function () {

    $('#form-pass').on('input', function (e) {
        validateEntries();
    });

    $('#form-pass-confirm').on('input', function (e) {
        validateEntries();
    });

    $('#reset-button').on('click', function (e) {
        e.preventDefault();

        if (validateEntries()) {
            reset();
        }
    });

    function validateEntries() {
        let result = true;

        $('.form__input-error').remove();

        if ($('#form-pass').val().length == 0) {
            result = false;
        }

        if ($('#form-pass-confirm').val().length == 0) {
            result = false;
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

        const hash = window.sha256($('#form-pass').val());
        const confirmHash = window.sha256($('#form-pass-confirm').val());

        if (hash !== confirmHash) {
            result = false;
        }

        if (!result) {
            $('#reset-button').addClass('disabled-btn');
        } else {
            $('#reset-button').removeClass('disabled-btn');
        }

        return result;
    }

    function reset() {

        $('#reset-button').blur();

        const hash = window.sha256($('#form-pass').val());
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.has('code')) {
            $('#reset-button > i').removeClass('d-none');

            $.ajax({
                url: 'https://curate-user-service.herokuapp.com/reset',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    code: urlParams.get('code'),
                    password: hash
                }),
                success: function (data, textStatus) {
                    window.location = 'login.html';
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                    $('#form-pass').after('<span class="form__input-error">invalid login</span>');
                    $('#reset-button > i').addClass('d-none');
                }
            });
        } else {
            $('#form-pass').after('<span class="form__input-error">invalid login</span>');
            $('#reset-button > i').addClass('d-none');
        }
    }
}
