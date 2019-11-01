import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";

// components
import { Button } from "../../../../components/Wrappers";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  // keys.shift(); // delete "id" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ donationid, foodtype, quantity, dateadded, datereceived, deleted, donatedby, receivedby, status }) => (
          <TableRow key={donationid}>
            <TableCell className="pl-3 fw-normal">{foodtype}</TableCell>
            <TableCell>{quantity}</TableCell>
            <TableCell>{dateadded}</TableCell>
            <TableCell>{datereceived}</TableCell>
            <TableCell>{deleted}</TableCell>
            <TableCell>{donatedby}</TableCell>
            <TableCell>{receivedby}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>
              <Button
                color={states[status.toLowerCase()]}
                size="small"
                className="px-2"
                variant="contained"
              >
                {status}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
