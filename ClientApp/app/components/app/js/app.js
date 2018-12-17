export function appJS() {

    $(document).ready(function () {
        setTimeout(function () {
            $('.preloader').fadeOut('slow', function () { });
        }, 1000);
    });

};