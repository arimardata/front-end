import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import BlockIcon from "@material-ui/icons/Block";
import { withStyles } from "@material-ui/core/styles";
import { Store, Constants, Dispatcher } from "../../../flux";
import fetchApi from "../../../utils/fetchApi";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import UpdateMaterielModal from "../../../utils/UpdateMaterielModal";

import { Modal, ModalBody } from "shards-react";

const defaultToolbarSelectStyles = {
  iconContainer: {
    marginRight: "24px"
  }
};

class CustomToolbarSelect extends React.Component {
  state = { open: false };
  handleClickInverseSelection = () => {
    const nextSelectedRows = this.props.displayData.reduce(
      (nextSelectedRows, _, index) => {
        if (
          !this.props.selectedRows.data.find(
            selectedRow => selectedRow.index === index
          )
        ) {
          nextSelectedRows.push(index);
        }

        return nextSelectedRows;
      },
      []
    );

    this.props.setSelectedRows(nextSelectedRows);
  };

  delete = () => {
    let data = this.props.selectedRows.data;
    data.map(async el => {
      let index = el.index;
      let id = this.props.displayData[index].data[0];
      let url, actionType;

      switch (Store.getTypeStock()) {
        case "Consomable":
          url = "/api/stock/consomable/delete/" + id;
          actionType = Constants.TABLE_CONSOMABLE_UPDATED;
          break;
        case "Non consomable":
          url = "/api/stock/nonconsomable/delete/" + id;
          actionType = Constants.TABLE_NON_CONSOMABLE_UPDATED;
          break;
      }
      await fetchApi({
        method: "DELETE",
        url,
        token: window.localStorage.getItem("token")
      });
      Dispatcher.dispatch({
        actionType
      });
    });
  };

  handleClick = () => {
    this.toggle();
  };

  toggle = () => {
    let index = this.props.selectedRows.data[0].index;
    let id = this.props.displayData[index].data[0];

    this.setState({
      open: !this.state.open,
      id: id
    });
  };

  render() {
    const { classes } = this.props;
    let edit;

    if (this.props.selectedRows.data.length == 1)
      edit = (
        <Tooltip title={"Modifier"}>
          <IconButton onClick={this.toggle}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      );

    return (
      <div className={classes.iconContainer}>
        <React.Fragment>
          <Tooltip title={"Tous supprimer"}>
            <IconButton onClick={this.delete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          {/* {edit} */}
          <Modal size="lg" open={this.state.open}>
            <ModalBody>
              <UpdateMaterielModal id={this.state.id} toggle={this.toggle} />
            </ModalBody>
          </Modal>
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, {
  name: "CustomToolbarSelect"
})(CustomToolbarSelect);
