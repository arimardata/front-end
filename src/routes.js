import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
// import GestionDeCheques from "./views/Cheques";
import Tables from "./views/tables/Tables";
import Personnel from "./views/tables/Personnel";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
// import Tables from "./views/Tables";
import AppelesOffres from "./views/AppelesOffres";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/statistiques" />
  },
  {
    path: "/statistiques",
    layout: DefaultLayout,
    component: BlogOverview
  },
  // {
  //   path: "/user-profile-lite",
  //   layout: DefaultLayout,
  //   component: UserProfileLite
  // },
  {
    path: "/cheques",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/personnels",
    layout: DefaultLayout,
    component: Personnel
  },
  // {
  //   path: "/errors",
  //   layout: DefaultLayout,
  //   component: Errors
  // },
  // {
  //   path: "/components-overview",
  //   layout: DefaultLayout,
  //   component: ComponentsOverview
  // },
  // {
  //   path: "/tables",
  //   layout: DefaultLayout,
  //   component: Tables
  // },
  {
    path: "/AppelesOffres",
    layout: DefaultLayout,
    component: AppelesOffres
  }
];
