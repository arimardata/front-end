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
    tousmateriels: [],
    quantite: 1,
    etapes: [
      {
        id: 1,
        designation: "",
        duree: 0,
        responsable: "",
        coutConsomable: 0,
        coutNonConsomable: 0,
        coutPermanent: 0,
        coutSaisonier: 0
      }
    ],
    chargesFixes: [{ id: 1, note: "", montant: 0 }],
    date_debut: "2019-01-01",
    date_fin: "2019-12-31",
    etape: 1,
    loading: false
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
            handleOnChange={this.handleOnChange}
          />
        );
      case 3:
        return (
          <ChargesFixes
            handleBack={this.handleBack}
            steps={steps}
            state={this.state}
            addRowCharges={this.addRowCharges}
            deleteRowCharges={this.deleteRowCharges}
            personnelsConstructor={this.validate}
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

  affecterPersonnelFromSteps = (id, etape) => {
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
          type: personnel[5],
          etape: etape
        };
      }
      return true;
    });
    return Personnel;
  };

  validate = () => {
    const chefDuProjet = this.getResponsableId(this.state.chefProjet);
    const personnels = [];

    // //chef du projet
    // personnels.push(this.affecterPersonnelFromSteps(chefDuProjet, 1));

    const steps = this.state.etapes;

    let dejaexist = [];
    // steps.map(step => {
    //   dejaexist = personnels.filter(p => {
    //     return (
    //       p.personnelId === this.getResponsableId(step.responsable) &&
    //       p.etape === step.id
    //     );
    //   });
    //   if (dejaexist.length === 0) {
    //     personnels.push(
    //       this.affecterPersonnelFromSteps(
    //         this.getResponsableId(step.responsable),
    //         step.id
    //       )
    //     );
    //   }
    // });

    const personnelAffecter = this.state.personnelAffecter;

    personnelAffecter.map(personnel => {
      dejaexist = personnels.filter(p => {
        return p.personnelId === personnel[0] && p.etape === personnel[6];
      });
      if (dejaexist.length === 0) {
        personnels.push({
          personnelId: personnel[0],
          cin: personnel[1],
          nom: this.getNameFromId(personnel[0]),
          diplome: personnel[3],
          qualite: personnel[4],
          type: personnel[5],
          etape: personnel[6]
        });
      }
    });

    this.setState({ personnelConstructor: personnels });

    this.handleCout();
    this.calculateCharges();

    this.handleComplete();
  };

  calculateCharges = () => {
    const { chargesFixes, etapes } = this.state;
    let chargefixe = 0;
    let chargepermanent = 0;
    let chargesaisonier = 0;
    let chargeconsomable = 0;
    let chargenonconsomable = 0;
    chargesFixes.map(chargeFixe => {
      chargefixe += parseInt(chargeFixe.montant);
    });
    etapes.map(etape => {
      chargepermanent += parseInt(etape.coutPermanent);
      chargesaisonier += parseInt(etape.coutSaisonier);
      chargeconsomable += parseInt(etape.coutConsomable);
      chargenonconsomable += parseInt(etape.coutNonConsomable);
    });

    const charges = {
      chargepermanent,
      chargesaisonier,
      chargeconsomable,
      chargenonconsomable,
      chargefixe
    };
    this.setState({ charges });
  };

  handleCout = () => {
    const etapes = this.state.etapes;
    const materielsAffecter = this.state.data;
    const personnelAffecter = this.state.personnelConstructor;

    etapes.map(etape => {
      let coutConsomable = 0;
      let coutNonConsomable = 0;
      let coutPermanent = 0;
      let coutSaisonier = 0;

      // materiels
      materielsAffecter.map(materiel => {
        let quantite = parseInt(materiel[2]);
        if (materiel[4] === etape.id) {
          if (materiel[3] === "Consommable") {
            coutConsomable +=
              this.getPrixUniteConsomable(materiel[0]) * quantite;
          } else if (materiel[3] === "Non consommable") {
            coutNonConsomable +=
              this.getPrixUniteNonConsomable(materiel[0]) *
              quantite *
              8 *
              6 *
              parseInt(etape.duree); // 8 heures par semains et 6 jours par semains
          }
        }
      });
      etape.coutConsomable = coutConsomable;
      etape.coutNonConsomable = coutNonConsomable;

      // personnels
      personnelAffecter.map(personnel => {
        if (personnel.etape === etape.id) {
          if (personnel.type === "Permanent") {
            coutPermanent +=
              (parseInt(etape.duree) *
                this.getSalairePermanent(personnel.personnelId)) /
              4;
          } else if (personnel.type === "Saisonier") {
            coutSaisonier +=
              parseInt(etape.duree) *
              this.getCoutParJourSaisonier(personnel.personnelId) *
              7;
          }
        }
      });
      etape.coutPermanent = coutPermanent;
      etape.coutSaisonier = coutSaisonier;
    });
    this.setState({ etapes });
  };

  getPrixUniteConsomable = id => {
    const consomables = this.state.tousmateriels.consomable;
    let prix_unite;
    consomables.map(consomable => {
      if (consomable.id === id) prix_unite = consomable.prix_unite;
    });
    return parseInt(prix_unite);
  };

  getPrixUniteNonConsomable = id => {
    const nonconsomables = this.state.tousmateriels.nonconsomable;
    let cout_par_heure;
    nonconsomables.map(nonconsomable => {
      if (nonconsomable.id === id)
        cout_par_heure = nonconsomable.cout_par_heure;
    });
    return parseInt(cout_par_heure);
  };

  getSalairePermanent = id => {
    const permanents = this.state.lespersonnels.permanents;
    let salaire;
    permanents.map(permanent => {
      if (permanent.id === id) salaire = permanent.salaire;
    });
    return parseInt(salaire);
  };

  getCoutParJourSaisonier = id => {
    const saisoniers = this.state.lespersonnels.saisoniers;
    let coutParJour;
    saisoniers.map(saisonier => {
      if (saisonier.id === id) coutParJour = saisonier.coutParJour;
    });
    return parseInt(coutParJour);
  };
  handleCreate = () => {
    this.setState({ loading: true });
    const numAo = this.state.projet;
    const chefDuProjet = this.getResponsableId(this.state.chefProjet);
    const dateDebut = this.state.date_debut;
    const dateFin = this.state.date_fin;
    const steps = this.state.etapes;
    const charges = this.state.charges;
    const chargesfixes = this.state.chargesFixes;

    let etapes = [];
    let chargesFixes = [];

    let i = 1;

    steps.map(step => {
      etapes.push({
        etape: i,
        designation: step.designation,
        duree: step.duree,
        responsable: this.getResponsableId(step.responsable),
        coutConsomable: step.coutConsomable,
        coutNonConsomable: step.coutNonConsomable,
        coutPermanent: step.coutPermanent,
        coutSaisonier: step.coutSaisonier,
        done: false
      });

      i++;
    });

    chargesfixes.map(chargefixe => {
      chargesFixes.push({
        num: chargefixe.id,
        note: chargefixe.note,
        montant: chargefixe.montant
      });
    });

    const materielAffecter = this.state.data;

    const materiels = [];
    materielAffecter.map(materiel => {
      materiels.push({
        materielId: materiel[0],
        materiel: materiel[1],
        quantite: materiel[2],
        type: materiel[3],
        etape: materiel[4]
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
      materiels,
      chargesFixes,
      charges
    };
    fetchApi({
      url: `/api/projets/ajouter`,
      body: data,
      method: "POST",
      token: window.localStorage.getItem("token")
    })
      .then(data => {
        this.handleComplete();
        this.setState({ loading: false });
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
      const etape = this.state.etape;

      //soustract the quantity added to the right table
      materiels.map(materiel => {
        if (materiel[0] === selectedRow[0]) {
          if (parseInt(selectedRow[2]) > parseInt(materiel[2]))
            selectedRow[2] = materiel[2];
          materiel[2] = parseInt(materiel[2]) - parseInt(selectedRow[2]);
        }
      });

      // check if the materiel already exist in the right table
      const materiel = data.filter(
        materiel => materiel[0] === selectedRow[0] && materiel[4] === etape
      );
      if (materiel.length === 1) {
        data.map(materiel => {
          if (materiel[0] === selectedRow[0] && materiel[4] === etape) {
            materiel[2] = parseInt(materiel[2]) + parseInt(selectedRow[2]);
          }
        });
      } else {
        //if not add the whole row
        selectedRow[4] = etape;
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
      const etape = this.state.etape;

      personnels.map((personnel, index) => {
        if (personnel[0] === selectedRow[0]) {
          personnels.splice(index, 1);
        }
      });
      selectedRow[6] = etape;
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
      consomables.push([elmnt.id, elmnt.id_mat, elmnt.quantite, "Consommable"])
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
        "Non consommable"
      ])
    );
    this.setState({
      materiels: [...consomables, ...nonconsomables],
      tousmateriels: {
        consomable: [...consomable],
        nonconsomable: [...nonconsomable]
      }
    });
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
      ],
      lespersonnels: {
        permanents: [...permanent],
        saisoniers: [...saisonier]
      }
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
