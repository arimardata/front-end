import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { withStyles } from "@material-ui/core/styles";

import fetchApi from "../../utils/fetchApi";

import Options from "./listerProjets/Options";
import Columns from "./listerProjets/Columns";

import { Container, Row } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Store, Constants, Dispatcher } from "../../flux";
const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
});

class ListerProjets extends React.Component {
  constructor(props) {
    super(props);

    this.state = { type: "Projet", loading: true };
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

  fetchProjets = async type => {
    this.setState({ loading: true });
    const nomPrenom = await fetchApi({
      method: "GET",
      url: "/api/personnel/administratif/findNomPrenom",
      token: window.localStorage.getItem("token")
    });

    this.setState({ nomPrenom });

    const data = await fetchApi({
      method: "GET",
      url: "/api/projets/findByType/" + type,
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
    this.setState({ projets, loading: false });
  };

  onChange = () => {
    const type = Store.getTypeProjet();
    this.fetchProjets(type);
  };

  async componentWillMount() {
    this.fetchProjets(this.state.type);
    Store.addChangeListener(Constants.TABLE_PROJET_UPDATED, this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(Constants.TABLE_PROJET_UPDATED, this.onChange);
  }

  handleChange = e => {
    const { name, value } = e.target;
    switch (value) {
      case "Projet":
        this.fetchProjets(value);
        Dispatcher.dispatch({
          actionType: Constants.TYPE_PROJET_SELECT,
          payload: "Projet"
        });
        break;
      case "Finis":
        this.fetchProjets(value);
        Dispatcher.dispatch({
          actionType: Constants.TYPE_PROJET_SELECT,
          payload: "Finis"
        });
        break;
    }

    this.setState({ [name]: value });
  };

  render() {
    const { classes } = this.props;
    const { loading } = this.state;
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
        <Row noGutters className="page-header py-4">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="demo-controlled-open-select">
              Type :
            </InputLabel>
            <Select
              value={this.state.type}
              onChange={this.handleChange}
              inputProps={{
                name: "type",
                id: "demo-controlled-open-select"
              }}
            >
              <MenuItem value={"Projet"}>Projet</MenuItem>
              <MenuItem value={"Finis"}>Finis</MenuItem>
            </Select>
          </FormControl>
        </Row>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <center>{loading && <CircularProgress disableShrink />}</center>
            {!loading && (
              <MUIDataTable
                key={Math.random()}
                title={
                  this.state.type === "Projet"
                    ? "Liste des projets en cours "
                    : "Liste des projets finis"
                }
                data={this.state.projets}
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

export default withStyles(styles)(ListerProjets);
