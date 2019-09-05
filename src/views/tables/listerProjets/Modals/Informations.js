import React from "react";

import { withStyles } from "@material-ui/core/styles";
import DoneeDeBasePreview from "../../../projects/Steps/tables/DoneeDeBasePreview";
import MaterielsPreview from "../../../projects/Steps/tables/MaterielsPreview";
import ProjectStepsPreview from "../../../projects/Steps/tables/ProjectStepsPreview";
import PersonnelsPreview from "../../../projects/Steps/tables/PersonnelsPreview";
import ChargesFixesTablePreview from "../../../projects/Steps/tables/ChargesFixesTablePreview";
import CoutsPreview from "../../../projects/Steps/tables/CoutsPreview";
import { Row } from "shards-react";
import fetchApi from "../../../../utils/fetchApi";
import Zoom from "@material-ui/core/Zoom";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import {} from "@material-ui/core";

class Informations extends React.Component {
  state = {
    nomPrenoms: [],
    showbase: true,
    showetape: true,
    showmateriel: true,
    showpersonnel: true,
    showchargefixe: true,
    showcharge: true
  };
  componentWillMount() {
    this.fetchNomPrenom();
  }
  getNameFromId = id => {
    const nomPrenoms = this.state.nomPrenoms;
    let name;
    nomPrenoms.map(nomPrenom => {
      if (nomPrenom.id === id) name = nomPrenom.nom;
      return true;
    });
    return name;
  };
  fetchNomPrenom = async () => {
    const nomPrenoms = await fetchApi({
      method: "GET",
      url: "/api/personnel/administratif/findNomPrenom",
      token: window.localStorage.getItem("token")
    });
    this.setState({ nomPrenoms });
  };
  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };
  render() {
    const { classes } = this.props;
    const { data } = this.props.data;
    const materiels = [];
    data[6].props.value.map(materiel => {
      materiels.push([
        materiel.materielId,
        materiel.materiel,
        materiel.quantite,
        materiel.type,
        materiel.etape
      ]);
    });
    const etapes = [];
    data[5].props.value.map(etape => {
      etapes.push({
        id: etape.etape,
        coutConsomable: parseInt(etape.coutConsomable),
        coutNonConsomable: parseInt(etape.coutNonConsomable),
        coutPermanent: parseInt(etape.coutPermanent),
        coutSaisonier: parseInt(etape.coutSaisonier),
        duree: parseInt(etape.duree),
        designation: etape.designation,
        responsable: this.getNameFromId(etape.responsable)
      });
    });

    const personnels = [];
    data[7].props.value.map(personnel => {
      personnels.push({
        personnelId: personnel.personnelId,
        cin: personnel.cin,
        nom: this.getNameFromId(personnel.personnelId),
        diplome: personnel.diplome,
        qualite: personnel.qualite,
        type: personnel.type,
        etape: personnel.etape
      });
    });
    const chargesFixes = [];
    data[8].props.value.map(chargeFixe => {
      chargesFixes.push({
        id: chargeFixe.num,
        note: chargeFixe.note,
        montant: chargeFixe.montant
      });
    });

    const value = data[9].props.value;
    const charges = {
      chargeconsomable: parseInt(value.chargeconsomable),
      chargefixe: parseInt(value.chargefixe),
      chargenonconsomable: parseInt(value.chargenonconsomable),
      chargepermanent: parseInt(value.chargepermanent),
      chargesaisonier: parseInt(value.chargesaisonier)
    };

    const {
      showbase,
      showetape,
      showpersonnel,
      showmateriel,
      showchargefixe,
      showcharge
    } = this.state;

    return (
      <div>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={showbase}
                onChange={this.handleChange("showbase")}
                value="showbase"
                color="primary"
              />
            }
            label="Données de base"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showetape}
                onChange={this.handleChange("showetape")}
                value="showetape"
                color="primary"
              />
            }
            label="Les étapes"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showpersonnel}
                onChange={this.handleChange("showpersonnel")}
                value="showpersonnel"
                color="primary"
              />
            }
            label="Personnels"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showmateriel}
                onChange={this.handleChange("showmateriel")}
                value="showmateriel"
                color="primary"
              />
            }
            label="Materiels"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showchargefixe}
                onChange={this.handleChange("showchargefixe")}
                value="showchargefixe"
                color="primary"
              />
            }
            label="Deponses fixes"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showcharge}
                onChange={this.handleChange("showcharge")}
                value="showcharge"
                color="primary"
              />
            }
            label="Les charges du projet"
          />
        </FormGroup>
        <Zoom in={showbase}>
          <Row>
            {showbase && (
              <DoneeDeBasePreview
                projet={data[1]}
                chefProjet={data[2]}
                date_debut={data[3]}
                date_fin={data[4]}
              />
            )}
          </Row>
        </Zoom>
        <Zoom in={showetape}>
          <Row>{showetape && <ProjectStepsPreview etapes={etapes} />}</Row>
        </Zoom>
        <Zoom in={showmateriel}>
          <Row>{showmateriel && <MaterielsPreview data={materiels} />}</Row>
        </Zoom>
        <Zoom in={showpersonnel}>
          <Row>
            {showpersonnel && <PersonnelsPreview personnels={personnels} />}
          </Row>
        </Zoom>
        <Zoom in={showchargefixe}>
          <Row>
            {showchargefixe && (
              <ChargesFixesTablePreview chargesFixes={chargesFixes} />
            )}
          </Row>
        </Zoom>
        <Zoom in={showcharge}>
          <Row>{showcharge && <CoutsPreview charges={charges} />}</Row>
        </Zoom>
      </div>
    );
  }
}

export default withStyles(null)(Informations);
