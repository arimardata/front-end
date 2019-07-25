import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import getSidebarNavItems from "../data/sidebar-nav-items";

let _store = {
  menuVisible: false,
  navItems: getSidebarNavItems(),
  userData: {
    id: window.localStorage.getItem("id"),
    username: window.localStorage.getItem("username"),
    authority: window.localStorage.getItem("authority"),
    token: window.localStorage.getItem("token"),
    firstLogin: window.localStorage.getItem("firstLogin")
  }
};

class Store extends EventEmitter {
  constructor() {
    super();

    this.setUserData = this.setUserData.bind(this);
    this.cleareUserData = this.cleareUserData.bind(this);
    this.registerToActions = this.registerToActions.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    Dispatcher.register(this.registerToActions.bind(this));
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit(Constants.CHANGE);
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems() {
    return _store.navItems;
  }

  registerToActions({ actionType, payload }) {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      case Constants.LOGIN:
        this.setUserData(payload);
        break;
      case Constants.CLEARUSERDATA:
        this.cleareUserData();
        break;
      default:
    }
  }

  setUserData(payload) {
    _store.userData = payload;
    this.emit(Constants.LOGIN);
  }

  getUserData() {
    return _store.userData;
  }

  cleareUserData() {
    window.localStorage.clear();
    _store.userData = {};
    this.emit(Constants.CLEARUSERDATA);
  }
  addChangeListener(action, callback) {
    this.on(action, callback);
  }

  removeChangeListener(action, callback) {
    this.removeListener(action, callback);
  }
}

export default new Store();
