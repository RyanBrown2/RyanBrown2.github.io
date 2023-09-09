import styled from "styled-components";

const BackgroundStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; // todo
  z-index: -1;
  overflow: hidden;
  // background-color: #000000;
`;

const BackgroundContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("/starry_background.png");
`;


export {BackgroundStyled, BackgroundContainerStyled};