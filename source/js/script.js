$(window).scroll(function () {
  var header = $(".floating-header");
  var logo = $(".floating-header--fixed .floating-header__logo");

  var scrollTop = $(window).scrollTop();

  if (scrollTop >= 10) {
    header.addClass("floating-header--fixed");
    header.addClass("page__header-inner--with-shadow");
    logo.attr( "src", function() {
      return "../img/logo-colorful.png";
    });
  }
  else {
    header.removeClass("floating-header--fixed");
    header.removeClass("page__header-inner--with-shadow");
    logo.attr( "src", function() {
      return "../img/logo-white.png";
    });
  }
});

$(".main-nav__button").on("click", function () {
  $(".page__header-inner").toggleClass("page__header-inner--closed");
  $(".main-nav__bottom").toggleClass("nav-item--closed");
  $(".main-nav__top").toggleClass("nav-item--closed");
  $(".main-nav__button").toggleClass("main-nav__button--closed");
});

let slides = $(".slides__item").length;
let current = 0;

$.each($(".slides__item"), function (index, item) {
  if (index === current) {
    $(item).css("display", "flex");
  }
  else {
    $(item).css("display", "none");
  }
});

$.each($(".slides__next-button"), function (index, button) {
  $(button).on("click", function () {
    moveSlides(current + 1);
  });
});

$.each($(".slides__prev-button"), function (index, button) {
  $(button).on("click", function () {
    moveSlides(current - 1);
  });
});

$.each($(".slides__button"), function (index, button) {
  $(button).on("click", function () {
    if (index === current) {
      return;
    }
    moveSlides(index);
  });
});

function moveSlides(next) {
  let direction = next < current;
  let hasNext = next >= 0 && next < slides;
  let paddingTop = $(".slides").css("padding-top");
  let slidesHeight = $($(".slides__item")[current]).css("height");
  let slidesWidth = $($(".slides__item")[current]).css("width");
  if (hasNext) {
    $($(".slides__item")[current]).css("z-index", "2");
    $($(".slides__item")[next]).css("z-index", "1");
    $($(".slides__item")[current]).css("position", "absolute");
    $($(".slides__item")[next]).css("display", "flex");
    $($(".slides__item")[next]).css("opacity", "0.5");
    $($(".slides__item")[current]).css("top", paddingTop);
    $($(".slides__item")[current]).css("height", slidesHeight);
    $($(".slides__item")[current]).css("width", slidesWidth);
    animate({
      duration: 200,
      timing(timeFraction) {
        return timeFraction;
      },
      draw(progress) {
        let value = (direction) ? -progress * 100 + "%" : progress * 100 + "%";
        $($(".slides__item")[current]).css("left", value);
      },
      done() {
        $($(".slides__item")[current]).css("height", "auto");
        $($(".slides__item")[current]).css("width", "auto");
        $($(".slides__item")[current]).css("display", "none");
        $($(".slides__item")[current]).css("position", "static");
        $($(".slides__item")[next]).css("opacity", "1");
        $($(".slides__button")[next]).addClass("slides__button--active");
        $($(".slides__button")[current]).removeClass("slides__button--active");
        current = next;
      }
    });
  }
}

function animate({timing, draw, duration, done}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) {
      timeFraction = 1;
      done();
    }

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}
