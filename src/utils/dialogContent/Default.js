import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import CircularProgress from "@material-ui/core/CircularProgress";

export default function Default({
  handleAgree,
  handleDisagree,
  aos,
  dragend,
  loading
}) {
  const ref = React.useRef("form");
  function handleSubmit() {
    aos.map(ao => {
      if (ao.id === dragend.cardId) {
        ao.moinsDisant = "";
        ao.montant = "";
        ao.cautionFinal = "";
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
        <DialogContentText id="alert-dialog-slide-description" />
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
