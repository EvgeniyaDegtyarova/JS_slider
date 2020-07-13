(function(time = 2000) {
    let container = document.querySelector('#slides');
    let slides = document.querySelectorAll('.slide'); //ок
    let controls = document.querySelector('#controls-container');
    let indicatorsContainer = document.querySelector('#indicators-container'); //ок
    let indicators = document.querySelectorAll('.indicator'); //ок
    let pausePlayBtn = document.querySelector('#pause'); //ок
    let nextBtn = document.querySelector('#next'); //ок
    let prevBtn = document.querySelector('#prev'); //ок

    let slidesCount = slides.length;
    let currentSlide = 0; //ок
    let isPlaying = true;
    let interval = time;
    let timerID = null;
    let swipeStartX = null;
    let swipeEndX = null;


    const FA_PLAY = 'Play';
    const FA_PAUSE = 'Pause';
    const SPACE = ' ';
    const LEFT_ARROW = 'ArrowLeft';
    const RIGHT_ARROW = 'ArrowRight';


    const gotoNth = (n) => {
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
        currentSlide = (slidesCount + n) % slidesCount;
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
    }

    const gotoNext = () => {
        gotoNth(currentSlide + 1);
    }

    const gotoPrev = () => {
        gotoNth(currentSlide - 1);
    }
    const pause = () => {
        //было три тире
        if (isPlaying == true) {
            isPlaying = !isPlaying;
            pausePlayBtn.innerHTML = FA_PLAY;
            clearInterval(timerID);
        }
    }
    const play = () => {
        isPlaying = !isPlaying;
        pausePlayBtn.innerHTML = FA_PAUSE;
        timerID = setInterval(gotoNext, interval);
    }
    const next = () => {
        pause();
        gotoNext();
    }
    const prev = () => {
        pause();
        gotoPrev();
    }
    const pausePlay = () => (isPlaying ? pause() : play());

    const indicate = (e) => {
        let target = e.target;

        if (target.classList.contains('indicator')) {
            pause();
            gotoNth(Number(target.getAttribute('data-slide-to')));
        }
    }
    const pressKey = (e) => {
        let key = e.key;
        if (e.key === LEFT_ARROW) prev();
        if (e.key === RIGHT_ARROW) next();
        if (e.key === SPACE) pausePlay();
    }
    const swipeStart = (e) => {
        swipeStartX = e.changedTouches[0].pageX;
    }
    const swipeEnd = (e) => {
        swipeEndX = e.changedTouches[0].pageX;
        swipeStartX - swipeEndX > 100 && next();
        swipeStartX - swipeEndX < -100 && prev();
    }
    const setListeners = () => {
        pausePlayBtn.addEventListener('click', pausePlay);
        nextBtn.addEventListener('click', next);
        prevBtn.addEventListener('click', prev);
        indicatorsContainer.addEventListener('click', indicate);
        container.addEventListener('touchstart', swipeStart);
        container.addEventListener('touchend', swipeEnd);
        document.addEventListener('keydown', pressKey);
    };
    const init = () => {
        controls.style.display = 'block';
        indicatorsContainer.style.display = 'block';
        setListeners();
        timerID = setInterval(gotoNext, interval);
    };
    init();
})();