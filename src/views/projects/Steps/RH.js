import React from "react";
import { withStyles } from "@material-ui/styles";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect
} from "shards-react";

import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ProjectSteps from "./tables/ProjectSteps";
import TableRHLeft from "./tables/RH/TableRHLeft";
import TableRHRight from "./tables/RH/TableRHRight";
import { Store } from "../../../flux";
import fetchApi from "../../../utils/fetchApi";
import { ArrowForward, ArrowBack } from "@material-ui/icons";

const styles = theme => ({
  root: {},
  col: {
    marginBottom: 20
  }
});

class RH extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = () => {};

  render() {
    const {
      personnels,
      personnelAffecter,
      etapes,
      activeStep,
      etape
    } = this.props.state;
    const {
      classes,
      handleClickForward,
      handleClickRewind,
      handleBack,
      steps,
      personnelsConstructor,
      handleOnChange
    } = this.props;

    return (
      <div>
        <Row>
          <Col md="5" className="form-group">
            <TableRHLeft etapes={etapes} personnels={personnels} />
          </Col>
          <Col md="2" className="form-group">
            <Row className={classes.col}>
              <Col>
                <InputLabel htmlFor="age-simple">Etape</InputLabel>
                <Select
                  onChange={handleOnChange}
                  style={{ width: "100%" }}
                  name="etape"
                  value={etape}
                  validators={["required"]}
                  errorMessages={["Ce champ est obligatoire : "]}
                >
                  {etapes &&
                    etapes.map(etape => (
                      <MenuItem value={etape.id}>{etape.id}</MenuItem>
                    ))}
                </Select>
              </Col>
            </Row>
            <Row className={classes.col}>
              <Col md="4" />
              <Col md="4">
                <Button onClick={handleClickForward}>
                  <ArrowForward />
                </Button>
              </Col>
              <Col md="4" />
            </Row>

            <Row className={classes.col}>
              <Col md="4" />
              <Col md="4">
                <Button onClick={handleClickRewind}>
                  <ArrowBack />
                </Button>
              </Col>
              <Col md="4" />
            </Row>
          </Col>
          <Col md="5" className="form-group">
            <TableRHRight personnelAffecter={personnelAffecter} />
          </Col>
        </Row>
        <Row>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            // className={classes.backButton}
          >
            Précedent
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={personnelsConstructor}
          >
            {activeStep === steps.length - 1 ? "Finir" : "Suivant"}
          </Button>
        </Row>
      </div>
    );
  }
}

export default withStyles(styles)(RH);
