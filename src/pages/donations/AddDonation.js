import React, { useState, useEffect } from "react";
// import {
//   withGoogleMap,
//   withScriptjs,
//   GoogleMap,
//   Marker,
// } from "react-google-maps";
import {
  Grid,
  // CircularProgress,
  // Typography,
  Button,
  // Tabs,
  // Tab,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  TextField,
  Container
  // Fade,
} from "@material-ui/core";

import clsx from 'clsx';

// styles
import useStyles from "./styles";

// context
import { addDonationEntry } from "../../context/UserContext";

import SaveIcon from '@material-ui/icons/Save';

import PageTitle from "../../components/PageTitle";

export default function AddDonation() {
  var classes = useStyles();

  

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    
  }, []);
  getLocation();

  var [foodTypeValue, setFoodTypeValue] = useState("");
  var [weightValue, setWeightValue] = useState("");
  // var [locationValue, setLocationValue] = useState("");

  var [latitude, setLatitude] = useState("");
  var [longitude, setLongitude] = useState("");
  var [userAddress, setUserAddress] = useState("");

  // cb =  (dfc) => {
  //   setLocationValue(dfc);
  //  }

  return (
    <Container component="main" maxWidth="xs">
      {/* <div className={classes.formContainer}> */}
      <div className={classes.paper}>
        {/* <div className={classes.form}> */}
          <PageTitle 
            title="Add Donation" 
            // button="Latest Reports" 
          />
          {/* <React.Fragment> */}
          <form className={classes.form} noValidate>
            {/* <TextField
              id="foodType"
              label="Food "
              value={foodTypeValue}
              onChange={e => setFoodTypeValue(e.target.value)}
              className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              fullWidth
            /> */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <FormControl variant="outlined" className={classes.formControl} fullWidth>
              
                <InputLabel ref={inputLabel} htmlFor="SelectFoodType">
                  Food Type
                </InputLabel>
                <Select
                  value={foodTypeValue}
                  onChange={e => setFoodTypeValue(e.target.value)}
                  labelWidth={labelWidth}
                  inputProps={{
                    name: 'Food Type',
                    id: 'SelectFoodType',
                  }}
                  
                >
                  <MenuItem value={'Mixed'}>Mixed</MenuItem>
                  <MenuItem value={'Vegetarian'}>Vegetarian</MenuItem>
                  <MenuItem value={'Vegan'}>Vegan</MenuItem>
                  
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="outlined-adornment-weight"
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                label="Weight"
                value={weightValue}
                onChange={e => setWeightValue(e.target.value)}
                // onChange={handleChange('weight')}
                // helperText="Weight"
                InputProps={{
                  endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
            <TextField
                id="locationDescription"
                label="Location"
                value={userAddress}
                onChange={e => setUserAddress(e.target.value)}
                className={clsx(classes.margin, classes.textField)}
                type="text"
                name="locationDescription"
                autoComplete="locationDescription"
                margin="normal"
                variant="outlined"
                fullWidth
            />
            </Grid>
          </Grid>
            {/* <div className={classes.creatingButtonContainer}> */}
              <Button
                onClick={() => {
                  addDonationEntry(
                    weightValue,
                    foodTypeValue,
                    userAddress,
                    latitude,
                    longitude
                    
                  );
                  setWeightValue('');
                  setFoodTypeValue('');
                  
                }
                }
                variant="contained"
                color="primary"
                size="large"
                className={classes.submit}
                // className={classes.button}
                startIcon={<SaveIcon />}
                fullWidth
              >
                Save
              </Button>
            {/* </div> */}
            {/* </React.Fragment> */}
            </form>
          {/* </div> */}
        </div>
    </Container>
  );


  function getLocation () {

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError);
    } else {
        console.log("Geolocation not supported by browser");
    }
}

function getCoordinates(position){
    // this.setState({
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    // })
// console.log(position.coords.latitude);
// console.log(position.coords.longitude);
// console.log(position.coords);

    reverseGeocodeCoordinates();
}

function reverseGeocodeCoordinates(){

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${process.env.REACT_APP_MAP_KEY}`)
    .then(response => response.json())
    .then(response => setUserAddress(response.results[0]['formatted_address']))
    .catch(error => console.log(error))
}

function handleLocationError(error){
    switch(error.code) {
        case error.PERMISSION_DENIED:
        case error.POSITION_UNAVAILABLE:
        case error.TIMEOUT:
        case error.UNKNOWN_ERROR:
            console.log("Location error handled?");
            break
        default:
            break;
    }
}

}
