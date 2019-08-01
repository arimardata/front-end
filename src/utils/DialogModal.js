import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import MoinsDisant from "./dialogContent/MoinsDisant";
import CautionFinal from "./dialogContent/CautionFinal";
import Default from "./dialogContent/Default";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogModal({
  openDialog,
  handleAgree,
  handleDisagree,
  dragend
}) {
  function handleAgreeDiaog() {
    handleAgree();
  }
  function handleDisagreeDiaog() {
    handleDisagree();
  }
  return (
    <div>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Vos etes entrain de changer l'état d'un appel d'offre"}
        </DialogTitle>
        {dragend.targetLaneId === "lane3" && (
          <MoinsDisant
            handleAgree={handleAgreeDiaog}
            handleDisagree={handleDisagreeDiaog}
          />
        )}
        {dragend.targetLaneId === "lane4" && (
          <CautionFinal
            handleAgree={handleAgreeDiaog}
            handleDisagree={handleDisagreeDiaog}
          />
        )}

        {dragend.targetLaneId !== "lane3" &&
          dragend.targetLaneId !== "lane4" && (
            <Default
              handleAgree={handleAgreeDiaog}
              handleDisagree={handleDisagreeDiaog}
            />
          )}
      </Dialog>
    </div>
  );
}
