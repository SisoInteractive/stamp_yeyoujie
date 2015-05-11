// Created by sam mok 2015(Siso brand interactive team).

"use strict";

setTimeout(function (){

}, 1000);

var app = {
    config: function (){
        //  vertical center the paper
        var offsetTop = (parseInt($('body').height()) - parseInt($('#main').height())) / 2 + 'px';
        $('#main').css({'top': offsetTop});

        //  calculate the wipe delay
        var bodyHeightIsSmall = parseInt($('body').height()) <= 480;
        calculateWipeDelay();

        $('html, body').resize(function (){
            calculateWipeDelay();
        });

        //  calculate wipe delay
        function calculateWipeDelay (){
            if (bodyHeightIsSmall) {
                app.wipeDelay = 3000;
            }

            else {
                app.wipeDelay = 4000;
            }
        }

    },

    //  wipe delay
    wipeDelay: 120000,

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
                                    var lastLetter = app.letter.currentLetter == 1 ? 2 : 1;
                                    $('.letter0' + lastLetter).addClass('back')
                                        .removeClass('animated cutting cutFinish')
                                        .find('.letter-postmark').removeClass('animated');

                                    setTimeout(function (){
                                        $('.letter0' + lastLetter).removeClass('back')
                                    }, 200);
                                }, 1500);
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

        //  scene02 ~ scene07
        //  this function will start in function sceneMain inner,
        //  then it recursion to checkout to next scene  from scene02
        //  to scene07(letter 2 to letter 7)
        //  @param  para        the para you want to show on letter
        // ------------------------------------------------
        function scene02toScene07 (para){
            /**
             *  First letter out
             *  then paper machine out
             *  when paper machine outed, begin to show new letter
             *
             * */
            //  show letter
            setTimeout(function (){
                //  letter in
                app.letter.showLetter(sceneIndex);

                //  letter cutting
                setTimeout(function (){
                    app.letter.cutLetter();
                }, 3500);
            }, 4000);
        }

        //  scene final
        function sceneFinal(){
            //  start scene
            setTimeout(function (){
                //  show sentence
                $('.scene02 .sentence').addClass('animated');

                //  show machine
                setTimeout(function () {
                    $('.scene02 .sentence-papermachine').show();

                    //  show final sentence
                    setTimeout(function (){
                        $('.scene02 .flag').fadeIn(800);
                    }, 300);
                }, 1300);
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
                var img = new Image();
                img.src = "assets/images/letter-stamp0" + j + ".png";

                app.letter.stamp['stamp0' + j] = img;
            }

            //  make money
            for (var z = 1; z <= 7; z++) {
                var img = new Image();
                img.src = "assets/images/money-0" + z + ".png";

                app.letter.money['money0' + z] = img;
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

            //  change money
            $(currentLetter + ' .letter-money').attr('src', app.letter.money['money0' + index].src);

            //  set letter mask and calculate mask height
            $(currentLetter + ' .letter-mask').css({'height': $('.letter').height()});

            //  show letter
            $(currentLetter).fadeIn(0).removeClass('animated')
                .addClass('animated');
        },

        cutLetter: function (sceneIndex){
            //  cutting a half of letter
            $('.letter0' + app.letter.currentLetter).addClass('cutting');

            //  show post mark
            setTimeout(function (){
                app.letter.showPostmark(1);
            }, 1900);

            //  cutting all letter23
            setTimeout(function (){
                $('.letter0' + app.letter.currentLetter).addClass('cutFinish');

                //  update current letter index
                app.letter.currentLetter == 1 ? app.letter.currentLetter = 2 : app.letter.currentLetter = 1;
            }, 5600);
        },

        showPostmark: function (){
            $('.letter-postmark').removeClass('animated')
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