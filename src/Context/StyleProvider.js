import { useState, createContext } from "react";
import { ThemeProvider } from "styled-components";
const StyledContext = createContext();

const StyleProvider = (props) => {
  const [theme, setTheme] = useState(false);

  const style = {
    theme: theme,
    row: `display:flex;justify-content:center;align-items:flex-start;`,
    column: `display:flex;flex-direction:column;justify-content:center;align-items:center;`,
    maroon: "rgb(126, 35, 66)",
    red: "rgb(162, 65, 107)",
    yellow: "rgb(252, 212, 126)",
    pink: "rgb(255, 119, 119)",
    purple: "rgb(159, 33, 255)",
    blue: "rgb(33, 92, 255)",
  };

  return (
    <StyledContext.Provider value={[theme, setTheme]}>
      <ThemeProvider theme={style}>{props.children}</ThemeProvider>
    </StyledContext.Provider>
  );
};
export default StyleProvider;
