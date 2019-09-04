import React from "react";

import MUIDataTable from "mui-datatables";
export default class Etapes extends React.Component {
  state = {
    etapes: []
  };

  componentWillReceiveProps() {
    const { value, getNomPrenom } = this.props;
    const etapes = [];
    if (value) {
      value.map(etape => {
        etapes.push([
          etape.etape,
          etape.designation,
          etape.duree,
          getNomPrenom(etape.responsable),
          etape.coutConsomable,
          etape.coutNonConsomable,
          etape.coutPermanent,
          etape.coutSaisonier
        ]);
      });
    }
    this.setState({ etapes });
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
        name: "Etape",
        label: "Etape",
        options: {
          filter: false,
          sort: true
        }
      },

      {
        name: "Designation",
        label: "Designation",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Duree",
        label: "Duree",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Responsable",
        label: "Responsable",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Cout consomable (DH)",
        label: "Cout consomable (DH)",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Cout non consomable (DH)",
        label: "Cout non consomable (DH)",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Cout permanent (DH)",
        label: "Cout permanent (DH)",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Cout saisonier (DH)",
        label: "Cout saisonier (DH)",
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
          data={this.state.etapes}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}
