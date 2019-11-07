import React from 'react';
import {Grid} from "@material-ui/core";
import {useState, useEffect} from 'react';
import {updateProfile} from "../../context/UserContext";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/TableAcceptReject";

// data
import mock from "../dashboard/mock";


export default class AcceptReject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            donations: []
        };
        this.getDonationsList = this.getDonationsList.bind(this);
        this.changeDonationStatus = this.changeDonationStatus.bind(this);
    }

    componentDidMount() {
        this.getDonationsList();
    }

    getDonationsList() {
        fetch(`http://localhost:3030/api/getActiveDonations/1`)
            .then(response => response.json())
            .then((response) => {
                if (response) {
                    this.setState({donations: response});
                    console.log('Donations fetched : ', response);
                }
            })
    };

    changeDonationStatus(donationid, receivedby, datereceived, status) {
        const self = this;

        fetch(`http://localhost:3030/api/updateAcceptReject`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({donationid, receivedby, datereceived, status})
        })
            .then(response => response.json())
            .then(function (response) {
                console.log('Status of donation with id ' + donationid + ' changed to : ' + status, response);
                if (response == 1) self && self.getDonationsList();
            })
            .catch(err => console.error(err))
    };

    render() {
        let {donations} = this.state;
        if (donations.length < 1) donations = mock.donations;

        return (
            <>
                <PageTitle title="Accept Reject Donations"/>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Widget title="List">
                            <Table data={donations}
                                   changeDonationStatus={(donationid, receivedby, datereceived, status) => this.changeDonationStatus(donationid, receivedby, datereceived, status)}/>
                        </Widget>
                    </Grid>
                </Grid>
            </>
        )
    }
}
