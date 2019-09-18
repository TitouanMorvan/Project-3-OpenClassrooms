var Slider = {
    
    // DEFINI LE COURANT
    currentIndex: 0,

    init: function () {
        Slider.autoSlide();
        Slider.playAutoClick();
        Slider.nextSlideOnClick();
        Slider.prevSlideOnClick();
        Slider.changeSlideOnKeypress();
    },
    
    //AFFICHE LE SLIDE
    activeSlide: function () {
        var slides = $('.fade');
        var slide = slides.eq(Slider.currentIndex);
        slides.hide();
        slide.css('display', 'flex');
    },
    
    // DEFINI LA DIAPOSITIVE SUIVANTE COMME DIAPOSITIVE ACTUELLE
    indexPlus: function () {
        var slides = $('.fade');
        var slidesNumber = slides.length;
        Slider.currentIndex += 1;
        if (Slider.currentIndex > slidesNumber - 1) {
            Slider.currentIndex = 0;
        }

    },
    
    // DEFINI LA DAIPOSITIVE PRECEDENTE COMME LA DAPOSITIVE ACTUELLE
    indexMinus: function () {
        var slides = $('.fade');
        var slidesNumber = slides.length;
        Slider.currentIndex -= 1;
        if (Slider.currentIndex < 0) {
            Slider.currentIndex = slidesNumber - 1;
        }
    },
    
    // FONCTION DU GLISSEMENT AUTO ET MANUEL
    autoSlide: function () {
        var play = $('.play');
        play.click(function () {
            var timer = setInterval(function () {
                Slider.indexPlus();
                Slider.activeSlide();
            }, 5000);
            var stop = $('.stop');
            stop.click(function () {
                clearInterval(timer);
            });
        });
    },
    
    // CHARGEMENT AUTOMATIQUE DU SLIDER
    playAutoClick: function () {
        var play = $('.play');
        play.trigger('click');
    },

    // DIAPO SUIVANTE AVEC BUTTON >
    nextSlideOnClick: function () {
        var next = $('.next');
        next.click(function () {
            Slider.indexPlus();
            Slider.activeSlide();
        });
    },
    
    // DIAPO PRECEDENTE AVEC BUTTON <
    prevSlideOnClick: function () {
        var prev = $('.prev');
        prev.click(function () {
            Slider.indexMinus();
            Slider.activeSlide();
        });
    },
    
    // DIAPO PRECEDENTE / SUIVANTE AVEC CLAVIER
    changeSlideOnKeypress: function () {
        $('body').keydown(function (e) {
            if (e.which === 39) {
                Slider.indexPlus();
                Slider.activeSlide();
            } else if (e.which === 37) {
                Slider.indexMinus();
                Slider.activeSlide();
            }
        });
    },
};

$(function () {
    Slider.init();
});