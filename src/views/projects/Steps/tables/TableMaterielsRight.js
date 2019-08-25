import React from "react";
import { withStyles } from "@material-ui/styles";

import MUIDataTable from "mui-datatables";
import { createMuiTheme } from "@material-ui/core";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const styles = theme => ({
  root: {}
});

const columns = [
  {
    name: "Identifiant",
    label: "Identifiant",
    options: {
      filter: false,
      sort: true,
      display: false
    }
  },
  {
    name: "Materiel",
    label: "Materiel",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Quantite",
    label: "Quantité",
    options: {
      filter: true,
      sort: true
    }
  }
];
const options = [];

class TableMaterielsRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const theme = createMuiTheme({
      overrides: {
        MUIDataTableToolbar: { root: { display: "none" } }
      }
    });
    return (
      <MuiThemeProvider theme={theme}>
        {" "}
        <MUIDataTable columns={columns} options={options} />
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(TableMaterielsRight);
