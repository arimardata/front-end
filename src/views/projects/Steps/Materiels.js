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
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ProjectSteps from "./tables/ProjectSteps";
import TableMaterielsLeft from "./tables/TableMaterielsLeft";
import TableMaterielsRight from "./tables/TableMaterielsRight";
import { Store } from "../../../flux";
import fetchApi from "../../../utils/fetchApi";

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
    const { quantite, materiels, data } = this.props.state;
    const {
      classes,
      handleClickForward,
      handleClickRewind,
      handleOnChange
    } = this.props;

    return (
      <div>
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
              <Col md="4" />
              <Col md="4">
                <Button onClick={handleClickForward}>
                  <i className="material-icons mr-1">fast_forward</i>
                </Button>
              </Col>
              <Col md="4" />
            </Row>

            <Row className={classes.col}>
              <Col md="4" />
              <Col md="4">
                <Button onClick={handleClickRewind}>
                  <i className="material-icons md-48">fast_rewind</i>
                </Button>
              </Col>
              <Col md="4" />
            </Row>
          </Col>
          <Col md="5" className="form-group">
            <TableMaterielsRight data={data} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(styles)(Materiels);
