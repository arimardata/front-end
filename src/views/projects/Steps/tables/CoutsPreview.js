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

function CoutsPreview(props) {
  const { classes, chargesFixes } = props;
  let chargefixe = 0;
  chargesFixes.map(chargeFixe => {
    chargefixe += parseInt(chargeFixe.montant);
  });
  let total = 0;
  total = chargefixe;
  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">Les charges du projet</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.hover)}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Note</TableCell>
            <TableCell align="left">Cout</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left">Les charges fixes</TableCell>
            <TableCell align="left">{chargefixe}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Total</TableCell>
            <TableCell align="left">{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

CoutsPreview.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CoutsPreview);
