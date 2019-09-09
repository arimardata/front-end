import React from "react";
import { Container, Row, Col } from "shards-react";
import MUIDataTable from "mui-datatables";
import { Typography, Divider, Toolbar } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import {
  lighten,
  darken,
  fade
} from "@material-ui/core/styles/colorManipulator";
// import styles from "../../../projects/Steps/tables/styles";

const styles = theme => ({
  toolbar: {
    backgroundColor: "#7986cb",
    minHeight: 48,
    marginBottom: 20
  },
  title: {
    flex: "0 0 auto",
    "& h6": {
      fontSize: 16,
      color: lighten("#7986cb", 0.9)
    }
  }
});
class Charges extends React.Component {
  state = {
    etapes: []
  };

  componentWillReceiveProps() {
    const { value } = this.props;

    const etapes = [];
    if (value !== undefined) {
      this.setState({ charges: value });
    }
  }
  render() {
    const { charges } = this.state;
    const { classes } = this.props;
    if (charges) {
      return (
        <Container>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Les charge du projet</Typography>
            </div>
          </Toolbar>
          <Row>
            <Col>
              <Typography variant="h6" component="h2">
                Les charges des materiels consommables :
                <span>{" " + charges.chargeconsomable + " DH"}</span>
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography variant="h6" component="h2">
                Les charges des materiels non consommables :
                <span>{" " + charges.chargenonconsomable + " DH"}</span>
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography variant="h6" component="h2">
                Total des charges des materiels consommables et non consommables
                :
                <span>
                  {" "}
                  {parseInt(charges.chargenonconsomable) +
                    parseInt(charges.chargeconsomable)}
                  {" DH"}
                </span>
              </Typography>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <Typography variant="h6" component="h2">
                Les charges des personnels permanents :
                <span>{" " + charges.chargepermanent + " DH"}</span>
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography variant="h6" component="h2">
                Les charges des personnels saisoniers :
                <span>{" " + charges.chargesaisonier + " DH"}</span>
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography variant="h6" component="h2">
                Total des charges des personnels permanents et saisoniers :
                <span>
                  {" "}
                  {parseInt(charges.chargepermanent) +
                    parseInt(charges.chargesaisonier)}
                  {" DH"}
                </span>
              </Typography>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <Typography variant="h6" component="h2">
                Total des charges des personnels permanents et saisoniers :
                <span>
                  {" "}
                  {parseInt(charges.chargepermanent) +
                    parseInt(charges.chargesaisonier)}
                  {" DH"}
                </span>
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography variant="h6" component="h2">
                Total des charges fixes :
                <span>{" " + charges.chargefixe + " DH"}</span>
              </Typography>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <Typography variant="h6" component="h2">
                Total des charges du projet :
                <span>
                  {" "}
                  {parseInt(charges.chargepermanent) +
                    parseInt(charges.chargesaisonier) +
                    parseInt(charges.chargenonconsomable) +
                    parseInt(charges.chargeconsomable) +
                    parseInt(charges.chargefixe)}
                  {" DH"}
                </span>
              </Typography>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return <div>loading ...</div>;
    }
  }
}

export default withStyles(styles)(Charges);
