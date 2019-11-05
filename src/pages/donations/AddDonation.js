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
  TextField
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
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <PageTitle 
            title="Add Donation" 
            // button="Latest Reports" 
          />
          <React.Fragment>
            
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
            
            <TextField
                id="locationDescription"
                label="Location"
                value={userAddress}
                onChange={e => setUserAddress(e.target.value)}
                className={useStyles.textField}
                type="text"
                name="locationDescription"
                autoComplete="locationDescription"
                margin="normal"
                variant="outlined"
                fullWidth
            />
            <div className={classes.creatingButtonContainer}>
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
                className={classes.button}
                startIcon={<SaveIcon />}
                fullWidth
              >
                Save
              </Button>
            </div>
            </React.Fragment>
          </div>
        </div>
    </Grid>
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
