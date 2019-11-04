import React from "react";
import { Button } from "../../components/Wrappers";
import MUIDataTable from "mui-datatables";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import UserGroupTypes from "../../pages/datatables/UserGroupTypes.js";
// import DonationStatus from "../../pages/datatables/DonationStatus.js";
import CheckIcon from '@material-ui/icons/Check';
import ToggleButton from '@material-ui/lab/ToggleButton';

import { updateAcceptReject } from "../../context/UserContext";

class AcceptDonation extends React.Component {
  state = {
      availableDonations: [["Loading Data..."]],
      // buttonColour: "success",
      // buttonText: "Accept"
  };
  // this.handleClick = this.handleClick.bind(this);

  // handleClick(event){
  //   console.log(event);
  //   event.preventDefault();
  //   // updateAcceptReject(this.tableMeta.rowData, this.state.buttonText);
  //   // this.setState({buttonColour: this.state.buttonColour === "success" ? "secondary" : "success" });
  //   // this.setState({buttonText: this.state.buttonText === "Accept"? "Cancel" : "Accept" });
  // }

  componentDidMount() {
    var urlpath = process.env.NODE_ENV == "development" ? process.env.REACT_APP_URL_PATH : "";

    fetch(`${urlpath}/api/getActiveDonations/${localStorage.getItem("userid")}`)
    .then(response => response.json())
    .then((response)  => {
      if (response){      
        this.setState({availableDonations: response });
      }

    })
}
  
  

  render() {
    
    const columns = [
      {
        label: "ID",
        name: "donationid",
        options: {
          filter: false,
          display: 'excluded'
        }
      },
      {
        label: "Type",
        name: "foodtype",
        options: {
          filter: true,
        }
      },
      {
        label: "Kgs",
        name: "quantity",
        options: {
          filter: false
        }
      },
      {
        label: "Location",
        name: "shortlocation",
        options: {
          filter: false
        }
      },
      {
        label: "Address",
        name: "locationdescription",
        options: {
          filter: true,
          display: false
        }
      },
      {
        label: "GPS",
        name: "location",
        options: {
          filter: false,
          display: false
        }
      },      
      {
        label: "Status",
        name: "status",
        options: {
          filter: false,
          display: 'excluded'
        }
      },
      {
        label: "Deleted",
        name: "deleted",
        options: {
          filter: false,
          display: 'excluded'
        }
      },
      {
        label: "Added",
        name: "dateadded",
        options: {
          filter: false,
          display: false
        }
      },
      {
        label: "Accepted",
        name: "datereceived",
        options: {
          filter: false,
          display: 'excluded'
        }
      },
      {
        label: "Donor",
        name: "donatedby",
        options: {
          filter: false,
          display: false
        }
      },
      {
        label: "Org",
        name: "receivedby",
        options: {
          filter: false,
          display: 'excluded'
        }
      },
      {
        label: "Want it?",
        name: "acceptreject",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <ToggleButton
                value={value === "Available" ? "Available" : "Reserved"}
                selected={value === "Available" ? false : true}
                // onChange={(event) => {
                onClick={(event) => {
                  // console.log(tableMeta.rowData);
                  console.log(event.target.value);  
                  updateAcceptReject(tableMeta.rowData[0], event.target.value, tableMeta.rowData[9]);
                  
                  updateValue(event.target.value === "Available" ? "Reserved" : "Available");
                }}
              >
                <CheckIcon />
              </ToggleButton>


              // <Button
              //   color={tableMeta.rowData[6] === "Available" ? "success" : "secondary"}
              //   size="small"
              //   className="px-2"
              //   variant="contained"
              //   value ={'Trie'}
              //   // onClick={this.handleClick.bind(this)}
              //   // onChange={event => {
              //   onClick={() => {
              //     console.log(tableMeta.rowData[6]);
              //     updateAcceptReject(tableMeta.rowData[0], tableMeta.rowData[6],  tableMeta.rowData[9]);
              //     // tableMeta.rowData[6] == "Available"? "Reserved" : "Available";
              //     // this.setState({buttonColour: this.state.buttonColour === "success" ? "secondary" : "success" });
              //     // this.setState({buttonText: this.state.buttonText === "Accept"? "Cancel" : "Accept" });
              //     updateValue(event.target.value === "Available" ? "Reserved" : "Available");
              //     console.log(event.target.value);
              //   }}
              // >
              //   {tableMeta.rowData[6] === "Available" ? "Accept" : "Cancel"}
              // </Button>


              // <FormControlLabel
              //   label={value ? "Yes" : "No"}
              //   value={value ? "Yes" : "No"}
              //   control={
              //     <Switch
              //       color="primary"
              //       checked={value }
              //       value={value ? "Yes" : "No"}
              //     />
              //   }
              //   onChange={event => {
              //     updateAcceptReject(tableMeta.rowData, event.target.value);
              //     updateValue(event.target.value === "Yes" ? false : true);
              //     // sendupdate()
              //   }}
              // />
            );
          }
        }
      }
        
        
    ];

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "scrollMaxHeight",
      print: false,
      download: false,
      selectableRows: "none"
    };

    


    return (
      <MUIDataTable
        title={"Available  Food"}
        data={this.state.availableDonations}
        // data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

export default AcceptDonation;

// ReactDOM.render(<App />, document.getElementById("root"));
