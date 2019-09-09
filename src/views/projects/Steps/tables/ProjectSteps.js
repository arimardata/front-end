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

function ProjectSteps(props) {
  const { classes, etapes, handleOnChangeSteps, personnelSelect } = props;

  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">Les étapes</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.hover)}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Etape</TableCell>
            <TableCell align="left">Designation</TableCell>
            <TableCell align="left">Durée (semaines)</TableCell>
            <TableCell align="left">Responsable</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {etapes.map(etape => [
            <TableRow key={etape.id}>
              <TableCell>{etape.id}</TableCell>
              <TableCell align="left">
                {" "}
                <TextValidator
                  onChange={handleOnChangeSteps(etape.id)}
                  name="designation"
                  value={etape.designation}
                  validators={["required"]}
                  errorMessages={["Ce champ est obligatoire : "]}
                />
              </TableCell>
              <TableCell align="left">
                <TextValidator
                  onChange={handleOnChangeSteps(etape.id)}
                  name="duree"
                  value={etape.duree}
                  type="number"
                  validators={["required"]}
                  errorMessages={["Ce champ est obligatoire : "]}
                />
              </TableCell>
              <TableCell align="left">
                <SelectValidator
                  onChange={handleOnChangeSteps(etape.id)}
                  style={{ width: "80%" }}
                  name="responsable"
                  value={etape.responsable}
                  validators={["required"]}
                  errorMessages={["Ce champ est obligatoire : "]}
                >
                  {personnelSelect &&
                    personnelSelect.map(personnel => (
                      <MenuItem value={personnel[1]}>{personnel[1]}</MenuItem>
                    ))}
                </SelectValidator>
              </TableCell>
            </TableRow>
          ])}
        </TableBody>
      </Table>
    </div>
  );
}

ProjectSteps.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectSteps);
