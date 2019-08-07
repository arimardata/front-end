import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";

import fetchApi from "../../utils/fetchApi";
import { Store, Constants } from "../../flux";

import Options from "./stock/Options";
import ColumnsConsomable from "./stock/ColumnsConsomable";
import ColumnsNonConsomable from "./stock/ColumnsNonConsomable";

import { Container, Row } from "shards-react";
import PageTitle from "../../components/common/PageTitle";

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

    this.state = { typeMateriel: "Materiels consomables" };
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

  handleChange = e => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState({ [name]: value });
  };

  async componentWillMount() {
    // this.fetchCheques();
    Store.addChangeListener(Constants.TABLE_CHEQUE_UPDATED, this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(Constants.TABLE_CHEQUE_UPDATED, this.onChange);
  }

  render() {
    const { classes } = this.props;
    let columns;
    this.state.typeMateriel === "Materiels consomables"
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
              <MenuItem value={"Materiels consomables"}>
                Materiels consomables
              </MenuItem>
              <MenuItem value={"Materiels non-consomables"}>
                Materiels non-consomables
              </MenuItem>
            </Select>
          </FormControl>
        </Row>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <MUIDataTable
              key={Math.random()}
              title={""}
              // data={this.state.cheques}
              columns={columns}
              options={Options}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(Stock);
