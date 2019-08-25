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
import TableMaterielsLeft from "./tables/TableMaterielsLeft";
import TableMaterielsRight from "./tables/TableMaterielsRight";

const styles = theme => ({
  root: {}
});

class Materiels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = () => {};
  handleOnChange = e => {};
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
            <TableMaterielsLeft />
          </Col>
          <Col md="2" className="form-group">
            <TextValidator
              label="Quantité"
              type="number"
              //   onChange={this.handleOnChange}
              style={{ width: "90%" }}
              name="quantite"
              //   value={date_debut}
            />
          </Col>
          <Col md="5" className="form-group">
            <TableMaterielsRight />
          </Col>
        </Row>
      </ValidatorForm>
    );
  }
}

export default withStyles(styles)(Materiels);
