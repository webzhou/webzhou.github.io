(function(a) {

    a.fn.touchSwiper = function(j) {
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
        });

        var opt = {
            parentele: '.cont',
            ele: ".cont section",
            active: "cur",
            direct: 'vertical', //vertical|horizontal
            min_move_x: 20,
            min_move_y: 20,
            pos: 0,
            end: 0
        };

        var k = 0,
            i = this,
            d = false,
            g = a(opt.ele).size(),
            f = a(window).height(),
            w = a(window).width(),
            mid;
        if (j) {
            a.extend(opt, j);
            a(opt.ele).css({
                width: w + 'px',
                height: f + 'px'
            });
            if (opt.direct == 'horizontal') {
                a(opt.parentele).css({
                    width: w * g + 'px'
                });
                a(opt.ele).css({
                    'float': 'left'
                });
            }
        };
        this.each(function() {
            this.addEventListener("touchstart", this, false);
            this.addEventListener("touchmove", this, false);
            this.addEventListener("touchend", this, false);

            this.handleEvent = function(c) {
                switch (c.type) {
                    case "touchstart":
                        this.onTouchStart(c);
                        break;
                    case "touchmove":
                        this.onTouchMove(c);
                        break;
                    case "touchend":
                        this.onTouchEnd(mid);
                        break
                }
            };

            this.removeListener = function() {
                this.removeEventListener("touchmove", this.onTouchMove);
                opt.pos = null;
                d = false
            };
            this.onTouchStart = function(c) {
                opt.pos = opt.end = this.getTouchPoints(c);
                mid = 0;
                d = true;
                this.addEventListener("touchmove", this.onTouchMove, false);
            };
            this.onTouchMove = function(m) {
                opt.end = this.getTouchPoints(m);

                if (opt.direct == 'horizontal') {
                    mid = opt.end.x - opt.pos.x;
                    var midx = mid - k * w;
                    i.find('.cont').css({
                        "-webkit-transform": "translate3d(" + midx + "px,0, 0)",
                        "transform": "translate3d(" + midx + "px,0, 0)",
                        '-webkit-transition': 'none',
                        'transition': 'none'
                    });
                } else {
                    mid = opt.end.y - opt.pos.y;
                    var midy = mid - k * f;
                    i.find('.cont').css({
                        "-webkit-transform": "translate3d(0," + midy + "px, 0)",
                        "transform": "translate3d(0," + midy + "px, 0)",
                        '-webkit-transition': 'none',
                        'transition': 'none'
                    });
                }
            };

            this.onTouchEnd = function(c) {
                if (opt.direct == 'horizontal') {
                    if (Math.abs(c) >= opt.min_move_x) {
                        if (c > 0) {
                            if (k > 0) {
                                k--;
                                animateTo(k)
                            } else {
                                i.find('.cont').css({
                                    "-webkit-transform": "translate3d(0, 0, 0)",
                                    "transform": "translate3d(0, 0, 0)",
                                    '-webkit-transition': ' .5s ease',
                                    'transition': ' .5s ease'
                                });
                            }
                        } else {
                            if (k <= g - 2) {
                                k++;
                                animateTo(k)
                            } else {
                                i.find('.cont').css({
                                    "-webkit-transform": "translate3d(-" + (g - 1) * w + "px,0, 0)",
                                    "transform": "translate3d(-" + (g - 1) * w + "px, 0,0)",
                                    '-webkit-transition': ' .5s ease',
                                    'transition': ' .5s ease'
                                });
                            }
                        }
                    } else {
                        i.find('.cont').css({
                            "-webkit-transform": "translate3d(-" + k * w + "px,0,0)",
                            "transform": "translate3d( -" + k * w + "px,0,0)",
                            '-webkit-transition': ' .5s ease',
                            'transition': ' .5s ease'
                        });
                    }
                } else {
                    if (Math.abs(c) >= opt.min_move_y) {
                        if (c > 0) {
                            if (k > 0) {
                                k--;
                                animateTo(k)
                            } else {
                                i.find('.cont').css({
                                    "-webkit-transform": "translate3d(0, 0, 0)",
                                    "transform": "translate3d(0, 0, 0)",
                                    '-webkit-transition': ' .5s ease',
                                    'transition': ' .5s ease'
                                });
                            }
                        } else {
                            if (k <= g - 2) {
                                k++;
                                animateTo(k)
                            } else {
                                i.find('.cont').css({
                                    "-webkit-transform": "translate3d(0,-" + (g - 1) * f + "px, 0)",
                                    "transform": "translate3d(0,-" + (g - 1) * f + "px, 0)",
                                    '-webkit-transition': ' .5s ease',
                                    'transition': ' .5s ease'
                                });
                            }
                        }
                    } else {
                        i.find('.cont').css({
                            "-webkit-transform": "translate3d(0, -" + k * f + "px, 0)",
                            "transform": "translate3d(0, -" + k * f + "px, 0)",
                            '-webkit-transition': ' .5s ease',
                            'transition': ' .5s ease'
                        });
                    }
                }
            };

            this.getTouchPoints = function(m) {
                var h = m,
                    l = (typeof m.changedTouches != "undefined") ? m.changedTouches : [m],
                    c = l[l.length - 1],
                    n;
                if (h.type === "pointer") {
                    n = {
                        x: c.x,
                        y: c.y
                    }
                } else {
                    if (h.type === "touchstart" || h.type == "touchmove") {
                        n = {
                            x: c.pageX,
                            y: c.pageY
                        }
                    } else {
                        n = {
                            x: m.pageX,
                            y: m.pageY
                        }
                    }
                }
                return n
            };
            $('.arr').on('touchstart', function() {
                if (k <= g - 2) {
                    k++;
                    animateTo(k)
                }
            });
            var animateTo = function(e) {
                var m;
                if (opt.direct == 'horizontal') {
                    i.find('.cont').css({
                        "-webkit-transform": "translate3d( -" + w * e + "px,0, 0)",
                        "transform": "translate3d( -" + w * e + "px,0, 0)",
                        '-webkit-transition': ' .5s ease',
                        'transition': ' .5s ease'
                    });
                } else {
                    i.find('.cont').css({
                        "-webkit-transform": "translate3d(0, -" + f * e + "px, 0)",
                        "transform": "translate3d(0, -" + f * e + "px, 0)",
                        '-webkit-transition': ' .5s ease',
                        'transition': ' .5s ease'
                    });
                }


                var music = document.getElementById("audios");
                var music2 = document.getElementById("audios2");

                $(".arr").on("click", function() {
                    music.pause();
                    music2.play();
                })
                if (k == 0) {
                    music.play();
                    music2.pause();
                    $(".music").on("touchstart", function() {
                        if (!music.paused) { music.pause(); } else { music.play() }
                    });
                }
                if (k == 1) {
                    console.log(k)
                    music.pause();
                    music2.play();

                    $(".music").on("touchstart", function() {
                        if (!music2.paused) { music2.pause(); } else { music2.play() }
                    });
                }
                if (k == 5) {
                    console.log(k)
                        //					$('.arr').hide();
                }

                if (k == g - 1) {
                    $('.arr').hide();
                }
                if (k == 1) {
                    $('.arr').hide();
                } else {
                    $('.arr').show();
                }
                setTimeout(function() {
                    a(opt.ele).eq(e).addClass(opt.active).siblings().removeClass(opt.active)
                }, 500);
            };
        });
        return this;
    }
    $.fn.screenCheck = function() {
        var pDiv = $('<div></div>');
        pDiv.addClass("screenCheck");
        pDiv.attr("id", "screen")
        pDiv.css({
            "display": "none",
            "width": "100%",
            "height": "100%",
            "position": "absolute",
            "left": 0,
            "top": 0,
            "z-index": "1000",
            "background": "rgba(0,0,0,0.9)",

        })
        var svg = '<svg class="svg" width="100" height="100" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="transform-group"><g transform="scale(0.03125, 0.03125)"><path d="M864.4 67.2 541.9 67.2c-52.8 0-95.6 43.1-95.6 96.2l0 697.3c0 53.1 42.8 96.2 95.6 96.2l322.6 0c52.8 0 95.6-43.1 95.6-96.2L960.1 163.4C960 110.3 917.2 67.2 864.4 67.2zM625.5 151.4l155.3 0 0 36.1L625.5 187.5 625.5 151.4zM569.5 151.8c10.3 0 18.6 8.4 18.6 18.7 0 10.3-8.3 18.7-18.6 18.7s-18.6-8.4-18.6-18.7C550.9 160.2 559.2 151.8 569.5 151.8zM712 886.3c-17.9 0-32.4-14.6-32.4-32.6 0-18 14.5-32.6 32.4-32.6 17.9 0 32.4 14.6 32.4 32.6C744.4 871.7 729.9 886.3 712 886.3zM900.3 800.5 506 800.5l0-577 394.3 0L900.3 800.5zM207.3 588.3l-59.7 0 0 180.3 59.7 0L207.3 588.3zM183.5 744.6l-12 0L171.5 612.3l12 0L183.5 744.6zM407.9 528l0-24L247.2 504l0 364.7 160.7 0 0-24L271 844.7 271 528 407.9 528zM178.6 854c16.8 0 30.5-13.8 30.5-30.7 0-16.9-13.7-30.7-30.5-30.7-16.8 0-30.5 13.8-30.5 30.7C148.1 840.2 161.8 854 178.6 854zM178.6 816.6c3.7 0 6.7 3 6.7 6.7 0 3.7-3 6.7-6.7 6.7-3.7 0-6.7-3-6.7-6.7C171.9 819.6 174.9 816.6 178.6 816.6zM64 524l0 324.6c0 59.6 48.2 108.2 107.5 108.2l236.4 0 0-24L171.5 932.8c-46.1 0-83.7-37.8-83.7-84.2L87.8 524c0-46.4 37.5-84.2 83.7-84.2l236.4 0 0-24L171.5 415.8C112.2 415.9 64 464.4 64 524zM274 155.6c3.3-0.4 6.6-0.7 9.9-1L241 203.6l17.9 15.9 71.2-81.2-89.5-61.9-13.5 19.8 50.7 35c-2.3 0.2-4.5 0.4-6.8 0.7-95.1 12.4-168.1 84.9-186.4 174.5l22.9 7C123 232.4 188.5 166.8 274 155.6z" fill="#ecf0f1"></path></g></g></svg><p>请将屏幕调正</p>';

        var cDiv = $("<div></div>")
        cDiv.css({
            "width": "150px",
            "height": "150px",
            "position": "absolute",
            "left": 0,
            "right": 0,
            "top": 0,
            "bottom": 0,
            "color": "#fff",
            "margin": "auto",
            "text-align": "center",
            "font-size": "20px"
        })

        cDiv.html(svg);

        cDiv.appendTo(pDiv);
        this.append(pDiv);
        var updateOrientation = function() {
            if (window.orientation == '-90' || window.orientation == '90') {
                $('#screen').show()
            } else {
                $('#screen').hide()
            }
        };
        window.onorientationchange = updateOrientation;
    }

})(jQuery);
$("body").screenCheck();
