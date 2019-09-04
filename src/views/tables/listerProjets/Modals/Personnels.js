import React from "react";

import MUIDataTable from "mui-datatables";
export default class Personnels extends React.Component {
  state = {
    personnels: []
  };

  componentWillReceiveProps() {
    const { value, getNomPrenom } = this.props;
    const personnels = [];
    if (value) {
      value.map(personnel => {
        personnels.push([
          personnel.cin,
          getNomPrenom(personnel.personnelId),
          personnel.diplome,
          personnel.qualite,
          personnel.type,
          personnel.etape
        ]);
      });
    }
    this.setState({ personnels });
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
        name: "Cin",
        label: "Cin",
        options: {
          filter: false,
          sort: true
        }
      },

      {
        name: "Nom et Prenom",
        label: "Nom et Prenom",
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
        name: "Qualite",
        label: "Qualite",
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
          sort: true
        }
      }
    ];
    return (
      <div>
        <MUIDataTable
          key={Math.random()}
          title={""}
          data={this.state.personnels}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}
