/*-----------------------------------------------------------------------------------

 Template Name:Rica
 Template URI: themes.pixelstrap.com/rica
 Description: This is E-commerce website
 Author: Pixelstrap
 Author URI: https://themeforest.net/user/pixelstrap

 ----------------------------------------------------------------------------------- */
// 01.Loader
// 02.Tap to Top
// 03.Footer
// 04.Menu
// 05.Add to cart quantity Counter
// 06.Quantity
// 07.Image to background
// 08.Category page
// 09.Custom Slick Slider js
// 10.Other js
// 11.Theme setting
// 12.Close box when mouseup
// 13.tooltip
// 14.scrollspy

(function ($) {
    "use strict";

    
    /*=====================
     1.Loader
     ==========================*/

    $(window).on('load', function () {
        setTimeout(function(){
            $('.loader-wrapper, .skeleton_loader').fadeOut('slow');
        }, 2000);
        $('.loader-wrapper, .skeleton_loader').remove('slow');
    });

    /*=====================
     2.Tap to Top
     ==========================*/

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 600) {
            $('.tap-top').addClass('top');
        } else {
            $('.tap-top').removeClass('top');
        }
    });

    $('.tap-top').on('click', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    /*=====================
     3. Footer js
     ==========================*/

    var contentwidth = jQuery(window).width();
    if ((contentwidth) < '768') {
        jQuery('.footer-title h5').append('<span class="according-menu"><i class="fas fa-chevron-down"></i></span>');
        jQuery('.footer-title').click(function () {
            jQuery('.footer-title').removeClass('active');
            jQuery('.footer-content').slideUp('normal');
            if (jQuery(this).next().is(':hidden') == true) {
                jQuery(this).addClass('active');
                jQuery(this).find('span').replaceWith('<span class="according-menu"><i class="fas fa-chevron-up"></i></span>');
                jQuery(this).next().slideDown('normal');
            } else {
                jQuery(this).find('span').replaceWith('<span class="according-menu"><i class="fas fa-chevron-down"></i></span>');
            }
        });
        jQuery('.footer-content').hide();
    } else {
        jQuery('.footer-content').show();
    }

    /*=====================
     4. Menu js
     ==========================*/

    $(".toggle-nav, .sidebar-toggle").click(function () {
        $('.nav-menu').css("right", "0px");
        $('.menu-overlay').addClass('show');
        $('body').css("overflow", "hidden");
        $('.theme-setting').addClass("back")
    });
    $(".mobile-back").click(function () {
        $('.nav-menu').css("right", "-410px");
        $('.menu-overlay').removeClass('show');
        $('body').css("overflow", "auto");
        $('.theme-setting').removeClass("back")
    });

    $(".cart").click(function () {
        $('.order-cart-right').css("right", "0px");
    });
    $(".back-btn").click(function () {
        $('.order-cart-right').css("right", "-310px");
    });

    jQuery('.header-sidebar .menu-title').append('<span class="according-menu">+</span>');
      jQuery('.header-sidebar .menu-title').click(function () {
            jQuery(this).removeClass('active');
            jQuery(this).next().slideUp('normal');
            if (jQuery(this).next().is(':hidden') == true) {
                jQuery(this).addClass('active');
                jQuery(this).find('span').replaceWith('<span class="according-menu">-</span>');
                jQuery(this).next().slideDown('normal');
            } else {
                jQuery(this).find('span').replaceWith('<span class="according-menu">+</span>');
            }
        });
    jQuery(this).hide();

    var contentwidth = jQuery(window).width();
    if ((contentwidth) < '1200') {
        jQuery('.menu-title').append('<span class="according-menu">+</span>');
        jQuery('.menu-title').click(function () {
            jQuery(this).removeClass('active');
            jQuery(this).next().slideUp('normal');
            if (jQuery(this).next().is(':hidden') == true) {
                jQuery(this).addClass('active');
                jQuery(this).find('span').replaceWith('<span class="according-menu">-</span>');
                jQuery(this).next().slideDown('normal');
            } else {
                jQuery(this).find('span').replaceWith('<span class="according-menu">+</span>');
            }
        });
        jQuery(this).hide();
    }

    var contentwidth = jQuery(window).width();
    if ((contentwidth) < '1200') {
        jQuery('.submenu-title').append('<span class="according-menu">+</span>');
        jQuery('.submenu-title').click(function () {
            jQuery('.submenu-title').removeClass('active');
            jQuery('.submenu-content').slideUp('normal');
            if (jQuery(this).next().is(':hidden') == true) {
                jQuery(this).addClass('active');
                jQuery(this).find('span').replaceWith('<span class="according-menu">-</span>');
                jQuery(this).next().slideDown('normal');
            } else {
                jQuery(this).find('span').replaceWith('<span class="according-menu">+</span>');
            }
        });
        jQuery('.submenu-content').hide();
    }

     /*=====================
     5. Add to cart quantity Counter
     ==========================*/ 

    $("button.add__button").click(function(){
        $(".qty__box").addClass("open");
    });
    $("button.add-button").click(function(){
        $(this).next().addClass("open");
        $(".order-menu-section .qty-input").val('1');
    });
    $('.order-menu-section .qty-right-plus, .order-cart-right .qty-right-plus').on('click',function(){
        var $qty = $(this).siblings(".qty-input");
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal)) {
            $qty.val(currentVal + 1);
        }
    });
    $('.order-menu-section .qty-left-minus, .order-cart-right .qty-left-minus').on('click',function(){
        var $qty = $(this).siblings(".qty-input");
        var _val =  $($qty).val();
        if(_val == '1') {
            var _removeCls = $(this).parents('.cart_qty');
            $(_removeCls).removeClass("open");
        }
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal) && currentVal > 0) {
            $qty.val(currentVal - 1);
        }
    });

    /*=====================
     6. Quantity js
     ==========================*/

    $('.qty-box .quantity-right-plus').on('click', function () {
        var $qty = $(this).parents(".qty-box").find(".input-number");
        var currentVal = parseInt($qty.val(), 10);
        if (!isNaN(currentVal)) {
            $qty.val(currentVal + 1);
        }
    });
    $('.qty-box .quantity-left-minus').on('click', function () {
        var $qty = $(this).parents(".qty-box").find(".input-number");
        var currentVal = parseInt($qty.val(), 10);
        if (!isNaN(currentVal) && currentVal > 1) {
            $qty.val(currentVal - 1);
        }
    });

    /*=====================
     7. Image to background js
     ==========================*/

    $(".bg-top").parent().addClass('b-top'); // background postion top
    $(".bg-bottom").parent().addClass('b-bottom'); // background postion bottom
    $(".bg-center").parent().addClass('b-center'); // background postion center
    $(".bg-left").parent().addClass('b-left'); // background postion left
    $(".bg-right").parent().addClass('b-right'); // background postion right
    $(".bg_size_content").parent().addClass('b_size_content'); // background size content
    $(".bg-img").parent().addClass('bg-size');
    $(".bg-img.blur-up" ).parent().addClass('blur-up lazyload');
    $('.bg-img').each(function () {

        var el = $(this),
            src = el.attr('src'),
            parent = el.parent();


        parent.css({
            'background-image': 'url(' + src + ')',
            'background-size': 'cover',
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'display': 'block'
        });

        el.hide();
    });

    /*=====================
      8 .Category page
      ==========================*/

    $('.collapse-block-title').on('click', function (e) {
        e.preventDefault;
        var speed = 300;
        var thisItem = $(this).parent(),
            nextLevel = $(this).next('.collection-collapse-block-content');
        if (thisItem.hasClass('open')) {
            thisItem.removeClass('open');
            nextLevel.slideUp(speed);
        }
        else {
            thisItem.addClass('open');
            nextLevel.slideDown(speed);
        }
    });
    $('.color-selector ul li').on('click', function (e) {
        $(".color-selector ul li").removeClass("active");
        $(this).addClass("active");
    });
    $('.product-2-layout-view').on('click', function (e) {
        if ($('.product-wrapper-grid').hasClass("list-view")) { }
        else {
            $(".grid-item").each(function( index ) {
                var classlist = $(this).attr('class');
                var filterClass = $(this).data('class');
                $(this).removeClass(classlist);
                $(this).addClass("col-sm-6 grid-item");
                $(this).addClass(filterClass);
                $('.filter-button-group li.active').trigger( "click" );
            });
        }
    });
    $('.product-3-layout-view').on('click', function (e) {
        if ($('.product-wrapper-grid').hasClass("list-view")) { }
        else {
            $(".grid-item").each(function( index ) {
                var classlist = $(this).attr('class');
                var filterClass = $(this).data('class');
                $(this).removeClass(classlist);
                $(this).addClass("col-xl-4 col-sm-6 grid-item");
                $(this).addClass(filterClass);
                $('.filter-button-group li.active').trigger( "click" );
            });
        }
    });
    $('.product-4-layout-view').on('click', function (e) {
        if ($('.product-wrapper-grid').hasClass("list-view")) { }
        else {
            $(".grid-item").each(function( index ) {
                var classlist = $(this).attr('class');
                var filterClass = $(this).data('class');
                $(this).removeClass(classlist);
                $(this).addClass("col-xl-3 col-lg-4 col-sm-6 grid-item");
                $(this).addClass(filterClass);
                $('.filter-button-group li.active').trigger( "click" );
            });
        }
    });

    /*=====================
     9. Custom Slick Slider js
     ==========================*/

    $('.slide-1').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
    });

    $('.classic-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        dots: true,
        customPaging: function (slider, i) {
            var j = i + 1;
            var thumb = $(slider.$slides[j]).data();
            return '<a class="dot">0' + j + '</a>';
        },
    });

    $('.slide-2').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.slide-3').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.slider-3').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1460,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.team-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.slide-4').slick({
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 586,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.category-4').slick({
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1460,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.slider-4').slick({
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1460,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 586,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.slide-5').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });

    $('.flight-5').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.slide-6').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1367,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }

        ]
    });

    $('.fare-6').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 7,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1367,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll:1,
                    infinite: true
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.center-slider').slick({
        centerMode: true,
        centerPadding: '0',
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.center-slider-full').slick({
        centerMode: true,
        centerPadding: '150px',
        slidesToShow: 2  ,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.center-slider-cab').slick({
        centerMode: true,
        centerPadding: '0',
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    centerPadding: '0',
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '20px',
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.slider-for').each(function(key, item) {

        var sliderIdName = 'slider' + key;
        var sliderNavIdName = 'sliderNav' + key;

        this.id = sliderIdName;
        $('.slider-nav')[key].id = sliderNavIdName;

        var sliderId = '#' + sliderIdName;
        var sliderNavId = '#' + sliderNavIdName;

        $(sliderId).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            asNavFor: sliderNavId
        });

        $(sliderNavId).slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: sliderId,
            arrows: false,
            dots: false,
            centerMode: true,
            focusOnSelect: true
        });

    });

    $('.slider-image').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-thumbnail'
    });
    $('.slider-thumbnail').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        asNavFor: '.slider-image',
        dots: false,
        arrows: false,
        centerMode: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    });

    $('.variable-width').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        centerMode: false,
        variableWidth: true
    });

    /*=====================
     10. Other js
     ==========================*/

     var contentwidth = jQuery(window).width();
     if ((contentwidth) > '319') {
         jQuery('.filter-btn').append('<span class="according-menu"></span>');
         jQuery('.filter-btn').click(function () {
             jQuery('.filter-btn').removeClass('active');
             jQuery('.filter-content').slideUp('normal');
             if (jQuery(this).next().is(':hidden') == true) {
                 jQuery(this).addClass('active');
                 jQuery(this).next().slideDown('normal');
             }
         });
         jQuery('.filter-content').hide();
     } else {
         jQuery('.filter-content').show();
     }
 
     $(".car-select li").click(function () {
         $(this).addClass('active').siblings().removeClass('active');
     });
 
     $(".open-select").click(function () {
         $(this).parent().find(".selector-box, .selector-box-flight").addClass("show");
     });
 
     $(".setting a").click(function () {
         $(".setting-open").toggleClass("show");
     });
 
     $(".search-bar i").click(function () {
         $(".form-control-search").toggleClass("open");
     });
 
     // collection filter
     $('.mobile-filter').on('click', function(e) {
         $('.left-sidebar, .top-filter-section').css("left","-1px");
     });
     $('.back-btn').on('click', function(e) {
         $('.left-sidebar, .top-filter-section').css("left","-365px");
     });
 
     $(".respon-filter-btn").click(function(){
         $(".respon-filter-content").toggleClass("show");
     });
 
     $(".view-map").click(function(){
         $(".onclick-map").toggleClass("show");
     });
 
     $(".popup-btn").click(function(){
         $(".sidebar-popup").toggleClass("open");
     });
 
     var width_content = jQuery(window).width();
     if ((width_content) > '991') {
 
         $(".filter-bottom-title").click(function () {
             $(".filter-bottom-content").slideToggle("");
         });
         $(".close-filter-bottom").click(function () {
             $(".filter-bottom-content").slideUp("");
         });
     }
     else {
         $(".filter-bottom-title").click(function () {
             $(".filter-bottom-content").toggleClass("open");
         });
         $(".close-filter-bottom").click(function () {
             $(".filter-bottom-content").removeClass("open");
         });
     }
 
     // fare calender
       $(".fare-calender").click(function(){
         $(".calender-external").addClass("show");
     });
     $(".modify-search").click(function(){
         $(".flight-search-detail").addClass("show");
     });
     $(".responsive-close").click(function(){
         $(".flight-search-detail").removeClass("show");
     });
 
     // flight top filter
     $(".onclick-title h6").click(function(){
         $(this).parent(".onclick-title").toggleClass("show").siblings().removeClass('show');
     });
 
     // round trip selection
     $(".round_trip .detail-bar .detail-wrap").click(function(){
         $(this).addClass('active').siblings().removeClass('active');
     });
 
     // address select js
     $(".address-sec .select-box").click(function(){
         $(this).addClass('active').siblings().removeClass('active');
     });
 
     // resturant menu smooth scroll
     $('.order-menu .nav-pills a').bind('click', function(e) {
         e.preventDefault(); 
 
         var target = $(this).attr("href"); 
         $('html, body').stop().animate({
             scrollTop: $(target).offset().top
         }, 600, function() {
             location.hash = target; 
         });
 
         return false;
     });
 
     // change on select cab layout
     $('input:radio[name=exampleRadios]').change(function() {
         if (this.value == 'option1') {
             document.getElementById('dropdate').style.display ='block';
         }
         else if (this.value == 'option2') {
             document.getElementById('dropdate').style.display ='none';
         }
     });

    /*=====================
     11. Theme setting js
     ==========================*/

    $('#dark:checkbox').change(function(){
    if($(this).is(":checked")) {
        $('body').addClass('dark');
    } else {
        $('body').removeClass('dark');
    }
    });
    $('#rtl:checkbox').change(function(){
    if($(this).is(":checked")) {
        $('body').addClass('rtl');
    } else {
        $('body').removeClass('rtl');
    }
    });

})(jQuery);


    /*==============================
     12. Close box when mouseup js
     ==============================*/
    $(document).mouseup(function (e) {
        var container = $(".open-select, .selector-box, .selector-box-flight, .fare-calender, .setting");

        if (!container.is(e.target)
            && container.has(e.target).length === 0) {
            $(".selector-box, .selector-box-flight, .calender-external, .setting-open").removeClass("show");
        }
    });

    /*==============================
     13. tooltip js
     ==============================*/
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });







