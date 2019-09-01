import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Statistiques from "./views/Statistiques";
// import GestionDeCheques from "./views/Cheques";
import Cheques from "./views/tables/Cheques";
import ListerProjets from "./views/tables/ListerProjets";

import Personnel from "./views/tables/Personnel";
import Stock from "./views/tables/Stock";
// import Tables from "./views/Tables";
import AppelesOffres from "./views/AppelesOffres";
import StepperProjects from "./views/projects/StepperProjects";

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
    component: Statistiques
  },

  {
    path: "/cheques",
    layout: DefaultLayout,
    component: Cheques
  },
  {
    path: "/personnels",
    layout: DefaultLayout,
    component: Personnel
  },
  {
    path: "/stock",
    layout: DefaultLayout,
    component: Stock
  },
  {
    path: "/projets",
    layout: DefaultLayout,
    component: StepperProjects
  },
  {
    path: "/AppelesOffres",
    layout: DefaultLayout,
    component: AppelesOffres
  },
  {
    path: "/lister-projets",
    layout: DefaultLayout,
    component: ListerProjets
  }
];
