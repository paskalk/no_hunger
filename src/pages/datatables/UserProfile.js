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
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
    }
});


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

    handleOnChange = (e) => {
        console.log(e.target.id);
    }

    render() {
        const {classes} = this.props;

        return (

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        User Profile
                        <br/>
                        <br/>
                        <br/>
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    onChange={this.handleOnChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="mobile"
                                    label="Mobile"
                                    type="mobile"
                                    id="mobile"
                                    autoComplete="mobile"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    rows={5}
                                    name="address"
                                    label="Address"
                                    type="address"
                                    id="address"
                                    autoComplete="address"
                                />
                            </Grid>


                        </Grid>

                        <br/>
                        <br/>
                        <br/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Update
                        </Button>
                    </form>
                </div>
                <Box mt={5}>
                </Box>
            </Container>

        )
    }
}

export default withStyles(styles)(UserProfile);

