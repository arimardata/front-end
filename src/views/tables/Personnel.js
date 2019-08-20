import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";

import fetchApi from "../../utils/fetchApi";
import { Store, Constants, Dispatcher } from "../../flux";

import Options from "./personnel/Options";
import Columns from "./personnel/Columns";

import { Container, Row } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import ColumnsSaisonier from "./personnel/ColumnsSaisonier";

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
});
class Personnel extends React.Component {
  constructor(props) {
    super(props);

    this.state = { type_personnel: "Permanent" };
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    // this.fetchCheques();
  }

  fetchAdministratif = async () => {
    const data = await fetchApi({
      method: "GET",
      url: "/api/personnel/administratif/find",
      token: window.localStorage.getItem("token")
    });
    let rows = [];
    data.map(elmnt =>
      rows.push([
        elmnt.id,
        elmnt.cin,
        elmnt.nom,
        elmnt.prenom,
        elmnt.tel,
        elmnt.email,
        elmnt.diplome,
        elmnt.dateNaissance,
        elmnt.salaire,
        elmnt.dateEmbauche,
        elmnt.cnss
      ])
    );
    this.setState({ rows });
  };
  fetchPermanent = async () => {
    const data = await fetchApi({
      method: "GET",
      url: "/api/personnel/permanent/find",
      token: window.localStorage.getItem("token")
    });
    let rows = [];
    data.map(elmnt =>
      rows.push([
        elmnt.id,
        elmnt.cin,
        elmnt.nom,
        elmnt.prenom,
        elmnt.tel,
        elmnt.email,
        elmnt.diplome,
        elmnt.dateNaissance,
        elmnt.salaire,
        elmnt.dateEmbauche,
        elmnt.cnss
      ])
    );
    this.setState({ rows });
  };
  fetchSaisonier = async () => {
    const data = await fetchApi({
      method: "GET",
      url: "/api/personnel/saisonier/find",
      token: window.localStorage.getItem("token")
    });
    let rows = [];
    data.map(elmnt =>
      rows.push([
        elmnt.id,
        elmnt.cin,
        elmnt.nom,
        elmnt.prenom,
        elmnt.tel,
        elmnt.email,
        elmnt.diplome,
        elmnt.dateNaissance,
        elmnt.coutParJour
      ])
    );
    this.setState({ rows });
  };

  fetchData = () => {
    let data = this.state;
    switch (data.type_personnel) {
      case "Administratif":
        this.fetchAdministratif();
        break;
      case "Permanent":
        this.fetchPermanent();
        break;
      case "Saisonier":
        this.fetchSaisonier();
        break;
    }
  };

  async componentWillMount() {
    this.fetchData();
    Store.addChangeListener(Constants.TABLE_CHEQUE_UPDATED, this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(Constants.TABLE_CHEQUE_UPDATED, this.onChange);
  }

  handleChange = e => {
    const { name, value } = e.target;
    switch (value) {
      case "Administratif":
        this.fetchAdministratif();
        break;
      case "Permanent":
        this.fetchPermanent();
        break;
      case "Saisonier":
        this.fetchSaisonier();
        break;
    }
    Dispatcher.dispatch({
      // actionType: Constants.TYPE_STOCK_SELECT
    });
    this.setState({ [name]: value });
  };

  render() {
    const { classes } = this.props;
    let columns =
      this.state.type_personnel === "Saisonier" ? ColumnsSaisonier : Columns;
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
        <Row noGutters className="page-header py-4">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="demo-controlled-open-select">
              Type :
            </InputLabel>
            <Select
              value={this.state.type_personnel}
              onChange={this.handleChange}
              inputProps={{
                name: "type_personnel",
                id: "demo-controlled-open-select"
              }}
            >
              <MenuItem value={"Administratif"}>Administratif</MenuItem>
              <MenuItem value={"Permanent"}>Permanent</MenuItem>
              <MenuItem value={"Saisonier"}>Saisonier</MenuItem>
            </Select>
          </FormControl>
        </Row>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <MUIDataTable
              key={Math.random()}
              title={""}
              data={this.state.rows}
              columns={columns}
              options={Options}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(Personnel);
