// Color Palette
import {colors} from './colors.js';

var projects = [
  {
    // align: 'rtl',
    name: 'Member Redesign',
    caption: 'Complete UX/UI overhaul of member and careers sections of Excellus BCBS and Univera Healthcare',
    tags: ['JavaScript', 'CSS', 'HTML'],
    href: 'Careers-Redesign',
    image:{
      width: '40%',
      newHeight: .3,
      src: 'careers_screens'
    },
    primaryColor: colors.blue,
    lightColor: colors.lightBlue,
    mediumColor: colors.mediumBlue,
    darkColor: colors.darkBlue
  },
  {
    // align: 'rtl',
    name: 'Combo Smash',
    caption: 'Lorem ipsum dolor sit',
    tags: ['JavaScript', 'CSS', 'HTML'],
    href: 'ComboSmash',
    image:{
      width: '38%',
      newHeight: .3,
      src: 'comboSmash_preview'
    },
    primaryColor: colors.red,
    lightColor: colors.lightRed,
    mediumColor: colors.mediumRed,
    darkColor: colors.darkRed
  },
  {
    // align: 'rtl',
    name: 'Batman Comic Store Poster',
    caption: 'Lorem ipsum dolor sit',
    tags: ['Illustrator', 'Photoshop'],
    href: 'ComboSmash',
    image:{
      width: '36%',
      newHeight: .3,
      src: 'batmanPoster_lg_jpg'
    },
    primaryColor: colors.peach,
    lightColor: colors.lightPeach,
    mediumColor: colors.mediumPeach,
    darkColor: colors.darkPeach
  },
  {
    // align: 'rtl',
    name: 'Cycles',
    caption: 'Lorem ipsum dolor sit',
    tags: ['Javascript', 'HTML', 'CSS'],
    href: 'Cycles',
    image:{
      width: '32%',
      newHeight: .3,
      src: 'cycles'
    },
    primaryColor: colors.turquoise,
    lightColor: colors.lightTurquoise,
    mediumColor: colors.mediumTurquoise,
    darkColor: colors.darkTurquoise
  }
];

export { projects };
