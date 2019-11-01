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

        return (
            <Card className={'card'}>
                <CardContent>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <TextField name="name" label="Name"/>
                        </div>
                        <div>
                            <TextField name="email" label="Email"/>
                        </div>

                        <div>
                            <TextField type="password" name="password" label="Password"/>
                        </div>

                        <div>
                            <TextField type="mobile" name="number" label="Mobile"/>
                        </div>

                        <div>
                            <TextField type="text" name="address" label="Address"/>
                        </div>


                        <div>
                            <Button variant="contained" color="primary" className={'primary'}>
                                Submit
                            </Button>

                        </div>

                    </form>
                </CardContent>
            </Card>
        )
    }
}

export default UserProfile;

