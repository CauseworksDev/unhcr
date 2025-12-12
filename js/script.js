// 사파리 높이값 버그 수정
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});


// sec1 fadeIn 
$(function(){
  $(sec1).addClass('ani');
});


// sec1 scroll trigger
gsap.registerPlugin(ScrollTrigger);

function initSec1ClassEvent() {

    // 모바일 전용
    if (window.innerWidth > 850) return;

    ScrollTrigger.create({
        trigger: ".sec1",
        start: "top top",
        end: "+=500",
        pin: true,
        scrub: false,
        toggleActions: "play none none reverse",

        onUpdate: (self) => {
            if (self.progress > 0.1) {
                document.querySelector(".sec1").classList.add("on");
            } else {
                document.querySelector(".sec1").classList.remove("on");
            }
        }
    });
}

initSec1ClassEvent();


// floating banner
const sec1 = document.querySelector('.sec1');
const floating = document.querySelector('.floating_bn');

const observerSec1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            floating.classList.remove('show');
        } else {
            floating.classList.add('show');
        }

    });
}, { threshold: 0.5 });

observerSec1.observe(sec1);


// sec2 fadeIn 
const sec2 = document.querySelector('.sec2');

const observerSec2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sec2.classList.add('ani');      
        }
    });
}, { threshold: 0.5 });

observerSec2.observe(sec2);


// sec3 fadeIn 
const sec3 = document.querySelector('.sec3');

const observerSec3 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sec3.classList.add('ani');      
        }
    });
}, { threshold: 0.5 });

observerSec3.observe(sec3);


// sec4 event
let sec4Ready = false;
const sec4 = document.querySelector('.sec4');

// fadeIn
const observerSec4 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sec4.classList.add('ani');

            setTimeout(() => {
                sec4Ready = true;
                updateSlideAnimation(swiper1);
            }, 600);
        }
    });
}, { threshold: 0.5 });

observerSec4.observe(sec4);


// Swiper - sec4 편지 슬라이더
$(function () {

    window.swiper1 = new Swiper('.sec4 .swiper1', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 800,
        loop: false,
        slidesPerView: 1,
        allowTouchMove: false,

        navigation: {
            nextEl: '.sec4 .btn_next',
            prevEl: '.sec4 .btn_prev'
        },

        on: {
            init: function () {
                hideAllButtons();
                updateSlideAnimation(this);
            },
            slideChange: function () {
                hideAllButtons();
                updateSlideAnimation(this);
            }
        }
    });

    function hideAllButtons() {
        $('.sec4 .btn_prev, .sec4 .btn_next').removeClass('on');
    }

    // 슬라이드별 버튼 제어
    function updateSlideAnimation(swiper) {
        $('.sec4 [class*="img_box_"]').removeClass('slide_ani');

        const $currentImg = $(swiper.slides[swiper.activeIndex])
            .find('[class*="img_box_"]');

        $currentImg.addClass('slide_ani');

        $currentImg.off('animationend.showBtns');
        $currentImg.on('animationend.showBtns', function () {
            updateButtons(swiper);
        });
    }

    // 이미지 + 버튼 나타나는 타이밍 제어
    function updateButtons(swiper) {
        const total = swiper.slides.length;
        const idx = swiper.activeIndex;

        $('.sec4 .btn_prev, .sec4 .btn_next').removeClass('on');

        if (idx !== 0) {
            $('.sec4 .btn_prev').addClass('on');
        }

        if (idx !== total - 1) {
            $('.sec4 .btn_next').addClass('on');
        }
    }

});


// sec5 fadeIn 
const sec5 = document.querySelector('.sec5');

const observerSec5 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sec5.classList.add('ani');         
            sec5.classList.add('on');         
        }
    });
}, { threshold: 0.5 });

observerSec5.observe(sec5);


// sec5 - btm event
const btnMinus = document.querySelector('.btn_minus');
const btnPlus = document.querySelector('.btn_plus');
const countNum = document.querySelector('.count_num');
const priceEl = document.querySelector('.price');

let count = 1;          
const min = 1;
const max = 4;

const unitPrice = 15000;

updateButtons();
updatePrice(count * unitPrice);

btnPlus.addEventListener('click', () => {
    if (count < max) {
        count++;
        countNum.value = count;
        updateButtons();
        updatePrice(count * unitPrice);
        playStarAnimation(count);
    }
});

