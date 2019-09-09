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
import TableMaterielsLeft from "./tables/materiels/TableMaterielsLeft";
import TableMaterielsRight from "./tables/materiels/TableMaterielsRight";
import { Store } from "../../../flux";
import { ArrowForward, ArrowBack } from "@material-ui/icons";
import fetchApi from "../../../utils/fetchApi";
import {
  ValidatorForm,
  SelectValidator
} from "react-material-ui-form-validator";

const styles = theme => ({
  root: {},
  col: {
    marginBottom: 20
  }
});

class Materiels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = () => {};

  render() {
    const {
      quantite,
      materiels,
      data,
      activeStep,
      etapes,
      etape
    } = this.props.state;
    const {
      classes,
      handleClickForward,
      handleClickRewind,
      handleOnChange,
      handleComplete,
      handleBack,
      steps
    } = this.props;
    return (
      <ValidatorForm ref="form" onError={errors => console.log(errors)}>
        <Row>
          <Col md="5" className="form-group">
            <TableMaterielsLeft materiels={materiels} />
          </Col>

          <Col md="2" className="form-group">
            <Row className={classes.col}>
              <Col>
                <TextField
                  label="Quantité"
                  type="number"
                  onChange={handleOnChange}
                  style={{ width: "100%" }}
                  name="quantite"
                  value={quantite}
                />
              </Col>
            </Row>
            <Row className={classes.col}>
              <Col>
                <InputLabel htmlFor="age-simple">Etape</InputLabel>
                <Select
                  label="Etape"
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
            <TableMaterielsRight data={data} />
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
          <Button variant="contained" color="primary" onClick={handleComplete}>
            {activeStep === steps.length - 1 ? "Finir" : "Suivant"}
          </Button>
        </Row>
      </ValidatorForm>
    );
  }
}

export default withStyles(styles)(Materiels);
