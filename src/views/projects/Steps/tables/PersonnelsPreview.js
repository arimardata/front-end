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

function PersonnelsPreview(props) {
  const { classes, personnelAffecter } = props;

  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">Liste personnels</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.hover)}>
        <TableHead>
          <TableRow>
            <TableCell align="left">CIN</TableCell>
            <TableCell align="left">Diplome</TableCell>
            <TableCell align="left">Qualité </TableCell>
            <TableCell align="left">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {personnelAffecter.map(personnel => [
            <TableRow key={personnel[0]}>
              <TableCell align="left"> {personnel[1]}</TableCell>
              <TableCell align="left">{personnel[2]}</TableCell>
              <TableCell align="left">{personnel[3]}</TableCell>
              <TableCell align="left">{personnel[4]}</TableCell>
            </TableRow>
          ])}
        </TableBody>
      </Table>
    </div>
  );
}

PersonnelsPreview.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PersonnelsPreview);
