import React from "react";

import MUIDataTable from "mui-datatables";
export default class DeponsesFixes extends React.Component {
  state = {
    chargesfixes: []
  };

  componentWillReceiveProps() {
    const { value } = this.props;
    const chargesfixes = [];
    if (value) {
      value.map(chargesfixe => {
        chargesfixes.push([
          chargesfixe.num,
          chargesfixe.note,
          chargesfixe.montant
        ]);
      });
    }
    this.setState({ chargesfixes });
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
      responsive: "stacked",
      print: false,
      download: false,
      selectableRows: false,
      filter: false
    };

    const columns = [
      {
        name: "#",
        label: "#",
        options: {
          filter: false,
          sort: true
        }
      },

      {
        name: "Note",
        label: "note",
        options: {
          filter: false,
          sort: true
        }
      },
      {
        name: "Montant (DH)",
        label: "Montant (DH)",
        options: {
          filter: false,
          sort: true
        }
      }
    ];
    return (
      <div>
        <MUIDataTable
          key={Math.random()}
          title={""}
          data={this.state.chargesfixes}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}
