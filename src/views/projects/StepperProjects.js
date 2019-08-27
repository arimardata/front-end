import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { Container } from "shards-react";
import Base from "./Steps/Base";
import Materiels from "./Steps/Materiels";
import { Store } from "../../flux";
import fetchApi from "../../utils/fetchApi";

const styles = theme => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(1)
  },
  button: {
    marginRight: theme.spacing(1)
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: 40
  },
  stepItem: {
    whiteSpace: "inherit"
  }
});

function getSteps() {
  return ["Données de base", "Matériels", "Ressources humains"];
}

class StepperProjects extends React.Component {
  state = {
    activeStep: 0,
    completed: {},
    data: [],
    quantite: 1,
    etapes: [{ id: 1, designation: "", duree: 0, responsable: "" }]
  };

  totalSteps = () => getSteps().length;
  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Base
            state={this.state}
            addRow={this.addRow}
            deleteRow={this.deleteRow}
            handleOnChangeSteps={this.handleOnChangeSteps}
            handleOnChange={this.handleOnChange}
          />
        );
      case 1:
        return (
          <Materiels
            state={this.state}
            handleClickForward={this.handleClickForward}
            handleClickRewind={this.handleClickRewind}
            handleOnChange={this.handleOnChange}
          />
        );
      case 2:
        return "Step 3: This is the bit I really care about!";
      default:
        return "Unknown step";
    }
  };

  handleClickForward = () => {
    const selectedRow = Store.getMaterielSelectedRow();
    if (selectedRow.length > 0) {
      selectedRow[2] = this.state.quantite;
      const data = this.state.data;
      const materiels = this.state.materiels;

      //soustract the quantity added to the right table
      materiels.map(materiel => {
        if (materiel[0] === selectedRow[0]) {
          if (parseInt(selectedRow[2]) > parseInt(materiel[2]))
            selectedRow[2] = materiel[2];
          materiel[2] = parseInt(materiel[2]) - parseInt(selectedRow[2]);
        }
      });

      // check if the materiel already exist in the right table
      const materiel = data.filter(materiel => materiel[0] === selectedRow[0]);
      if (materiel.length === 1) {
        data.map(materiel => {
          if (materiel[0] === selectedRow[0]) {
            materiel[2] = parseInt(materiel[2]) + parseInt(selectedRow[2]);
          }
        });
      } else {
        //if not add the whole row
        data.push(selectedRow);
      }

      this.setState({ data });
      Store.setMaterielSelectedRow([]);
    }
  };
  handleClickRewind = () => {
    const selectedRow = Store.getMaterielSelectedRowRewind();
    if (selectedRow.length > 0) {
      selectedRow[2] =
        parseInt(this.state.quantite) > parseInt(selectedRow[2])
          ? selectedRow[2]
          : this.state.quantite;
      const data = this.state.data;
      const materiels = this.state.materiels;

      data.map((materiel, index) => {
        if (materiel[0] === selectedRow[0]) {
          materiel[2] = parseInt(materiel[2]) - parseInt(selectedRow[2]);
          if (parseInt(materiel[2]) === 0) {
            data.splice(index, 1);
          }
        }
      });

      materiels.map(materiel => {
        if (materiel[0] === selectedRow[0]) {
          materiel[2] = parseInt(materiel[2]) + parseInt(selectedRow[2]);
        }
      });

      this.setState({ data });
      Store.setMaterielSelectedRow([]);
    }
  };
  fetchMateriels = async () => {
    const consomable = await fetchApi({
      method: "GET",
      url: "/api/stock/consomable/find",
      token: window.localStorage.getItem("token")
    });
    let consomables = [];
    consomable.map(elmnt =>
      consomables.push([elmnt.id, elmnt.id_mat, elmnt.quantite, "Consomable"])
    );

    const nonconsomable = await fetchApi({
      method: "GET",
      url: "/api/stock/nonconsomable/find",
      token: window.localStorage.getItem("token")
    });
    let nonconsomables = [];
    nonconsomable.map(elmnt =>
      nonconsomables.push([
        elmnt.id,
        elmnt.id_mat,
        elmnt.quantite,
        "Non consomable"
      ])
    );
    console.log("fetched");
    this.setState({ materiels: [...consomables, ...nonconsomables] });
  };

  async componentWillMount() {
    this.fetchMateriels();
  }

  handleOnChange = e => {
    const { name, value } = e.target;
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

  addRow = () => {
    const size = this.state.etapes.length + 1;
    let etapes = this.state.etapes;
    etapes.push({
      id: size,
      designation: "",
      duree: 0,
      responsable: ""
    });
    this.setState({ etapes });
  };

  deleteRow = () => {
    const size = this.state.etapes.length + 1;

    let etapes = this.state.etapes;
    etapes.pop();
    this.setState({ etapes });
  };

  handleNext = () => {
    const { completed, activeStep } = this.state;
    let activeStepLet;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getSteps();
      activeStepLet = steps.findIndex((step, i) => !(i in completed));
    } else {
      activeStepLet = activeStep + 1;
    }
    this.setState({
      activeStep: activeStepLet
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step
    });
  };

  handleComplete = () => {
    const { completed, activeStep } = this.state;
    completed[activeStep] = true;
    this.setState({
      completed
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {}
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }

  completedSteps() {
    const { completed } = this.state;
    return Object.keys(completed).length;
  }

  isLastStep() {
    const { activeStep } = this.state;
    return activeStep === this.totalSteps() - 1;
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, completed } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        <div className={classes.root}>
          <Stepper nonLinear activeStep={activeStep} alternativeLabel={true}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton
                  className={classes.stepItem}
                  onClick={this.handleStep(index)}
                  completed={completed[index]}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <Divider />
          <div>
            {this.allStepsCompleted() ? (
              <div>
                <Typography className={classes.instructions}>
                  Tous les étapes sont finis
                </Typography>
                <Button onClick={this.handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {this.getStepContent(activeStep)}
                </Typography>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Precedent
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    Suivant
                  </Button>
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography
                        variant="caption"
                        className={classes.completed}
                      >
                        Step&nbsp;
                        {activeStep + 1}
                        &nbsp;Déja complet
                      </Typography>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleComplete}
                      >
                        {this.completedSteps() === this.totalSteps() - 1
                          ? "Finir"
                          : "Finir L'Etape"}
                      </Button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    );
  }
}

StepperProjects.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StepperProjects);
