import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import getSidebarNavItems from "../data/sidebar-nav-items";

let _store = {
  menuVisible: false,
  navItems: getSidebarNavItems(),
  materielSelectedRow: [],
  materielSelectedRowRewind: [],
  RHSelectedRow: [],
  RHSelectedRowRewind: [],
  typeStock: "Consomable",
  typePersonnel: "Permanent",
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

  setMaterielSelectedRow = data => {
    _store.materielSelectedRow = data;
  };
  getMaterielSelectedRow = () => {
    return _store.materielSelectedRow;
  };
  setMaterielSelectedRowRewind = data => {
    _store.materielSelectedRowRewind = data;
  };
  getMaterielSelectedRowRewind = () => {
    return _store.materielSelectedRowRewind;
  };

  setRHSelectedRow = data => {
    _store.RHSelectedRow = data;
  };
  getRHSelectedRow = () => {
    return _store.RHSelectedRow;
  };
  setRHSelectedRowRewind = data => {
    _store.RHSelectedRowRewind = data;
  };
  getRHSelectedRowRewind = () => {
    return _store.RHSelectedRowRewind;
  };

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
      case Constants.TABLE_CHEQUE_UPDATED:
        this.reloadTable(Constants.TABLE_CHEQUE_UPDATED);
        break;
      case Constants.TABLE_ADMINISTRATIF_UPDATED:
        this.reloadTable(Constants.TABLE_ADMINISTRATIF_UPDATED);
        break;
      case Constants.TABLE_PERMANENT_UPDATED:
        this.reloadTable(Constants.TABLE_PERMANENT_UPDATED);
        break;
      case Constants.TABLE_SAISONIER_UPDATED:
        this.reloadTable(Constants.TABLE_SAISONIER_UPDATED);
        break;
      case Constants.TABLE_CONSOMABLE_UPDATED:
        this.reloadConsomable();
        break;
      case Constants.TABLE_NON_CONSOMABLE_UPDATED:
        this.reloadNonConsomable();
        break;
      case Constants.TYPE_STOCK_SELECT:
        this.selectStockChanget();
        break;
      case Constants.TYPE_PERSONNEL_SELECT:
        this.selectPersonnelChanged(payload);
        break;
      default:
        break;
    }
  }

  getTypeStock = () => {
    return _store.typeStock;
  };

  getTypePersonnel = () => {
    return _store.typePersonnel;
  };
  selectStockChanget = () => {
    switch (_store.typeStock) {
      case "Consomable":
        _store.typeStock = "Non consomable";
        break;
      case "Non consomable":
        _store.typeStock = "Consomable";
        break;
    }
  };
  selectPersonnelChanged = payload => {
    _store.typePersonnel = payload;
  };

  reloadTable = action => {
    this.emit(action);
  };

  reloadConsomable = () => {
    this.emit(Constants.TABLE_CONSOMABLE_UPDATED);
  };

  reloadNonConsomable = () => {
    this.emit(Constants.TABLE_NON_CONSOMABLE_UPDATED);
  };
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
