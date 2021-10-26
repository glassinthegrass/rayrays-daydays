import Header from './Components/Header/Header';
import styled from 'styled-components';
import Routes from './Routes/Routes';
import './reset.css'
const App=(props)=>{
  return (
<Main>
<Header/>
{Routes}
</Main>
  );
}

export default App;


const Main= styled.main`
background-color: ${(props) => props.theme.yellow};
color:${props=>props.theme.maroon};
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
width:100vw;
height:100vh;
overflow-y:auto;
`