import React from 'react';
import {Grid} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/TableAcceptReject";

// data
import mock from "../dashboard/mock";


export default function AcceptReject(props) {
    return(
        <>
            <PageTitle title="Accept Reject Donations" />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Widget title="List">
                        <Table data={mock.donations} />
                    </Widget>
                </Grid>
            </Grid>
        </>
    )
}
