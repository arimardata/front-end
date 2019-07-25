// this component help to decide wether to  render dashboard or login form

import React, { Component } from "react";
import ReactDOM from "react-dom";

import LoginPage from "./components/authentication/LoginPage";
import Dashboard from "./Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import { Store, Constants } from "./flux";

export default class Switcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: Store.getUserData()
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleListener = this.handleListener.bind(this);
  }

  componentWillMount() {
    window.addEventListener("storage", event => this.handleListener(event));
    // document.addEventListener("keydown", this.handleListener);
    Store.addChangeListener(Constants.LOGIN, this.login);
    Store.addChangeListener(Constants.CLEARUSERDATA, this.logout);
  }

  componentWillUnmount() {
    Store.removeChangeListener(Constants.LOGIN, this.login);
    Store.removeChangeListener(Constants.CLEARUSERDATA, this.logout);
  }

  login() {
    this.setState({ userData: Store.getUserData() });
  }

  handleListener(event) {
    // window.location.reload();
    if (!event.key) window.location.reload();
  }

  logout() {
    this.setState({ userData: {} });
  }
  render() {
    if (window.localStorage.getItem("token")) return <Dashboard />;

    return <LoginPage />;
  }
}
