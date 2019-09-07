import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

import fetchApi from "../../utils/fetchApi";
import { Store, Constants } from "../../flux";

import Options from "./cheque/Options";
import Columns from "./cheque/Columns";

import { Container, Row } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

// import { Store, Constants, Dispatcher } from "../../flux";
class Cheques extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.fetchCheques();
  }

  fetchCheques = async () => {
    this.setState({ loading: true });
    const data = await fetchApi({
      method: "GET",
      url: "/api/Cheques/find",
      token: window.localStorage.getItem("token")
    });
    let cheques = [];
    data.map(elmnt =>
      cheques.push([
        elmnt.id,
        elmnt.etat,
        elmnt.emetteur,
        elmnt.recepteur,
        elmnt.banque,
        elmnt.somme,
        elmnt.date,
        elmnt.alerte,
        elmnt.compte,
        elmnt.email,
        elmnt.telephone
      ])
    );
    this.setState({ cheques, loading: false });
  };

  async componentWillMount() {
    this.fetchCheques();
    Store.addChangeListener(Constants.TABLE_CHEQUE_UPDATED, this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(Constants.TABLE_CHEQUE_UPDATED, this.onChange);
  }

  render() {
    const { loading } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Gestion Des Cheques "
            subtitle="Lister et gerer les  Cheques"
            className="text-sm-left"
          />
        </Row>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <center>{loading && <CircularProgress disableShrink />}</center>
            {!loading && (
              <MUIDataTable
                key={Math.random()}
                title={""}
                data={this.state.cheques}
                columns={Columns}
                options={Options}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Cheques;
