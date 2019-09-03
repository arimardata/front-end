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
import ChargesFixes from "./Steps/ChargesFixes";
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
    "Charges fixes",
    "Validation du projet"
  ];
}

class StepperProjects extends React.Component {
  state = {
    activeStep: 0,
    completed: {},
    data: [],
    aos: [],
    personnelAffecter: [],
    personnelSelect: [],
    quantite: 1,
    etapes: [{ id: 1, designation: "", duree: 0, responsable: "" }],
    chargesFixes: [{ id: 1, note: "", montant: 0 }],
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
            personnelsConstructor={this.personnelsConstructor}
          />
        );
      case 3:
        return (
          <ChargesFixes
            handleComplete={this.handleComplete}
            handleBack={this.handleBack}
            steps={steps}
            state={this.state}
            addRowCharges={this.addRowCharges}
            deleteRowCharges={this.deleteRowCharges}
            handleOnChangeStepsCharges={this.handleOnChangeStepsCharges}
          />
        );
      case 4:
        return (
          <Validation
            handleCreate={this.handleCreate}
            handleBack={this.handleBack}
            steps={steps}
            state={this.state}
          />
        );
      default:
        return "Unknown step";
    }
  };

  getResponsableId = name => {
    const personnelSelect = this.state.personnelSelect;
    let id;
    personnelSelect.map(personne => {
      if (personne[1] === name) id = personne[0];
      return true;
    });
    return id;
  };

  getNameFromId = id => {
    const personnelSelect = this.state.personnelSelect;
    let name;
    personnelSelect.map(personne => {
      if (personne[0] === id) name = personne[1];
      return true;
    });
    return name;
  };

  affecterPersonnelFromSteps = id => {
    const personnels = this.state.touspersonnels;
    let Personnel = {};
    personnels.map(personnel => {
      if (personnel[0] === id) {
        Personnel = {
          personnelId: personnel[0],
          cin: personnel[1],
          nom: this.getNameFromId(id),
          diplome: personnel[3],
          qualite: personnel[4],
          type: personnel[5]
        };
      }
      return true;
    });
    return Personnel;
  };

  personnelsConstructor = () => {
    const chefDuProjet = this.getResponsableId(this.state.chefProjet);
    const personnels = [];
    //chef du projet
    personnels.push(this.affecterPersonnelFromSteps(chefDuProjet));

    const steps = this.state.etapes;

    let dejaexist = [];
    steps.map(step => {
      dejaexist = personnels.filter(p => {
        return p.personnelId === this.getResponsableId(step.responsable);
      });
      if (dejaexist.length === 0) {
        personnels.push(
          this.affecterPersonnelFromSteps(
            this.getResponsableId(step.responsable)
          )
        );
      }
    });

    const personnelAffecter = this.state.personnelAffecter;

    personnelAffecter.map(personnel => {
      dejaexist = personnels.filter(p => {
        return p.personnelId === personnel[0];
      });
      if (dejaexist.length === 0) {
        personnels.push({
          personnelId: personnel[0],
          cin: personnel[1],
          nom: this.getNameFromId(personnel[0]),
          diplome: personnel[3],
          qualite: personnel[4],
          type: personnel[5]
        });
      }
    });
    this.handleComplete();
    this.setState({ personnelConstructor: personnels });
  };

  handleCreate = () => {
    const numAo = this.state.projet;
    const chefDuProjet = this.getResponsableId(this.state.chefProjet);
    const dateDebut = this.state.date_debut;
    const dateFin = this.state.date_fin;
    const steps = this.state.etapes;
    let etapes = [];

    let i = 1;

    steps.map(step => {
      etapes.push({
        etape: i,
        designation: step.designation,
        duree: step.duree,
        responsable: this.getResponsableId(step.responsable)
      });

      i++;
    });

    const materielAffecter = this.state.data;

    const materiels = [];
    materielAffecter.map(materiel => {
      materiels.push({
        materielId: materiel[0],
        materiel: materiel[1],
        quantite: materiel[2],
        type: materiel[3]
      });
    });

    const personnels = this.state.personnelConstructor;
    const data = {
      numAo,
      chefDuProjet,
      dateDebut,
      dateFin,
      etapes,
      personnels,
      materiels
    };

    fetchApi({
      url: `/api/projets/ajouter`,
      body: data,
      method: "POST",
      token: window.localStorage.getItem("token")
    })
      .then(data => {
        this.handleComplete();
      })
      .catch(err => {
        this.setState({ error: "Erreur de connexion" });
      });
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
    let administratifSelect = [];
    administratif.map(elmnt => {
      let nom = elmnt.nom + " " + elmnt.prenom;
      administratifs.push([
        elmnt.id,
        elmnt.cin,
        nom,
        elmnt.diplome,
        elmnt.qualite,
        "Administratif"
      ]);

      administratifSelect.push([elmnt.id, nom]);
    });

    const permanent = await fetchApi({
      method: "GET",
      url: "/api/personnel/permanent/find",
      token: window.localStorage.getItem("token")
    });
    let permanents = [];
    let permanentSelect = [];
    permanent.map(elmnt => {
      if (elmnt.disponible) {
        let nom = elmnt.nom + " " + elmnt.prenom;
        permanents.push([
          elmnt.id,
          elmnt.cin,
          nom,
          elmnt.diplome,
          elmnt.qualite,
          "Permanent"
        ]);

        permanentSelect.push([elmnt.id, nom]);
      }
      return true;
    });

    const saisonier = await fetchApi({
      method: "GET",
      url: "/api/personnel/saisonier/find",
      token: window.localStorage.getItem("token")
    });
    let saisoniers = [];
    let saisonierSelect = [];
    saisonier.map(elmnt => {
      if (elmnt.disponible) {
        let nom = elmnt.nom + " " + elmnt.prenom;
        saisoniers.push([
          elmnt.id,
          elmnt.cin,
          nom,
          elmnt.diplome,
          elmnt.qualite,
          "Saisonier"
        ]);

        saisonierSelect.push([elmnt.id, nom]);
      }
      return true;
    });
    this.setState({
      personnels: [...administratifs, ...permanents, ...saisoniers],
      touspersonnels: [...administratifs, ...permanents, ...saisoniers],
      personnelSelect: [
        ...administratifSelect,
        ...permanentSelect,
        ...saisonierSelect
      ]
    });
  };

  async componentWillMount() {
    this.fetchMateriels();
    this.fetchPersonnels();
    this.fetchAosRetenu();
  }

  fetchAosRetenu = async () => {
    const aos = await fetchApi({
      method: "GET",
      url: "/api/projects/findByetat/Retenu",
      token: window.localStorage.getItem("token")
    });
    this.setState({ aos });
  };

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
      return true;
    });
    this.setState({ etapes });
  };
  handleOnChangeStepsCharges = id => e => {
    const { name, value } = e.target;
    const { chargesFixes } = this.state;
    chargesFixes.map(chargesFixe => {
      if (chargesFixe.id === id) {
        chargesFixe[name] = value;
      }
      return true;
    });
    this.setState({ chargesFixes });
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
    let etapes = this.state.etapes;
    etapes.pop();
    this.setState({ etapes });
  };
  addRowCharges = () => {
    const size = this.state.chargesFixes.length + 1;
    let chargesFixes = this.state.chargesFixes;
    chargesFixes.push({
      id: size,
      designation: "",
      duree: 0,
      responsable: ""
    });
    this.setState({ chargesFixes });
  };

  deleteRowCharges = () => {
    let chargesFixes = this.state.chargesFixes;
    chargesFixes.pop();
    this.setState({ chargesFixes });
  };

  handleNext = () => {
    const { activeStep } = this.state;

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
