// Created by sam mok 2015(Siso brand interactive team).

"use strict";

var app = {
    config: function (){
        //  vertical center the paper
        var offsetTop = (parseInt($('body').height()) - parseInt($('#main').height())) / 2 + 'px';
        $('#main').css({'top': offsetTop});
    },

    create: function (){
        //  audio controller
        // ------------------------------------------------
        var audio = {
            playStatue: false,

            play: function (){
                $('.radio').addClass('play');
                $('audio')[0].play();
                this.playStatue = true;
            },

            pause: function (){
                $('.radio').removeClass('play');
                $('audio')[0].pause();
                this.playStatue = false;
            }
        };

        //  bind audio switch
        $('.radio').click(function (){
            if (audio.playStatue) {
                audio.pause();
            } else {
                audio.play();
            }
        });

        //  scene start
        // ------------------------------------------------
        function sceneStart (){
            setTimeout(function (){
                //  show and play radio
                setTimeout(function (){
                    //  show
                    $('.radio').addClass('animated bounceIn');

                    //  play
                    setTimeout(function (){
                        audio.play();
                    }, 400);
                }, 700);

                //  into sceneMain
                setTimeout(function (){
                    sceneMain();
                }, 3000);
            }, 1000);
        }

        //  this index recording the current scene number
        var sceneIndex = 4;  // scene is letter 1 now cause 1

        //  sceneMain
        // ------------------------------------------------
        function sceneMain (){
            /**
             *  First sceneStart out,
             *  letter in,
             *  then postmark in,
             *  paper machine in,
             *
             *  This scene still show 13 seconds then checkout to next scene
            * */
            //  show machine
            app.papermachine.show();

            function sceneCheckout(sceneIndex) {
                /** check current scene is passed the last scene */
                if (sceneIndex <=7) {
                    //  show letter
                    setTimeout(function (){
                        //  letter in
                        app.letter.showLetter(sceneIndex);

                        //  letter cutting
                        setTimeout(function (){
                            app.letter.cutLetter();

                            /** checkout to next scene */
                            sceneIndex++;
                            setTimeout(function (){
                                sceneCheckout(sceneIndex);

                                //  reset finished letter class state
                                setTimeout(function (){
                                    var lastLetterId = app.letter.currentLetter == 1 ? 2 : 1,
                                        lastLetter = $('.letter0' + lastLetterId);

                                    lastLetter.addClass('back')
                                        .removeClass('animated cutting cutFinish')
                                        .find('.letter-postmark').removeClass('animated');
                                    lastLetter.find('.letter-stamp-mask').css('height', lastLetter.find('.letter-stamp-mask').attr('data-height'))
                                    lastLetter.find('.letter-money-mask').css('height', lastLetter.find('.letter-money-mask').attr('data-height'));

                                    setTimeout(function (){
                                        lastLetter.removeClass('back')
                                    }, 200);
                                }, 6600);
                            }, 1600);
                        }, 3500);
                    }, 4000);
                } else {
                    /** into final scene */
                    setTimeout(function (){
                        sceneFinal();
                    }, 4500);
                }
            }

            sceneCheckout(sceneIndex);
        }

        //  scene final
        function sceneFinal(){
            //  start scene
            setTimeout(function (){
                //  show sentence
                $('.scene02 .sentence').addClass('animated');
                app.papermachine.start();

                //  show final sentence
                setTimeout(function (){
                    $('.scene02 .flag').fadeIn(1200);
                }, 600);
            }, 500);
        }

        //  load images
        (function (){
            //  make para sentences
            for (var i = 1; i <= 7; i++) {
                var img = new Image();
                img.src = "assets/images/para0" + i + ".png";

                app.letter.letterContext['para0' + i] = img;
            }

            //  make stamp
            for (var j = 1; j <= 7; j++) {
                var img = new Image(),
                    img2 = new Image();
                img.src = "assets/images/letter-stamp0" + j + ".png";
                img2.src = "assets/images/letter-stamp-sketch-0" + j + ".png";

                app.letter.stamp['stamp0' + j] = img;
                app.letter.stamp['stamp-sketch-0' + j] = img2;
            }

            //  make money
            for (var z = 1; z <= 7; z++) {
                var img = new Image(),
                    img2 = new Image();
                img.src = "assets/images/letter-money0" + z + ".png";
                img2.src = "assets/images/letter-money-sketch-0" + z + ".png";

                app.letter.money['money0' + z] = img;
                app.letter.money['money-sketch-0' + z] = img2;
            }
        })();

        /**  start first scene */
        sceneStart();
    },

    letter: {
        letterContext: {},

        stamp: {},

        money: {},

        currentLetter: 1,

        showLetter: function (index){
            /**
             *  First change stamp image
             *  then set letter mask
             *  show letter
             *  set paper blocks
             *  @param   index   the id of stamp and money for this letter to show
             * */

            //  current letter
            var currentLetter = '.letter0' + app.letter.currentLetter;

            //  change stamp
            $(currentLetter + ' .letter-stamp').attr('src', app.letter.stamp['stamp0' + index].src);
            $(currentLetter + ' .letter-stamp-sketch').attr('src', app.letter.stamp['stamp-sketch-0' + index].src);

            //  calculate the stamp mask height,
            //  set data-height attribute to stamp mask
            var stampMask = $(currentLetter + ' .letter-stamp-mask');
            if (stampMask.attr('data-height')) {
                stampMask.css({'height': stampMask.attr('data-height')});
            } else {
                var theHeightOfStamp = stampMask.find('.letter-stamp').height();
                stampMask.attr('data-height', theHeightOfStamp)
                         .css({'height': theHeightOfStamp});
            }

            //  change money
            $(currentLetter + ' .letter-money').attr('src', app.letter.money['money0' + index].src);
            $(currentLetter + ' .letter-money-sketch').attr('src', app.letter.money['money-sketch-0' + index].src);

            //  calculate the money height
            //  set data-height attribute to money mask
            var moneyMask = $(currentLetter + ' .letter-money-mask');
            if (moneyMask.attr('data-height')) {
                moneyMask.css({'height': moneyMask.attr('data-height')});
            } else {
                var theHeightOfMoney = moneyMask.find('.letter-money').height();
                moneyMask.attr('data-height', theHeightOfMoney)
                         .css({'height': theHeightOfMoney});
            }

            //  set letter mask and calculate mask height
            $(currentLetter + ' .letter-mask').css({'height': $(currentLetter).height()});

            //  show letter
            $(currentLetter).fadeIn(0).removeClass('animated')
                .addClass('animated');
        },

        cutLetter: function (sceneIndex){
            //  cutting a half of letter
            $('.letter0' + app.letter.currentLetter).addClass('cutting');

            //  begin machine animate
            app.papermachine.start();

            //  show post mark
            setTimeout(function (){
                app.letter.showPostmark(1);
            }, 1900);

            //  cutting all letter
            setTimeout(function (){
                var currentLetter = $('.letter0' + app.letter.currentLetter);

                currentLetter.addClass('cutFinish')
                    .find('.letter-stamp-mask').css({'height': 0});

                currentLetter.find('.letter-money-mask').css({'height': 0});

                //  stop machine animate
                setTimeout(function (){
                    app.papermachine.end();
                }, 300);

                //  update current letter index
                app.letter.currentLetter == 1 ? app.letter.currentLetter = 2 : app.letter.currentLetter = 1;
            }, 5600);
        },

        showPostmark: function (){
            //  show postmark in current letter
            $('.letter0' + app.letter.currentLetter + ' .letter-postmark').removeClass('animated')
                .addClass('animated');
        },

        out: function (){
            //  stamp hinge out
            $('.letter-stamp').addClass('animated hinge');

            //  letter out
            setTimeout(function (){
                $('.letter').fadeOut(800, function (){
                    $('.letter').removeClass('animated');
                    $('.letter-postmark').removeClass('animated');
                    $('.letter-stamp').removeClass('animated hinge');
                    $('.letter-money').removeClass('animated');
                    $('.letter-full-mask').removeClass('animated');
                    $('.letter-context img').hide();
                });

                //  out paper blocks
                setTimeout(function (){
                    $('.paper-block03').fadeOut(300);

                    setTimeout(function (){
                        $('.paper-block04').fadeOut(300);
                    }, 100);

                    $('.paper-block06').fadeOut(300);

                    setTimeout(function (){
                        $('.paper-block05').fadeOut(300);
                    }, 200);

                    $('.paper-block07').fadeOut(300);

                    setTimeout(function (){
                        $('.paper-block08').fadeOut(300);
                    }, 100);
                }, 1200);
            }, 2000);
        }
    },

    papermachine: {
        machine : $('.papermachine'),

        show: function (){
            var that = this;
            setTimeout(function (){
                that.machine.addClass('animated');
            }, 2000);
        },

        start: function (){
            $('.papermachine').addClass('cutting');
        },

        end: function (){
            $('.papermachine').removeClass('cutting');
        },

        out: function (){
            var that = this;

            this.machine.removeClass('animated')
                .addClass('fastOut');

            //  remove fastOut
            setTimeout(function (){
                that.machine.removeClass('fastOut');
            }, 4000);
        }
    },

    start: function (){
        this.config();

        //  start play
        this.create();
    }
};

$(function (){
    // init app
    app.start();
    console.log('program start...............');
});