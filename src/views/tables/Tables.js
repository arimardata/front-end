import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

import fetchApi from "../../utils/fetchApi";

import Options from "./cheque/Options";
import Columns from "./cheque/Columns";

import { Container, Row } from "shards-react";
import PageTitle from "../../components/common/PageTitle";

// import { Store, Constants, Dispatcher } from "../../flux";
class Tables extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    // let id = Store.getBlockedUser();
    // let cheques = this.state.cheques;
    // for (let i = 0; i < cheques.length; i++) {
    //   if (users[i][0] == id) {
    //     users[i][2] = users[i][2] === "Bloqué" ? "Débloqué" : "Bloqué";
    //   }
    // }
    // this.setState({ users });
  }

  async componentWillMount() {
    const data = await fetchApi({
      method: "GET",
      url: "/api/Cheques/find",
      token: window.localStorage.getItem("token")
    });
    let cheques = [];
    data.map(elmnt =>
      cheques.push([
        elmnt.id,
        // elmnt.date,
        elmnt.emetteur,
        elmnt.recepteur,
        elmnt.banque,
        elmnt.alerte,
        elmnt.somme,
        elmnt.etat
      ])
    );

    this.setState({ cheques });
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Gestion Des Utilisateurs "
            subtitle="Lister Utilisateurs"
            className="text-sm-left"
          />
        </Row>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <MUIDataTable
              key={Math.random()}
              title={"Employee List"}
              data={this.state.cheques}
              columns={Columns}
              options={Options}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Tables;
