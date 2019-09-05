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

function ChargesFixesTablePreview(props) {
  const { classes, chargesFixes } = props;

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
            <TableCell align="left">Montant (DH)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chargesFixes.map(chargesFixe => [
            <TableRow key={chargesFixe.id}>
              <TableCell>{chargesFixe.id}</TableCell>
              <TableCell align="left">
                {" "}
                {chargesFixe.note}
                {" DH"}
              </TableCell>
              <TableCell align="left">
                {chargesFixe.montant}
                {" DH"}
              </TableCell>
            </TableRow>
          ])}
        </TableBody>
      </Table>
    </div>
  );
}

ChargesFixesTablePreview.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChargesFixesTablePreview);
