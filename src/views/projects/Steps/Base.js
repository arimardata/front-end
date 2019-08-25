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

const styles = theme => ({
  root: {}
});

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = () => {};
  handleOnChange = () => {};
  render() {
    return (
      <ValidatorForm
        autoComplete="off"
        ref="form"
        onSubmit={this.handleSubmit}
        onError={errors => console.log(errors)}
      >
        <Row form>
          <Col md="5" className="form-group">
            <SelectValidator
              label="Projet"
              style={{ width: "100%" }}
              //   value={projet}
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
              //   value={prenom}
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
              //   value={prenom}
              validators={["required"]}
              errorMessages={["Ce champ est obligatoire : "]}
            />
          </Col>
        </Row>
      </ValidatorForm>
    );
  }
}

export default withStyles(styles)(Base);
