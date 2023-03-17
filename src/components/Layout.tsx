import { ReactNode } from 'react';

import styled from '@emotion/styled';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header>
        <Title>플렉시스</Title>
      </Header>
      <Main>{children}</Main>
    </>
  );
}

const Header = styled.header({
  height: '80px',
  borderBottom: '1px solid #000000',
  marginBottom: '40px',
});

const Title = styled.h1({
  height: '100%',
  fontSize: '42px',
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: '80px',
});

const Main = styled.main({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
