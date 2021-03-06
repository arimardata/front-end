import React from "react";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import { Store, Constants, Dispatcher } from "../../../flux";
import fetchApi from "../../../utils/fetchApi";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import UpdateMaterielModal from "../../../utils/UpdateMaterielModal";

import ConfirmDeleteModal from "../../../utils/ConfirmDeleteModal";

import { Modal, ModalBody } from "shards-react";
import StepperProjects from "../../editproject/StepperProjects";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  useMediaQuery,
  Slide,
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Chip
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

import { Info, Edit } from "@material-ui/icons";

import Informations from "./Modals/Informations";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultToolbarSelectStyles = {
  iconContainer: {
    marginRight: "24px"
  },
  modalTop: {
    top: "10%"
  },
  deleteDialogTop: {
    top: "30%"
  }
};

class CustomToolbarSelect extends React.Component {
  state = {
    open: false,
    openDeleteDialog: false,
    openInformations: false,
    fullScreen: false
  };

  handleClickInverseSelection = () => {
    const nextSelectedRows = this.props.displayData.reduce(
      (nextSelectedRows, _, index) => {
        if (
          !this.props.selectedRows.data.find(
            selectedRow => selectedRow.index === index
          )
        ) {
          nextSelectedRows.push(index);
        }

        return nextSelectedRows;
      },
      []
    );

    this.props.setSelectedRows(nextSelectedRows);
  };

  handleOpen = name => () => {
    this.setState({ openInformations: true, modal: name });
  };

  handleClose = () => {
    this.setState({ openInformations: false });
  };

  handleFullscreen = () => {
    let fullScreen = !this.state.fullScreen;
    this.setState({ fullScreen });
  };

  componentWillMount() {}

  handleClick = () => {
    this.toggle();
  };

  toggle = () => {
    let index = this.props.selectedRows.data[0].index;
    let id = this.props.displayData[index].data[0];
    let data = this.props.displayData[index].data;

    this.setState({
      open: !this.state.open,
      id: id,
      data
    });
  };

  toggleDeleteDialog = () => {
    this.setState({
      openDeleteDialog: !this.state.openDeleteDialog
    });
  };

  render() {
    const { classes } = this.props;
    const { openInformations, fullScreen, modal } = this.state;
    let info, edit;
    const type = Store.getTypeProjet();
    if (this.props.selectedRows.data.length == 1)
      info = (
        <Tooltip title={"Projet informations"}>
          <IconButton onClick={this.handleOpen("Informations")}>
            <Info />
          </IconButton>
        </Tooltip>
      );

    if (this.props.selectedRows.data.length == 1 && type === "Projet en cours")
      edit = (
        <Tooltip title={"Modifier projet"}>
          <IconButton onClick={this.handleOpen("Edit projet")}>
            <Edit />
          </IconButton>
        </Tooltip>
      );

    return (
      <div className={classes.iconContainer}>
        <React.Fragment>
          {/* <Tooltip title={"Tous supprimer"}>
            <IconButton onClick={this.toggleDeleteDialog}>
              <DeleteIcon />
            </IconButton>
          </Tooltip> */}
          {info}
          {edit}
          <Modal
            open={this.state.openDeleteDialog}
            className={classes.deleteDialogTop}
          >
            <ModalBody>
              <p>Est-vous sure ?</p>
              <ConfirmDeleteModal
                handleAgree={this.delete}
                toggle={this.toggleDeleteDialog}
              />
            </ModalBody>
          </Modal>
        </React.Fragment>
        <div>
          <Dialog
            maxWidth={"md"}
            fullWidth={!fullScreen}
            fullScreen={fullScreen}
            open={openInformations}
            keepMounted
            onClose={this.handleClose}
            TransitionComponent={Transition}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            {fullScreen && (
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    color="inherit"
                    onClick={this.handleClose}
                    aria-label="Fermer"
                  >
                    <CloseIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    onClick={this.handleFullscreen}
                    aria-label="FullScreen"
                  >
                    <i class="material-icons">minimize</i>
                  </IconButton>
                </Toolbar>
              </AppBar>
            )}
            <DialogTitle id="alert-dialog-title">
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Fermer"
              >
                <CloseIcon />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={this.handleFullscreen}
                aria-label="FullScreen"
              >
                <i class="material-icons">fullscreen</i>
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {modal === "Informations" && (
                  <Informations data={this.props.displayData[0]} />
                )}
                {modal === "Edit projet" && (
                  <StepperProjects id={this.props.displayData[0].data[0]} />
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Fermer
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, {
  name: "CustomToolbarSelect"
})(CustomToolbarSelect);
