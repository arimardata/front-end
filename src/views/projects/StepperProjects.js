import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { Container } from "shards-react";
import Base from "./Steps/Base";
import Materiels from "./Steps/Materiels";
import RH from "./Steps/RH";
import Validation from "./Steps/Validation";
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
  stepItem: {
    whiteSpace: "inherit"
  },
  instructions: {
    marginTop: 40,
    marginBottom: 40
  }
});

function getSteps() {
  return [
    "Données de base",
    "Matériels",
    "Ressources humains",
    "Validation du projet"
  ];
}

class StepperProjects extends React.Component {
  state = {
    activeStep: 0,
    completed: {},
    data: [],
    personnelAffecter: [],
    quantite: 1,
    etapes: [{ id: 1, designation: "", duree: 0, responsable: "" }],
    date_debut: "2019-01-01",
    date_fin: "2019-12-31"
  };

  totalSteps = () => getSteps().length;
  getStepContent = step => {
    const steps = getSteps();
    switch (step) {
      case 0:
        return (
          <Base
            handleComplete={this.handleComplete}
            handleBack={this.handleBack}
            steps={steps}
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
            handleComplete={this.handleComplete}
            handleBack={this.handleBack}
            steps={steps}
            state={this.state}
            handleClickForward={this.handleClickForward}
            handleClickRewind={this.handleClickRewind}
            handleOnChange={this.handleOnChange}
          />
        );
      case 2:
        return (
          <RH
            handleComplete={this.handleComplete}
            handleBack={this.handleBack}
            steps={steps}
            state={this.state}
            handleClickForward={this.handleClickForwardRH}
            handleClickRewind={this.handleClickRewindRH}
          />
        );
      case 3:
        return (
          <Validation
            handleComplete={this.handleComplete}
            handleBack={this.handleBack}
            steps={steps}
            state={this.state}
          />
        );
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
  handleClickForwardRH = () => {
    const selectedRow = Store.getRHSelectedRow();
    if (selectedRow.length > 0) {
      const personnelAffecter = this.state.personnelAffecter;
      const personnels = this.state.personnels;

      personnels.map((personnel, index) => {
        if (personnel[0] === selectedRow[0]) {
          personnels.splice(index, 1);
        }
      });

      personnelAffecter.push(selectedRow);

      this.setState({ personnelAffecter });
      Store.setRHSelectedRow([]);
    }
  };
  handleClickRewindRH = () => {
    const selectedRow = Store.getRHSelectedRowRewind();
    if (selectedRow.length > 0) {
      const personnelAffecter = this.state.personnelAffecter;
      const personnels = this.state.personnels;

      personnelAffecter.map((personnel, index) => {
        if (personnel[0] === selectedRow[0]) {
          personnelAffecter.splice(index, 1);
        }
      });

      personnels.push(selectedRow);

      this.setState({ personnelAffecter });
      Store.getRHSelectedRowRewind([]);
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
    this.setState({ materiels: [...consomables, ...nonconsomables] });
  };

  fetchPersonnels = async () => {
    const administratif = await fetchApi({
      method: "GET",
      url: "/api/personnel/administratif/find",
      token: window.localStorage.getItem("token")
    });
    let administratifs = [];
    administratif.map(elmnt =>
      administratifs.push([
        elmnt.id,
        elmnt.cin,
        elmnt.diplome,
        elmnt.qualite,
        "Administratif"
      ])
    );

    const permanent = await fetchApi({
      method: "GET",
      url: "/api/personnel/permanent/find",
      token: window.localStorage.getItem("token")
    });
    let permanents = [];
    permanent.map(elmnt =>
      permanents.push([
        elmnt.id,
        elmnt.cin,
        elmnt.diplome,
        elmnt.qualite,
        "Permanent"
      ])
    );

    const saisonier = await fetchApi({
      method: "GET",
      url: "/api/personnel/saisonier/find",
      token: window.localStorage.getItem("token")
    });
    let saisoniers = [];
    saisonier.map(elmnt =>
      saisoniers.push([
        elmnt.id,
        elmnt.cin,
        elmnt.diplome,
        elmnt.qualite,
        "Saisonier"
      ])
    );

    this.setState({
      personnels: [...administratifs, ...permanents, ...saisoniers]
    });
  };

  async componentWillMount() {
    this.fetchMateriels();
    this.fetchPersonnels();
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

    this.setState({
      activeStep: activeStep + 1
    });
  };

  handleBack = () => {
    const { completed, activeStep } = this.state;
    completed[activeStep - 1] = false;
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
      completed: {},
      projet: "",
      date_debut: "2019-01-01",
      date_fin: "2019-12-31",
      data: [],
      personnelAffecter: [],
      quantite: 1,
      etapes: [{ id: 1, designation: "", duree: 0, responsable: "" }]
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
                <StepLabel
                  className={classes.stepItem}
                  completed={completed[index]}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <Divider />
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography variant="h5" className={classes.instructions}>
                  Projet créer avec succes
                </Typography>
                <div className={classes.instructions}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleReset}
                  >
                    Créer un nouveau projet
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {this.getStepContent(activeStep)}
                </Typography>
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
