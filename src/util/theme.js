export const appTheme = {
  palette: {
    primary: {
      light: '#563f2d',
      main: '#54575d',
      dark: '#101010',
      contrastText: '#fff',
    },
    secondary: {
      light: '#b1a591',
      main: '#05b7ac',
      dark: '#101010',
      contrastText: '#fff',
    }
  },
  authClass: {
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      margin: '0 auto',
      marginBottom: '3rem'
    },
    boxClass: {
      padding: '5% 0 15%',
      borderBottom: '1px solid rgba(0,0,0,.1)',
      '&:last-child': {
        borderBottom: '0'
      }
    },
    error: {
      color: 'red',
      fontSize: '.75rem'
    },
    submitClass: {
      padding: '.5rem 3rem!important',
      margin: '1rem 0 0!important',
      backgroundColor: `#05b7ac!important`,
      textTransform: 'capitalize!important',
      fontWeigh: 'bold'
    },
  },
  spreadThis: {
    titleClass: {
      fontSize: '2.5rem!important',
      fontWeight: 'bolder!important',
      margin: '0 1rem!important'
    },
    linkClass: {
      textDecoration: 'none!important',
      color: 'darkslategray',
      fontWeight: 'bold',
      margin: '0 .5rem',
      width: 'fit-content',
    }
  }
}