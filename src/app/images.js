import careers_screens_sm_png from '../images/careers_screens@sm.png';
import comboSmash_death_sm_jpg from '../images/comboSmash-death@sm.jpg';
import comboSmash_horde_sm_jpg from '../images/comboSmash-horde@sm.jpg';

import comboSmash_horde_md_jpg from '../images/comboSmash-horde@md.jpg';
import careers_screens_md_png from '../images/careers_screens@md.png';
import comboSmash_death_md_jpg from '../images/comboSmash-death@md.jpg';

import careers_screens_lg_png from '../images/careers_screens@lg.png';
import comboSmash_horde_lg_jpg from '../images/comboSmash-horde@lg.jpg';
import comboSmash_death_lg_jpg from '../images/comboSmash-death@lg.jpg';
import comboSmash_preview_lg_jpg from '../images/comboSmash-preview@lg.jpg';
import cycles_lg_jpg from '../images/cyclesTile@lg.jpg';

import careers_screens_xl_png from '../images/careers_screens@xl.png';



const images = {
  sm: [
    careers_screens_sm_png,
    comboSmash_death_sm_jpg,
    comboSmash_horde_sm_jpg,
  ],

  md: [
    comboSmash_horde_md_jpg,
    careers_screens_md_png,
    comboSmash_death_md_jpg
  ],

  lg: [
    careers_screens_lg_png,
    comboSmash_horde_lg_jpg,
    comboSmash_death_lg_jpg,
    comboSmash_preview_lg_jpg,
    cycles_lg_jpg
  ],

  xl: [
    careers_screens_xl_png
  ]
};

exports.getImages = function(breakpoints, window){
  console.log(window);
  console.log(breakpoints);
  if(window >= breakpoints.xl) return images.xl;
  if(window >= breakpoints.lg) return images.lg;
  if(window >= breakpoints.md) return images.md;
  if(window >= breakpoints.sm) return images.sm;
}
