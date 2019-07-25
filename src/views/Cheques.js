import MUIDataTable from "mui-datatables";
import React, { Component } from "react";
import fetchApi from "../utils/fetchApi";
// import CustomToolbar from "./CustomToolbar";
import { Container, Row } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { Grid } from "@material-ui/core";

class Cheque extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cheques: [],
      selectedUsers: [],
      data: { authority: "ROLE_USER" },
      info: "",
      open: false,
      clicked: {}
    };
  }

  async componentWillMount() {
    const data = await fetchApi({
      method: "GET",
      url: "/api/Cheques/find",
      token: window.localStorage.getItem("token")
    });
    let donnee = [];
    data.map(elmnt =>
      donnee.push([
        elmnt.id,
        elmnt.date,
        elmnt.emetteur,
        elmnt.recepteur,
        elmnt.banque,
        elmnt.alerte,
        elmnt.somme,
        elmnt.etat
      ])
    );

    this.setState({ donnee: donnee });
    console.log(data);
  }

  render() {
    const columns = [
      "id",
      "date",
      "Emetteur",
      "Recepteur",
      "Banque",
      "Alerte",
      "Somme",
      "etat"
    ];

    const options = {
      filterType: "checkbox",
      customToolbar: () => {
        return <CustomToolbar />;
      }
    };

    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Gestion Des Cheques"
            subtitle="Gerer  les Cheques"
            className="text-sm-left"
          />
        </Row>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <MUIDataTable
              title={"Employee List"}
              data={this.state.donnee}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Cheque;
