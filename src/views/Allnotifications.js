import MUIDataTable from "mui-datatables";
import React, { Component } from "react";
// import CustomToolbar from "./CustomToolbar";
import { Container, Row } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { Grid } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import fetchApi from "../utils/fetchApi";
import GavelIcon from '@material-ui/icons/Gavel';




class AllNotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifs: []
        };
    }
    fetchNotification = async () => {
        const data = await fetchApi({
            method: "GET",
            url: "/api/notifications/find",
            token: window.localStorage.getItem("token")
        });
        let donnee = [];



        data.map((ao, id) => {

            donnee.push({
                id: ao.id,
                notificationType: ao.notificationType,
                notificationDetail: ao.notificationDetail,
                notificationSeen: ao.notificationSeen
            });
        });


        /*
                if (!(data.status > 300))
                    data.map(elmnt =>
                        donnee.push([
                            elmnt.id,
                            elmnt.NotificationType,
                            elmnt.NotificationDetail,
                            elmnt.NotificationSeen,
                        ])
                    );*/
        this.setState({ notifs: donnee });
        console.log("notifs", this.state.notifs);
        console.log("data", data);
    }
    componentWillMount() {
        this.fetchNotification();
        this.handleall();
        console.log("try");
        console.log(this.state.notifs.length);
    }

    gettargetcheck = async e => {
        // your submit logic
        console.log("e:", e);
        let id = e;
        fetchApi({
            method: "GET",
            url: "/api/Check/find/" + id,
            token: window.localStorage.getItem("token")
        });
        console.log("done");
    };
    handleall() {


        fetchApi({
            method: "GET",
            url: "/api/notifications/handleall/",
            token: window.localStorage.getItem("token")
        });
        console.log("done");
    };

    gettargetao = async e => {
        // your submit logic
        console.log("e:", e);
        let id = e;
        fetchApi({
            method: "GET",
            url: "/api/Check/projects/" + id,
            token: window.localStorage.getItem("token")
        });
        console.log("done");
    };

    render() {
        return (<Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle
                    sm="4"
                    title="Toutes les notifications"
                    subtitle="Notifications:"
                    className="text-sm-left"
                />
            </Row>
            <Grid container spacing={32}>
                Hello




                <List /*className={classes.root}*/>
                    {this.state.notifs.map(item => {
                        if (item.notificationType == "AppelOffreNotification") {
                            return (
                                <div>
                                    <ListItem alignItems="flex-start">
                                        
                                    <i class="material-icons">gavel</i>


                                        <ListItemText
                                            primary="Alert!"
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        //className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        AppelOffre
                                                        <p>{item.notificationType}
                                                        </p>
                                                    </Typography>
                                                    {" — Vous avez un nouveau appel d'offre…"}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem><Divider variant="inset" component="li" />
                                </div>)
                        }
                        else {
                            return (
                                <div>
                                    <ListItem alignItems="flex-start">
                                    <i class="material-icons">payment</i>
                                        <ListItemText
                                            primary="Alert!"
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        //className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        Cheque
                        <p>{item.notificationType}
                                                        </p>

                                                    </Typography>
                                                    {" — Vous avez un nouveau cheque…"}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </div>)


                        }


                    })}



                </List>
            </Grid>
        </Container>
        );



    }
}

export default AllNotifications;
