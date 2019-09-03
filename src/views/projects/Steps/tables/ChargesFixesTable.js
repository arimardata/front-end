import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styles from "./styles";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";

import MenuItem from "@material-ui/core/MenuItem";

function ChargesFixesTable(props) {
  const { classes, chargesfixes, handleOnChangeSteps } = props;

  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">Les charges fixes</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.hover)}>
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell align="left">Note</TableCell>
            <TableCell align="left">Montant</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chargesfixes.map((chargesfixe, id) => [
            <TableRow key={chargesfixe.id}>
              <TableCell>{chargesfixe.id}</TableCell>
              <TableCell align="left">
                {" "}
                <TextValidator
                  onChange={handleOnChangeSteps(chargesfixe.id)}
                  name="note"
                  value={chargesfixe.note}
                  validators={["required"]}
                  errorMessages={["Ce champ est obligatoire : "]}
                />
              </TableCell>
              <TableCell align="left">
                <TextValidator
                  onChange={handleOnChangeSteps(chargesfixe.id)}
                  name="montant"
                  value={chargesfixe.montant}
                  type="number"
                  validators={["required"]}
                  errorMessages={["Ce champ est obligatoire : "]}
                />
              </TableCell>
            </TableRow>
          ])}
        </TableBody>
      </Table>
    </div>
  );
}

ChargesFixesTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChargesFixesTable);
