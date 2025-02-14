// main variables that used in code
const slideContainer = document.querySelector('.slide__container')
const rotateBlock = document.querySelector('.rotate__block');
const agreementButton = document.querySelector('.agree');
const nextSlideButton = document.querySelector('.arrow--next');
const prevSlideButton = document.querySelector('.arrow--prev');

// additional variables for timeout Ids
let nextButtonTimeout;
let prevButtonTimeout;
let lastSlideActionTimeout;

// additional variables for arrows
const hiddenArrowClass = 'hidden';
let nextArrowDelay = 0;

// additional varibles for slides
const totalSlideAmount = 35;
const pathNames = Array.from(
  { length: totalSlideAmount }, (_, i) => ({ count: i + 1, pathName:`./slides/slide--${i + 1}.html` })
);

// additional function for detecting correct font-size
function heightDetect(percent) {
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  return (percent * (height - 6)) / 100;
}
function widthDetect(percent) {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  return (percent * width) / 100;
}
function setResponsiveFontSize() {
  $('.slide__container').css({
    'font-size': `clamp(1px, ${heightDetect(0.925925)}px,${widthDetect(0.520833)}px)`
  });
  $('.arrows').css({
    'font-size': `clamp(1px, ${heightDetect(0.925925)}px,${widthDetect(0.520833)}px)`
  });
}

// function for action after last slide
function lastSlideAction() {
  let id = $('#presentation', window.parent.document).attr('data-id');
  let $url = $('#presentation', window.parent.document).attr('data-request-url');
  let href = $('#presentation', window.parent.document).attr('data-href');
  let $token = $('meta[name="csrf-token"]', window.parent.document).attr('content');
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $token
    }
  });
  $.ajax({
    type: "POST",
    url: $url,
    data: {"id": id},
    success: function (data) {
      if (data !== false) {
        parent.location.href = href;
      }
    },
    error: function (data) {
      console.log(data);
    }
  });
}

// function that animate number from 0 to correct num
function animateNumber(delay) {
  const allElements = document.querySelectorAll('[data-number]');

  allElements.forEach(el => {
    const targetNumber = Number(el.getAttribute('data-number'));

    gsap.to(el, {
      duration: 2.5,
      innerHTML: targetNumber,
      delay,
      onUpdate: () => {
        el.innerHTML = Math.round(el.innerHTML);
      },
      onComplete: () => {
        el.innerHTML = targetNumber;
      }
    });
  });
}

