import React, {useState } from 'react';
import { ErrorOutlined } from '@material-ui/icons';
import { TextField } from "@material-ui/core";
import useStyles from "./styles";


export default function UserLocation(){

    var [latitude, setLatitude] = useState("");
    var [longitude, setLongitude] = useState("");
    var [userAddress, setUserAddress] = useState("");

    
    // React.useEffect(() => {
    //     getLocation();
    // },[]);
   

    
    
    return (

        <div className="UserLocation">
            <TextField
                id="latlng"
                value={latitude + "," + longitude}
                // onChange={e => setLatitude}
                className={useStyles.textField}
                type="hidden"
                name="latlng"
                autoComplete="latlng"
                margin="normal"
                variant="outlined"
                fullWidth
                
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
        

        </div>
        
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
        var bing_key =  "AIzaSyD85zfY1L5I83uJfVEQfugiESX99w3pXZM"; 

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${bing_key}`)
        .then(response => response.json())
        // .then(response => this.setState({
        //     userAddress: response.results[0]['formatted_address']
        // }))
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
