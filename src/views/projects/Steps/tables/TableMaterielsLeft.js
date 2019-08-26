import React from "react";
import { withStyles } from "@material-ui/styles";

import MUIDataTable from "mui-datatables";

import { createMuiTheme } from "@material-ui/core";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import fetchApi from "../../../../utils/fetchApi";
import { Store } from "../../../../flux";

const styles = theme => ({
  root: {}
});

class TableMaterielsLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  fetchMateriels = async () => {
    const consomable = await fetchApi({
      method: "GET",
      url: "/api/stock/consomable/find",
      token: window.localStorage.getItem("token")
    });
    let consomables = [];
    consomable.map(elmnt =>
      consomables.push([elmnt.id, elmnt.id_mat, elmnt.quantite])
    );

    const nonconsomable = await fetchApi({
      method: "GET",
      url: "/api/stock/nonconsomable/find",
      token: window.localStorage.getItem("token")
    });
    let nonconsomables = [];
    nonconsomable.map(elmnt =>
      nonconsomables.push([elmnt.id, elmnt.id_mat, elmnt.quantite])
    );
    this.setState({ materiels: [...consomables, ...nonconsomables] });
  };

  async componentWillMount() {
    this.fetchMateriels();
    // Store.addChangeListener(
    //   Constants.TABLE_CONSOMABLE_UPDATED,
    //   this.onChangeConsomable
    // );
    // Store.addChangeListener(
    //   Constants.TABLE_NON_CONSOMABLE_UPDATED,
    //   this.onChangeNonConsomable
    // );
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
    const options = {
      textLabels: {
        body: {
          noMatch: "Desolé, Aucune Résultat à Afficher",
          toolTip: "Trier"
        },
        pagination: {
          next: "Page Suivante",
          previous: "Page Précedente",
          rowsPerPage: "Lines par page:",
          displayRows: "sur"
        }
      },
      responsive: "scroll",
      selectableRows: false,

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
        Store.setMaterielSelectedRow(data);
      }
    };
    return (
      <MuiThemeProvider theme={theme}>
        <MUIDataTable
          data={this.state.materiels}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }
}

class CustomToolbarSelect extends React.Component {
  render() {
    console.log(this.props);
    return <div />;
  }
}

export default withStyles(styles)(TableMaterielsLeft);
