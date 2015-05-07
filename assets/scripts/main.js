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
                }, 800);

                //  into scene02
                setTimeout(function (){
                    scene02();
                }, 3000);
            }, 1000);
        }

        //  scene02
        // ------------------------------------------------
        function scene02 (){
            //  scene01 out
            $('.scene01').fadeOut(300, function (){

                //  letter in
                $('.letter').addClass('animated');

                //  show postmark
                setTimeout(function (){
                    $('.letter-postmark').addClass('animated');
                }, 1300);
            });
        }

        //  start first scene
        setTimeout(function (){
            scene01();
        }, 1000);
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