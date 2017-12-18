import $ from 'jQuery';
import _ from 'lodash';
import 'velocity';


/**
 * class constructor
 */
export default class Scroll {
  constructor(el) {
    this.el = $('js-scroll');
    this.body = $('body');

    this.target = null;
    this.to = null;

    // オプション
    this.duration = 1200;
    this.easing = 'easeOutQuint';
    this.offset = 0;
    this.hash = true;
  }

  initialize() {

    if(this.el == null) {
      return;
    }
    this.body = $('body');
    //this.body.addClass('has-load');

    this.bind();
  }

  bind() {
    this.onClickTrigger = _.bind(this.onClickTrigger, this);

    this.el
      .on('click', this.onClickTrigger);
  }

  scroll(el) {
    this.to = el === '#' ? this.body : $(el);
    //this.offset = offset;

    this.to.velocity("scroll", {
      duration: this.duration,
      easing: this.easing,
      offset: this.offset
    },
    function(){
      if(this.hash) {
        history.pushState('', '', h);
      }
    });
  }

  onClickTrigger(e) {
    console.log('click');

    var hash;
    this.target = $(e.currentTarget);
    console.log(this.target);

    hash = this.target.attr('href');
    //offset = this.target.data('offset');
    this.scroll(hash);
  }
}