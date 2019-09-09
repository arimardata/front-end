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
        <Row form>
          <Col md="5" className="form-group">
            <SelectValidator
              label="Appel d'offre"
              style={{ width: "100%" }}
              value={projet}
              onChange={handleOnChange}
              name="projet"
              validators={["required"]}
              errorMessages={["Ce champ est obligatoire : "]}
            >
              {aos.map(ao => (
                <MenuItem value={ao}>{ao}</MenuItem>
              ))}
            </SelectValidator>
          </Col>
        </Row>
        <Row form>
          <Col md="5" className="form-group">
            <SelectValidator
              style={{ width: "100%" }}
              label="Chef du projet"
              onChange={handleOnChange}
              style={{ width: "100%" }}
              name="chefProjet"
              value={chefProjet}
              validators={["required"]}
              errorMessages={["Ce champ est obligatoire : "]}
            >
              {personnelSelect &&
                personnelSelect.map(personnel => (
                  <MenuItem value={personnel[1]}>{personnel[1]}</MenuItem>
                ))}
            </SelectValidator>
          </Col>
        </Row>
        <Row form>
          <Col md="5" className="form-group">
            <TextValidator
              label="Date début"
              type="date"
              onChange={handleOnChange}
              style={{ width: "100%" }}
              name="date_debut"
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
              onChange={handleOnChange}
              style={{ width: "100%" }}
              name="date_fin"
              defaultValue="2019-12-31"
              value={date_fin}
              validators={["required"]}
              errorMessages={["Ce champ est obligatoire : "]}
            />
          </Col>
        </Row>
        <Row>
          <ProjectSteps
            etapes={etapes}
            personnelSelect={personnelSelect}
            handleOnChangeSteps={handleOnChangeSteps}
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
