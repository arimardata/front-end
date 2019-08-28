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

function MaterielsPreview(props) {
  const { classes, data } = props;

  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">Liste materiels</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.hover)}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Materiel</TableCell>
            <TableCell align="left">Quantite</TableCell>
            <TableCell align="left">Type </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(materiel => [
            <TableRow key={materiel[0]}>
              <TableCell>{materiel[1]}</TableCell>
              <TableCell align="left"> {materiel[2]}</TableCell>
              <TableCell align="left">{materiel[3]}</TableCell>
            </TableRow>
          ])}
        </TableBody>
      </Table>
    </div>
  );
}

MaterielsPreview.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MaterielsPreview);
