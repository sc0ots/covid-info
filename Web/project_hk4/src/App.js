import React, { Component } from 'react';
import './App.css';
import SideBar from "./component/main/SideBar"
import Wrapper from "./component/main/Wrapper"
import 'antd/dist/antd.css';
import LoginForm from './component/layout/Login/LoginForm';


import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

class App extends Component {

  render() {
    return (
          <Router>
            <Route path="/showlogin">
              <LoginForm />
            </Route>
            <SideBar />
            <Wrapper />
          </Router>
    );
  }
}

export default App;
