document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    const wrapper = document.getElementById('wrapper'),
        container = document.getElementById('container'),
        carouselArr = document.querySelectorAll('.wrapper div'),
        left = document.getElementById('left'),
        right = document.getElementById('right'),
        dotsWrapper = document.querySelector('.dots');

    for (let i = 0; i < carouselArr.length; i++) {
        let dot = document.createElement('div');
        dot.setAttribute('data-index', i);
        dot.setAttribute('class', 'dot');
        dotsWrapper.append(dot);
    }

    const dots = document.querySelectorAll('.dot');

    let itemWidth = getComputedStyle(carouselArr[0]).width.replace('px', ''),
        wrapperWidth = carouselArr.length * itemWidth,
        containerWidth = itemWidth;


    wrapper.style.width = wrapperWidth + 'px';
    container.style.maxWidth = containerWidth + 'px';

    let pos = 0;
    let activeDot = 0;
    dots[activeDot].classList.add('active');


    right.addEventListener('click', () => {
        removeEachActive(dots)
        if (pos == (wrapperWidth - itemWidth)) {
            activeDot = 0;
            addActiveClass(dots[activeDot]);
            pos = 0;
            return changeTransforPos(pos);
        }
        activeDot += 1;
        addActiveClass(dots[activeDot]);
        pos += +itemWidth;
        changeTransforPos(pos);
    })

    left.addEventListener('click', () => {
        removeEachActive(dots)
        if (pos == 0) {
            activeDot = carouselArr.length - 1;
            addActiveClass(dots[activeDot]);
            pos = wrapperWidth - +itemWidth;
            return changeTransforPos(pos);
        }
        activeDot -= 1;
        addActiveClass(dots[activeDot]);
        pos -= +itemWidth;
        changeTransforPos(pos);
    })

    dots.forEach((d, i) => {
        d.addEventListener('click', () => {
            removeEachActive(dots);
            addActiveClass(d);
            activeDot = i;
            pos = itemWidth * i;
            wrapper.style.transform = `translateX(-${pos}px)`;
        })
    })

    function removeEachActive(elements) {
        return elements.forEach(e => e.classList.remove('active'));
    }

    function addActiveClass(element) {
        return element.classList.add('active')
    }

    function changeTransforPos(pos) {
        wrapper.style.transform = `translateX(-${pos}px)`;
    }
})