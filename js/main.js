$(function () {
    "use strict";

    (function () {
        var triangleStyle = {
            "position": "absolute",
            "top": "0px",
            "border": "5px solid transparent",
            "border-bottom": "5px solid #3ebcd4"
        };

        $.each($(".main-header-navigation__sub-menu"), function (i, v) {
            var triangle = $("<div class='triangle'>");
            triangle.css(triangleStyle);
            $(v).append(triangle);
        });


        $(".main-header-navigation__item").on("mouseenter", function (e) {
            var subMenu = $(this).children(".main-header-navigation__sub-menu");
            $(subMenu.find(".triangle")).css("left", "" + ($(this).position().left + ($(this).width() / 2)) + "px");
            subMenu.css("display", "block");
        });

        $(".main-header-navigation__item").on("mouseleave", function (e) {
            var subMenu = $(this).children(".main-header-navigation__sub-menu");
            subMenu.css("display", "none");
        });
    })();
});
