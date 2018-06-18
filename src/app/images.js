import careers_screens_sm_png from '../images/careers_screens@sm.png';
import careers_screens_md_png from '../images/careers_screens@sm.png';
import careers_screens_lg_png from '../images/careers_screens@lg.png';
import careers_screens_xl_png from '../images/careers_screens@xl.png';

import comboSmash_death_sm_jpg from '../images/comboSmash-death@sm.jpg';
import comboSmash_death_md_jpg from '../images/comboSmash-death@md.jpg';
import comboSmash_death_lg_jpg from '../images/comboSmash-death@lg.jpg';

import comboSmash_horde_sm_jpg from '../images/comboSmash-horde@sm.jpg';
import comboSmash_horde_md_jpg from '../images/comboSmash-horde@md.jpg';
import comboSmash_horde_lg_jpg from '../images/comboSmash-horde@lg.jpg';

import comboSmash_preview_lg_jpg from '../images/comboSmash-preview@lg.jpg';

import cycles_lg_jpg from '../images/cyclesTile@lg.jpg';


const images = [
  {
    name: 'careers_screens',
    src: {
      sm: careers_screens_sm_png,
      md: careers_screens_md_png,
      lg: careers_screens_lg_png,
      xl: careers_screens_xl_png,
    }
  },
  {
    name: 'comboSmash_death',
    src: {
      sm: comboSmash_death_sm_jpg,
      md: comboSmash_death_md_jpg,
      lg: comboSmash_death_lg_jpg,
    }
  },
  {
    name: 'comboSmash_horde',
    src: {
      sm: comboSmash_horde_sm_jpg,
      md: comboSmash_horde_md_jpg,
      lg: comboSmash_horde_lg_jpg,
    }
  },
  {
    name: 'cycles',
    src: {
      lg: cycles_lg_jpg
    }
  },
  {
    name: 'comboSmash_preview',
    src: {
      lg: comboSmash_preview_lg_jpg
    }
  }
]


exports.getImages = function(breakpoints, window){
  let imageSize;
  let imageSources = [];
  if(window >= breakpoints.xl) imageSize = 'xl';
  else if(window >= breakpoints.lg) imageSize = 'lg';
  else if(window >= breakpoints.md) imageSize = 'md';
  else if(window >= breakpoints.sm) imageSize = 'sm';
  let sizedImages = images.map(image => {
    let src = image.src[imageSize];
    if(src){
      imageSources.push(src);
      return image;
    }
  });
  sizedImages = sizedImages.filter(function(i){ return i != undefined });
  return {
    obj: sizedImages,
    sources: imageSources
  }
}