btnMinus.addEventListener('click', () => {
    if (count > min) {
        count--;
        countNum.value = count;
        updateButtons();
        updatePrice(count * unitPrice);
        playStarAnimation(count);
    }
});

// 버튼 상태 함수
function updateButtons() {
    // minus
    if (count === min) {
        btnMinus.classList.add("disabled");
    } else {
        btnMinus.classList.remove("disabled");
    }

    // plus
    if (count === max) {
        btnPlus.classList.add("disabled");
    } else {
        btnPlus.classList.remove("disabled");
    }
}

// 가격 카운팅 함수
function updatePrice(newPrice) {
    const currentPrice = parseInt(priceEl.textContent.replace(/[^0-9]/g, ""), 10);

    const duration = 300; 
    const startTime = performance.now();

    function animate(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(currentPrice + (newPrice - currentPrice) * progress);

        priceEl.textContent = value.toLocaleString() + "원";

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

// 하단 별똥별 함수
function playStarAnimation() {
    const stars = document.querySelectorAll('.sec5 .star');

    stars.forEach(star => {
        star.classList.remove('on');
        void star.offsetWidth;
    });

    stars.forEach(star => {
        star.classList.add('on');
    });
}


// mouse trick
const goods = document.querySelector('.sec6 .goods');
const imgWrap = goods.querySelector('.img_wrap');
const bg = goods.querySelector('.goods_bg');

const RANGE_Y = 700; // 위아래 작동 범위

if (window.innerWidth > 850) {
    window.addEventListener('mousemove', (e) => {

        const rect = goods.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const diffY = e.clientY - centerY;

        if (Math.abs(diffY) > RANGE_Y) {
            bg.style.transform = `translate(-50%, 0px)`;
            imgWrap.style.transform = `translate(0px, 0px)`;
            return;
        }

        const centerX = rect.left + rect.width / 2;
        const diffX = e.clientX - centerX;

        const moveX = diffX / 20;
        const moveY = diffY / 20;

        bg.style.transform = `translate(calc(-50% + ${moveX}px), ${moveY}px)`;
        imgWrap.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
    });
}


// scroll fadeIn
gsap.registerPlugin(ScrollTrigger);

const isMobile = window.matchMedia("(max-width: 767px)").matches;

let sequence = [];

if (isMobile) {
    // mo
    sequence = gsap.utils.toArray(
        ".sec6 .news_wrap.mo > figure, .sec6 .news_wrap.mo > .des"
    );
} else {
    // pc
    const leftItems = gsap.utils.toArray(".sec6 .news_wrap.pc .left figure");
    const rightItems = gsap.utils.toArray(".sec6 .news_wrap.pc .right figure");
    const des = document.querySelector(".sec6 .news_wrap.pc .des");

    for (let i = 0; i < Math.max(leftItems.length, rightItems.length); i++) {
        if (leftItems[i]) sequence.push(leftItems[i]);
        if (i === 1 && des) sequence.push(des);
        if (rightItems[i]) sequence.push(rightItems[i]);
    }
}

sequence.forEach((item, i) => {
    gsap.fromTo(
        item,
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true
            }
        }
    );
});


// img marquee
const track = document.querySelector(".marquee_track");
let speed = 1;

function fillTrack() {
  const parentWidth = window.innerWidth; 
  
  while (track.scrollWidth < parentWidth * 2) {
    const clone = track.children[0].cloneNode(true);
    track.appendChild(clone);
  }
}

function animate() {
  let x = 0;

  function loop() {
    x -= speed;

    const firstItem = track.children[0];
    const style = getComputedStyle(firstItem);
    const marginRight = parseFloat(style.marginRight);
    const firstWidth = firstItem.offsetWidth + marginRight;

    if (Math.abs(x) > firstWidth) {
      track.appendChild(firstItem);
      x += firstWidth;
    }

    track.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(loop);
  }

  loop();
}

window.onload = () => {
  fillTrack();
  animate();
};


// faq
$('.faq .question').click(function () {
    const faq = $(this).closest('.faq');
    const answer = faq.find('.answer');

    // $('.faq').not(faq).removeClass('on').find('.answer').slideUp();

    faq.toggleClass('on');
    answer.stop(true, true).slideToggle();
});