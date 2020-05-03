import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import {
  sideBarForAssistant,
  sideBarForAdmin
} from "../data/sidebar-nav-items";

let _store = {
  menuVisible: false,
  materielSelectedRow: [],
  materielSelectedRowRewind: [],
  RHSelectedRow: [],
  RHSelectedRowRewind: [],
  typeStock: "Consommable",
  typePersonnel: "Permanent",
  typeProjet: "Projet en cours",
  userData: {
    id: window.localStorage.getItem("id"),
    username: window.localStorage.getItem("username"),
    authority: window.localStorage.getItem("authority"),
    token: window.localStorage.getItem("token"),
    firstLogin: window.localStorage.getItem("firstLogin")
  },
  navItems: sideBarForAssistant()
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
      case Constants.TABLE_PROJET_UPDATED:
        this.reloadTable(Constants.TABLE_PROJET_UPDATED);
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
      case Constants.TYPE_PROJET_SELECT:
        this.selectProjetChanged(payload);
        break;
      default:
        break;
    }
  }

  getTypeStock = () => {
    return _store.typeStock;
  };

  getTypeProjet = () => {
    return _store.typeProjet;
  };
  selectProjetChanged = payload => {
    _store.typeProjet = payload;
  };

  getTypePersonnel = () => {
    return _store.typePersonnel;
  };
  selectStockChanget = () => {
    switch (_store.typeStock) {
      case "Consommable":
        _store.typeStock = "Non consommable";
        break;
      case "Non consommable":
        _store.typeStock = "Consommable";
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
    _store.navItems =
      _store.userData.authority === "ROLE_ADMIN"
        ? sideBarForAdmin()
        : sideBarForAssistant();

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
