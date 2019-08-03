import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  },
  button: {
    marginBottom: "20px"
  }
}));

export default function SelectModal({
  checklanes,
  handleChange,
  open,
  handleClose
}) {
  const classes = useStyles();
  //   const [state, setState] = React.useState({
  //     open: false
  //   });

  //   function handleClickOpen() {
  //     setState({ ...state, open: true });
  //   }

  //   function handleClose() {
  //     setState({ ...state, open: false });
  //   }

  return (
    <div>
      {/* <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        className={classes.button}
      >
        <i class="material-icons">dashboard</i>
      </Button> */}
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Selectionner les colonnes à afficher</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checklanes.lane1}
                    onChange={handleChange}
                    value={checklanes.lane1}
                    name="lane1"
                    color="primary"
                  />
                }
                label="Favoris"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checklanes.lane2}
                    onChange={handleChange}
                    value={checklanes.lane2}
                    name="lane2"
                    color="primary"
                  />
                }
                label="Postule"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checklanes.lane3}
                    onChange={handleChange}
                    value={checklanes.lane3}
                    name="lane3"
                    color="primary"
                  />
                }
                label="Retenu"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checklanes.lane4}
                    onChange={handleChange}
                    value={checklanes.lane4}
                    name="lane4"
                    color="primary"
                  />
                }
                label="Projets"
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checklanes.lane5}
                    onChange={handleChange}
                    value={checklanes.lane5}
                    name="lane5"
                    color="primary"
                  />
                }
                label="Archive Des Projets Finis"
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checklanes.lane6}
                    onChange={handleChange}
                    value={checklanes.lane6}
                    name="lane6"
                    color="primary"
                  />
                }
                label="A Modifier"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checklanes.lane7}
                    onChange={handleChange}
                    value={checklanes.lane7}
                    name="lane7"
                    color="primary"
                  />
                }
                label="Archive Des Projets Non-Accepte"
              />
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
