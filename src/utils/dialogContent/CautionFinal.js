import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import fetchApi from "../fetchApi";

export default function CautionFinal({
  handleAgree,
  handleDisagree,
  dragend,
  aos
}) {
  const [cautionFinal, setCautionFinal] = React.useState("");
  const ref = React.useRef("form");

  function handleChange(event) {
    const cautionFinal = event.target.value;
    setCautionFinal(cautionFinal);
  }

  function handleSubmit() {
    aos.map(ao => {
      if (ao.id === dragend.cardId) {
        ao.cautionFinal = cautionFinal;
        ao.etat = "Retenu";
      }
    });

    fetchApi({
      method: "POST",

      url: "/api/projects/AjouterCaution/" + dragend.cardId,
      token: window.localStorage.getItem("token"),
      body: { cautionFinal }
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
          <TextValidator
            label="La caution finale"
            onChange={handleChange}
            name="cautionFinal"
            value={cautionFinal}
            validators={["required", "isFloat"]}
            errorMessages={[
              "Champ obligatoire",
              "Ce champ doit étre un nombre"
            ]}
          />
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
