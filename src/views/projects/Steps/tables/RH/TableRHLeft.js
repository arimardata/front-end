import React from "react";
import { withStyles } from "@material-ui/styles";

import MUIDataTable from "mui-datatables";

import { createMuiTheme } from "@material-ui/core";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import fetchApi from "../../../../../utils/fetchApi";
import { Store } from "../../../../../flux";

const styles = theme => ({
  root: {}
});

class TableRHLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(newProps) {
    const { personnels } = newProps;
    this.setState({ personnels });
  }

  componentWillMount() {
    const { personnels } = this.props;

    this.setState({ personnels });
  }

  render() {
    // const theme = createMuiTheme({
    //   overrides: {
    //     MUIDataTableToolbar: { root: { display: "none" } }
    //   }
    // });
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
        name: "Cin",
        label: "Cin",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Nom",
        label: "Nom",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Diplome",
        label: "Diplome",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Qualité",
        label: "Qualité",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Type",
        label: "Type",
        options: {
          filter: true,
          sort: true
        }
      }
    ];
    const options = {
      textLabels: {
        body: {
          noMatch: "Desolé, Aucune Résultat à Afficher",
          toolTip: "Trier"
        },
        toolbar: {
          search: "Rechercher"
        },
        pagination: {
          next: "Page Suivante",
          previous: "Page Précedente",
          rowsPerPage: "Lines par page:",
          displayRows: "sur"
        }
      },
      download: false,
      filter: false,
      viewColumns: false,
      print: false,
      responsive: "scroll",
      // selectableRows: false,

      customToolbarSelect: (selectedRows, displayData) => {
        const newSelectedRow = selectedRows.data[selectedRows.data.length - 1]; // selectedRows.data.length > 1 ? selectedRows.data[1] : selectedRows.data[0];
        const newSelectedIndex = parseInt(newSelectedRow.index);
        const temp = {
          data: newSelectedRow,
          lookup: {}
        };
        temp.lookup[`${newSelectedIndex}`] = true;
        selectedRows.data = [];
        selectedRows.lookup = temp.lookup;

        const data = displayData[newSelectedIndex].data;
        Store.setRHSelectedRow(data);
      }
    };
    return (
      // <MuiThemeProvider theme={theme}>
      <MUIDataTable
        data={this.state.personnels}
        columns={columns}
        options={options}
      />
      // </MuiThemeProvider>
    );
  }
}

class CustomToolbarSelect extends React.Component {
  render() {
    return <div />;
  }
}

export default withStyles(styles)(TableRHLeft);
