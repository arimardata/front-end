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

function ProjectStepsPreview(props) {
  const { classes, etapes } = props;

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
            <TableCell align="left">Cout materiels (DH)</TableCell>
            <TableCell align="left">Cout personnels (DH)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {etapes.map(etape => [
            <TableRow key={etape.id}>
              <TableCell>{etape.id}</TableCell>
              <TableCell align="left"> {etape.designation}</TableCell>
              <TableCell align="left">{etape.duree}</TableCell>
              <TableCell align="left">{etape.responsable}</TableCell>
              <TableCell align="left">
                {etape.coutConsomable + etape.coutNonConsomable}
                {" DH"}
              </TableCell>
              <TableCell align="left">
                {etape.coutPermanent + etape.coutSaisonier}
                {" DH"}
              </TableCell>
            </TableRow>
          ])}
        </TableBody>
      </Table>
    </div>
  );
}

ProjectStepsPreview.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectStepsPreview);
