import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import fetchApi from "../fetchApi";
import { Container, Row, Col } from "shards-react";

import CircularProgress from "@material-ui/core/CircularProgress";

export default function CautionFinal({
  handleAgree,
  handleDisagree,
  dragend,
  aos,
  loading
}) {
  const [cautionFinal, setCautionFinal] = React.useState("");
  const [bankCautionFinal, setBankCautionFinal] = React.useState("");
  const [periodeCautionFinal, setPeriodeCautionFinal] = React.useState("");
  const [dateCautionFinal, setDateCautionFinal] = React.useState("2019-01-01");
  const ref = React.useRef("form");

  async function handleSubmit() {
    aos.map(ao => {
      if (ao.id === dragend.cardId) {
        ao.cautionFinal = cautionFinal;
        ao.bankCautionFinal = bankCautionFinal;
        ao.periodeCautionFinal = periodeCautionFinal;
        ao.dateCautionFinal = dateCautionFinal;
        ao.etat = "Retenu";
      }
    });

    const data = await fetchApi({
      method: "POST",

      url: "/api/projects/AjouterCautionFinal/" + dragend.cardId,
      token: window.localStorage.getItem("token"),
      body: {
        cautionFinal,
        bankCautionFinal,
        periodeCautionFinal,
        dateCautionFinal
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
                  onChange={e => setBankCautionFinal(e.target.value)}
                  name="bankCautionFinal"
                  value={bankCautionFinal}
                  validators={["required"]}
                  errorMessages={["Champ obligatoire"]}
                  style={{ width: "100%", marginBottom: 10 }}
                />
              </Col>
            </Row>

            <Row>
              <Col md="10">
                <TextValidator
                  label="La caution finale"
                  onChange={e => setCautionFinal(e.target.value)}
                  name="cautionFinal"
                  value={cautionFinal}
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
                  onChange={e => setPeriodeCautionFinal(e.target.value)}
                  name="periodeCautionFinal"
                  value={periodeCautionFinal}
                  type="number"
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
                  label="La date"
                  onChange={e => setDateCautionFinal(e.target.value)}
                  name="dateCautionFinal"
                  value={dateCautionFinal}
                  type="date"
                  validators={["required"]}
                  style={{ width: "100%", marginBottom: 10 }}
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading && <CircularProgress size={24} />}
          Confirmer
        </Button>
      </DialogActions>
    </ValidatorForm>
  );
}
