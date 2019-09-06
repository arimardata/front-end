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
import ProjectSteps from "./tables/ProjectSteps";
import DonneeDeBasePreview from "./tables/DoneeDeBasePreview";

const styles = theme => ({
  root: {},
  addDelete: { marginTop: 20 },
  instructions: {
    marginTop: 40,
    marginBottom: 40
  }
});

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = () => {};

  render() {
    const {
      classes,
      addRow,
      deleteRow,
      handleOnChangeSteps,
      handleOnChangeStepsSwitch,
      handleOnChange,
      handleComplete,
      handleBack,
      steps
    } = this.props;
    const {
      etapes,
      projet,
      date_debut,
      date_fin,
      activeStep,
      aos,
      personnelSelect,
      chefProjet
    } = this.props.state;

    return (
      <ValidatorForm
        ref="form"
        onSubmit={handleComplete}
        onError={errors => console.log(errors)}
      >
        <Row>
          <DonneeDeBasePreview
            date_debut={date_debut}
            projet={projet}
            date_fin={date_fin}
            chefProjet={chefProjet}
          />
        </Row>
        <Row>
          <ProjectSteps
            etapes={etapes}
            personnelSelect={personnelSelect}
            handleOnChangeSteps={handleOnChangeSteps}
            handleOnChangeStepsSwitch={handleOnChangeStepsSwitch}
          />
        </Row>
        <Row className={classes.addDelete}>
          <Col md="1">
            <Button onClick={addRow}>Ajouter</Button>
          </Col>
          <Col md="1">
            <Button
              disabled={etapes.length > 1 ? false : true}
              onClick={deleteRow}
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

export default withStyles(styles)(Base);
