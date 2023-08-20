<script>
    import { afterUpdate } from "svelte";

    afterUpdate(() => {

        function xsFunction() {
            var xsContact = window.jQuery('.xs-contact-form-wraper'),
                xsMap = window.jQuery('.map-wraper-v2');

                xsMap.css('height', xsContact.outerHeight());
        }

        function email_patern(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }

        // custom xs function init
        xsFunction();

        setTimeout(() => {
            window.jQuery('#preloader').fadeOut();
        }, 500);

        /*==========================================================
                portfolio gird
        ======================================================================*/
        if(window.jQuery('.xs-portfolio-grid').length >0) {
            var $portfolioGrid = window.jQuery('.xs-portfolio-grid'),
            colWidth = function () {
            var w = $portfolioGrid.width(), 
                columnNum = 1,
                columnWidth = 0;
            if (w > 1200) {
                columnNum  = 3;
            } else if (w > 900) {
                columnNum  = 3;
            } else if (w > 600) {
                columnNum  = 2;
            } else if (w > 450) {
                columnNum  = 2;
            } else if (w > 385) {
                columnNum  = 1;
            }
            columnWidth = Math.floor(w/columnNum);
            $portfolioGrid.find('.xs-portfolio-grid-item').each(function() {
                var $item = window.jQuery(this),
                multiplier_w = $item.attr('class').match(/xs-portfolio-grid-item-w(\d)/),
                multiplier_h = $item.attr('class').match(/xs-portfolio-grid-item-h(\d)/),
                width = multiplier_w ? columnWidth*multiplier_w[1] : columnWidth,
                height = multiplier_h ? columnWidth*multiplier_h[1]*0.4-12 : columnWidth*0.5;
                $item.css({
                width: width,
                //height: height
                });
            });
            return columnWidth;
            },
            isotope = function () {
            $portfolioGrid.isotope({
                resizable: false,
                itemSelector: '.xs-portfolio-grid-item',
                masonry: {
                columnWidth: colWidth(),
                gutterWidth: 3
                }
            });
            };
        isotope();
        window.jQuery(window).resize(isotope);
        } // End is_exists

        /*==========================================================
                banner slider
        ======================================================================*/
        if ( window.jQuery( '.xs-banner-slider' ).length > 0 ) {
            var bannerSlider = window.jQuery( ".xs-banner-slider" );
            bannerSlider.owlCarousel( {
                items: 1,
                loop: true,
                mouseDrag: true,
                touchDrag: true,
                dots: false,
                nav: true,
                navText: ['<i class="fa fa-angle-left xs-round-nav"></i>','<i class="fa fa-angle-right xs-round-nav"></i>'],
                autoplay: false,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                responsive : {
                    // breakpoint from 0 up
                    0 : {
                        nav: false,
                    },
                    // breakpoint from 480 up
                    480 : {
                        nav: false,
                    },
                    // breakpoint from 768 up
                    991 : {
                        nav: true,
                    }
                }
            });
        }

        /*==========================================================
                    single item slider
        ======================================================================*/
        if ( window.jQuery( '.xs-single-item-slider' ).length > 0 ) {
            var singleItemSlider = window.jQuery( ".xs-single-item-slider" );
            singleItemSlider.owlCarousel( {
                items: 1,
                loop: true,
                mouseDrag: true,
                touchDrag: true,
                dots: false,
                nav: true,
                navText: ['<i class="fa fa-arrow-left xs-square-nav"></i>','<i class="fa fa-arrow-right xs-square-nav"></i>'],
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                responsive : {
                    // breakpoint from 0 up
                    0 : {
                        nav: false,
                    },
                    // breakpoint from 480 up
                    480 : {
                        nav: false,
                    },
                    // breakpoint from 768 up
                    768 : {
                        nav: true,
                    }
                }
            });
        }
        

        /*==========================================================
                number counter and skill bar animation
        =======================================================================*/

        var number_percentage = window.jQuery(".number-percentage");
        function animateProgressBar(){
            number_percentage.each(function() {
            window.jQuery(this).animateNumbers(window.jQuery(this).attr("data-value"), true, parseInt(window.jQuery(this).attr("data-animation-duration"), 10));
                    var value = window.jQuery(this).attr("data-value");
                    var duration = window.jQuery(this).attr("data-animation-duration");
            window.jQuery(this).closest('.xs-skill-bar').find('.xs-skill-track').animate({
                width: value + '%'
                }, 4500);
            });
        }


        if (window.jQuery('.waypoint-tigger').length > 0) {
            var waypoint = new Waypoint({
                element: document.getElementsByClassName('waypoint-tigger'),
                handler: function(direction) {
                    animateProgressBar();
                }
            });
        }

        /*==========================================================
                skill bar and number counter
        =======================================================================*/

        window.jQuery.fn.animateNumbers = function(stop, commas, duration, ease) {
            return this.each(function() {
                var $this = window.jQuery(this);
                var start = parseInt($this.text().replace(/,/g, ""), 10);
                commas = (commas === undefined) ? true : commas;
                window.jQuery({
                    value: start
                }).animate({
                    value: stop
                }, {
                    duration: duration == undefined ? 500 : duration,
                    easing: ease == undefined ? "swing" : ease,
                    step: function() {
                        $this.text(Math.floor(this.value));
                        if (commas) {
                            $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                        }
                    },
                    complete: function() {
                        if (parseInt($this.text(), 10) !== stop) {
                            $this.text(stop);
                            if (commas) {
                                $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                            }
                        }
                    }
                });
            });
        };


        /*==========================================================
                mega navigation menu init
        ======================================================================*/
        if (window.jQuery('.xs-menus').length > 0) {
            window.jQuery('.xs-menus').xs_nav({
                mobileBreakpoint: 992,
            });
        }
        
        /*==========================================================
                countdown timer
        ======================================================================*/
        window.jQuery('.xs-countdown-timer[data-countdown]').each(function() {
            var $this = window.jQuery(this), 
                finalDate = window.jQuery(this).data('countdown');

                $this.countdown(finalDate, function(event) {
                var $this = window.jQuery(this).html(event.strftime(' ' 
                + '<span class="timer-count">%-D <span class="timer-title">Days</span></span>  ' 
                + '<span class="timer-count">%H <span class="timer-title">Hours</span></span> ' 
                + '<span class="timer-count">%M <span class="timer-title">Minutes</span></span> ' 
                + '<span class="timer-count">%S <span class="timer-title">Secods</span></span>'));
            });
        });

        /*==========================================================
                back to top
        ======================================================================*/ 
        window.jQuery(document).on('click', '.xs-back-to-top', function(event) {
            event.preventDefault();
            /* Act on the event */

            window.jQuery('html, body').animate({
                scrollTop: 0,
            }, 1000);
        });

        /*=============================================================
                        insta feed
        =========================================================================*/
        if (window.jQuery('.xs-demoFeed').length > 0) {
            window.jQuery.fn.spectragram.accessData = {
                accessToken: '1764162550.ba4c844.679392a432894982bf6a31ec20d8acb0',
                clientID: '289a98508b934dd49a68144b79209813'
            };
            window.jQuery('.xs-demoFeed').spectragram('getUserFeed',{
                query: 'natgeo',
                max: 9,
                size: 'small',
            });
        }

        /*=============================================================
                        video popup
        =========================================================================*/
        if (window.jQuery('.xs-video-popup').length > 0) {
            window.jQuery('.xs-video-popup').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        }

        /*=============================================================
                        image popup
        =========================================================================*/
        window.jQuery('.xs-image-popup').magnificPopup({
            type: 'image',
            closeOnContentClick: false,
            closeBtnInside: false,
            mainClass: 'mfp-with-zoom mfp-img-mobile',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
            }
            
        });

        /*==========================================================
                map window opener add class
        ======================================================================*/
        window.jQuery(document).on('click', '.xs-window-opener', function() {
            // body...
            event.preventDefault();

            var main_wraper = window.jQuery('.xs-widnow-wraper'),
                active_class= 'active';

            if (window.jQuery(this).parent().parent().hasClass(active_class)) {
                window.jQuery(this).parent().parent().removeClass(active_class);
            } else {
                window.jQuery(this).parent().parent().addClass(active_class);
            }
        });

        /*=====================================================
                Contact From dynamic
        =====================================================*/
        if (window.jQuery('#xs-contact-form').length > 0) {
            window.jQuery('#xs-contact-form').on('submit', function(event) {
                event.preventDefault();
        
                window.jQuery('.xpeedStudio_success_message').remove();
        
                var name = window.jQuery('#xs-name'),
                    email = window.jQuery('#xs-email'),
                    massage = window.jQuery('#xs-massage'),
                    submit = window.jQuery('#xs-submit'),
                    error = false;
                
                if(name.val() === '') {
                    error = true;
                    name.parent().addClass('invaild');
                    name.focus();
                    return false;
                } else {
                    name.parent().removeClass('invaild');
                }
                if (!email_patern(email.val().toLowerCase())) {
                    error = true;
                    email.parent().addClass('invaild');
                    email.focus();
                    return false;
                } else if(email.val() === '') {
                    error = true;
                    email.parent().addClass('invaild');
                    email.focus();
                    return false;
                } else {
                    email.parent().removeClass('invaild');
                }
                if(massage.val() === '') {
                    error = true;
                    massage.parent().addClass('invaild');
                    massage.focus();
                    return false;
                } else {
                    massage.parent().removeClass('invaild');
                }
        
                if (error === false) {
                    window.jQuery.ajax({
                            type: "POST",
                            url: "assets/php/contact-form.php",
                            data: {
                            'name' : name.val(),
                            'email' : email.val(),
                            'massage' : massage.val()
                        },
                        success: function(result){
                            submit.after('<p class="xpeedStudio_success_message">' + result + '</p>').fadeIn();
                            setTimeout(() => {
                                window.jQuery('.xpeedStudio_success_message').fadeOut();
                            }, 3000);
                            window.jQuery('#xs-contact-form')[0].reset();
                        }
                    });
                }
            });
        }
    });
</script>