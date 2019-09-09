import React from "react";
import { withStyles } from "@material-ui/core";
import { Container, Row, Col } from "shards-react";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

import ProjectStepsPreview from "./tables/ProjectStepsPreview";
import PersonnelsPreview from "./tables/PersonnelsPreview";
import MaterielsPreview from "./tables/MaterielsPreview";
import DoneeDeBasePreview from "./tables/DoneeDeBasePreview";
import ChargesFixesTablePreview from "./tables/ChargesFixesTablePreview";
import CoutsPreview from "./tables/CoutsPreview";

import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  root: {},
  instructions: {
    marginTop: 40,
    marginBottom: 40
  }
});

class Validation extends React.Component {
  render() {
    const {
      etapes,
      projet,
      date_debut,
      date_fin,
      activeStep,
      data,
      personnelConstructor,
      chefProjet,
      charges,
      chargesFixes,
      loading
    } = this.props.state;
    const { classes, handleCreate, handleBack, steps } = this.props;
    return (
      <Container fluid className="main-con tent-container px-4">
        <Row>
          <DoneeDeBasePreview
            date_debut={date_debut}
            projet={projet}
            date_fin={date_fin}
            chefProjet={chefProjet}
          />
        </Row>
        <Row>
          <ProjectStepsPreview etapes={etapes} />
        </Row>
        <Row>
          <MaterielsPreview data={data} />
        </Row>
        <Row>
          <PersonnelsPreview personnels={personnelConstructor} />
        </Row>
        <Row>
          <ChargesFixesTablePreview chargesFixes={chargesFixes} />
        </Row>
        <Row>
          <CoutsPreview charges={charges} />
        </Row>

        <Row className={classes.instructions}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            disabled={loading}
            // className={classes.backButton}
          >
            Précedent
          </Button>
          <Button
            variant="contained"
            disabled={loading}
            color="primary"
            onClick={handleCreate}
          >
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}{" "}
            {activeStep === steps.length - 1 ? "Finir" : "Suivant"}
          </Button>
        </Row>
      </Container>
    );
  }
}

export default withStyles(styles)(Validation);
