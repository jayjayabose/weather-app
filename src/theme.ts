'use client';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  palette:{
    mode: 'light',
    background: {
      default: '#42a5f5'
    },    
    primary:{
      main: "#1760a5",
      light: "skyblue"
    },
    secondary:{
      main: '#15c630',
    },
  },


  breakpoints: {
    values: {
      xs: 0,
      sm: 750, // customized value
      md: 960, 
      lg: 1280,
      xl: 1920,
    },
  },

  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },

    // MuiStack: { // for development
    //   styleOverrides: {
    //     root: {
    //       border: '1px dotted gray',
    //     },
    //   },
    // },    
  },
});

export default theme;
