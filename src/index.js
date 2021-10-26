import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { CloudinaryContext } from "cloudinary-react";
import StyleProvider from "./Context/StyleProvider";
import { HashRouter,BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {createBrowserHistory} from 'history'
const customHistory= createBrowserHistory();
const Router = process.env.NODE_ENV==='development'?HashRouter:BrowserRouter;
const root= document.getElementById("root")
ReactDOM.render(
  <React.StrictMode>
    <CloudinaryContext cloudName="glassinthegrass" secure="true">
      <StyleProvider>
      <Router history={customHistory}>
        <App/>
        </Router>
      </StyleProvider>
    </CloudinaryContext>
  </React.StrictMode>,
root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
