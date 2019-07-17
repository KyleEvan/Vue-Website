// Color Palette
import {colors} from './colors.js';
import shapes_preview_sm_gif from '../images/shapes-preview@sm.gif';
import cycles_gameplay_md_gif from '../images/cycles-gameplay@md.gif';
import career_areas_lg_png from '../images/career-areas-mobile@lg.png';
import comboSmash_gameplay_md_gif from '../images/combosmash-gameplay@md.gif';
import batman_sm_jpg from '../images/batman@sm.jpg';

var projects = [
    {
    name: 'Shapes Demo',
    tags: ['Javascript', 'HTML', 'SCSS'],
    date: '2018',
    href: 'Shapes',
    featuredImage: shapes_preview_sm_gif,
    mainColor: colors.blue,
    darkColor: colors.darkBlue,
  },
  {
    name: 'Excellus & Univera Redesign',
    tags: ['JavaScript', 'CSS', 'HTML'],
    date: '2017 - 2018',
    href: 'MemberRedesign',
    featuredImage: career_areas_lg_png,
    mainColor: colors.orange,
    darkColor: colors.darkOrange,
  },
  {
    name: 'Combo Smash',
    tags: ['JavaScript', 'CSS', 'HTML'],
    date: '2014',
    href: 'ComboSmash',
    featuredImage: comboSmash_gameplay_md_gif,
    mainColor: colors.red,
    darkColor: colors.darkRed,
  },
  {
    name: 'Cycles',
    tags: ['Javascript', 'HTML', 'CSS'],
    date: '2013',
    href: 'Cycles',
    featuredImage: cycles_gameplay_md_gif,
    mainColor: colors.blue,
    darkColor: colors.darkBlue,
  },
  {
    name: 'Batman Poster',
    tags: ['Illustrator', 'Photoshop'],
    date: '2013',
    href: 'BatmanPoster',
    featuredImage: batman_sm_jpg,
    mainColor: colors.orange,
    darkColor: colors.darkOrange,
  },
];

export { projects };
