import { globalCss } from './stitches.config';

const globalStylesObj = {
  ':root': {
    '--font-text': [
      "'Inter', Arial, -apple-system, 'Segoe UI', Helvetica Neue, Helvetica, Roboto, sans-serif, system-ui, 'Apple Color Emoji', 'Segoe UI Emoji'",
    ],
  },
  '*,*::before,*::after': {
    margin: 0,
    padding: 0,
    boxSizing: 'inherit',
    fontStyle: 'inherit',
    fontWeight: 400,
    fontFamily: 'inherit',
    lineHeight: '120%',
    fontFeatureSettings: 'kern',
    'font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'antialiased',
    '-webkit-font-smoothing': 'antialiased',
    'font-feature-settings': 'kern',
    textRendering:'optimizeLegibility',
    color:'$fgColor'

    // wordSpacing: '-1.21px',
    // fontSize: '120%',
    // cursor: `url('/images/custom-cursor-lightmode.svg') 9 6, auto`
  },
  'html, body': {
    minWidth: '320px',
    textSizeAdjust: '100%',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    backgroundColor: '$bgColor',
    overflowX: 'hidden',
  },
  html: {
    boxSizing: 'border-box', 
    height: '100%', 
    quotes: `'"' '"'`,
   },
  body: {
    fontWeight: '400',
    padding: 0,
    overflowX: 'hidden',
    fontFamily: 'var(--font-text)',
    fontStyle: 'normal',
    minHeight: '100vh',
    backgroundColor: '#000',
    backgroundImage: 'linear-gradient(180deg,rgba(0,0,0,.8),rgba(0,0,0,.38)),url("https://uploads-ssl.webflow.com/62323c71bbabee32654e6d25/6259542de89d1d34b104f165_gradient.png")',
    backgroundSize: "cover",
    backgroundPosition: '0 0,0 100%',
    backgroundRepeat: 'repeat,no-repeat',
  },
  '#root': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  'body, button, input, select, textarea': {
    direction: 'ltr',
    textAlign: 'left',
    fontSynthesis: 'none',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    MozFontFeatureSettings: "'kern'",
  },
  img: { height: '100%', width: '100%' },
  svg: { maxWidth: '100%', verticalAlign: 'middle', strokeWidth: '1.5' },
  ul: {
      listStyle: 'disc',
      '-webkit-padding-start': '32px !important',
      '-webkit-margin-before': '0 !important',
      'margin-block-start': '$1 !important',
      '-webkit-margin-after': 'unset',
      'margin-block-end': 'unset',
      padding: '0 !important',
   },
  a: { 
    textDecoration: 'none',
  },
  fieldset:{
    border: 'none',
  },
  '::selection': { background: 'rgba(0, 85, 255, 0.2)' },
  '*': { boxSizing: 'inherit' },
  '.root': { minHeight: '100vh' },

  // Typography
  'b,em':{
    fontWeight: '600',
  },
  'h1,h2,h3,h4,h5,h6': {
    fontWeight: '600',
    fontStyle: 'normal',
  },
  h1: {
    fontSize: '$heading3',

    '@bp1':{
      fontSize: '$heading1',
    }

  },
  h2: {
    fontSize: '$heading2',
  },
  h3: {
    fontSize: '$heading3',
  },
  h4: {
    fontSize: '$heading4',
  },
  h5: {
    fontSize: '$heading5',
  },
  h6: {
    fontSize: '$heading6',
  },
  'p, ul, li , a': {
    fontSize: '$body1',
  },
};

export const globalStyles = globalCss(globalStylesObj);
