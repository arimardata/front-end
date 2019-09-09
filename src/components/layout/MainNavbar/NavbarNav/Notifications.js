import React from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import fetchApi from "../../../../utils/fetchApi";
import { Route, Redirect } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import Checkbox from '@material-ui/core/Checkbox';

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      notifs: [],
      open:false


    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
  }

  componentWillMount() {
    this.fetchNotification();
    console.log("try");
    console.log(this.state.notifs.length);
  }


  toggleNotifications() {
    this.fetchNotification();
    this.setState({
      visible: !this.state.visible
    });
  }

  fetchNotification = async () => {
    const data = await fetchApi({
      method: "GET",
      url: "/api/notifications/findfive",
      token: window.localStorage.getItem("token")
    });
    let donnee = [];

    if (!(data.status > 300))
      data.map(elmnt =>
        donnee.push([
          elmnt.id,
          elmnt.NotificationType,
          elmnt.NotificationDetail,
          elmnt.NotificationSeen,
        ])
      );
    this.setState({ notifs: donnee });
    console.log(data);
   // this.handleSeen(data);


  }
  handleSeen(data) {
    data.map(elmnt => {
      this.handleSeenOne(elmnt.id);
      console.log("elmnt:", elmnt.id);
    }
    )
  }



  handleSeenOne = async e => {
    // your submit logic
    console.log("e:", e);
    let id = e;

    fetchApi({
      method: "GET",
      url: "/api/notifications/handleseen/" + id,
      token: window.localStorage.getItem("token")
    });
    console.log("done");
  };


  HandleAll = () => {

    // return <Redirect to='/Allnotifications.js' />
    console.log("clicked");
    const history = createHistory();
    //history.push('/Allnotifications');
    this.setState({open: true});
    

  };





  render() {
    //const Nots = this.state.notifs;

    if (this.state.open) {
      return (
          <Redirect to="/Allnotifications" push />
      );
  }
    return (

      

      <NavItem className="border-right dropdown notifications">

        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">&#xE7F4;</i>
            <Badge pill theme="danger">
              {this.state.notifs.length}
            </Badge>
          </div>
        </NavLink>
        <Collapse
          open={this.state.visible}
          className="dropdown-menu dropdown-menu-small"
        >
          {this.state.notifs.map((param, i) => {
            return (
              <DropdownItem>

                <div className="notification__icon-wrapper">
                  <div className="notification__icon">
                    <i className="material-icons">&#xE6E1;</i>
                  </div>
                </div>
                <div className="notification__content">
                  <span className="notification__category">Cheques</span>
                  <p>pas fonctionnel pour l'instant</p>
                </div>
              </DropdownItem>)

          })}



          <DropdownItem className="notification__all text-center" onClick={() => this.HandleAll()}>
            Voir tous les notifcation

          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
