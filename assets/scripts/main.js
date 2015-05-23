// Created by sam mok 2015(Siso brand interactive team).

"use strict";

var app = {
    init: function (){
        //  vertical center the paper
        var offsetTop = (parseInt($('body').height()) - parseInt($('#main').height())) / 2 + 'px';
        $('#main').css({'top': offsetTop});

        //  disable touch event to limit ios browser scroll
        document.documentElement.addEventListener('touchmove', function(e){e.preventDefault(); });
    },

    curScene: 1,

    soundSwitch: false,

    create: function (){
        //  audio controller
        // ------------------------------------------------
        var audio = {
            playStatue: false,

            play: function (){
                app.soundSwitch = true;
                $('.radio').addClass('play');
                $('audio')[0].play();
                this.playStatue = true;
            },

            pause: function (){
                app.soundSwitch = false;
                $('.radio').removeClass('play');
                $('audio')[0].pause();
                $('.audio-scene01')[0].pause();
                $('.audio-scene02')[0].pause();
                $('.audio-scene03')[0].pause();
                $('.audio-scene04')[0].pause();
                $('.audio-scene05')[0].pause();
                $('.audio-scene06')[0].pause();
                $('.audio-scene07')[0].pause();
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

        //  bind share button
        $('.shareFriends').click(function (){
            $('.share-img').fadeIn();
        });

        $('.share-img').click(function (){
            $(this).fadeOut();
        });

        //  scene loading
        // ------------------------------------------------
        var imageAmounts = 21,
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
            });

            $('.start').fadeOut(900);
        }

        //  this index recording the current scene number
        app.curScene = 1;  // scene is letter 1 now cause 1

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

            //  turn on letter display
            $('.letter').show();

            //  instance of hammer
            var hammer = new Hammer(document.getElementById('main'));

            function sceneCheckout() {
                /** check current scene is passed the last scene */
                console.log(app.curScene);
                if (app.curScene <=7) {
                    var canClicked = false;
                    //  show first letter width delay

                    if (app.curScene == 1) {
                        setTimeout(function (){
                            //  letter in
                            app.letter.showLetter(app.curScene);

                            //  show letter cutting button
                            setTimeout(function (){
                                $('.scene-arrow').fadeIn(900);
                                canClicked = true;
                            }, 1300);
                        }, 4000);
                    } else {
                        //  letter in
                        app.letter.showLetter(app.curScene);

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

                //  bind click button to cut email
                $('.scene-arrow').click(function (){
                    $('.scene-arrow').hide();

                    //  cutting letter
                    if (canClicked == true ) {
                        cutEmail();
                        canClicked = false;
                    }
                });

                //  bind swipe to cut email
                hammer.on('panleft panright panup pandown', function(ev) {
                    if (ev.type == 'pandown' || ev.type == 'panup') {
                        $('.scene-arrow').hide();

                        //  cutting letter
                        if (canClicked == true ) {
                            cutEmail();
                            canClicked = false;
                        }
                    }
                });

                //  letter cutting
                function cutEmail (){
                    app.letter.cutLetter();

                    /** checkout to next scene */
                    app.curScene++;
                    setTimeout(function (){
                        sceneCheckout(app.curScene);

                        //  reset finished letter class state
                        var lastLetterId = app.letter.currentLetter == 1 ? 2 : 1,
                            lastLetter = $('.letter0' + lastLetterId);

                        lastLetter.addClass('back')
                            .removeClass('animated cutting cuttingBefore cuttingLetterDown')
                            .find('.letter-postmark').removeClass('animated');

                        setTimeout(function (){
                            lastLetter.removeClass('back')
                        }, 200);
                    }, 9300);
                }
            }

            sceneCheckout(app.curScene);
        }

        //  scene final
        function sceneFinal(){
            // TODO:::: machine
            app.papermachine.show();
            app.papermachine.machine.addClass('finalScenePaperMachine');
            //  start scene
            setTimeout(function (){
                // TODO:: init fire
                if (app.fire.isInitFire == false) {
                    app.fire.init();
                    app.fire.isInitFire = true;
                }

                //  show flag
                $('.scene02').show().addClass('animated');
                $('.radio').addClass('lastScene');

                //  show button
                setTimeout(function (){
                    $('.buttonWrap').fadeIn(900);
                }, 600);

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
                    }, 3000);
                }, 2500);
            }, 1300);
        }

        //  load images
        (function (){
            //  make para sentences
            for (var i = 1; i <= 7; i++) {
                var img = new Image();
                img.src = "http://ossweb-img.qq.com/images/yes/act/a20150516yesyry/para0" + i + ".png";

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
                img.src = "http://ossweb-img.qq.com/images/yes/act/a20150516yesyry/letter-stamp0" + j + ".png";

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
            }

            //  make money
            for (var z = 1; z <= 7; z++) {
                var img = new Image(),
                    img2 = new Image();
                img.src = "http://ossweb-img.qq.com/images/yes/act/a20150516yesyry/letter-money0" + z + ".png";

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
            }
        })();

        /**
         *   resource loaded monitor
         *   for assets loaded progress
         * */

        var loaded0To4 = false,
            loaded5To12 = false,
            loaded13To18 = false,
            loaded19To21 = false;

        function assetsLoadMonitor(process) {
            var textDom = $('.loading-text'),
                rate = loadedImageAmounts / imageAmounts;

            //rate of 21p, 4p loaded
            if (rate > 0.1 && rate <= 0.2 && loaded0To4 == false) {
                loaded0To4 = true;
                textDom.text('音乐准备中..');
            }

            //rate of 21p, 12p loaded
            if (rate > 0.3 && rate <= 0.58 && loaded5To12 == false) {
                loaded5To12 = true;
                textDom.text('爆米花准备完毕..');
            }

            //rate of 21p, 18p loaded
            if (rate > 0.60 && rate <= 0.82 && loaded13To18 == false) {
                loaded13To18 = true;
                textDom.text('纸巾准备完毕..');
            }

            //rate of 21p, 19p loaded
            if (rate > 0.82 && rate <= 1 && loaded19To21 == false) {
                loaded19To21 = true;
                textDom.text('好故事即将开始..');

                //  show start button
                $('.start').fadeIn();
                $('.start img').click(function (){
                    sceneStart();
                });

                //  init sound, just autoPlay once
                var initSound = function () {
                    //  delay play
                    $('#audio')[0].play();

                    document.removeEventListener('touchstart', initSound, false);
                };
                document.addEventListener('touchstart', initSound, false);
            }
        }

        /**  start first scene */
        sceneLoading();
    },

    fire: {
        //  init in letter property's showLetter method
        isInitFire: false,

        isReady: false,

        images: [],

        curFrameIndex: 0,

        init: function (){
            //  set canvas size
            var baseWidth = $('.papermachine-wrap').width()*0.1,
                baseHeight = $('.papermachine-wrap').height()*0.49;

            $('.fireSmall').attr('width', baseWidth)
                .attr('height', baseHeight);
            $('.fireBig').attr('width', baseWidth*1.5)
                .attr('height', baseHeight*1.5);


            var that = this,
                imagesAmount = 6,
                loadedImages = 0;

            //  create fire image
            for (var i=1; i<=imagesAmount; i++) {
                var img = new Image();
                img.src = 'http://ossweb-img.qq.com/images/yes/act/a20150516yesyry/fire0' + i + '.png';
                img.onload = function (){
                    loadedImages++;

                    /**  images loading monitor */
                    if (loadedImages/imagesAmount >= 0.7 && that.isReady == false) {
                        //console.log('canvas fire image loaded complete..');
                        that.draw(that.curFrameIndex);
                        that.isReady = true;
                    }
                };

                that.images.push(img);
            }

            //console.log('canvas fire image load start..');
        },

        draw: function (){
            var that = this,
                paper = document.getElementById('fire'),
                paperWidth = paper.width,
                paperHeight = paper.height,
                pencil = paper.getContext('2d'),

                paper02 = document.getElementById('fireBig'),
                paperWidth02 = paper02.width,
                paperHeight02 = paper02.height,
                pencil02 = paper02.getContext('2d');

            /** check is current frame is not the end frame */
            if (that.curFrameIndex < that.images.length) {
                pencil.clearRect(0, 0, paperWidth, paperHeight);
                pencil.drawImage(that.images[that.curFrameIndex], 0, 0, paperWidth, paperHeight);

                pencil02.clearRect(0, 0, paperWidth02, paperHeight02);
                pencil02.drawImage(that.images[that.curFrameIndex], 0, 0, paperWidth02, paperHeight02);

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
                // TODO:: if not init fire yet, init it
                //if (app.fire.isInitFire == false) {
                //    app.fire.init();
                //    app.fire.isInitFire = true;
                //}

                //  play scene audio
            $('#scene01')[0].pause();
            $('#scene02')[0].pause();
            $('#scene03')[0].pause();
            $('#scene04')[0].pause();
            $('#scene05')[0].pause();
            $('#scene06')[0].pause();
            $('#scene07')[0].pause();
            if (app.curScene == 6) {
                setTimeout(function (){
                    app.soundSwitch ? $('#scene0' + app.curScene)[0].play() : false;
                }, 2000);
            } else {
                app.soundSwitch ? $('#scene0' + app.curScene)[0].play() : false;
            }

            //  current letter
            var currentLetter = '.letter0' + app.letter.currentLetter;

            //  change para
            $(currentLetter + ' .letter-context img').attr('src', app.letter.letterContext['para0' + index].src);


            //  change stamp
            $(currentLetter + ' .letter-stamp').attr('src', app.letter.stamp['stamp0' + index].src);

            //  change money
            $(currentLetter + ' .letter-money').attr('src', app.letter.money['money0' + index].src);

            //  calculate the money height
            //  set data-height attribute to money mask

            //  show letter
            $(currentLetter).fadeIn(0).removeClass('animated')
                .addClass('animated');

            //  show post mark
            setTimeout(function (){
                app.letter.showPostmark(1);
            }, 2200);
        },

        cutLetter: function (sceneIndex){
            // @duration 5600ms

            //  cutting a half of letter
            $('.letter0' + app.letter.currentLetter).addClass('cuttingBefore');

            setTimeout(function (){
                //  show paper blocks
                $('.paper-block').show().addClass('move');
            }, 200);

            setTimeout(function (){
                //  begin machine animate
                app.papermachine.start();

                setTimeout(function (){
                    $('.paper-block').hide().removeClass('move');
                }, 7200);

                //  cutting all letter
                setTimeout(function (){
                    //  show paper big blocks
                    app.paperBlock.init();

                    var currentLetter = $('.letter0' + app.letter.currentLetter);

                    currentLetter.addClass('cutting');

                    //  letter down
                    setTimeout(function (){
                        currentLetter.addClass('cuttingLetterDown');
                    }, 200);

                    //  show pig paper blocks
                    setTimeout(function (){
                        $('.paper-big-block').addClass('move');
                    }, 200);

                    //  hide big paper blocks
                    setTimeout(function (){
                        $('.paper-big-block').removeClass('move');
                    }, 5000);

                    //  stop machine animate
                    setTimeout(function (){
                        app.papermachine.end();
                        $('.fire').removeClass('animated');
                    }, 4000);

                    //  update current letter index
                    app.letter.currentLetter == 1 ? app.letter.currentLetter = 2 : app.letter.currentLetter = 1;
                }, 4500);

            }, 300);
        },

        showPostmark: function (){
            //  show postmark in current letter
            $('.letter0' + app.letter.currentLetter + ' .letter-postmark').removeClass('animated')
                .addClass('animated');
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
        }
    },

    paperBlock: {
        create: function () {
            /* Start by creating a wrapper div, and an empty img element */
            var leafDiv = document.createElement('div');
            var image = document.createElement('img');

            /* Randomly choose a leaf image and assign it to the newly created element */
            image.src = 'assets/images/block0' + this.randomInteger(1, 9) + '.png';

            leafDiv.style.top = "-80px";

            /* Position the leaf at a random location along the screen */
            leafDiv.style.left = this.pixelValue(this.randomInteger(50, 280));

            /* Randomly choose a spin animation */
            var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';

            /* Set the -webkit-animation-name property with these values */
            leafDiv.style.webkitAnimationName = 'fade, drop';
            image.style.webkitAnimationName = spinAnimationName;

            /* Figure out a random duration for the fade and drop animations */
            var fadeAndDropDuration = this.durationValue(this.randomFloat(3, 6));

            /* Figure out another random duration for the spin animation */
            var spinDuration = this.durationValue(this.randomFloat(3, 6));
            /* Set the -webkit-animation-duration property with these values */
            leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

            var leafDelay = this.durationValue(this.randomFloat(0, 1));
            leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;

            image.style.webkitAnimationDuration = spinDuration;

            // add the <img> to the <div>
            leafDiv.appendChild(image);

            /* Return this img element so it can be added to the document */
            return leafDiv;
        },

        randomInteger: function (low, high) {
            return low + Math.floor(Math.random() * (high - low));
        },

        randomFloat: function (low, high)
        {
            return low + Math.random() * (high - low);
        },

        pixelValue: function (value)
        {
            return value + 'px';
        },

        durationValue: function (value)
        {
            return value + 's';
        },

        NUMBER_OF_LEAVES: 50,

        init: function () {
            /* Get a reference to the element that will contain the leaves */
            var container = document.getElementById('paper-big-block-container');
            container.innerHTML = "";

            /* Fill the empty container with new leaves */
            for (var i = 0; i < Math.floor(this.NUMBER_OF_LEAVES/2); i++)
            {
                container.appendChild(this.create());
            }

            var that = this;
            setTimeout(function () {
                for (var i = Math.floor(that.NUMBER_OF_LEAVES/2); i < that.NUMBER_OF_LEAVES; i++)
                {
                    container.appendChild(that.create());
                }
            }, 2000);
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
    //console.log('program start...............');

    $('.loading').hide(); $('.start').remove();
});
