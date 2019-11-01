import React from "react";
import { Button, Grid } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers";
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
      addDonation = true
      acceptDonation = true;
      history  = true;
      // stats = true;
      profile = true;
      // stats = true;
      user=true;
      donations=true;
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
            <Typography variant="h4" color="primary"  className={classes.text} weight="medium" >
              Donate
            </Typography>
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
            href="#/app/accept-reject"
          >
            <Typography variant="h4" color="primary"  className={classes.text} weight="medium" >
              Find Food
            </Typography>
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
            <Typography variant="h4" color="primary"  className={classes.text} weight="medium" >
              History
            </Typography>
          </Button>
        </Grid>
      )}
      
      
      {stats && (
        <Grid item xs={12} md={3} lg={3}>
          <Button
            className={classes.button}
            // classes={{ root: classes.button }}
            variant="outlined"
            size="large"
            color="primary"
            href="#/app/donations"
          >
            <Typography variant="h4" color="primary"  className={classes.text} weight="medium" >
              Statistics
            </Typography>
          </Button>
        </Grid>
      )}
      
      
      {profile && (
        <Grid item xs={12} md={3} lg={3}>
          <Button
            className={classes.button}
            // classes={{ root: classes.button }}
            variant="outlined"
            size="large"
            color="primary"
            href="#/app/profile"
          >
            <Typography variant="h4" color="primary"  className={classes.text} weight="medium" >
              Profile
            </Typography>
          </Button>
        </Grid>
      )}
      
      
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
            <Typography variant="h4" color="primary"  className={classes.text} weight="medium" >
              Users
            </Typography>
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
            <Typography variant="h4" color="primary"  className={classes.text} weight="medium" >
              Donations
            </Typography>
          </Button>
        </Grid>
      )}
      
    </Grid>
  </div>
  );
}
