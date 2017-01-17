$(function () {
    "use strict";

    //dropdown menu
    (function () {
        if ($(window).width() > 1050) {
            var triangleStyle = {
                "position": "absolute",
                "top": "0px",
                "border": "5px solid transparent",
                "border-bottom": "5px solid #3ebcd4"
            };

            var mouseOnChild = true;

            $.each($(".main-header-navigation__sub-menu"), function (i, v) {
                var triangle = $("<div class='triangle'>");
                triangle.css(triangleStyle);
                $(v).append(triangle);
            });

            $(".main-header-navigation__sub-menu").on("mouseenter", function (e) {
                mouseOnChild = true;
            });

            $(".main-header-navigation__sub-menu").on("mouseleave", function (e) {
                mouseOnChild = false;
                $(this).css("display", "none");
            });

            $(".main-header-navigation__item").on("mouseenter", function (e) {
                $(".main-header-navigation__sub-menu").css("display", "none");
                var subMenu = $(this).children(".main-header-navigation__sub-menu");
                $(subMenu.find(".triangle")).css("left", "" + ($(this).position().left + ($(this).width() / 2)) + "px");
                subMenu.css("display", "block");
            });

            $(".main-header-navigation__item").on("mouseleave", function (e) {
                if (!mouseOnChild) {
                    var subMenu = $(this).children(".main-header-navigation__sub-menu");
                    subMenu.css("display", "none");
                    mouseOnChild = true;
                }
            });
        }
    })();

    //main slider
    (function () {
        var images        = $(".slider-main__image"),
            links         = $(".slider-main__link"),
            sliderElement = $(".slider-main"),
            currentIndex  = 0;

        sliderElement.css("background-image", "url(" + $(images[0]).prop("src") + ")");
        showPagination();
        $($(".slider-main__pagination-item")[0]).addClass("slider-main__pagination-item--active");

        var interval = setInterval(function () {
            currentIndex++;
            setImage();
            selectPaginationSlide(currentIndex);
        }, 6000);

        sliderElement.on("click", function (e) {
            setLocation(e, $(links[currentIndex]));
        });
        
        $(".slider-main__prev-arrow").on("click", function (e) {
            clearInterval(interval);
            selectPaginationSlide(--currentIndex);
        });

        $(".slider-main__next-arrow").on("click", function (e) {
            clearInterval(interval);
            selectPaginationSlide(++currentIndex);
        });

        $(document).on("click", ".slider-main__pagination-item", function (e) {
            selectPaginationSlide($(this).text() - 1);
            clearInterval(interval);
        });

        function selectPaginationSlide(index) {
            index = (index > 2) ? 0 : index;
            index = (index < 0) ? 2 : index;

            var items = $(".slider-main__pagination-item");
            items.removeClass("slider-main__pagination-item--active");
            $(items[index]).addClass("slider-main__pagination-item--active");
            currentIndex = index;
            setImage();
        }

        function showPagination() {
            var paginationWrap = $(".slider-main__pagination-wrap");
            var paginationItem = $("<div class='slider-main__pagination-item'></div>");

            for (var i = 0; i < images.length; i++) {
                var item = paginationItem.clone();
                item.text(i + 1);
                paginationWrap.append(item);
            }
        }
        
        function setLocation(e, link) {
            if ($(e.target).hasClass("slider-main") || $(e.target).hasClass("slider-main__wrapper")) {
                window.location = link.prop("href");
            }
        }

        function setImage() {
            if (currentIndex >= images.length) {
                currentIndex = 0;
            }
            else if (currentIndex < 0) {
                currentIndex = images.length - 1;
            }

            var currentImage = $(images[currentIndex]);
            sliderElement.css("background-image", "url(" + currentImage.prop("src") + ")");
        }
    })();

    //init tabs on main page (special products section)
    (function () {
        $(".special-products-main__tabs-control-link").click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
    })();

    //main page carousel (tabs section)
    (function () {
        $(".main-carousel").owlCarousel();
    })();

    (function () {
        $('[data-toggle="tooltip"]').tooltip()
    })();

    (function () {
        if ($("#vk_groups").length > 0) {
            VK.Widgets.Group("vk_groups", {mode: 0, width: "260"}, 127991612);
        }
    })();

    (function () {
        $(".product-item__minus-but").on("click", function (e) {
            e.preventDefault();

            var val = $(this).siblings("input").val();
            if (val > 1) {
                $(this).siblings("input").val(--val);
            }
        });

        $(".product-item__plus-but").on("click", function (e) {
            e.preventDefault();

            var val = $(this).siblings("input").val();
            $(this).siblings("input").val(++val);
        });
    })();
});
