import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LeftArrow } from "../../assets/LeftArrow.svg";
import { ReactComponent as Setting } from "../../assets/Setting.svg";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { clearVal } from '../../redux/modules/communitySlice';
import { colors } from '../../styles/color';

const CommunityTop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(clearVal());
    };
  }, [])
  return (
    <>
      <HeaderWrap>
        <div></div>
        <p>내정보</p>
        <div onClick={() => { navigate('/mypage/setting') }}><Setting /></div>
      </HeaderWrap>
    </>
  )

}
export default CommunityTop;

const HeaderWrap = styled.div`
  width:100%;
  height:48px;
  display:flex;
  justify-content:space-between;
  padding:10px;
  border-bottom:1px solid rgba(0,0,0,0.14);
  box-sizing:border-box;
  z-index:1;
  color:${colors.black22};
  p{
    font-weight: 600;
    font-size: 20px;
  }
`;