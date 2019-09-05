import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

import fetchApi from "../../utils/fetchApi";

import Options from "./listerProjets/Options";
import Columns from "./listerProjets/Columns";

import { Container, Row } from "shards-react";
import PageTitle from "../../components/common/PageTitle";

class ListerProjets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getNomPrenom = id => {
    const nomPrenom = this.state.nomPrenom;
    let name;
    nomPrenom.map(object => {
      if (object.id === id) {
        name = object.nom;
        return;
      }
    });
    return name;
  };

  fetchProjets = async () => {
    const nomPrenom = await fetchApi({
      method: "GET",
      url: "/api/personnel/administratif/findNomPrenom",
      token: window.localStorage.getItem("token")
    });

    this.setState({ nomPrenom });
    const data = await fetchApi({
      method: "GET",
      url: "/api/projets/find",
      token: window.localStorage.getItem("token")
    });
    let projets = [];
    data.map(elmnt =>
      projets.push([
        elmnt.id,
        elmnt.numAo,
        this.getNomPrenom(elmnt.chefDuProjet),
        elmnt.dateDebut,
        elmnt.dateFin,
        elmnt.etapes,
        elmnt.materiels,
        elmnt.personnels,
        elmnt.chargesFixes,
        elmnt.charges
      ])
    );
    this.setState({ projets });
  };

  async componentWillMount() {
    this.fetchProjets();
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Liste des projets "
            subtitle="Lister projets"
            className="text-sm-left"
          />
        </Row>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <MUIDataTable
              key={Math.random()}
              title={""}
              data={this.state.projets}
              columns={Columns}
              options={Options}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default ListerProjets;
