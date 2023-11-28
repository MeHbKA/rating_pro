import '../styles/globals.css'
import "../assets/fonts/Montserrat/stylesheet.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';
import {FC} from "react";
import {AppProps} from "next/app";
import { wrapper } from '../store';


const theme = createTheme(
  {
    palette: {
      primary: { main: '#12D3A5',contrastText: "#fff" },
      secondary: {main: 'rgba(52, 209, 134, 0.1)', contrastText: '#12D3A5'},
      error: { main: '#F3494C' },
      warning: { main: '#FFCB65' },
      success: { main: '#12D3A5' },
    },
    typography: {
      fontFamily: 'Montserrat'
    },
  },
  ruRU,
);

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <ThemeProvider theme={theme}>
          <Component {...pageProps} />
    </ThemeProvider>
}

export default wrapper.withRedux(MyApp)
