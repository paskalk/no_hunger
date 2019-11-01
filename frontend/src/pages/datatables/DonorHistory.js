import React from "react";
// import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FoodTypes from "../../pages/datatables/FoodTypes.js";
import DonationStatus from "../../pages/datatables/DonationStatus.js";

import { updateDonation } from "../../context/UserContext";

class DonorHistory extends React.Component {
  state = {
      donationData: [["Loading Data..."]],
      usergroup: localStorage.getItem("usergroup").toLowerCase(),
      userid: localStorage.getItem("userid"),
  };

  componentDidMount() {
    var urlpath = process.env.NODE_ENV == "development" ? process.env.REACT_APP_URL_PATH : "";
    fetch(`${urlpath}/api/getDonations/${this.state.usergroup}/${this.state.userid}`)
    .then(response => response.json())
    // .then(response => this.setState({donationData: response}))
    .then((response)  => {
      // console.log(response);
      if (response){      
        this.setState({donationData: response });
      }

    })
}
  
  

  render() {
    var foodtypeOptions = {
      filter: true,
    };
    var deleteOptions = {
      filter: true,
    };
    var statusOptions = {
      filter: true,
    };
    var showdonatedby = {
      filter: false,
      display: 'excluded'
    }, 
    showreceivedby = {
      filter: false,
      display: 'excluded'
    }, 
    showdateadded = {
      filter: false,
      display: 'excluded'
    }, 
    showdatereceived = {
      filter: false,
      display: 'excluded'
    };
    switch(this.state.usergroup){
      case 'admin':
      case 'super':
        showdonatedby = {
          filter: false,
          display: false
        };
        showreceivedby = {
          filter: false,
          display: false
        };
        showdateadded = {
          filter: false,
          display: false
        };
        showdatereceived = {
          filter: false,
          display: false
        };

        statusOptions = {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <DonationStatus
                value={value}
                index={tableMeta.columnIndex}
                // change={event => updateValue(event)}
                change={event => {
                  updateDonation(tableMeta.rowData, event, 'status');
                  updateValue(event);
                  console.log(event);
                }}
              />
            );
          }
        };
        
        break;
      case 'donor':
      showreceivedby = {
        filter: false,
        display: false
      };
      showdateadded = {
        filter: false,
        display: false
      };
      showdatereceived = {
        filter: false,
        display: false
      };

        foodtypeOptions = {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <FoodTypes
                value={value}
                index={tableMeta.columnIndex}
                // change={event => updateValue(event)}
                change={event => {
                  updateDonation(tableMeta.rowData, event, 'foodtype');
                  updateValue(event);
                  console.log(event);
                }}
              />
            );
          }
        };

        statusOptions = {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <DonationStatus
                value={value}
                index={tableMeta.columnIndex}
                // change={event => updateValue(event)}
                change={event => {
                  updateDonation(tableMeta.rowData, event, 'status');
                  updateValue(event);
                  console.log(event);
                }}
              />
            );
          }
        };

        deleteOptions = {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <FormControlLabel
                label={value ? "Yes" : "No"}
                value={value ? "Yes" : "No"}
                control={
                  <Switch
                    color="primary"
                    checked={value }
                    value={value ? "Yes" : "No"}
                  />
                }
                onChange={event => {
                  updateDonation(tableMeta.rowData, event.target.value, 'deleted');
                  updateValue(event.target.value === "Yes" ? false : true);
                  // sendupdate()
                }}
              />
            );
          }
        };

        break;
      case 'organization':
        showdonatedby = {
          filter: false,
          display: false
        };
        showdateadded = {
          filter: false,
          display: false
        };
        showdatereceived = {
          filter: false,
          display: false
        };
        break;
      default:
      break;

    }

    const columns = [
      {
        label: "ID",
        name: "donationid",
        options: {
          filter: false
        }
      },
      {
        label: "Quantity",
        name: "quantity",
        options: {
          filter: false
        }
      },
      {
        label: "Type",
        name: "foodtype",
        options: foodtypeOptions
      },
      {
        label: "Location",
        name: "locationdescription",
        options: {
          filter: true
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
        options: statusOptions
      },
      {
        label: "Deleted",
        name: "deleted",
        options: deleteOptions
      },
      {
        label: "Added",
        name: "dateadded",
        options: showdateadded
      },
      {
        label: "Accepted",
        name: "datereceived",
        options: showdatereceived
      },
      {
        label: "Donor",
        name: "donatedby",
        options: showdonatedby
      },
      {
        label: "Org",
        name: "receivedby",
        options: showreceivedby
      },
        
        
    ];
    // console.log(this.state.donationData);

    // const data = [
    //   ["Robin Duncan", "Business Analyst", "Los Angeles", 20, "Opt1", false],
    //   ["Mel Brooks", "Business Consultant", "Abilene", 37, "Opt2", true]      
    // ];

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
        title={"Donations History"}
        data={this.state.donationData}
        // data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

export default DonorHistory;

// ReactDOM.render(<App />, document.getElementById("root"));
