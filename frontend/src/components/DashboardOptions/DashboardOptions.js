import React from "react";
import { Button, Grid } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
// import { Typography } from "../Wrappers";
// import { useUserDispatch } from "../../context/UserContext";

//Former PageTitle
export default function DashboardOptions(props) {
  var classes = useStyles();

  var addDonation = false, acceptDonation = false, history = false, stats = false, profile = false, user = false, donations = false;

  switch(props.userType){
    case "admin":
      stats = true;
      profile = true;
      user=true;
      donations=true;
      break;

    case "donor":
      addDonation = true
      history  = true;
      stats = true;
      profile = true;
      break;

    case "organization":
      acceptDonation = true;
      history  = true;
      stats = true;
      profile = true;
      break;
      
    case "super":
      // addDonation = true
      // acceptDonation = true;
      history  = true;
      // stats = true;
      // profile = true;
      // stats = true;
      user=true;
      // donations=true;
      break;

    default:
    break;

  }

  return (
    <div className={classes.pageTitleContainer}>
      {/* <Typography className={classes.typo} variant="h1" size="sm">
        {props.title}
      </Typography> */}
    <Grid container spacing={2}>
      {addDonation && (
        <Grid item xs={12} md={3} lg={3}>
          <Button
            className={classes.button}
            // classes={{ root: classes.button }}
            variant="outlined"
            size="large"
            color="primary"
            href="#/app/donations"
            
          >
            Donate
          </Button>
        </Grid>
      )}
      
      {acceptDonation && (
        <Grid item xs={12} md={3} lg={3}>
          <Button
            className={classes.button}
            // classes={{ root: classes.button }}
            variant="outlined"
            size="large"
            color="primary"
            href="#/app/donations"
          >
            Accept Donation
          </Button>
        </Grid>
      )}      
      
      {history && (
        <Grid item xs={12} md={3} lg={3}>
          <Button
            className={classes.button}
            // classes={{ root: classes.button }}
            variant="outlined"
            size="large"
            color="primary"
            href="#/app/donorhistory"
          >
            History
          </Button>
        </Grid>
      )}
      
      <Grid item xs={12} md={3} lg={3}>
        {stats && (
          <Button
            className={classes.button}
            // classes={{ root: classes.button }}
            variant="outlined"
            size="large"
            color="primary"
            href="#/app/donations"
          >
            Statistics
          </Button>
        )}
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
        {profile && (
          <Button
            className={classes.button}
            // classes={{ root: classes.button }}
            variant="outlined"
            size="large"
            color="primary"
            href="#/app/donations"
          >
            Profile
          </Button>
        )}
      </Grid>
      
      {user && (
        <Grid item xs={12} md={3} lg={3}>
          <Button
            className={classes.button}
            // classes={{ root: classes.button }}
            variant="outlined"
            size="large"
            color="primary"
            href="#/app/users"
          >
            User
          </Button>
        </Grid>
      )}
      
      
      {donations && (
        <Grid item xs={12} md={3} lg={3}>
          <Button
            className={classes.button}
            // classes={{ root: classes.button }}
            variant="outlined"
            size="large"
            color="primary"
            href="#/app/donorhistory"
          >
            Donations
          </Button>
        </Grid>
      )}
      
    </Grid>
    </div>
  );
}
