import React from 'react';
import styled from 'styled-components';

const Footer=()=>(
    <StyledFooter>
        foot
    </StyledFooter>
)
export default Footer

const StyledFooter=styled.footer`
height: 2rem;
padding: 1rem;
display: flex;
justify-content: space-around;
background-color: ${props=>props.theme.purple};
`