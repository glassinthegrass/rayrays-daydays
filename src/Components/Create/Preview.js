import React from 'react';
import styled from 'styled-components';

const Preview=({handle})=>{
    
    return<UploadContainer>
      <HiddenInput
      accept="image/*"
          type="file"
          id="multi"
          multiple='multiple'
          onChange={(e) => handle.files(e.target.files)}
        />
    <Label htmlFor='multi'>
  Select Photos
</Label>


  </UploadContainer>
}
export default Preview

let Label = styled.label`
  display: flex;
  width:calc(60%);
  min-height:3rem;
  padding:1rem;
  cursor:pointer;
  background-color: ${props=>props.theme.yellow};
  justify-content:center;
  align-items: center;
  text-align:center;
  font-size: 10px;
  font-size:20px;
  color: ${props=>props.theme.purple};
  z-index: 2;
  border:3px solid;
  &: hover{
    border:3px solid ${props=>props.theme.purple};
    background-color:${props=>props.theme.purple};
    color:${props=>props.theme.yellow};
  }
`;
let UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
width:100%;
`;


let HiddenInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
  `;