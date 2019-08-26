import React from "react";
import { withStyles } from "@material-ui/styles";

import MUIDataTable from "mui-datatables";
import { createMuiTheme } from "@material-ui/core";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const styles = theme => ({
  root: {}
});

class TableMaterielsRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentWillReceiveProps(newProps) {
    const comingData = newProps.data;

    this.setState({ data: comingData });
  }
  componentWillMount() {
    const comingData = this.props.data;

    this.setState({ data: comingData });
  }
  render() {
    const theme = createMuiTheme({
      overrides: {
        MUIDataTableToolbar: { root: { display: "none" } }
      }
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
    return (
      <MuiThemeProvider theme={theme}>
        {" "}
        <MUIDataTable
          data={this.state.data}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(TableMaterielsRight);
