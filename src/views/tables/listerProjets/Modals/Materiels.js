import React from "react";

import MUIDataTable from "mui-datatables";
export default class Materiels extends React.Component {
  state = {
    materiels: []
  };

  componentWillReceiveProps() {
    const { value } = this.props;
    const materiels = [];
    value.map(materiel => {
      materiels.push([materiel.materiel, materiel.quantite, materiel.type]);
    });
    this.setState({ materiels });
  }
  render() {
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
        },
        toolbar: {
          search: "Rechercher",
          viewColumns: "Afficher Les Colonnes",
          filterTable: "Filtrer La Table"
        },
        filter: {
          all: "All",
          title: "FILTRES",
          reset: "ANNULER"
        },
        selectedRows: {
          text: "ligne(s) selectionnée(s)",
          delete: "Supprimer",
          deleteAria: "Supprimer Les Lignes Selectionées"
        },
        viewColumns: {
          title: "Afficher Les Colonnes",
          titleAria: "Afficher/Cacher Les Colonnes"
        }
      },
      filterType: "checkbox",
      filterList: ["Identifiant"],
      responsive: "stacked",
      print: false,
      download: false,
      selectableRows: false,
      filter: false
    };

    const columns = [
      {
        name: "Materiel",
        label: "Materiel",
        options: {
          filter: false,
          sort: true
        }
      },

      {
        name: "Quantite",
        label: "Quantite",
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
    return (
      <div>
        <MUIDataTable
          key={Math.random()}
          title={""}
          data={this.state.materiels}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}
