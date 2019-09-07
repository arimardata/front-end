import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import fetchApi from "../fetchApi";
import { Container, Row, Col } from "shards-react";

export default function CautionProvisoire({
  handleAgree,
  handleDisagree,
  dragend,
  aos
}) {
  const [cautionProvisoire, setCautionProvisoire] = React.useState("");
  const [bankCautionProvisoire, setBankCautionProvisoire] = React.useState("");
  const [
    periodeCautionProvisoire,
    setPeriodeCautionProvisoire
  ] = React.useState("");
  const [dateCautionProvisoire, setDateCautionProvisoire] = React.useState(
    "2019-01-01"
  );
  const ref = React.useRef("form");

  async function handleSubmit() {
    aos.map(ao => {
      if (ao.id === dragend.cardId) {
        ao.cautionProvisoire = cautionProvisoire;
        ao.bankCautionProvisoire = bankCautionProvisoire;
        ao.periodeCautionProvisoire = periodeCautionProvisoire;
        ao.dateCautionProvisoire = dateCautionProvisoire;
        ao.etat = "Postule";
      }
    });

    const data = await fetchApi({
      method: "POST",

      url: "/api/projects/AjouterCautionProvisoire/" + dragend.cardId,
      token: window.localStorage.getItem("token"),
      body: {
        cautionProvisoire,
        bankCautionProvisoire,
        periodeCautionProvisoire,
        dateCautionProvisoire
      }
    });
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
          <Container>
            <Row>
              <Col md="10">
                <TextValidator
                  label="La banque"
                  onChange={e => setBankCautionProvisoire(e.target.value)}
                  name="bankCautionProvisoire"
                  value={bankCautionProvisoire}
                  validators={["required"]}
                  errorMessages={["Champ obligatoire"]}
                  style={{ width: "100%", marginBottom: 10 }}
                />
              </Col>
            </Row>

            <Row>
              <Col md="10">
                <TextValidator
                  label="La caution provisoire "
                  onChange={e => setCautionProvisoire(e.target.value)}
                  name="cautionProvisoire"
                  value={cautionProvisoire}
                  validators={["required", "isFloat"]}
                  style={{ width: "100%", marginBottom: 10 }}
                  errorMessages={[
                    "Champ obligatoire",
                    "Ce champ doit étre un nombre"
                  ]}
                />
              </Col>
            </Row>
            <Row>
              <Col md="10">
                <TextValidator
                  label="La periode du caution (mois)"
                  onChange={e => setPeriodeCautionProvisoire(e.target.value)}
                  name="periodeCautionProvisoire"
                  value={periodeCautionProvisoire}
                  style={{ width: "100%", marginBottom: 10 }}
                  type="number"
                  validators={["required", "isFloat"]}
                  errorMessages={[
                    "Champ obligatoire",
                    "Ce champ doit étre un nombre"
                  ]}
                />
              </Col>
            </Row>
            <Row>
              <Col md="10">
                <TextValidator
                  label="La date"
                  onChange={e => setDateCautionProvisoire(e.target.value)}
                  name="dateCautionProvisoire"
                  value={dateCautionProvisoire}
                  style={{ width: "100%", marginBottom: 10 }}
                  type="date"
                  validators={["required"]}
                  errorMessages={["Champ obligatoire"]}
                />
              </Col>
            </Row>
          </Container>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree} color="primary">
          Annuler
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Confirmer
        </Button>
      </DialogActions>
    </ValidatorForm>
  );
}
