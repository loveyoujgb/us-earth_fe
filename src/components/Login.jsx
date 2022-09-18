import React from 'react';
import styled from 'styled-components';
import icons from "../assets";
import LogoImg from '../assets/logo.png';
import kakao from '../assets/logo_kakao.png';
import naver from '../assets/logo_naver.png';
import google from '../assets/logo_google.png';

const Login = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY_KAKAO}&redirect_uri=${process.env.REACT_APP_REDIRECT_KAKAO}&response_type=code`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_REST_API_KEY_GOOGLE}&redirect_uri=${process.env.REACT_APP_REDIRECT_GOOGLE}&response_type=code&scope=email%20profile%20openid&access_type=offline`;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&amp;client_id=${process.env.REACT_APP_REST_API_KEY_NAVER}&amp;state=test&amp;redirect_uri=${process.env.REACT_APP_REDIRECT_NAVER}`;

  const onClickHandler = (flag) => {
    if (flag === 'k') { window.location.href = KAKAO_AUTH_URL; }
    else if (flag === 'n') { window.location.href = NAVER_AUTH_URL; }
    else if (flag === 'g') { window.location.href = GOOGLE_AUTH_URL; }
  }
  return (
    <>
      <LoginWrap>
        <Container>
          <Logo></Logo>
          <div className='item' onClick={() => onClickHandler('k')}><img src={kakao} alt='kakao_img'/><span>카카오 로그인</span></div>
          <div className='item' onClick={() => onClickHandler('n')}><img src={naver} alt='naver_img'/><span>네이버 로그인</span></div>
          <div className='item' onClick={() => onClickHandler('g')}><img src={google} alt='google_img'/><span>구글 로그인</span></div>
        </Container>
      </LoginWrap>
    </>
  )
}
export default Login;

const LoginWrap = styled.div`
  width:100vw;
  height:100%;
  
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;
const Logo = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height: 210px;
  width: 200px;
  margin-bottom:25px;
  
  background:url(${LogoImg}) no-repeat center center;
  background-size: cover;
`;
const Container = styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:12px;

  box-sizing:border-box;
  padding:0 20px;
  text-align:center;
  .item{
    width:100%;
    height:25px;
    padding:15px 0;
    border:1px solid black;
    text-align:center;

    font:500 18px/1 'Noto Sans','sean-serif';

    position:relative;
    img{
      position:absolute;
      top:0;
      left:0;
      height:100%;
      padding:10px 0 10px 15px;
      box-sizing:border-box;
    }
  }
`;