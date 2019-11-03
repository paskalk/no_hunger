import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import UserGroupTypes from "../../pages/datatables/UserGroupTypes.js";
// import DonationStatus from "../../pages/datatables/DonationStatus.js";
import TextField from "@material-ui/core/TextField";
import {Button, makeStyles} from '@material-ui/core';
import {updateUser} from "../../context/UserContext";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {FormControl, InputLabel, Input, FormHelperText, withStyles, Grid} from '@material-ui/core';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 520
    }
})


class UserProfile extends React.Component {
    state = {
        userData: [["Loading Data..."]]
    };

    componentDidMount() {
        fetch(`http://localhost:3030/api/users`)
            .then(response => response.json())
            .then((response) => {
                if (response) {
                    this.setState({userData: response});
                }

            });
    }


    handleSubmit = () => {
        console.log('You clicked submit button');
    };

    render() {
        const {classes} = this.props;

        return (
            <Card className={'card'}>
                <CardContent>


                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{minHeight: '100vh'}}
                    >

                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <Input id="name" aria-describedby="name-helper-text"/>
                                <FormHelperText id="name-helper-text">Your full name</FormHelperText>

                                <InputLabel htmlFor="email">Email address</InputLabel>
                                <Input id="email" aria-describedby="email-helper-text"/>
                                <FormHelperText id="email-helper-text">We'll never share your email.</FormHelperText>

                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" aria-describedby="password-helper-text"/>
                                <FormHelperText id="password-helper-text">Your password.</FormHelperText>

                                <InputLabel htmlFor="mobile">Your mobile</InputLabel>
                                <Input id="mobile" aria-describedby="mobile-helper-text"/>
                                <FormHelperText id="mobile-helper-text">We'll never share your email.</FormHelperText>

                                <InputLabel htmlFor="address">Address</InputLabel>
                                <Input id="address" aria-describedby="address-helper-text"/>
                                <FormHelperText id="address-helper-text">Please fill your address.</FormHelperText>


                                <Button variant="contained" color="primary" className={'primary'}>
                                    Submit
                                </Button>

                            </FormControl>
                        </Grid>

                    </Grid>

                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(UserProfile);

