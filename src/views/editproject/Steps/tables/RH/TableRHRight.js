import React from "react";
import { withStyles } from "@material-ui/styles";

import MUIDataTable from "mui-datatables";
import { createMuiTheme } from "@material-ui/core";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { Store } from "../../../../../flux";

const styles = theme => ({
  root: {}
});

class TableRHRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentWillReceiveProps(newProps) {
    const comingData = newProps.personnelAffecter;

    this.setState({ personnelAffecter: comingData });
  }
  componentWillMount() {
    const comingData = this.props.personnelAffecter;

    this.setState({ personnelAffecter: comingData });
  }
  render() {
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
      },
      {
        name: "Etape",
        label: "Etape",
        options: {
          filter: true,
          sort: true,
          display: true
        }
      }
    ];
    const options = {
      textLabels: {
        body: {
          noMatch: "Aucun personnel a été affecté",
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
      // viewColumns: false,
      print: false,
      responsive: "scroll",

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
        const newData = [];
        data.map(el => {
          newData.push(el);
        });
        newData.pop();
        Store.setRHSelectedRowRewind(newData);
      }
    };
    return (
      <MUIDataTable
        data={this.state.personnelAffecter}
        title={"Personnels affectés"}
        columns={columns}
        options={options}
      />
    );
  }
}

export default withStyles(styles)(TableRHRight);
