import React from 'react';
import {Grid} from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/TableAcceptReject";

// data
import mock from "../dashboard/mock";
const datatableData = [
    ["Joe James", "Example Inc.", "Yonkers", "NY"],
    ["John Walsh", "Example Inc.", "Hartford", "CT"],
    ["Bob Herm", "Example Inc.", "Tampa", "FL"],
    ["James Houston", "Example Inc.", "Dallas", "TX"],
];



export default function AcceptReject(props) {
    return(
        <>
            <PageTitle title="Tables" />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Widget title="Material-UI Table">
                        <Table data={mock.donations} />
                    </Widget>
                </Grid>
            </Grid>
        </>
    )
}
