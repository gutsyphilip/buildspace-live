import { styled } from "../styles";


const Container = styled('div', {
  // Reset
  boxSizing: 'border-box',
  flexShrink: 0,
  position: 'relative',


  // Custom
  mx: 'auto',
  px: '$3',
  width: '100%',
  height: 'fit-content',

  '@bp3': {
    px: '$5',
  },

  variants: {
    size: {
      '1': {
        maxWidth: '430px',
      },
      '2': {
        maxWidth: '715px',
      },
      '3': {
        maxWidth: '1032px',
      },
      '4': {
        maxWidth: '1350px',
      },
      '5': {
        maxWidth: '1450px',
      },
      '6': {
        maxWidth: '1600px',
      },
    },
  },

  defaultVariants: {
    size: '5',
  }
});

export default Container;
