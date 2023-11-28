import { HeaderContainer, Row } from './Header.style';
import Image from 'next/image';

export default function Header({ props }) {
    
    return (
      <HeaderContainer position='fixed'>
        <Row>
            <Image src="/logo.png" alt="Logo" width={78} height={40} />
        </Row>
      </HeaderContainer>
    );
};