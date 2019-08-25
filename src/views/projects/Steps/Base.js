import React from "react";
import { withStyles } from "@material-ui/styles";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  Button
} from "shards-react";
import MenuItem from "@material-ui/core/MenuItem";

import TextField from "@material-ui/core/TextField";
import ProjectSteps from "./tables/ProjectSteps";

const styles = theme => ({
  root: {}
});

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      etapes: [
        { id: 1, designation: "", duree: 0, responsable: "" },
        { id: 2, designation: "", duree: 0, responsable: "" },
        { id: 3, designation: "", duree: 0, responsable: "" },
        { id: 4, designation: "", duree: 0, responsable: "" },
        { id: 5, designation: "", duree: 0, responsable: "" }
      ]
    };
  }

  handleSubmit = () => {};
  handleOnChange = e => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState({ ...this.state, [name]: value });
  };
  handleOnChangeSteps = id => e => {
    const { name, value } = e.target;
    const { etapes } = this.state;
    etapes.map(etape => {
      if (etape.id === id) {
        etape[name] = value;
      }
    });
    this.setState({ etapes });
  };
  render() {
    const { projet, date_debut, date_fin, etapes } = this.state;

    return (
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
        onError={errors => console.log(errors)}
      >
        <Row form>
          <Col md="5" className="form-group">
            <SelectValidator
              label="Projet"
              style={{ width: "100%" }}
              value={projet}
              onChange={this.handleOnChange}
              name="projet"
            >
              <MenuItem value="Sample1">Sample1</MenuItem>
              <MenuItem value="Sample2">Sample2</MenuItem>
              <MenuItem value="Sample3">Sample3</MenuItem>
            </SelectValidator>
          </Col>
        </Row>
        <Row form>
          <Col md="5" className="form-group">
            <TextValidator
              label="Date début"
              type="date"
              onChange={this.handleOnChange}
              style={{ width: "100%" }}
              name="prenom"
              defaultValue="2019-01-01"
              value={date_debut}
              validators={["required"]}
              errorMessages={["Ce champ est obligatoire : "]}
            />
          </Col>
        </Row>
        <Row form>
          <Col md="5" className="form-group">
            <TextValidator
              label="Date fin"
              type="date"
              onChange={this.handleOnChange}
              style={{ width: "100%" }}
              name="prenom"
              defaultValue="2019-12-31"
              value={date_fin}
              validators={["required"]}
              errorMessages={["Ce champ est obligatoire : "]}
            />
          </Col>
        </Row>
        <ProjectSteps
          etapes={etapes}
          handleOnChangeSteps={this.handleOnChangeSteps}
        />
      </ValidatorForm>
    );
  }
}

export default withStyles(styles)(Base);
