import { images } from './images.js';

exports.globals = {
    breakpoints: { // See global.scss for breakpoints MUST BE IN SYNC
      sm: 200,
      md: 800,
      lg: 1300,
      xl: 1600
    },
    getImages(){
      return images(this.breakpoints, document.documentElement.clientWidth);
    },
    getViewport(){
      return {
        width: window.innerWidth,
        cWidth: document.documentElement.clientWidth,
        cHeight: document.documentElement.clientHeight
      }
    },
    // handleResize(){
    //   const handleResize = debounce(() => {
    //     this.viewport = this.getWindow();
    //     this.images = images(this.breakpoints, document.documentElement.clientWidth);
    //     console.log(this.viewport);
    //     console.log(this.images);
    //   }, 25);
    //   window.addEventListener('resize', handleResize);
    // },
    // init(){
    //   // this.viewport = this.getWindow();
    //   // this.images = images(this.breakpoints, document.documentElement.clientWidth)
    //   // this.handleResize();
    // }
};
