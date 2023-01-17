import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Registration from './components/Registration';
import Login from './components/Login.js'
import Home from "./components/Home.js";
import Profile from "./components/Profile.js";
import BoardUser from "./components/BoardUser.js";
import BoardMaster from "./components/BoardMaster.js";
import AuthService from "./services/auth.service";
import './App.css'
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showMasterBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        // showMasterBoard: user.roles.includes("ROLE_MASTER"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showMasterBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser
      // , showMasterBoard 
    } = this.state;

    return (
      <div>
        <nav className="navbar">
          <div className="navbar-nav">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Домашняя странциа
              </Link>
            </li>

            {/* {showMasterBoard && (
              <li className="nav-item">
                <Link to={"/master"} className="nav-link">
                  Master Board
                </Link>
              </li>
            )} */}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Вход
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Регистрация
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardMaster />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
