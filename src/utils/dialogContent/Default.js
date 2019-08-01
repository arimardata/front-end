import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

export default function Default({ handleAgree, handleDisagree }) {
  function handleSubmit() {
    // your submit logic
  }
  return (
    <ValidatorForm
      //   ref="form"
      onSubmit={handleSubmit}
      onError={errors => console.log(errors)}
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree} color="primary">
          Annuler
        </Button>
        <Button onClick={handleAgree} color="primary">
          Confirmer
        </Button>
      </DialogActions>
    </ValidatorForm>
  );
}
