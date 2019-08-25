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

const styles = theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  stepItem: {
    whiteSpace: "inherit"
  }
});

function getSteps() {
  return ["Données de base", "Matériels", "Ressources humains"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Base />;
    case 1:
      return "Step 2: What is an ad group anyways?";
    case 2:
      return "Step 3: This is the bit I really care about!";
    default:
      return "Unknown step";
  }
}

class StepperProjects extends React.Component {
  state = {
    activeStep: 0,
    completed: {}
  };

  totalSteps = () => getSteps().length;

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
                  {getStepContent(activeStep)}
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
