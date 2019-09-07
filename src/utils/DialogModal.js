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
import CautionProvisoire from "./dialogContent/CautionProvisoire";

import Default from "./dialogContent/Default";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogModal({
  openDialog,
  handleAgree,
  handleDisagree,
  dragend,
  aos
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
        open={!(dragend.sourceLaneId === dragend.targetLaneId) && openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Vous etes entrain de changer l'état d'un appel d'offre"}
        </DialogTitle>
        {dragend.targetLaneId === "lane7" && (
          <MoinsDisant
            handleAgree={handleAgreeDiaog}
            handleDisagree={handleDisagreeDiaog}
            dragend={dragend}
            aos={aos}
          />
        )}
        {dragend.targetLaneId === "lane3" && (
          <CautionFinal
            handleAgree={handleAgreeDiaog}
            handleDisagree={handleDisagreeDiaog}
            dragend={dragend}
            aos={aos}
          />
        )}
        {dragend.targetLaneId === "lane2" && (
          <CautionProvisoire
            handleAgree={handleAgreeDiaog}
            handleDisagree={handleDisagreeDiaog}
            dragend={dragend}
            aos={aos}
          />
        )}

        {dragend.targetLaneId !== "lane7" &&
          dragend.targetLaneId !== "lane3" &&
          dragend.targetLaneId !== "lane2" && (
            <Default
              handleAgree={handleAgreeDiaog}
              handleDisagree={handleDisagreeDiaog}
              dragend={dragend}
              aos={aos}
            />
          )}
      </Dialog>
    </div>
  );
}
