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
      offsetY: '0%',
      src: 'careers_screens'
    },
    mainColor: colors.projectBlue,
    lightColor: colors.projectLightBlue,
    mediumColor: colors.projectMediumBlue,
    // darkColor: colors.darkBlue
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
      offsetY: '0%',
      src: 'comboSmash_preview'
    },
    mainColor: colors.projectOrange,
    lightColor: colors.projectLightOrange,
    mediumColor: colors.projectMediumOrange,
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
      offsetY: '0%',
      src: 'batman'
    },
    mainColor: colors.peach,
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
      offsetY: '0%',
      src: 'cycles'
    },
    mainColor: colors.turquoise,
    lightColor: colors.lightTurquoise,
    mediumColor: colors.mediumTurquoise,
    darkColor: colors.darkTurquoise
  }
];

export { projects };