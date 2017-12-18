import $ from 'jQuery';
import inview from 'inview';
import 'mobileEvents';
import debounce from 'debounce';
console.log(debounce);
//import Mercari from './mercari_recruit';
//$(() => new Mercari('html'));


// ▼ 一旦実装。後で構造化したい

/**
 * ページトップへ戻る
 */
$(document).on('click', '.js-scroll', (e) => {
  let $eventTarget, $body, $target, hash, to;

  $eventTarget = $(e.currentTarget);
  $body = $('body');

  let opts = {
    duration: 1500,
    easing: 'easeOutQuint',
    offset: 0,
    hash: true
  }

  hash = $eventTarget.attr('href');
  e.preventDefault();

  to = hash === '#' ? $body : $(hash);
  to.velocity("scroll", {
    duration: opts.duration,
    easing: opts.easing,
    offset: opts.offset
  },
  function(){
    if(opts.hash) {
      history.pushState('', '', h);
    }
  });
});


/**
 * ヘッダーの横スクロール
 */
$(document).on('scroll', () => {
  let $el, scrollX;

  $el = $('.js-header');
  scrollX = window.pageXOffset;

  $el.css('left', `-${ scrollX }px`);
});


/**
 * ファーストビューの高さ
 */
$(window)
  .on('load', () => {
    let app = navigator.appVersion.toLowerCase();

    if(app.match(/windows/)) {
      $('body').addClass('windows');
    }

    if(window.innerWidth < 768) {
      return;
    }

    let $el, height;

    $el = $('.js-firstview');
    height = window.innerHeight - 80;

    $el.css('height', `${ height }px`);
  })
  .on('resize', () =>{
    let width = window.innerWidth;

    if(window.innerWidth < 768) {
      $('.js-firstview').css('height', 'auto');
    } else {
      $(window).trigger('load');
    }

  });


/**
 * グロナビ
 */
class Navigation {

  constructor(el) {

    this.$el = $(el);
    this.$lists = this.$el.children('li');
    this.$anchor;
    this.item;
  }

  initialize() {

    if(window.innerWidth >= 768) {
      return;
    }

    for(this.item of this.$lists) {
      //this.$anchor = '#anc_value';
      this.$anchor = $(this.item).children('a').attr('href');
      $(this.item).attr('data-nav', this.$anchor);
      this.bind( $( this.$anchor ) );
    }
  }

  bind(el) {
    el.on('inview', this.onInView);
  }

  onInView(e, isInView, data) {
    let $id = '#' + $(e.currentTarget).attr('id');

    if(isInView) {
      $('[data-nav]').removeClass('is-view');
      $(`[data-nav="${ $id }"]`).get(0).classList.add('is-view');
    }
  }
}


/**
 * アコーディオン
 */
class Accordion {

  constructor(el) {
    this.$el = $(el);
    this.target;
  }

  initialize() {

    if(window.innerWidth >= 768) {
      return;
    }
    this.bind();
  }

  bind() {
    this.$el
      .on('tap', this.onTap)

    $(window)
      .on('resize', debounce(this.onResizeWindow, 200));
  }

  onTap(e) {
    let $this = $(e.currentTarget);
    this.target = $this.attr('data-type');

    $this.toggleClass('is-open');
    $(`[data-target="${ this.target }"]`).slideToggle();
  }

  onResizeWindow() {
    console.log('e');
    this.initialize();
  }

}


let navigation = new Navigation('.js-navi');
let accordion = new Accordion('.js-accordion');
navigation.initialize();
accordion.initialize();