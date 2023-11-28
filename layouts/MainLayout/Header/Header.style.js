import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';

const HeaderContainer = styled(AppBar)`
  background-color: #fff;
  height: 68px;
  box-shadow: 0px 1px 0px #E7E8F2;
  max-width: 100%;
  padding: 0px;
  justify-content: center;
`;

const Row = styled(Container)`
  padding: 0px 24px;
  max-width: 1200px;
  width: 100%;
`;

export { HeaderContainer, Row };