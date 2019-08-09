$(function () {

    $('a').each(function () {
        if (location.hostname === this.hostname || !this.hostname.length) {

            var link = $(this).attr("href");

            if (!link) {
                return;
            }
            
            if (link.match("^#") || link.match("^mailto")) {
                // Act as normal 
            } else {
                $(this).click(function (e) {
                    e.preventDefault();
                    $('html').addClass('fadeSiteOut');
                    setTimeout(function () {
                        window.location = link;
                    }, 250);
                });
            }
        }
    });
});