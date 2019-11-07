import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
// import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";

import ChartOne from "../../pages/charts/ChartOne.js";

import AddDonation from "../../pages/donations";
import AcceptDonation from "../../pages/donations/AcceptDonation.js";
import AcceptReject from "../../pages/donations/AcceptReject";

import DonorHistory from "../../pages/datatables/DonorHistory.js";
import UserManagement from "../../pages/datatables/UserManagement.js";

import Profile from "../../pages/profile/Profile.js";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          {/* <Sidebar /> */}
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/typography" component={Typography} />
              <Route path="/app/donations" component={AddDonation} />
              <Route path="/app/accept-reject" component={AcceptReject} />
              <Route path="/app/donorhistory" component={DonorHistory} />
              <Route path="/app/findfood" component={AcceptDonation} />
              <Route path="/app/users" component={UserManagement} />
              <Route path="/app/profile" component={Profile} />
              <Route path="/app/stats" component={ChartOne} />
              <Route path="/app/tables" component={Tables} />
                <Route path="/app/notifications" component={Notifications} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
