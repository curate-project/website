/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/blocks/footer/footer.js":
/*!*************************************!*\
  !*** ./src/blocks/footer/footer.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/blocks/header/header.js":
/*!*************************************!*\
  !*** ./src/blocks/header/header.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/js/import/blocks.js":
/*!*********************************!*\
  !*** ./src/js/import/blocks.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blocks_header_header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! %blocks%/header/header.js */ "./src/blocks/header/header.js");
/* harmony import */ var _blocks_header_header_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_blocks_header_header_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _blocks_footer_footer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! %blocks%/footer/footer.js */ "./src/blocks/footer/footer.js");
/* harmony import */ var _blocks_footer_footer_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_blocks_footer_footer_js__WEBPACK_IMPORTED_MODULE_1__);



/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _import_blocks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./import/blocks.js */ "./src/js/import/blocks.js");


window.onload = function () {
      // scroll
    $(".goTo").on("click", function(event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top,
            x = 0;
        $('body,html').animate({
            scrollTop: top - x
        }, 600);
    });
  // PRELOADER
  setTimeout(function () {
    $('#preloader').removeClass('is-active');
    $('html').removeClass('overflow');
  }, 1337); // SLIDER

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
}; // ABOUT BUTTON


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

/***/ })

/******/ });
//# sourceMappingURL=main.js.map