import React from "react";
// import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import UserGroupTypes from "../../pages/datatables/UserGroupTypes.js";
// import DonationStatus from "../../pages/datatables/DonationStatus.js";

import { updateUser } from "../../context/UserContext";

class UserManagement extends React.Component {
  state = {
      userData: [["Loading Data..."]]
  };

  componentDidMount() {
    var urlpath = process.env.NODE_ENV == "development" ? process.env.REACT_APP_URL_PATH : "";

    fetch(`${urlpath}/api/users`)
    .then(response => response.json())
    .then((response)  => {
      if (response){      
        this.setState({userData: response });
      }

    })
}
  
  

  render() {
  
    const columns = [
      {
        label: "ID",
        name: "userid",
        options: {
          filter: false
        }
      },
      {
        label: "Name",
        name: "fullname",
        options: {
          filter: true
        }
      },
      {
        label: "User Group",
        name: "usergroup",
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <UserGroupTypes
                value={value}
                index={tableMeta.columnIndex}
                change={event => {
                  updateUser(tableMeta.rowData, event, 'usergroup');
                  updateValue(event);
                  console.log(event);
                }}
              />
            );
          }
        }
      },
      {
        label: "Email",
        name: "email",
        options: {
          filter: true
        }
      },
      {
        label: "Phone",
        name: "mobilephone",
        options: {
          filter: false,
          display: false
        }
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
        label: "Lock",
        name: "locked",
        options: {
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
                  updateUser(tableMeta.rowData, event.target.value, 'locked');
                  updateValue(event.target.value === "Yes" ? false : true);
                }}
              />
            );
          }
        }
      },
      {
        label: "Active",
        name: "active",
        options: {
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
                  updateUser(tableMeta.rowData, event.target.value, 'active');
                  updateValue(event.target.value === "Yes" ? false : true);
                  // sendupdate()
                }}
              />
            );
          }
        }
      },
      {
        label: "Trials",
        name: "trials",
        options: {
          filter: false,
          display: false
        }
      },
      {
        label: "Creator",
        name: "createdon",
        options: {
          filter: true,
          display: false
        }
      },
      {
        label: "Modified By",
        name: "modifiedby",
        options: {
          filter: false,
          display: "exclude"
        }
      },
      {
        label: "Modified On",
        name: "modifiedon",
        options: {
          filter: true,
          display: false
        }
      },
        
        
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
        title={"User Management"}
        data={this.state.userData}
        // data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

export default UserManagement;

// ReactDOM.render(<App />, document.getElementById("root"));
