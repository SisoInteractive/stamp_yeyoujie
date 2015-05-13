// Created by sam mok 2015(Siso brand interactive team).

"use strict";

var app = {
    init: function (){
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

        //  scene loading
        // ------------------------------------------------
        var imageAmounts = 35,
            loadedImageAmounts = 0;

        function sceneLoading (){
            //  into loading animation
            setTimeout(function (){
                $('.loading').addClass('animated');
            }, 1000);
        }


        //  scene start
        // ------------------------------------------------
        function sceneStart (){
            $('.loading').fadeOut(900, function (){
                $('.sentence').show();
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
                }, 1600);
            });

            $('.start').fadeOut(900);
        }

        //  this index recording the current scene number
        var sceneIndex = 1;  // scene is letter 1 now cause 1

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
                    var canClicked = false;
                    //  show first letter width delay

                    if (sceneIndex == 1) {
                        setTimeout(function (){
                            //  letter in
                            app.letter.showLetter(sceneIndex);

                            //  show letter cutting button
                            setTimeout(function (){
                                $('.scene-arrow').fadeIn(900);
                                canClicked = true;
                            }, 1300);
                        }, 4000);
                    } else {
                        //  letter in
                        app.letter.showLetter(sceneIndex);

                        //  show letter cutting button
                        setTimeout(function (){
                            $('.scene-arrow').fadeIn(900);
                            canClicked = true;
                        }, 1300);
                    }
                } else {
                    /** into final scene */
                    setTimeout(function (){
                        sceneFinal();
                    }, 900);
                }

                //  bind letter cutting
                $('#main').click(function (){
                    $('.scene-arrow').hide();

                    //  cutting letter
                    if (canClicked == true ) {
                        cutEmail();
                        canClicked = false;
                    }
                });

                //  letter cutting
                function cutEmail (){
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
                            lastLetter.find('.letter-stamp-mask').css('height', lastLetter.find('.letter-stamp-mask').attr('data-height'));
                            lastLetter.find('.letter-money-mask').css('height', lastLetter.find('.letter-money-mask').attr('data-height'));

                            setTimeout(function (){
                                lastLetter.removeClass('back')
                            }, 200);
                        }, 1000);
                    }, 8000);
                }
            }

            sceneCheckout(sceneIndex);
        }

        //  scene final
        function sceneFinal(){
            //  start scene
            setTimeout(function (){
                //  show flag
                $('.scene02').show().addClass('animated');

                //  move flag to machine
                setTimeout(function (){
                    $('.scene02').addClass('moveToMachine');

                    //  show flag animation
                    setTimeout(function (){
                        $('.scene02').addClass('cutting');

                        //  let paper machine animate
                        setTimeout(function (){
                            $('.papermachine').addClass('cutting');
                            $('.fire').addClass('animated finalSceneFire');
                        }, 600);
                    }, 2000);
                }, 2500);
            }, 900);
        }

        //  load images
        (function (){
            //  make para sentences
            for (var i = 1; i <= 7; i++) {
                var img = new Image();
                img.src = "assets/images/para0" + i + ".png";

                //  binding asset load monitor
                img.onload = function (){
                    loadedImageAmounts++;
                    assetsLoadMonitor(loadedImageAmounts);
                };

                app.letter.letterContext['para0' + i] = img;
            }

            //  make stamp
            for (var j = 1; j <= 7; j++) {
                var img = new Image(),
                    img2 = new Image();
                img.src = "assets/images/letter-stamp0" + j + ".png";
                img2.src = "assets/images/letter-stamp-sketch-0" + j + ".png";

                //  binding asset load monitor
                img.onload = function (){
                    loadedImageAmounts++;
                    assetsLoadMonitor(loadedImageAmounts);
                };
                img2.onload = function (){
                    loadedImageAmounts++;
                    assetsLoadMonitor(loadedImageAmounts);
                };

                app.letter.stamp['stamp0' + j] = img;
                app.letter.stamp['stamp-sketch-0' + j] = img2;
            }

            //  make money
            for (var z = 1; z <= 7; z++) {
                var img = new Image(),
                    img2 = new Image();
                img.src = "assets/images/letter-money0" + z + ".png";
                img2.src = "assets/images/letter-money-sketch-0" + z + ".png";

                //  binding asset load monitor
                img.onload = function (){
                    loadedImageAmounts++;
                    assetsLoadMonitor(loadedImageAmounts);
                };
                img2.onload = function (){
                    loadedImageAmounts++;
                    assetsLoadMonitor(loadedImageAmounts);
                };

                app.letter.money['money0' + z] = img;
                app.letter.money['money-sketch-0' + z] = img2;
            }
        })();

        /**
         *   resource loaded monitor
         *   for assets loaded progress
         * */

        var loaded0To28 = false, //rate of 35p, 10p loaded
            loaded29To43 = false, //rate of 35p, 15p loaded
            loaded44To72 = false, //rate of 35p, 25p loaded
            loaded73To86 = false, //rate of 35p, 30p loaded
            loaded87To100 = false; //rate of 35p, 35p loaded

        function assetsLoadMonitor(process) {
            var textDom = $('.loading-text'),
                rate = loadedImageAmounts / imageAmounts;

            //rate of 35p, 10p loaded
            if (rate > 0.22 && rate <= 0.28 && loaded0To28 == false) {
                loaded0To28 = true;
                textDom.text('音乐准备中..');
            }

            //rate of 35p, 15p loaded
            if (rate > 0.35 && rate <= 0.43 && loaded29To43 == false) {
                loaded29To43 = true;
                textDom.text('爆米花准备完毕..');
            }

            //rate of 35p, 25p loaded
            if (rate > 0.60 && rate <= 0.72 && loaded44To72 == false) {
                loaded44To72 = true;
                textDom.text('纸巾准备完毕..');
            }

            //rate of 35p, 30p loaded
            if (rate > 0.75 && rate <= 0.86 && loaded73To86 == false) {
                loaded73To86 = true;
                textDom.text('好故事即将开始..');

                //  show start button
                $('.start').fadeIn();
                $('.start button').click(function (){
                    sceneStart();
                });

                //  init sound, just autoPlay once
                var initSound = function () {
                    //  delay play
                    $('#audio')[0].play();
                    setTimeout(function () {
                        // the timeout isn't completely necessary but solves some issues on older devices/buggy browsers
                        $('#audio')[0].stop();
                    }, 0);

                    document.removeEventListener('touchstart', initSound, false);
                };
                document.addEventListener('touchstart', initSound, false);
            }
        }

        /**  start first scene */
        sceneMain();
    },

    fire: {
        //  init in letter property's showLetter method
        isInitFire: false,

        isReady: false,

        images: [],

        curFrameIndex: 0,

        init: function (){
            //  set canvas size
            $('.fire').attr('width', $('.papermachine-wrap').width()*0.2055)
                .attr('height', $('.papermachine-wrap').height()*0.78);


            var that = this,
                imagesAmount = 6,
                loadedImages = 0;

            //  create fire image
            for (var i=1; i<=imagesAmount; i++) {
                var img = new Image();
                img.src = 'assets/images/fire0' + i + '.png';
                img.onload = function (){
                    loadedImages++;

                    /**  images loading monitor */
                    if (loadedImages/imagesAmount >= 0.7 && that.isReady == false) {
                        console.log('canvas fire image loaded complete..');
                        that.draw(that.curFrameIndex);
                        that.isReady = true;
                    }
                };

                that.images.push(img);
            }

            console.log('canvas fire image load start..');
        },

        draw: function (){
            var that = this,
                paper = document.getElementById('fire'),
                paperWidth = paper.width,
                paperHeight = paper.height,
                pencil = paper.getContext('2d');

            /** check is current frame is not the end frame */
            if (that.curFrameIndex < that.images.length) {
                pencil.clearRect(0, 0, paperWidth, paperHeight);
                pencil.drawImage(that.images[that.curFrameIndex], 0, 0, paperWidth, paperHeight);

                //  update current image index
                that.curFrameIndex++;

                //  draw next frame
                setTimeout(function (){
                    that.draw(that.curFrameIndex)
                }, 16);
            } else {
                /** reset frame to first frame and draw */
                that.curFrameIndex = 0;
                that.draw();
            }
        }
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

            //  if not init fire yet, init it
            if (app.fire.isInitFire == false) {
                app.fire.init();
                app.fire.isInitFire = true;
            }

            //  current letter
            var currentLetter = '.letter0' + app.letter.currentLetter;

            //  change para
            $(currentLetter + ' .letter-context img').attr('src', app.letter.letterContext['para0' + index].src);


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
            // @duration 5600ms

            //  cutting a half of letter
            $('.letter0' + app.letter.currentLetter).addClass('cutting');

            //  begin machine animate
            app.papermachine.start();

            //  show fire animate
            $('.fire').addClass('animated');

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
                    $('.fire').removeClass('animated');
                }, 300);

                //  update current letter index
                app.letter.currentLetter == 1 ? app.letter.currentLetter = 2 : app.letter.currentLetter = 1;
            }, 7800);
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
            that.machine.show();
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
        //  init program
        this.init();

        //  start play
        this.create();
    }
};

$(function (){
    // init app
    app.start();
    console.log('program start...............');

    (function (){
        $('.loading, .start').hide();
    })('debug');
});
