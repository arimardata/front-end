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

const styles = theme => ({
  root: {},
  col: {
    marginBottom: 20
  }
});

class Materiels extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], quantite: 1 };
  }

  handleClick = () => {
    const selectedRow = Store.getMaterielSelectedRow();
    if (selectedRow.length > 0) {
      selectedRow[2] = this.state.quantite;
      const data = this.state.data;
      data.push(selectedRow);
      this.setState({ data });
      Store.setMaterielSelectedRow([]);
    }
  };

  handleSubmit = () => {};
  handleOnChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    const { quantite } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Row>
          <Col md="5" className="form-group">
            <TableMaterielsLeft />
          </Col>
          <Col md="2" className="form-group">
            <Row className={classes.col}>
              <Col>
                <TextField
                  label="Quantité"
                  type="number"
                  onChange={this.handleOnChange}
                  style={{ width: "90%" }}
                  name="quantite"
                  value={quantite}
                />
              </Col>
            </Row>
            <Row className={classes.col}>
              <Col md="4" />
              <Col md="4">
                <Button onClick={this.handleClick}>
                  <i className="material-icons mr-1">fast_forward</i>
                </Button>
              </Col>
              <Col md="4" />
            </Row>

            <Row className={classes.col}>
              <Col md="4" />
              <Col md="4">
                <Button>
                  <i className="material-icons md-48">fast_rewind</i>
                </Button>
              </Col>
              <Col md="4" />
            </Row>
          </Col>
          <Col md="5" className="form-group">
            <TableMaterielsRight data={this.state.data} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(styles)(Materiels);
