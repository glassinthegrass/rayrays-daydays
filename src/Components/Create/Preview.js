import React from "react";
import styled from "styled-components";

const Preview = ({ handle, preview }) => {
  let map = preview.map((p, i) => {
    return <Img src={URL.createObjectURL(p)} key={i} alt="" />;
  });

  return (
    <React.Fragment>
      <UploadContainer>
        <HiddenInput
          accept="image/*"
          type="file"
          id="multi"
          multiple="multiple"
          onChange={(e) => handle.files(e.target.files)}
        />
        <Label htmlFor="multi"><Column>Select Photos <Paragraph>(limit 10)</Paragraph></Column></Label>
      </UploadContainer>
      <WrapCenter>
        <MapWrap>{map}</MapWrap>
      </WrapCenter>
    </React.Fragment>
  );
};
export default Preview;

let Label = styled.label`
  display: flex;
  width: calc(60%);
  min-height: 3rem;
  padding: 1rem;
  cursor: pointer;
  background-color: ${(props) => props.theme.yellow};
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 10px;
  font-size: 20px;
  color: ${(props) => props.theme.purple};
  z-index: 2;
  border: 3px solid;
  &: hover {
    border: 3px solid ${(props) => props.theme.purple};
    background-color: ${(props) => props.theme.purple};
    color: ${(props) => props.theme.yellow};
  }
`;
let UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

let HiddenInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
const Img = styled.img`
  width: 10rem;
`;
const MapWrap = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: calc(60% + 2rem);
  gap: 3rem;
  padding: 1rem;
`;
const WrapCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const Column = styled.span`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`
const Paragraph = styled.p`
font-size:10px;

`