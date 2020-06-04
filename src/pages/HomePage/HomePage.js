import Link from 'next/link';

import {
  Container,
  HeaderContainer,
  Header,
  ImageContainer,
  Image,
  BodyContainer,
} from './homePage.style';

const Home = () => (
  <Container>
    <HeaderContainer>
      <ImageContainer>
        <Link href="/" as="/home">
          <Image src="/logo.png" alt="logo" />
        </Link>
      </ImageContainer>
      <Header>Form Builder</Header>
    </HeaderContainer>
    <BodyContainer />
  </Container>
);

export default Home;
