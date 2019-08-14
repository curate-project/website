window.onload = function () {
  // scroll
  $(".goTo").on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top,
      x = 0;
    $('body,html').animate({
      scrollTop: top - x
    }, 600);
  });
  // // PRELOADER
  // setTimeout(function () {
  //   $('#preloader').removeClass('is-active');
  //   $('html').removeClass('overflow');
  // }, 1337); // SLIDER

  const ieo = [
    //IEO Round 1
    {
      start: moment('20190809', 'YYYYMMDD').toDate(),
      end: moment('20190827', 'YYYYMMDD').toDate(),
      price: 0.1,
      discount: 0.25,
      fundingGoal: 750000
    },
    //IEO Round 2
    {
      start: moment('20190916', 'YYYYMMDD').toDate(),
      end: moment('20191015', 'YYYYMMDD').toDate(),
      price: 0.12,
      discount: 0.25,
      fundingGoal: 720000
    },
    //IEO Round 3
    {
      start: moment('20191025', 'YYYYMMDD').toDate(),
      end: moment('20191124', 'YYYYMMDD').toDate(),
      price: 0.15,
      discount: 0.25,
      fundingGoal: 787500
    },
  ]

  function getCurrentIEOPhase() {
    let phase = undefined;
    const today = new Date(Date.now());

    if (today >= ieo[0].start && today <= ieo[0].end) {
      phase = ieo[0];
    } else if (today >= ieo[1].start && today <= ieo[1].end) {
      phase = ieo[1];
    } else if (today >= ieo[2].start && today <= ieo[2].end) {
      phase = ieo[2];
    }

    return phase;
  }

  function setupCountdown() {
    let label = 'ieo starts in';
    let countdown = undefined;
    const today = new Date(Date.now());

    if (today < ieo[0].start) {
      label = 'ieo starts in';
      countdown = ieo[0].start;
    } else if (today >= ieo[0].start && today <= ieo[0].end) {
      label = 'ieo ends'
      countdown = ieo[0].end;
    } else if (today > ieo[0].end && today < ieo[1].start) {
      label = 'ieo 2 starts'
      countdown = ieo[1].start;
    } else if (today >= ieo[1].start && today <= ieo[1].end) {
      label = 'ieo 2 ends'
      countdown = ieo[1].end;
    } else if (today > ieo[1].end && today < ieo[2].start) {
      label = 'ieo 3 starts'
      countdown = ieo[2].start;
    } else if (today >= ieo[2].start && today <= ieo[2].end) {
      label = 'ieo 3 ends'
      countdown = ieo[2].end;
    } else {
      $("countdown-container").remove();
      return;
    }

    $("#countdown-label").text(label);

    $("#countdown").countdown(countdown, function (event) {
      if (new Date(event.timeStamp) > Date.parse(event.finalDate)) {
        setupCountdown();
      }

      $(this).html(
        event.strftime(
          '<div class="timer-wrapper"><div class="time">%D</div><span class="text">days</span></div><div class="timer-wrapper"><div class="time">%H</div><span class="text">hours</span></div><div class="timer-wrapper"><div class="time">%M</div><span class="text">min</span></div><div class="timer-wrapper"><div class="time">%S</div><span class="text">sec</span></div>'
        )
      );
    });
  }

  setupCountdown();

  let fundsRaisedTimer = undefined;

  function setupFundsRaised() {
    const phase = getCurrentIEOPhase();

    if (!phase) {
      $('#funds-container').remove();
      return;
    }

    $('#fundsRaised').goalProgress({
      goalAmount: 2250000,
      currentAmount: 0,
      textBefore: '$',
      textAfter: ' raised'
    });

    $('#countdown-container').addClass('countdown-combined');
  }

  // TODO: Disabling funds raised until manually added back
  // setupFundsRaised();
  $('#funds-container').remove();

  $(document).ready(function () {
    $('#lightSlider').lightSlider({
      item: 1,
      slideMove: 1,
      slideMargin: 0,
      loop: true
    });

    $('#airswap').on('click', function () {
      console.log('Clicked AirSwap');

      AirSwap.Trader.render({
        env: 'production',
        mode: 'buy',
        token: '0x490dbf7884b8e13c2161448b83dd2d8909db48ed',
        address: '0x03b6f5b2966778359496b7dac651a7ad564948a4',
        // amount: 250 * (10 ** 4),
        onCancel: function () {
          console.info('Trade was canceled.');
        },
        onComplete: function (transactionId) {
          console.info('Trade complete.');
        }
      }, 'body');
    });
  });

  var swiper = new Swiper('.our-team__slider-wrap', {
    spaceBetween: 25,
    slidesPerView: 5,
    centeredSlides: true,
    loop: true,
    loopAdditionalSlides: 2,
    // grabCursor: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    // effect: 'fade',
    navigation: {
      nextEl: '.our-team__slider-btn--right',
      prevEl: '.our-team__slider-btn--left'
    },
    breakpoints: {
      // when window width is <= 645px
      645: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      // when window width is <= 1100px
      1100: {
        slidesPerView: 3,
        spaceBetween: 10
      }
    }
  }); // MOBILE MENU

  var hamburger = document.querySelector('.hamburger'); // const headermobile = document.querySelector('.header-mobile');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('is-active'); // headermobile.classList.toggle('opened');
    // document.querySelector('html').classList.toggle('overflow');

    if (hamburger.classList.contains('is-active')) {
      openMenu();
    } else {
      closeMenu();
    }
  }); // SMOOTH SCROLL

  $('.link, .main-nav__item-link').on('click', function () {
    var el = $(this);
    var dest = el.attr('href'); // получаем направление

    if (dest !== undefined && dest !== '') {
      // проверяем существование
      $('html').animate({
        scrollTop: $(dest).offset().top // прокручиваем страницу к требуемому элементу

      }, 500 // скорость прокрутки
      );
    }

    return false;
  });
  $('.header-mobile__nav-menu>.item>.link').on("click", function (e) {
    // e.preventDefault();
    console.log('close menu by link');
    hamburger.classList.toggle('is-active'); // headermobile.classList.toggle('opened');

    closeMenu();
  });

  function openMenu() {
    console.log('open1');
    $('html').addClass('overflow');
    $('div.circle').addClass('expand');
    $('.menu li').addClass('animate');
    $('div.menu').css("visibility", "visible");
    console.log('open2');
  }

  function closeMenu() {
    console.log('close1');
    $('html').removeClass('overflow');
    $('div.circle').removeClass('expand');
    $('.menu li').removeClass('animate');
    $('div.menu').css("visibility", "hidden");
    console.log('close2');
  } // AVATAR MENU


  var accountAvatar = document.getElementsByClassName("account__avatar")[0];
  var accountMenu = document.getElementsByClassName("account__menu")[0];
  var avatarAngle = document.getElementsByClassName("account__avatar-angle")[0];
  accountAvatar.addEventListener("click", function () {
    accountMenu.classList.toggle("account__menu--show");
    avatarAngle.classList.toggle("account__avatar-angle--show"); // mobMenu.classList.toggle("mob-menu_close");
  });
  // ABOUT BUTTON


  var isQualityOpenAll = false;
  $('.about__btn').on("click", function (e) {
    e.preventDefault();
    $('.about__text--hidden').slideToggle();
    isQualityOpenAll = !isQualityOpenAll;
    var text = isQualityOpenAll ? 'Close' : 'More info';
    var icon = isQualityOpenAll ? 'img/sprites/intermediate-svg/about-close.svg' : 'img/sprites/intermediate-svg/about-open.svg';
    $('.about__btn-text').text(text);
    $('.about__btn-img').attr('src', icon);
  });

  /***/
  // var cookiepanel = document.querySelector(".cookie");
  // if (cookiepanel) {
  //   // Cookie
  //   if (!localStorage.isCookiesClosed) {
  //     cookiepanel.style.display = "block";
  //   }

  //   var cookiebtn = document.getElementById('cookiebtn');

  //   if (cookiebtn) {
  //     cookiebtn.addEventListener("click", function () {
  //       localStorage.isCookiesClosed = true;
  //       cookiepanel.style.display = "none";
  //     })
  //   }
  // }

  const cookieSas = () => {
    document.querySelector('#cookie').style.display = localStorage.cookieSas ? 'none' : '';
  }
  cookieSas()
  document.querySelector('#cookiebtn').addEventListener('click', () => {
    localStorage.cookieSas = true;
    cookieSas()
  })
};




