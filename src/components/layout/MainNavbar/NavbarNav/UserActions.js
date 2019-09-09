import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

import { Dispatcher, Constants } from "../../../../flux";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  logout = () => {
    Dispatcher.dispatch({ actionType: Constants.CLEARUSERDATA, payload: {} });
  };

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/1.jpg")}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">
            {window.localStorage.getItem("username")}
          </span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          {/* <DropdownItem tag={Link} to="#">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem divider /> */}
          <DropdownItem
            onClick={this.logout}
            tag={Link}
            to="/"
            className="text-danger"
          >
            <i className="material-icons text-danger">&#xE879;</i>Se deconnecter
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
