// Created by sam mok 2015(Siso brand interactive team).

"use strict";

setTimeout(function (){

}, 1000);

var app = {
    config: function (){

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

        //  scene01
        // ------------------------------------------------
        function scene01 (){
            setTimeout(function (){
                //  show sentence
                $('.scene01 .sentence').addClass('animated');

                //  show and play radio
                setTimeout(function (){
                    //  show
                    $('.radio').addClass('animated bounceIn');

                    //  play
                    setTimeout(function (){
                        audio.play();
                    }, 400);
                }, 700);

                //  into scene02
                setTimeout(function (){
                    scene02();
                }, 3000);
            }, 1000);
        }

        //  this index is for recursion below in function scene02,
        //  scene02 start the function scene03ToScene07's recursion
        var scene03To07RecursionIndex = 3;

        //  scene02
        // ------------------------------------------------
        function scene02 (){
            /**
             *  First scene01 out,
             *  letter in,
             *  then postmark in,
             *  paper machine in,
             *
             *  This scene still show 14 seconds then checkout to next scene
             * */
            //  scene01 out
            $('.scene01').fadeOut(300, function (){

                //  letter in
                app.letter.showLetter();

                //  show postmark
                setTimeout(function (){
                    app.letter.showPostmark();
                    //  show paper machine
                    app.paperchine.show(app.letter.letterContext.para01);
                    console.log(app.letter.letterContext);
                }, 2000);

                //  into scene 3
                setTimeout(function (){
                    scene03toScene07(app.letter.letterContext['para0' + scene03To07RecursionIndex]);
                }, 14000);
            });
        }

        //  scene03 ~ scene07
        //  this function will start in function scene02 inner,
        //  then it recursion to checkout to next scene  from scene03 to scene07
        //  @param  para        the para you want to show on letter
        // ------------------------------------------------
        function scene03toScene07 (para){
            /**
             *  First letter out
             *  then paper machine out
             *  when paper machine outed, begin to show new letter
             *
             * */
            //  out letter
            app.letter.out();

            //  out paper machine, then letter in
            setTimeout(function (){
                app.paperchine.out();

                //  letter in
                setTimeout(function () {
                    //  letter in
                    app.letter.showLetter();

                    //  show postmark
                    setTimeout(function (){
                        app.letter.showPostmark();
                        //  show paper machine
                        app.paperchine.show(para);

                        /** checkout to next scene */
                        scene03To07RecursionIndex++;
                        if (scene03To07RecursionIndex < 8) {
                            //  into scene 3
                            setTimeout(function (){
                                scene03toScene07(app.letter.letterContext['para0' + scene03To07RecursionIndex]);
                            }, 14000);
                        }
                    }, 2000);
                }, 2500);
            }, 1500);
        }


        //  start first scene
        scene01();

        //  make para sentences
        for (var i = 1; i <= 6; i++) {
            var img = new Image();
            img.src = "assets/images/para0" + i + ".png";

            app.letter.letterContext['para0' + i] = img;
        }
    },

    letter: {
        letterContext: {},

        showLetter: function (){
            $('.letter').fadeIn(0).removeClass('animated')
                .addClass('animated');

            //  let paper blocks movement and show
            $('.paper-block03, .paper-block04').fadeIn()
                .addClass('animated');
        },

        showPostmark: function (){
            $('.letter-postmark').removeClass('animated')
                .addClass('animated');
        },

        out: function (){
            $('.letter').fadeOut(800, function (){
                $('.letter').removeClass('animated');
                $('.letter-postmark').removeClass('animated');
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
        }
    },

    paperchine: {
        machine : $('.papermachine'),

        show: function (para){
            var that = this;
            setTimeout(function (){
                that.machine.addClass('animated');

                //  show para
                setTimeout(function (){
                    $('.letter-context img').fadeIn(500)
                        .attr('src', para.src);
                }, 2500);

                //  show paper blocks
                //  show paper blocks 7 and 8
                setTimeout(function (){
                    $('.paper-block07').fadeIn(300);

                    setTimeout(function (){
                        $('.paper-block08').fadeIn(300);
                    }, 100);
                }, 2000);

                //  show paper blocks 5 and 6
                setTimeout(function (){
                    $('.paper-block05').fadeIn(300);

                    setTimeout(function (){
                        $('.paper-block06').fadeIn(300);
                    }, 100);
                }, 3000);

                //  show paper blocks 3 and 4
                setTimeout(function (){
                    $('.paper-block03').fadeIn(300);

                    setTimeout(function (){
                        $('.paper-block04').fadeIn(300);
                    }, 100);
                }, 5200);

                setTimeout(function () {
                    //  cancel paper blocks movement and hide it
                    $('.paper-block03, .paper-block04').fadeOut()
                        .removeClass('animated');
                }, 5300);
            }, 2000);
        },

        out: function (){
            var that = this;

            this.machine.removeClass('animated')
                .addClass('fastOut');


            //  remove fastOut
            setTimeout(function (){
                that.machine.removeClass('fastOut');
                //  show para
                $('.letter-context img').hide();
            }, 800);
        }
    },

    start: function (){
        this.config();

        //  start
        this.create();
    }
};

$(function (){
    // init app
    app.start();
    console.log('program start...............');
});