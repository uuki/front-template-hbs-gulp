import $ from 'jQuery';

/**
 * structures
 */
import Utils      from './modules/utils'
import Scroll     from './modules/scroll'
//import Navigation from './modules/navigation'
//import Map        from './modules/gmap'

export default class {
  constructor(el) {

    //Utils.$window = $(window);
    //Utils.$body = $('body');

    this.$el = $(el);

    this.structures = {
      scroll: new Scroll('.js-scroll')
      // navigation = new Navigation('.js-navi')
      // map = new Map('.js-gmap')
    };

    this.initialize();
    this.bind();
  }

  initialize() {
    this.structures.scroll.initialize();
  }

  bind() {
    //this.structures.scroll.$el.on('click', this.onTransitionEndMenu.bind(this));
  }

}