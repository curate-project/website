$(document).ready(function() {

    const cookieSas = () => {
        document.querySelector('#cookie').style.display = localStorage.cookieSas ? 'none' : '';
    }
    cookieSas()
    document.querySelector('#cookiebtn').addEventListener('click', () => {
        localStorage.cookieSas = true;
        cookieSas()
        console.log("najal?");
    });
    var langdef = window.Cookies.get('language');
    switch (langdef) {
        case 'en':
            langtext = "English";
            break;
        case 'ru':
            langtext = "Russian";
            break;
        case 'kr':
            langtext = "Korean";
            break;
        case 'cn':
            langtext = "China";
            break;
        default:
            langtext = "English";
    };
    console.log(langdef);
    $('.lang').each(function(index, item) {
        $(this).html(arrLang[langdef][$(this).attr('key')]);
    });
    $("#curlang").removeClass();
    $("#curlang").toggleClass(langdef);
    $("#curlang").text(langtext);

});
// Process translation
$(function() {
    $('.languages__body a').on('click', function(e) {
        e.preventDefault();
        $('body').toggleClass('noscroll');
        $('.languages__popup').toggleClass('active');
        $('.languages__overlay').toggleClass('active');
    });
    $('.languages__overlay').on('click', function(e) {
        e.preventDefault();
        $('.languages__popup').removeClass('active');
        $('.languages__overlay').removeClass('active');
        $('body').removeClass('noscroll');
    });
    $('.translate').click(function() {
        var lang = $(this).attr('id');
        var langtext = null;
        switch (lang) {
            case 'en':
                langtext = "English";
                break;
            case 'ru':
                langtext = "Russian";
                break;
            case 'kr':
                langtext = "Korean";
                break;
            case 'cn':
                langtext = "China";
                break;
            default:
                langtext = "English";
        };
        window.Cookies.set('language', lang);
        $("#curlang").removeClass();
        $("#curlang").toggleClass(lang);
        $("#curlang").text(langtext);


        $('.languages__popup').removeClass('active');
        $('.languages__overlay').removeClass('active');
        $('body').removeClass('noscroll');
        $('.lang').each(function(index, item) {
            $(this).html(arrLang[lang][$(this).attr('key')]);
        });
    });
});