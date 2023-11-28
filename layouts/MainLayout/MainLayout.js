import Header from '../../components/Header/Header';
import Footer from './Footer/Footer';
import Container from "@mui/material/Container";
import {useEffect, useState} from "react";
import Image from "next/image";
import {Box} from "@mui/material";

export default function Layout({ children }) {
  const [width, setWidth] = useState(0)

  useEffect(()=> {
    setWidth(window.innerWidth)
  }, [])


  return (
    <Container className={'content'} disableGutters maxWidth={false}>
          <Header/>
             {children}
          <Footer/>
    </Container>
  );
}