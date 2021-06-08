
$(document).ready(function(){

    $('.reviews__inner').slick({
        centerMode: true,
        centerPadding: '360px',
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/slider/next_arrow.png" alt=""></button>',
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/slider/back_arrow.png" alt=""></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    centerMode: true,
                    centerPadding: '300px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 993,
                settings: {
                    centerMode: true,
                    centerPadding: '70px',
                    slidesToShow: 1,
                    dots: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerMode: true,
                    centerPadding: '10px',
                    slidesToShow: 1,
                    dots: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 576,
                settings: {

                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1,
                    dots: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 375,
                settings: {

                    centerMode: true,
                    centerPadding: '20px',
                    slidesToShow: 1,
                    dots: true,
                    arrows: false,
                }
            }
          ]
    });

});


const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      menu__link = document.querySelectorAll('.menu__link a')
      closeElem = document.querySelector('.menu__close'),
      modal = document.querySelector('.modal'),
      consultation_btn = document.querySelectorAll('[data-modal=consultation]'),
      overlay = document.querySelector('.overlay__dark'),
      modal__close = document.querySelector('.modal__close'),
      promotion = document.querySelector('.promotion__descr');

    



hamburger.addEventListener('click', () => {
    menu.classList.add('active');
}); 

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});



const counters = document.querySelectorAll('.skills__ratings-counter'),
      lines = document.querySelectorAll('.skills__ratings-line span');

counters.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});


consultation_btn.forEach((item) =>{
    item.addEventListener('click', ()=>{
        modal.style = 'display: block';
        overlay.style = 'display: block';
    });
});

 // #id

modal__close.addEventListener('click', () =>{
    modal.style = 'display: none';
    overlay.style = 'display: none';
    $('form').trigger('reset');
}); 






const deadline = '2021-06-10';
function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor( (t/(1000*60*60*24)) ),
        seconds = Math.floor( (t/1000) % 60 ),
        minutes = Math.floor( (t/1000/60) % 60 ),
        hours = Math.floor( (t/(1000*60*60) % 24) );

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}
function getZero(num){
    if (num >= 0 && num < 10) { 
        return '0' + num;
    } else {
        return num;
    }
}
function setClock(selector, endtime) {

    const timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);
        promotion.innerHTML = "Мы ценим каждого клиента и предлагаем вам стать одним из них на очень выгодных условиях. Каждому, кто оформит заказ, будет предоставлена скидка в размере <span>30%!</span><br><br>Акция закончится  "+ (t.days+9)+"  мая в 00:00";

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}
setClock('.timer', deadline);





$('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#order').fadeOut();
        $('.overlay__dark, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
});


$(function(){
        $("a[href^='#']").click(function(){
                var _href = $(this).attr("href");
                $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
                return false;
        });
});

menu__link.forEach((item) =>{
    item.addEventListener('click', ()=>{
        menu.classList.toggle('active')
    });
}); 