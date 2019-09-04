import React from "react";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
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
  Typography
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

import fetchApi from "../../../utils/fetchApi";

import Etapes from "./Modals/Etapes";
import Personnels from "./Modals/Personnels";
import Materiels from "./Modals/Materiels";
import Charges from "./Modals/Charges";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class More extends React.Component {
  state = {
    open: false,
    fullScreen: false,
    nomPrenom: []
  };

  fetchNomPrenom = async () => {
    const nomPrenom = await fetchApi({
      method: "GET",
      url: "/api/personnel/administratif/findNomPrenom",
      token: window.localStorage.getItem("token")
    });

    this.setState({ nomPrenom });
  };

  getNomPrenom = id => {
    const nomPrenom = this.state.nomPrenom;
    let name;
    nomPrenom.map(object => {
      if (object.id === id) {
        name = object.nom;
        return;
      }
    });
    return name;
  };
  componentWillMount() {
    this.fetchNomPrenom();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleFullscreen = () => {
    let fullScreen = !this.state.fullScreen;
    this.setState({ fullScreen });
  };

  render() {
    const { classes, value } = this.props;
    const { open, fullScreen } = this.state;
    let modal;
    switch (this.props.modal) {
      case "Etapes":
        modal = <Etapes getNomPrenom={this.getNomPrenom} value={value} />;
        break;
      case "Materiels":
        modal = <Materiels value={value} />;
        break;
      case "Personnels":
        modal = <Personnels getNomPrenom={this.getNomPrenom} value={value} />;
        break;
      case "Charges":
        modal = <Charges value={value} />;
        break;
    }

    return (
      <div>
        <IconButton aria-label="details" onClick={this.handleOpen} size="small">
          <i className="material-icons">more_horiz</i>
        </IconButton>

        <Dialog
          maxWidth={"md"}
          fullWidth={!fullScreen}
          fullScreen={fullScreen}
          open={open}
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
              {modal}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const MoreWithStyles = withStyles(null)(More);

export default [
  {
    name: "Identifiant",
    label: "Identifiant",
    options: {
      filter: false,
      sort: true,
      display: false
    }
  },
  {
    name: "appel d'offre",
    label: "Appel d'offre",
    options: {
      filter: false,
      sort: true
    }
  },

  {
    name: "Chef du projet",
    label: "Chef du projet",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Date début",
    label: "Date début",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Date fin",
    label: "Date fin",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Etapes",
    label: "Etapes",
    options: {
      filter: true,
      customBodyRender: value => (
        <MoreWithStyles modal={"Etapes"} value={value} />
      )
    }
  },
  {
    name: "Materiels",
    label: "Materiels",
    options: {
      filter: true,
      customBodyRender: value => (
        <MoreWithStyles modal={"Materiels"} value={value} />
      )
    }
  },

  {
    name: "Personnels",
    label: "Personnels",
    options: {
      filter: false,
      customBodyRender: value => (
        <MoreWithStyles modal={"Personnels"} value={value} />
      )
    }
  },

  {
    name: "Charges",
    label: "Charges",
    options: {
      filter: false,
      customBodyRender: value => (
        <MoreWithStyles modal={"Charges"} value={value} />
      )
    }
  }
];
