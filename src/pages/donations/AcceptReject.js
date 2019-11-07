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
        }
    }

    componentDidMount() {
        var urlpath = process.env.NODE_ENV == "development" ? process.env.REACT_APP_URL_PATH : "";

        fetch(`http://localhost:3030/api/getActiveDonations/1`)
            .then(response => response.json())
            .then((response) => {
                if (response) {
                    this.setState({donations: response});
                    console.log('Donations fetched : ' , response);
                }
            })
    }

    render() {
        let { donations } = this.state;
        if(donations.length < 1) donations = mock.donations;

        return (
            <>
                <PageTitle title="Accept Reject Donations"/>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Widget title="List">
                            <Table data={donations}/>
                        </Widget>
                    </Grid>
                </Grid>
            </>
        )
    }
}
