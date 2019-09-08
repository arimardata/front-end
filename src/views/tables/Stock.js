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

import Options from "./stock/Options";
import ColumnsConsomable from "./stock/ColumnsConsomable";
import ColumnsNonConsomable from "./stock/ColumnsNonConsomable";

import { Container, Row } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
});

// import { Store, Constants, Dispatcher } from "../../flux";
class Stock extends React.Component {
  constructor(props) {
    super(props);

    this.state = { typeMateriel: "Materiels consommables", loading: true };
  }

  onChangeConsomable = () => {
    this.fetchConsomable();
  };
  onChangeNonConsomable = () => {
    this.fetchNonConsomable();
  };

  fetchConsomable = async () => {
    this.setState({ loading: true });
    const data = await fetchApi({
      method: "GET",
      url: "/api/stock/consomable/find",
      token: window.localStorage.getItem("token")
    });
    let consomables = [];
    data.map(elmnt =>
      consomables.push([
        elmnt.id,
        elmnt.id_mat,
        elmnt.quantite,
        elmnt.prix_unite
      ])
    );
    this.setState({ consomables, loading: false });
  };

  fetchNonConsomable = async () => {
    this.setState({ loading: true });
    const data = await fetchApi({
      method: "GET",
      url: "/api/stock/nonconsomable/find",
      token: window.localStorage.getItem("token")
    });
    let nonconsomables = [];
    data.map(elmnt =>
      nonconsomables.push([
        elmnt.id,
        elmnt.id_mat,
        elmnt.quantite,
        elmnt.cout_par_heure,
        elmnt.prix_achat,
        elmnt.date_achat
      ])
    );
    this.setState({ nonconsomables, loading: false });
  };

  handleChange = e => {
    const { name, value } = e.target;
    switch (value) {
      case "Materiels consommables":
        this.fetchConsomable();
        break;
      case "Materiels non-consommables":
        this.fetchNonConsomable();
        break;
    }
    Dispatcher.dispatch({
      actionType: Constants.TYPE_STOCK_SELECT
    });
    this.setState({ [name]: value });
  };

  async componentWillMount() {
    this.fetchConsomable();
    Store.addChangeListener(
      Constants.TABLE_CONSOMABLE_UPDATED,
      this.onChangeConsomable
    );
    Store.addChangeListener(
      Constants.TABLE_NON_CONSOMABLE_UPDATED,
      this.onChangeNonConsomable
    );
  }

  componentWillUnmount() {
    Store.removeChangeListener(
      Constants.TABLE_CONSOMABLE_UPDATED,
      this.onChangeConsomable
    );
    Store.removeChangeListener(
      Constants.TABLE_NON_CONSOMABLE_UPDATED,
      this.onChangeNonConsomable
    );
  }

  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    let columns;
    this.state.typeMateriel === "Materiels consommables"
      ? (columns = ColumnsConsomable)
      : (columns = ColumnsNonConsomable);
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Gestion de stock "
            subtitle="Lister et gerer stock"
            className="text-sm-left"
          />
        </Row>
        <Row noGutters className="page-header py-4">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="demo-controlled-open-select">
              Type :
            </InputLabel>
            <Select
              value={this.state.typeMateriel}
              onChange={this.handleChange}
              inputProps={{
                name: "typeMateriel",
                id: "demo-controlled-open-select"
              }}
            >
              <MenuItem value={"Materiels consommables"}>
                Materiels consommables
              </MenuItem>
              <MenuItem value={"Materiels non-consommables"}>
                Materiels non-consommables
              </MenuItem>
            </Select>
          </FormControl>
        </Row>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <center>{loading && <CircularProgress disableShrink />}</center>
            {!loading && (
              <MUIDataTable
                key={Math.random()}
                title={""}
                data={
                  this.state.typeMateriel === "Materiels consommables"
                    ? this.state.consomables
                    : this.state.nonconsomables
                }
                columns={columns}
                options={Options}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(Stock);
