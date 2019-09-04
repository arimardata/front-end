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
  Typography,
  Tooltip
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

import { Info } from "@material-ui/icons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class Informations extends React.Component {
  state = {
    open: false,
    fullScreen: false
  };

  componentWillMount() {
    this.handleOpen();
  }

  componentWillUnmount() {
    this.handleClose();
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
    const { classes } = this.props;
    const { open, fullScreen } = this.state;
    console.log("render");
    return (
      <div>
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
              {"modal"}
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

export default withStyles(null)(Informations);