// object that store manipulations with slides
const slideActions = {
  1: () => {
    nextArrowDelay = 1.15;
  },
  2: () => {
    gsap.from('.slide--2__block.first', { opacity: 0, duration: 0.75, delay: 1, y: 90 });
    gsap.from('.slide--2__block.second', { opacity: 0, duration: 0.75, delay: 1.5, y: -90 });
    gsap.from('.slide--2__block.third', { opacity: 0, duration: 0.75, delay: 2, y: 90 });
    gsap.from('.slide--2__block.fourth', { opacity: 0, duration: 0.75, delay: 2.5, y: -90 });
    gsap.from('.slide--2__block.fifth', { opacity: 0, duration: 0.75, delay: 3, y: 90 });
    nextArrowDelay = 3.5;
  },
  3: () => {
    gsap.from('.slide--3__left', { opacity: 0, duration: 0.75, delay: 1, x: -90 });
    gsap.from('.slide--3__right', { opacity: 0, duration: 0.75, delay: 1, x: 90 });
    nextArrowDelay = 1.5;
  },
  4: () => {
    gsap.from('.slide--4__right img.doctor', { opacity: 0, duration: 0.75, delay: 1, scale: 0 });
    nextArrowDelay = 1.5;
  },
  5: () => {
    animateNumber(1);
    nextArrowDelay = 3.4;
  },
  6: () => {
    gsap.from('.slide--6__right-block.first', { opacity: 0, duration: 0.75, delay: 1, y: 50, x: 50 });
    gsap.from('.slide--6__right-block.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 50, x: 50 });
    gsap.from('.slide--6__right-block.third', { opacity: 0, duration: 0.75, delay: 1.8, y: 50, x: 50 });
    nextArrowDelay = 2.3;
    
  },
  7: () => {
    gsap.from('.slide--7__block.first', { opacity: 0, duration: 0.75, delay: 1, scale: 0 });
    gsap.from('.slide--7__block.second', { opacity: 0, duration: 0.75, delay: 1.4, scale: 0 });
    gsap.from('.slide--7__block.third', { opacity: 0, duration: 0.75, delay: 1.8, scale: 0 });
    gsap.from('.slide--7__block.fourth', { opacity: 0, duration: 0.75, delay: 2.2, scale: 0 });
    gsap.from('.slide--7__block.fifth', { opacity: 0, duration: 0.75, delay: 2.6, scale: 0 });
    gsap.from('.slide--7__block.sixth', { opacity: 0, duration: 0.75, delay: 3, scale: 0 });
    nextArrowDelay = 3.5;
  },
  8: () => {
    gsap.from('.slide--8__right h2', { opacity: 0, duration: 0.75, delay: 1, y: -45 });
    gsap.from('.slide--8__right .line', { opacity: 0, duration: 0.7, delay: 1.4, scaleX: 0 });
    gsap.from('.slide--8__right p', { opacity: 0, duration: 0.75, delay: 1.8, y: 45 });
    nextArrowDelay = 2.3;
  },
  9: () => {
    gsap.from('.slide--9__product.first', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--9__products-arrows img.first', { opacity: 0, duration: 0.75, delay: 1.2, width: 0, transformOrigin: "left center"});
    gsap.from('.slide--9__product.second', { opacity: 0, duration: 0.75, delay: 1.6 });
    gsap.from('.slide--9__products-arrows img.second', { opacity: 0, duration: 0.75, delay: 1.8, width: 0, transformOrigin: "left center"});
    gsap.from('.slide--9__product.fourth', { opacity: 0, duration: 0.75, delay: 2.2 });
    gsap.from('.slide--9__products-arrows img.fourth', { opacity: 0, duration: 0.75, delay: 2.4, width: 0, transformOrigin: "left center"});
    gsap.from('.slide--9__product.fifth', { opacity: 0, duration: 0.75, delay: 2.8 });
    gsap.from('.slide--9__products-arrows img.fifth', { opacity: 0, duration: 0.75, delay: 3, width: 0, transformOrigin: "left center"});
    gsap.from('.slide--9__product.third', { opacity: 0, duration: 0.75, delay: 3.4 });
    gsap.from('.slide--9__products-arrows img.third', { opacity: 0, duration: 0.75, delay: 3.6, width: 0, transformOrigin: "left"});
    gsap.from('.slide--9__product.sixth', { opacity: 0, duration: 0.75, delay: 4 });
    gsap.from('.slide--9__products-arrows img.sixth', { opacity: 0, duration: 0.75, delay: 4.2, width: 0, transformOrigin: "left"});
    gsap.from('.slide--9__product.seventh', { opacity: 0, duration: 0.75, delay: 4.6 });
    gsap.from('.slide--9__products-arrows img.seventh', { opacity: 0, duration: 0.75, delay: 4.8, width: 0, transformOrigin: "left center"});
    nextArrowDelay = 5.3;
  },
  10: () => {
    gsap.from('.slide--10__bottle', { opacity: 0, duration: 0.75, delay: 1, x: -90 });
    gsap.from('.slide--10 .slide__content > img.texture', { opacity: 0, duration: 0.75, delay: 1.2, scale: 0 });
    nextArrowDelay = 1.7;
  },
  11: () => {
    gsap.from('.slide--11__bottle.first', { opacity: 0, duration: 0.75, delay: 1, y: 90 });
    gsap.from('.slide--11__bottle.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 90 });
    gsap.from('.slide--11__bottle.third', { opacity: 0, duration: 0.75, delay: 1.8, y: 90 });
    gsap.from('.slide--11__bottle.fourth', { opacity: 0, duration: 0.75, delay: 2.2, y: 90 });
    gsap.from('.slide--11__bottle.fifth', { opacity: 0, duration: 0.75, delay: 2.6, y: 90 });
    gsap.from('.slide--11__bottle.sixth', { opacity: 0, duration: 0.75, delay: 3, y: 90 });
    nextArrowDelay = 3.5;
  },
  12: () => {
    gsap.from('.slide--12__block.first', { opacity: 0, duration: 0.75, delay: 1, scale: 0, transformOrigin: "left bottom" });
    gsap.from('.slide--12__block.second', { opacity: 0, duration: 0.75, delay: 1.2, scale: 0, transformOrigin: "left bottom" });
    nextArrowDelay = 1.7;
  },
  13: () => {
    gsap.from('.slide--13__bottle.first', { opacity: 0, duration: 0.75, delay: 1, y: 90 });
    gsap.from('.slide--13__bottle.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 90 });
    gsap.from('.slide--13__bottle.third', { opacity: 0, duration: 0.75, delay: 1.8, y: 90 });
    gsap.from('.slide--13__bottle.fourth', { opacity: 0, duration: 0.75, delay: 2.2, y: 90 });
    gsap.from('.slide--13__bottle.fifth', { opacity: 0, duration: 0.75, delay: 2.6, y: 90 });
    gsap.from('.slide--13__bottle.sixth', { opacity: 0, duration: 0.75, delay: 3, y: 90 });
    gsap.from('.slide--13__bottle.seventh', { opacity: 0, duration: 0.75, delay: 3.4, y: 90 });
    nextArrowDelay = 3.9;
  },
  14: () => {
    gsap.from('.slide--14__bottle.first', { opacity: 0, duration: 0.75, delay: 1, y: 90 });
    gsap.from('.slide--14__bottle.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 90 });
    gsap.from('.slide--14__bottle.third', { opacity: 0, duration: 0.75, delay: 1.8, y: 90 });
    nextArrowDelay = 2.3;
  },
  15: () => {
    gsap.from('.slide--15__block.first', { opacity: 0, duration: 0.75, delay: 1, scale: 0, transformOrigin: "left bottom" });
    gsap.from('.slide--15__block.second', { opacity: 0, duration: 0.75, delay: 1.3, scale: 0, transformOrigin: "left bottom" });
    nextArrowDelay = 1.8;
  },
  16: () => {
    gsap.from('.slide--16__bottle.first', { opacity: 0, duration: 0.75, delay: 1, y: 90 });
    gsap.from('.slide--16__bottle.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 90 });
    gsap.from('.slide--16__bottle.third', { opacity: 0, duration: 0.75, delay: 1.8, y: 90 });
    gsap.from('.slide--16__bottle.fourth', { opacity: 0, duration: 0.75, delay: 2.2, y: 90 });
    gsap.from('.slide--16__bottle-wrapper.first .decorator', { opacity: 0, duration: 0.75, delay: 2.4, y: 20 });
    gsap.from('.slide--16__bottle-wrapper.first .decorator-text', { opacity: 0, duration: 0.75, delay: 2.4, y: 20 });
    gsap.from('.slide--16__bottle.fifth', { opacity: 0, duration: 0.75, delay: 3, y: 90 });
    gsap.from('.slide--16__bottle-wrapper.second .decorator', { opacity: 0, duration: 0.75, delay: 3.2, y: 20 });
    gsap.from('.slide--16__bottle-wrapper.second .decorator-text', { opacity: 0, duration: 0.75, delay: 3.2, y: 20 });
    gsap.from('.slide--16__bottle.sixth', { opacity: 0, duration: 0.75, delay: 3.8, y: 90 });
    gsap.from('.slide--16__bottle.seventh', { opacity: 0, duration: 0.75, delay: 4.2, y: 90 });
    gsap.from('.slide--16__bottle.eight', { opacity: 0, duration: 0.75, delay: 4.6, y: 90 });
    gsap.from('.slide--16__bottle-wrapper.third .decorator', { opacity: 0, duration: 0.75, delay: 4.8, y: 20 });
    gsap.from('.slide--16__bottle-wrapper.third .decorator-text', { opacity: 0, duration: 0.75, delay: 4.8, y: 20 });
    gsap.from('.slide--16__bottle.nineth', { opacity: 0, duration: 0.75, delay: 5.4, y: 90 });
    gsap.from('.slide--16__bottle-wrapper.fourth .decorator', { opacity: 0, duration: 0.75, delay: 5.8, y: 20 });
    gsap.from('.slide--16__bottle-wrapper.fourth .decorator-text', { opacity: 0, duration: 0.75, delay: 6.2, y: 20 });
    nextArrowDelay = 6.7;
  },
  17: () => {
    gsap.from('.slide--17__block.first', { opacity: 0, duration: 0.75, delay: 1, scale: 0, transformOrigin: "left bottom" });
    gsap.from('.slide--17__block.second', { opacity: 0, duration: 0.75, delay: 1.3, scale: 0, transformOrigin: "left bottom" });
    gsap.from('.slide--17__block.third', { opacity: 0, duration: 0.75, delay: 1.6, scale: 0, transformOrigin: "left bottom" });
    nextArrowDelay = 2.1;
  },
  18: () => {
    gsap.from('.slide--18__bottle-wrapper.first', { opacity: 0, duration: 0.75, delay: 1, y: 90 });
    gsap.from('.slide--18__bottle-wrapper.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 90 });
    nextArrowDelay = 1.9;
  },
  19: () => {
    gsap.from('.slide--19__left', { opacity: 0, duration: 0.75, delay: 1, x: -90 });
    gsap.from('.slide--19 .slide__content > img.texture', { opacity: 0, duration: 0.75, delay: 1.2, scale: 0 });
    nextArrowDelay = 1.7;
  },
  20: () => {
    gsap.from('.slide--22__bottle.first', { opacity: 0, duration: 0.75, delay: 1, y: 90 });
    gsap.from('.slide--22__bottle.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 90 });
    gsap.from('.slide--22__bottle.third', { opacity: 0, duration: 0.75, delay: 1.8, y: 90 });
    nextArrowDelay = 2.3;
  },
  21: () => {
    animateNumber(1);
    nextArrowDelay = 3.4;
  },
  22: () => {
    gsap.from('.slide--21__bottle.first', { opacity: 0, duration: 0.75, delay: 1, y: 90 });
    gsap.from('.slide--21__bottle.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 90 });
    gsap.from('.slide--21__bottle.third', { opacity: 0, duration: 0.75, delay: 1.8, y: 90 });
    nextArrowDelay = 2.3;
  },
  23: () => {
    animateNumber(1);
    nextArrowDelay = 3.4;
  },
  24: () => {
    gsap.from('.slide--24__bottle.first', { opacity: 0, duration: 0.75, delay: 1, y: 90 });
    gsap.from('.slide--24__bottle-subwrapper', { opacity: 0, duration: 0.75, delay: 1.4, y: 90 });
    gsap.from('.slide--24__bottle.fourth', { opacity: 0, duration: 0.75, delay: 1.8, y: 90 });
    gsap.from('.slide--24__bottle.fifth', { opacity: 0, duration: 0.75, delay: 2.2, y: 90 });
    gsap.from('.slide--24__bottle.sixth', { opacity: 0, duration: 0.75, delay: 2.6, y: 90 });
    nextArrowDelay = 3.1;
  },
  25: () => {
    gsap.from('.slide--25__up', { opacity: 0, duration: 0.75, delay: 1, y: 45 });
    gsap.from('.slide--25__line', { opacity: 0, duration: 0.7, delay: 1.4, scaleX: 0 });
    gsap.from('.slide--25__bottom', { opacity: 0, duration: 0.75, delay: 1.8, y: 45 });
    nextArrowDelay = 2.3;
  },
  26: () => {
    gsap.from('.slide--26__bottle.first', { opacity: 0, duration: 0.75, delay: 1, y: 90 });
    gsap.from('.slide--26__bottle.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 90 });
    gsap.from('.slide--26__bottle.third', { opacity: 0, duration: 0.75, delay: 1.8, y: 90 });
    gsap.from('.slide--26__bottle.fourth', { opacity: 0, duration: 0.75, delay: 2.2, y: 90 });
    gsap.from('.slide--26__bottle.fifth', { opacity: 0, duration: 0.75, delay: 2.6, y: 90 });
    gsap.from('.slide--26__bottle-wrapper.first .decorator', { opacity: 0, duration: 0.75, delay: 2.8, y: 20 });
    gsap.from('.slide--26__bottle-wrapper.first .decorator-text', { opacity: 0, duration: 0.75, delay: 2.8, y: 20 });
    gsap.from('.slide--26__bottle.sixth', { opacity: 0, duration: 0.75, delay: 3.6, y: 90 });
    gsap.from('.slide--26__bottle.seventh', { opacity: 0, duration: 0.75, delay: 4, y: 90 });
    gsap.from('.slide--26__bottle.eight', { opacity: 0, duration: 0.75, delay: 4.4, y: 90 });
    gsap.from('.slide--26__bottle.nineth', { opacity: 0, duration: 0.75, delay: 4.8, y: 90 });
    gsap.from('.slide--26__bottle.tenth', { opacity: 0, duration: 0.75, delay: 5.2, y: 90 });
    gsap.from('.slide--26__bottle-wrapper.second .decorator', { opacity: 0, duration: 0.75, delay: 5.4, y: 20 });
    gsap.from('.slide--26__bottle-wrapper.second .decorator-text', { opacity: 0, duration: 0.75, delay: 5.4, y: 20 });
    nextArrowDelay = 6.1;
  },
  27: () => {
    gsap.from('.slide--27__bottle.first', { opacity: 0, duration: 0.75, delay: 1, x: 50 });
    gsap.from('.slide--27__bottle.second', { opacity: 0, duration: 0.75, delay: 1.4, x: 50 });
    gsap.from('.slide--27__bottle.third', { opacity: 0, duration: 0.75, delay: 1.8, x: 50 });
    nextArrowDelay = 2.3;
  },
  28: () => {
    gsap.from('.slide--28__icon.first', { opacity: 0, duration: 0.75, delay: 1, x: 30 });
    gsap.from('.slide--28__icon.second', { opacity: 0, duration: 0.75, delay: 1.4, x: 30 });
    gsap.from('.slide--28__icon.third', { opacity: 0, duration: 0.75, delay: 1.8, x: 30 });
    gsap.from('.slide--28__icon.fourth', { opacity: 0, duration: 0.75, delay: 2.2, x: 30 });
    nextArrowDelay = 2.7;
  },
  29: () => {
    gsap.from('.slide--29__bottle.first', { opacity: 0, duration: 0.75, delay: 1, y: 90 });
    gsap.from('.slide--29__bottle.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 90 });
    gsap.from('.slide--29__bottle.third', { opacity: 0, duration: 0.75, delay: 1.8, y: 90 });
    gsap.from('.slide--29__bottle.fourth', { opacity: 0, duration: 0.75, delay: 2.2, y: 90 });
    gsap.from('.slide--29__bottle.fifth', { opacity: 0, duration: 0.75, delay: 2.6, y: 90 });
    nextArrowDelay = 3.1;
  },
  30: () => {
    animateNumber(1);
    nextArrowDelay = 3.4;
  },
  31: () => {
    gsap.from('.slide--31__bottle.first', { opacity: 0, duration: 0.75, delay: 1, y: 90 });
    gsap.from('.slide--31__bottle.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 90 });
    nextArrowDelay = 1.9;
  },
  32: () => {
    gsap.from('.slide--32__bottles-wrapper', { opacity: 0, duration: 0.75, delay: 1, y: 90 });
    gsap.from('.slide--32__bottle.fourth', { opacity: 0, duration: 0.75, delay: 1.3, y: 90 });
    gsap.from('.slide--32__bottle.fifth', { opacity: 0, duration: 0.75, delay: 1.6, y: 90 });
    gsap.from('.slide--32__bottle.sixth', { opacity: 0, duration: 0.75, delay: 1.9, y: 90 });
    gsap.from('.slide--32__bottle.seventh', { opacity: 0, duration: 0.75, delay: 2.2, y: 90 });
    nextArrowDelay = 2.7;
  },
  33: () => {
    gsap.from('.slide--33__bottles-wrapper.first', { opacity: 0, duration: 0.75, delay: 1, x: -90 });
    gsap.from('.slide--33__line', { opacity: 0, duration: 0.75, delay: 1.4, scaleY: 0 });
    gsap.from('.slide--33__bottles-wrapper.second', { opacity: 0, duration: 0.75, delay: 1.8, x: 90 });
    nextArrowDelay = 2.3;
  },
  34: () => {
    clearTimeout(lastSlideActionTimeout);
    gsap.from('.slide--34__bottle.first', { opacity: 0, duration: 0.75, delay: 1, y: 90 });
    gsap.from('.slide--34__bottle.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 90 });
    gsap.from('.slide--34__bottle.third', { opacity: 0, duration: 0.75, delay: 1.8, y: 90 });
    gsap.from('.slide--34__bottle.fourth', { opacity: 0, duration: 0.75, delay: 2.2, y: 90 });
    gsap.from('.slide--34__bottle.fifth', { opacity: 0, duration: 0.75, delay: 2.6, y: 90 });
    nextArrowDelay = 3.1;
  },
  35: () => {
    gsap.from('.slide--35__bottle.first', { opacity: 0, duration: 0.75, delay: 1, y: 90 });
    gsap.from('.slide--35__bottle.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 90 });
    gsap.from('.slide--35__bottle.third', { opacity: 0, duration: 0.75, delay: 1.8, y: 90 });
    gsap.from('.slide--35__bottle.fourth', { opacity: 0, duration: 0.75, delay: 2.2, y: 90 });
    lastSlideActionTimeout = setTimeout(() => {
      lastSlideAction();
    }, 10 * 1000);
  },
}
// function that add animation for element
function animateSlide(slideNum = 1) {
  gsap.from('.slide', { opacity: 0, duration: 0.75 });

  slideActions[slideNum]();
}
// function that detect oriental of device
function updateRotateBlockVisibility() {
  const isPortrait = window.matchMedia('(orientation: portrait)').matches;

  $(rotateBlock).toggleClass('visible', isPortrait);
}
// function that load slide without reloading page
async function loadComponent(componentPathName, slideNum) {
  const response = await fetch(componentPathName);
  const data = await response.text();

  slideContainer.innerHTML = data;
  animateSlide(slideNum);
}
// function that update info about prev/next button
function updateNavigationButtons(currentSlide) {
  clearTimeout(nextButtonTimeout);
  clearTimeout(prevButtonTimeout);

  $(nextSlideButton).addClass(hiddenArrowClass);
  $(prevSlideButton).addClass(hiddenArrowClass);

  switch (currentSlide) {
    case 0:
      break;
    case 1:
      $(nextSlideButton).removeClass(hiddenArrowClass);
      break;
    case totalSlideAmount:
      $(prevSlideButton).removeClass(hiddenArrowClass);
      break;
    default:
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, nextArrowDelay * 1000);
  }
}
// function that change slide on the screen
async function changeSlide(direction) {
  const currentSlideNum = slideContainer.getAttribute('data-current-slide');

  let newSlideNum;

  if (direction === 'next') {
    newSlideNum = Number(currentSlideNum) + 1;
  } else if (direction === 'prev') {
    newSlideNum = Number(currentSlideNum) - 1;
  }

  const { pathName } = pathNames.find(pathNameInfo => pathNameInfo.count === +newSlideNum);

  await loadComponent(pathName, newSlideNum);

  slideContainer.setAttribute('data-current-slide', newSlideNum);
  updateNavigationButtons(newSlideNum);
}

//window and document listeners
$(document).ready(function () {
  setResponsiveFontSize();
  updateRotateBlockVisibility();
});
$(window).on('resize', function () {
  setResponsiveFontSize();
  updateRotateBlockVisibility();
});
$(window).on('orientationchange', function () {
  updateRotateBlockVisibility();
});

// button listeners
$(agreementButton).on('click', () => {
  loadComponent(pathNames[0].pathName);
  slideContainer.setAttribute('data-current-slide', 1);
  updateNavigationButtons(1);
});
$(nextSlideButton).on('click', () => {
  changeSlide('next')
})
$(prevSlideButton).on('click', () => {
  changeSlide('prev')
});