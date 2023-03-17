import styled from 'styled-components';

import { device } from '../styles/GlobalStyle';

export const Container = styled.div``;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
  padding: 2rem;
`;

export const Title = styled.h1`
  margin-left: 1rem;
  user-select: none;

  @media ${device.mobile} {
    display: block;
    width: 100%;
    text-align: center;
  }
`;

export const BtnBox = styled.div``;

export const Button = styled.button`
  border: none;
  padding: 1rem;
  margin: 0 0.6rem;
  cursor: pointer;
  border-radius: 0.4rem;
  background-color: #25618a;
  color: #fff;
  letter-spacing: 1px;
  font-family: inherit;
  font-size: 1;
  user-select: none;

  :hover {
    opacity: 0.9;
  }

  @media ${device.mobile} {
    display: none;
  }
`;

export const ChartBox = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Message = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 2rem;
`;
