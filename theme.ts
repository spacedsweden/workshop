import { lighten, darken, readableColor, transparentize } from 'polished';
import alertIcon from './images/icons/alert.svg';

export const theme = {
  // spacing: {
  //   unit: 5,
  //   sectionHorizontal: ({ spacing }) => spacing.unit * 8,
  //   sectionVertical: ({ spacing }) => spacing.unit * 8,
  // },
  breakpoints: {
    small: '550px',
    smedium: '700px',
    medium: '900px',
    large: '1200px',
    xlarge: '1300px',
  },
  colors: {
    tonalOffset: 0.1,
    primary: {
      main: '#007171',
      cta: '#FFBE3C',
      sinchGreen: '#007171',
      sinchLightGray: '#F2F2F2',
      // light: ({ colors }) => lighten(colors.tonalOffset, colors.primary.main),
      // dark: ({ colors }) => darken(colors.tonalOffset, colors.primary.main),
      // contrastText: ({ colors }) => readableColor(colors.primary.main),
    },
    success: {
      main: '#007171',
      light: '#007171',
      dark: 'black',
      contrastText: 'black',
    },
    // error: {
    //   main: '#e53935',
    //   light: ({ colors }) => lighten(colors.tonalOffset * 2, colors.error.main),
    //   dark: ({ colors }) => darken(colors.tonalOffset, colors.error.main),
    //   contrastText: ({ colors }) => readableColor(colors.error.main),
    // },
    // warning: {
    //   main: '#d4ad03',
    //   light: ({ colors }) => lighten(colors.tonalOffset * 2, colors.warning.main),
    //   dark: ({ colors }) => darken(colors.tonalOffset, colors.warning.main),
    //   contrastText: ({ colors }) => readableColor(colors.warning.main),
    // },
    // info: {
    //   main: 'red',
    //   light: ({ colors }) => lighten(colors.tonalOffset * 2, colors.info.main),
    //   dark: ({ colors }) => darken(colors.tonalOffset, colors.info.main),
    //   contrastText: ({ colors }) => readableColor(colors.info.main),
    // },
    text: {
      primary: '#272727',
      // secondary: '#4e566d',
    },
    border: {
      dark: 'rgba(0,0,0, 0.15)',
      light: '#ffffff',
    },
    responses: {
      // success: {
      //   color: ({ colors }) => colors.text.primary,
      //   backgroundColor: ({ colors }) => colors.primary.main,
      // },
      // error: {
      //   color: ({ colors }) => colors.error.main,
      //   backgroundColor: ({ colors }) => colors.error.main,
      // },
      // redirect: {
      //   color: ({ colors }) => colors.warning.main,
      //   backgroundColor: ({ colors }) =>
      //     transparentize(0.9, colors.responses.redirect.color),
      // },
      // info: {
      //   color: ({ colors }) => colors.info.main,
      //   backgroundColor: ({ colors }) =>
      //     transparentize(0.9, colors.responses.info.color),
      // },
    },
    http: {
      get: '#6bbd5b',
      post: '#248fb2',
      put: '#9b708b',
      options: '#d3ca12',
      patch: '#e09d43',
      delete: '#e27a7a',
      basic: '#999',
      link: '#31bbb6',
      head: '#c167e4',
    },
    navbar: {
      main: '#007171',
      gradient: ({ colors }) =>
        darken(colors.tonalOffset / 100, colors.navbar.main),
      contrastText: 'white',
    },
    // footer: {
    // main: ({ colors }) => colors.primary.main,
    // contrastText: 'white'
    // },
  },
  components: {
    search: {
      icon:
        '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.0098 11.2549H12.2198L11.9398 10.9849C12.9198 9.84488 13.5098 8.36488 13.5098 6.75488C13.5098 3.16488 10.5998 0.254883 7.00977 0.254883C3.41977 0.254883 0.509766 3.16488 0.509766 6.75488C0.509766 10.3449 3.41977 13.2549 7.00977 13.2549C8.61977 13.2549 10.0998 12.6649 11.2398 11.6849L11.5098 11.9649V12.7549L16.5098 17.7449L17.9998 16.2549L13.0098 11.2549ZM7.00977 11.2549C4.51977 11.2549 2.50977 9.24488 2.50977 6.75488C2.50977 4.26488 4.51977 2.25488 7.00977 2.25488C9.49977 2.25488 11.5098 4.26488 11.5098 6.75488C11.5098 9.24488 9.49977 11.2549 7.00977 11.2549Z" fill="white"/></svg>',
      // iconColor: ({ colors }) => colors.navbar.contrastText,
    },
    alert: {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 13.5H9.75C9.55109 13.5 9.36032 13.579 9.21967 13.7197C9.07902 13.8603 9 14.0511 9 14.25V20.25H10.5V15H13.5V20.25H15V14.25C15 14.0511 14.921 13.8603 14.7803 13.7197C14.6397 13.579 14.4489 13.5 14.25 13.5Z" fill="#272727"/><path d="M22.1624 9.09743L12.7499 3.64493C12.5219 3.51328 12.2632 3.44397 11.9999 3.44397C11.7366 3.44397 11.478 3.51328 11.2499 3.64493L1.83742 9.09743C1.66437 9.19689 1.53791 9.36102 1.48587 9.55371C1.43383 9.7464 1.46047 9.95188 1.55992 10.1249C1.65938 10.298 1.82351 10.4244 2.0162 10.4765C2.2089 10.5285 2.41437 10.5019 2.58742 10.4024L3.74992 9.74993V20.2499H5.24992V8.85743L11.9999 4.94243L18.7499 8.85743V20.2499H20.2499V9.74993L21.4124 10.4249C21.5855 10.5244 21.791 10.551 21.9836 10.499C22.1763 10.4469 22.3405 10.3205 22.4399 10.1474C22.5394 9.97438 22.566 9.7689 22.514 9.57621C22.4619 9.38352 22.3355 9.21939 22.1624 9.11993V9.09743Z" fill="#272727"/></svg>`,
      variants: {
        attention: {
          backgroundColor: ({ colors: a }) => a.primary.sinchLightGray,
          textColor: ({ colors: a }) => a.text.primary,
          headingColor: ({ colors: a }) => a.text.primary,
          iconColor: ({ colors: a }) => a.info.main,
          icon: ({ components }) => components.alert.icon,
        },
        warning: {
          backgroundColor: ({ colors: a }) => a.primary.cta,
          textColor: ({ colors: a }) => a.text.primary,
          headingColor: ({ colors: a }) => a.text.primary,
          iconColor: ({ colors: a }) => a.warning.main,
          icon: ({ components }) => components.alert.icon,
        },
        danger: {
          backgroundColor: '#ED8C96',
          textColor: ({ colors: a }) => a.text.primary,
          headingColor: ({ colors: a }) => a.text.primary,
          iconColor: ({ colors: a }) => a.error.main,
          icon: ({ components }) => components.alert.icon,
        },
        success: {
          backgroundColor: '#99DEDB',
          textColor: ({ colors: a }) => a.text.primary,
          headingColor: ({ colors: a }) => a.text.primary,
          iconColor: ({ colors: a }) => a.success.main,
          icon: ({ components }) => components.alert.icon,
        },
      },
    },
    buttons: {
      borderRadius: 0,
      hoverBoxShadow: '2px 2px 0px rgba(102, 102, 102, 0.25)',
    },
  },

  sidebar: {
    showAtBreakpoint: 'medium',
    backgroundColor: 'white',
    width: '260px',
    activeTextColor: ({ colors }) => colors.primary.main,
    // activeBgColor: 'transparent',
    // other supported options here: https://redoc.ly/docs/developer-portal/configuration/sidebar-nav/#supported-sidebar-theming-options
    rightLineColor: 'transparent',
    fontFamily: ({ typography }) => typography.fontFamily,
    fontSize: '0.875rem',
    fontWeight: 400,
    spacing: {
      offsetLeft: 32,
      offsetTop: 32,
      paddingHorizontal: 0,
    },
  },
  tocPanel: {
    width: '25%',
    maxWidth: '50%',
  },

  typography: {
    fontSize: '1.0em',
    lineHeight: '1.6',
    fontWeightRegular: '400',
    fontWeightBold: '500',
    fontWeightLight: '300',
    // fontFamily: '"Gilroy W05 Regular", Helvetica, Arial, sans-serif',

    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',

    headings: {
      fontFamily: '"Gilroy W05 Regular", Helvetica, Arial, sans-serif',
      fontWeight: '500',
    },

    heading1: {
      fontSize: { _: '1.5em', medium: '2em', large: '2.5em' },
      lineHeight: '1.1em',
      fontWeight: '500',
      marginTop: '0',

      marginVertical: '0',
      marginHorizontal: '0',
      color: ({ colors }) => colors.text.primary,
      capitalize: false,
    },
    heading2: {
      fontSize: '1.5rem',
      fontWeight: '500',
      marginTop: '0',
      marginBottom: '-0.5em',
      color: ({ colors }) => colors.text.primary,
      fontFamily: ({ typography }) => typography.headings.fontFamily,
      lineHeight: ({ typography }) => typography.lineHeight,
      capitalize: false,
    },
    heading3: {
      fontSize: '1em',
      fontWeight: '600',
      marginTop: '0',
      marginBottom: '0.5em',
      color: ({ colors }) => colors.text.primary,
      fontFamily: ({ typography }) => typography.headings.fontFamily,
      lineHeight: ({ typography }) => typography.lineHeight,
      capitalize: false,
    },
    // heading4: {
    // // ...
    // },
    // heading5: {
    // // ...
    // },
    // heading6: {
    // // ...
    // },
    code: {
      fontSize: '14px',
      fontFamily: 'Fira, Menlo, Consolas, monospace',
      fontWeight: ({ typography }) => typography.fontWeightRegular,
      color: '#e53935',
      backgroundColor: 'rgba(38, 50, 56, 0.04)',
      wrap: false,
    },
    links: {
      fontWeight: '800',
      fontFamily: ({ typography }) => typography.fontFamily,
      color: '#055C7A',
      visited: ({ typography }) => typography.links.color,
      hover: ({ typography }) => lighten(0.1, typography.links.color),
      textDecoration: 'underline',
    },
  },

  //API explorer UI
  rightPanel: {
    backgroundColor: '#272727',
    width: {
      large: '50%',
      xlarge: 'calc(100% - 732px)',
    },

    // textColor: '#ffffff',
  },
  codeSample: {
    backgroundColor: 'black',
  },

  //mdx components
  schema: {
    nestedBackground: '#fafafa',
    // linesColor: theme => lighten( theme.colors.tonalOffset, desaturate(theme.colors.tonalOffset, theme.colors.primary.main) ),
    // defaultDetailsWidth: '75%',
    // typeNameColor: theme => theme.colors.text.secondary,
    // typeTitleColor: theme => theme.schema.typeNameColor,
    // requireLabelColor: theme => theme.colors.error.main,
    // labelsTextSize: '0.9em',
    // nestingSpacing: '1em',
    // arrow: {
    //   size: '1.1em',
    //   color: theme => theme.colors.text.secondary,
    // },
  },
  codeBlock: {
    backgroundColor: ({ rightPanel }) =>
      darken(0.1, rightPanel.backgroundColor),
    //   tokens: {},
  },
};
