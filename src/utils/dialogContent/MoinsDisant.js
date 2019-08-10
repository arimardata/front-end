import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Container, Row } from "shards-react";
// import Col from "@material-ui/core/Col";
import DialogContentText from "@material-ui/core/DialogContentText";
import fetchApi from "../fetchApi";

export default function MoinsDisant({
  handleAgree,
  handleDisagree,
  dragend,
  aos
}) {
  const [moinsDisant, setMoinsDisant] = React.useState("");
  const [montant, setMontant] = React.useState("");
  const ref = React.useRef("form");

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "moinsDisant":
        setMoinsDisant(value);
        break;
      case "montant":
        setMontant(value);
        break;
      default:
        break;
    }
  }

  function handleSubmit() {
    aos.map(ao => {
      if (ao.id === dragend.cardId) {
        ao.moinsDisant = moinsDisant;
        ao.montant = montant;
        ao.etat = "Archive Des Projets Non-Accepte";
      }
    });
    fetchApi({
      method: "POST",

      url: "/api/projects/moinsDisant/" + dragend.cardId,
      token: window.localStorage.getItem("token"),
      body: { moinsDisant, montant }
    }).then(data => console.log(data));
    handleAgree();
  }
  return (
    <ValidatorForm
      ref={ref}
      onSubmit={handleSubmit}
      onError={errors => console.log(errors)}
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Container fluid className="main-content-container px-4">
            <Row>
              <TextValidator
                label="Le moins-disant"
                onChange={handleChange}
                name="moinsDisant"
                value={moinsDisant}
                validators={["required"]}
                errorMessages={["Champ obligatoire"]}
              />
            </Row>
            <Row>
              <TextValidator
                label="Le montant"
                onChange={handleChange}
                name="montant"
                value={montant}
                validators={["required", "isFloat"]}
                errorMessages={[
                  "Champ obligatoire",
                  "Ce champ doit étre un nombre"
                ]}
              />
            </Row>
          </Container>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree} color="primary">
          Annuler
        </Button>
        <Button type="submit" color="primary">
          Confirmer
        </Button>
      </DialogActions>
    </ValidatorForm>
  );
}
