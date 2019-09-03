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
  FormSelect
} from "shards-react";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import ChargesFixesTable from "./tables/ChargesFixesTable";

const styles = theme => ({
  root: {},
  addDelete: { marginTop: 20 },
  instructions: {
    marginTop: 40,
    marginBottom: 40
  }
});

class ChargesFixes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = () => {};

  render() {
    const {
      classes,
      addRowCharges,
      deleteRowCharges,
      handleOnChangeStepsCharges,
      handleOnChange,
      handleComplete,
      handleBack,
      steps
    } = this.props;
    const { chargesFixes, activeStep, personnelSelect } = this.props.state;

    return (
      <ValidatorForm
        ref="form"
        onSubmit={handleComplete}
        onError={errors => console.log(errors)}
      >
        <Row>
          <ChargesFixesTable
            chargesfixes={chargesFixes}
            handleOnChangeSteps={handleOnChangeStepsCharges}
          />
        </Row>
        <Row className={classes.addDelete}>
          <Col md="1">
            <Button onClick={addRowCharges}>Ajouter</Button>
          </Col>
          <Col md="1">
            <Button
              disabled={chargesFixes.length > 0 ? false : true}
              onClick={deleteRowCharges}
            >
              Supprimer
            </Button>
          </Col>
        </Row>
        <Row className={classes.instructions}>
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
            // onClick={handleSubmitBase}
            type="submit"
          >
            {activeStep === steps.length - 1 ? "Finir" : "Suivant"}
          </Button>
        </Row>
      </ValidatorForm>
    );
  }
}

export default withStyles(styles)(ChargesFixes);
