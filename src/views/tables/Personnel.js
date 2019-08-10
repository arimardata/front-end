import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

import fetchApi from "../../utils/fetchApi";
import { Store, Constants } from "../../flux";

import Options from "./personnel/Options";
import Columns from "./personnel/Columns";

import { Container, Row } from "shards-react";
import PageTitle from "../../components/common/PageTitle";

// import { Store, Constants, Dispatcher } from "../../flux";
class Personnel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    // this.fetchCheques();
  }

  // fetchCheques = async () => {
  //   const data = await fetchApi({
  //     method: "GET",
  //     url: "/api/Cheques/find",
  //     token: window.localStorage.getItem("token")
  //   });
  //   let cheques = [];
  //   data.map(elmnt =>
  //     cheques.push([
  //       elmnt.id,
  //       elmnt.etat,
  //       elmnt.emetteur,
  //       elmnt.recepteur,
  //       elmnt.banque,
  //       elmnt.somme,
  //       elmnt.date,
  //       elmnt.alerte,
  //       elmnt.compte,
  //       elmnt.email,
  //       elmnt.telephone
  //     ])
  //   );
  //   this.setState({ cheques });
  // };

  async componentWillMount() {
    // this.fetchCheques();
    Store.addChangeListener(Constants.TABLE_CHEQUE_UPDATED, this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(Constants.TABLE_CHEQUE_UPDATED, this.onChange);
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Gestion des personnels "
            subtitle="Lister et gerer les personnels"
            className="text-sm-left"
          />
        </Row>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <MUIDataTable
              key={Math.random()}
              title={""}
              // data={this.state.cheques}
              columns={Columns}
              options={Options}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Personnel;
