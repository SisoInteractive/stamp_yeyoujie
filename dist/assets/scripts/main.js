// Created by sam mok 2015(Siso brand interactive team).

"use strict";

setTimeout(function (){

}, 1000);

var app = {
    config: function (){
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

                //  into scene01
                setTimeout(function (){
                    scene01();
                }, 3000);
            }, 1000);
        }

        //  this index is for recursion below in function scene02,
        //  scene01 start the function scene02ToScene07's recursion
        var scene02To07RecursionIndex = 1;  // scene is letter 1 now cause 1

        //  scene01
        // ------------------------------------------------
        function scene01 (){
            /**
             *  First sceneStart out,
             *  letter in,
             *  then postmark in,
             *  paper machine in,
             *
             *  This scene still show 13 seconds then checkout to next scene
             * */
            //  scene01 out
            $('.scene01').fadeOut(600, function (){

                //  letter in
                app.letter.showLetter(1);

                //  show postmark
                setTimeout(function (){
                    //  show money first
                    $('.letter-money').addClass('animated');

                    //  then show other letter parts
                    setTimeout(function (){
                        //  show postmark
                        app.letter.showPostmark();

                        //  show paper machine
                        app.papermachine.show(app.letter.letterContext.para01);
                        console.log(app.letter.letterContext);

                        //  wipe animation begin
                        setTimeout(function (){
                            $('.letter-full-mask').addClass('animated');
                        }, 4000);
                    }, 2200);
                }, 1000);

                //  into scene 3
                setTimeout(function (){
                    scene02toScene07(app.letter.letterContext['para0' + 1]);
                }, 12000);
            });
        }

        //  scene02 ~ scene07
        //  this function will start in function scene01 inner,
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
            //  out letter
            app.letter.out();

            //  out paper machine, then letter in
            setTimeout(function (){
                app.papermachine.out();

                //  letter in
                setTimeout(function () {
                    scene02To07RecursionIndex++;

                    //  letter in
                    app.letter.showLetter(scene02To07RecursionIndex);

                    //  show postmark
                    setTimeout(function (){
                        //  show money first
                        $('.letter-money').addClass('animated');

                        //  then show another letter parts
                        setTimeout(function (){
                            app.letter.showPostmark();

                            //  show paper machine
                            app.papermachine.show(para);

                            //  wipe animation begin
                            setTimeout(function (){
                                $('.letter-full-mask').addClass('animated');
                            }, 4000);

                            /** checkout to next scene */
                            if (scene02To07RecursionIndex < 8) {
                                // into next scene
                                setTimeout(function (){
                                    scene02toScene07(app.letter.letterContext['para0' + scene02To07RecursionIndex]);
                                }, 12000);
                            }
                        }, 2200);
                    }, 2000);
                }, 2500);
            }, 1500);
        }


        //  start first scene
        sceneStart();

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
    },

    letter: {
        letterContext: {},

        stamp: {},

        money: {},

        showLetter: function (index){
            /**
             *  First change stamp image
             *  then set letter mask
             *  show letter
             *  set paper blocks
             *  @param   index   the id of stamp and money for this letter to show
             * */

            //  change stamp
            $('.letter-stamp').attr('src', app.letter.stamp['stamp0' + index].src);

            //  change money
            $('.letter-money').attr('src', app.letter.money['money0' + index].src);

            //  set letter mask and calculate mask height
            $('.letter-mask').css({'height': $('.letter').height()});

            //  show letter
            $('.letter').fadeIn(0).removeClass('animated')
                .addClass('animated');
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

        show: function (para){
            var that = this;
            setTimeout(function (){
                that.machine.addClass('animated');

                //  show para
                setTimeout(function (){
                    $('.letter-context img').fadeIn(500)
                        .attr('src', para.src);
                }, 2500);

                //  let paper blocks movement and show
                setTimeout(function (){
                    $('.paper-block01, .paper-block02').fadeIn()
                        .addClass('animated');
                }, 3200);

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
                    $('.paper-block01, .paper-block02').fadeOut()
                        .removeClass('animated');
                }, 5600);
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

        //  start
        this.create();
    }
};

$(function (){
    // init app
    app.start();
    console.log('program start...............');
});