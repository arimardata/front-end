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
  const { classes, charges } = props;
  let total = 0;
  total =
    charges.chargepermanent +
    charges.chargesaisonier +
    charges.chargeconsomable +
    charges.chargenonconsomable +
    charges.chargefixe;
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
            <TableCell align="left">Cout (DH)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left">Materiels consomable</TableCell>
            <TableCell align="left">
              {charges.chargeconsomable}
              {" DH"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Materiels non consomable</TableCell>
            <TableCell align="left">
              {charges.chargenonconsomable}
              {" DH"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Materiels total</TableCell>
            <TableCell align="left">
              {charges.chargeconsomable + charges.chargenonconsomable}
              {" DH"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Personnels permanents</TableCell>
            <TableCell align="left">
              {charges.chargepermanent}
              {" DH"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Personnels Saisonier</TableCell>
            <TableCell align="left">
              {charges.chargesaisonier}
              {" DH"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Personnels total</TableCell>
            <TableCell align="left">
              {charges.chargepermanent + charges.chargesaisonier}
              {" DH"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Charges fixes</TableCell>
            <TableCell align="left">
              {charges.chargefixe}
              {" DH"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Total</TableCell>
            <TableCell align="left">
              {total}
              {" DH"}
            </TableCell>
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
