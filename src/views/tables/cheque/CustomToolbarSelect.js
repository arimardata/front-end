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




const defaultToolbarSelectStyles = {
  iconButton: {},
  iconContainer: {
    marginRight: "24px"
  },
  inverseIcon: {
    transform: "rotate(90deg)"
  }
};

class CustomToolbarSelect extends React.Component {
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

  handleClickDeselectAll = () => {
    console.log(this.props.selectedRows)
    this.props.setSelectedRows([]);
  };

  changeStatus(id) {
    // const token = window.localStorage.getItem("token");
    // fetchApi({
    //   url: `/api/user/disable/` + id,
    //   method: "DELETE",
    //   token
    // }).then(res => {
    //   Dispatcher.dispatch({
    //     actionType: Constants.UPDATE_USER,
    //     payload: id
    //   });
    // });
  }
  delete = () => {
    //console.log(this.props.displayData)

    let data = this.props.selectedRows.data
    data.map(async el => {
      let index = el.index;
      let id = this.props.displayData[index].data[0]
      console.log(id)
      //console.log(index)
      const data = await fetchApi({
        method: "DELETE",
        url: "/api/Cheques/delete/" + id,
        token: window.localStorage.getItem("token")
      });

    })


  }

  render() {
    const { classes } = this.props;
    let edit;
 
    if (this.props.selectedRows.data.length == 1)
      edit = <Tooltip title={"Modifier"}>
        <IconButton
          className={classes.iconButton}
        //onClick={this.delete}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
    return (
      <div className={classes.iconContainer}>
        <Tooltip title={"Tous supprimer"}>
          <IconButton
            className={classes.iconButton}
            onClick={this.delete}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        {edit}

      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, {
  name: "CustomToolbarSelect"
})(CustomToolbarSelect);
