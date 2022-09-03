import React from "react";
import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../../assets/LeftArrow.svg";
import { ReactComponent as UserPlus } from "../../assets/UserPlus.svg";

const CommunityFormTop = () => {
  return (
    <>
      <HeaderWrap>
        <LeftArrow />
        <UserPlus />
      </HeaderWrap>
      <HeaderFlex>
        <p>그룹 만들기</p>
      </HeaderFlex>
    </>
  );
};
export default CommunityFormTop;

const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 48px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  z-index: 1;
`;
const HeaderFlex = styled.div`
  width: 100%;
  padding-top: 10px;
  margin: auto;
  text-align: center;
`;
