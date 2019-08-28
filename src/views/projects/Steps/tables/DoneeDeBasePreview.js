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

function DoneeDeBasePreview(props) {
  const { classes, projet, date_debut, date_fin } = props;

  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">Données de base</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.hover)}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Projet</TableCell>
            <TableCell align="left">Date debut</TableCell>
            <TableCell align="left">Date fin </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left">{projet}</TableCell>
            <TableCell align="left"> {date_debut}</TableCell>
            <TableCell align="left">{date_fin}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

DoneeDeBasePreview.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DoneeDeBasePreview);
