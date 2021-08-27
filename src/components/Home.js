import React from 'react';
import styled from 'styled-components';
import logo from '../assets/nasdaq-logo.png';

const HomeWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  color: #0991c0;
  text-align: center;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  div {
    padding-bottom: 20px;
  }
`;
const Main = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center
  width: 30%;
  height: 200px;

  transform: translate(-50%, -50%);

  button {
    margin-top: 30px;
    padding: 10px 30px;
    font-weight: bold;
    color: #fff;
    background-color: #0991c0;
    border: none;
    border-radius: 16px;
    box-shadow: 0px 2px 4px rgba(9, 145, 152,0.7);
    cursor: pointer;
    animation: all ease .3s;
  }
  button:hover{
      transform: translateY(-1px);
  }
`;
const Brand = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: bold;

  img {
    width: 100px;
  }
`;

const Home = () => {
  return (
    <HomeWrapper>
      <Main>
        <Brand>
          <img src={logo} alt="Nasdaq logo" />
          Nasdaq
        </Brand>
        <button>STOCKS LIST &#10230;</button>
      </Main>
      <div>
        By:
        <br /> Adedeji Adelanwa
      </div>
    </HomeWrapper>
  );
};

export default Home;
