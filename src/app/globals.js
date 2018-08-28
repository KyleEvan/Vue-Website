import { images } from './images.js';

var globals = {
  // See global.scss for breakpoints MUST BE IN SYNC
  breakpoints:{
    sm: 200,
    md: 800,
    lg: 1300,
    xl: 1600
  },
  debounce(func, wait, immediate){
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate)
          func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow)
        func.apply(context, args);
    };
  }
}
export { globals };
