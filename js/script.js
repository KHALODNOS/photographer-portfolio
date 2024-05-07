'use strict'

// way 1
// let navbar = document.querySelector('.navbar');
// let navbarBtn = document.querySelector('#menu-btn');


// navbarBtn.onclick = () => {
//     navbar.classList.toggle('active');
// };

const addEventOneElment = function(elements, eventType, callback) {
    for(let i = 0; i < elements.length; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

// PRELOADING

const loadingElemnt = document.querySelector("[data-loading]");

window.addEventListener('load', function() {
    loadingElemnt.classList.add('loaded');
    document.body.classList.remove("active")
})



const [navTogglers, navLinks, navbar, overlay] = [ 
    document.querySelectorAll("[data-nav-toggler]"),
    document.querySelectorAll("[data-nav-link]"),
    document.querySelector('[data-navbar]'),
    document.querySelector('[data-overlay]')
]

const toggleNav = function () {
    navbar.classList.toggle('active')
    overlay.classList.toggle('active')
    document.body.classList.toggle('active')
}

addEventOneElment(navTogglers , 'click', toggleNav);

const closeNav = function() {
    navbar.classList.remove('active')
    overlay.classList.remove('active')
    document.body.classList.remove('active')
}

addEventOneElment(navLinks, 'click', closeNav)


// HEADER

const header = document.querySelector('[data-header]');

const activeElementOnscroll = function () {
    if(window.scrollY > 50) {
        header.classList.toggle('active')
    } else {
        header.classList.remove('active')
    }
}

window.addEventListener('scroll', activeElementOnscroll)


const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function () {
    for (let i = 0; i < letterBoxes.length; i++) {
        let letterAnimationDelay = 0;

        const letters = letterBoxes[i].textContent.trim();

        letterBoxes[i].textContent = '';

        for (let j = 0; j < letters.length; j++) {
            const span = document.createElement("span");

            span.style.animationDelay = `${letterAnimationDelay}s`;

            if( i === activeLetterBoxIndex) {
                span.classList.add('in');
            } else {
                span.classList.add("out")
            }

            span.textContent = letters[j];

            if (letters[j] ===" ") span.classList.add('space');

            letterBoxes[i].appendChild(span)

            if(j >= letters.length - 1) break;

            letterAnimationDelay+= 0.05
        }

        if (i === activeLetterBoxIndex) {
            totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2))
        }

        if (i === lastActiveLetterBoxIndex) {
            letterBoxes[i].classList.add('active')
        } else {
            letterBoxes[i].classList.remove('active')
        }
    }

    setTimeout ( function () {
        lastActiveLetterBoxIndex = activeLetterBoxIndex;
        activeLetterBoxIndex >= letterBoxes.length - 1 ? activeLetterBoxIndex = 0 :
        activeLetterBoxIndex++;

        setLetterEffect();
    }, (totalLetterBoxDelay * 1000) + 3000)
}

window.addEventListener("load", setLetterEffect);


const backToTop = document.querySelector("[data-back-btn]")

window.addEventListener('scroll', function () {
    const bodyHeight = this.document.body.scrollHeight;
    const windowHeight = this.window.innerHeight;
    const scrollEndPos = bodyHeight - windowHeight;
    const totalScroll = (window.scrollY / scrollEndPos) * 100;
    backToTop.textContent = `${totalScroll.toFixed(0)}%`;


    if(totalScroll > 5) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show')
    }
});

const revealElments = document.querySelectorAll("[data-reveal]")

const scrollReveal = function () {
    for (let i = 0; i < revealElments.length; i++) {
        const elementIsScreen = revealElments[i].getBoundingClientRect().top < window.innerHeight / 1.15

        if(elementIsScreen) {
            revealElments[i].classList.add("prevealed")
        } else {
            revealElments[i].classList.remove('prevealed')
        }
    }
}
window.addEventListener('scroll', scrollReveal);
scrollReveal();

const cursor = document.querySelector("[data-cursor]");

const anchorElments = document.querySelectorAll('a');

const buttons = document.querySelectorAll('button');

document.body.addEventListener("mousemove",
function(event){
    setTimeout (function () {
        cursor.style.top = `${event.clientY}px`;
        cursor.style.left = `${event.clientX}px`;
    }, 100)
})

const hoverActive = function () {
    cursor.classList.add("hovered");
}

const hoverDeactive = function () {
    cursor.classList.remove('hovered');
}

addEventOneElment(anchorElments, "mouseover", hoverActive);
addEventOneElment(anchorElments, "mouseout", hoverDeactive);

addEventOneElment(buttons, "mouseover", hoverActive);
addEventOneElment(buttons, "mouseout", hoverDeactive);

document.body.addEventListener('mouseout', function() {
    cursor.classList.add('disabled')
})

document.body.addEventListener('mouseover', 
function() {
    cursor.classList.remove('disabled');
});