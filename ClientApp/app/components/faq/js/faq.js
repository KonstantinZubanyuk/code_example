export function faqJS() {
    $('a[href^="#"], *[data-href^="#"]').on('click', function (e) {
        e.preventDefault();
        var t = 1000;
        var d = $(this).attr('data-href') ? $(this).attr('data-href') : $(this).attr('href');
        $('html,body').stop().animate({ scrollTop: $(d).offset().top }, t);
    });
};

export function faqCollapseAccordion() {
    setTimeout(function() {
        $('.faq-card .to-collapse').removeClass("show");
        $('.faq-card .card-header .mb-0 .to-collapse').addClass("collapsed");
    }, 100);
};