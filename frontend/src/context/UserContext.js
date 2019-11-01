import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "LOGIN_FAILURE":
    case "ACCOUNT_CREATED":
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, registerUser, addDonationEntry, updateDonation, updateUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  // var userInfo = getDataFromAPI(`/user/${login}/${password}`);

  // localStorage.setItem("id_token", "1");
  // localStorage.setItem("namex", "Fake Ninja");
  // window.sessionStorage.setItem("names", "Long ninja");
  console.log("sending request");

  fetch(`http://localhost:3030/api/user/${login}/${password}`)
  .then(response => response.json())
  .then(function(response){
    console.log(response[0]);

    if (response[0]){      
        //Too many trials
        if (response[0]['trials'] > 3){
          dispatch({ type: "LOGIN_FAILURE" });
          setError(true);
          setIsLoading(false);
        }

        localStorage.setItem("id_token", "1");
        localStorage.setItem("fullname", response[0]['fullname']);
        localStorage.setItem("email", response[0]['email']);
        localStorage.setItem("mobilephone", response[0]['mobilephone']);
        localStorage.setItem("usergroup", response[0]['usergroup']);
        localStorage.setItem("userid", response[0]['userid']);
        localStorage.setItem("location", response[0]['location']);
        dispatch({ type: "LOGIN_SUCCESS" });
        setError(null);
        setIsLoading(false);
  
        history.push("/app/dashboard");
        
    } else {
      //Run a post to db and update the trials
      //trials = trials +1 && Locked == true if Trials > 3

      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
      setIsLoading(false);
    }
  })
  .catch(err => console.error(err))  
}


function registerUser(dispatch, login, password, name, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  fetch('http://localhost:3030/api/userCreate',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: login,
      password: password,
      username: login,
      name: name
    })
  })
  .then(response => response.json())
  .then(function(response){
    console.log(response);

    dispatch({ type: "ACCOUNT_CREATED" });
    setError(null);
    setIsLoading(false);

  })
  .catch(err => console.error(err))  

}

function addDonationEntry(weight, foodtype, location, latitude, longitude) {
  // console.log("Trying to Add Donation from user context");

  fetch('http://localhost:3030/api/addDonation',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      foodtype: foodtype,
      quantity: weight,
      locationdescription: location,
      donatedby: localStorage.getItem("userid"),
      location: (latitude+","+longitude)
    })
  })
  .then(response => response.json())
  .then(function(response){
    // console.log("Inserted to donations");
    
  })
  .catch(err => console.error(err))  

}

function updateDonation(rowData, newValue, toUpdate) {
 console.log(newValue);
  
  var foodtype = rowData[2];
  var status = rowData[4];
  var deleted = rowData[5];

  switch (toUpdate){
    case 'status':
      status = newValue;
      break;
    case 'deleted':
      deleted = newValue === "Yes" ? 1 : 0;
      break;
    case 'foodtype':
      foodtype = newValue;
      break;
    default:
      break;
  }

  fetch('http://localhost:3030/api/updateDonation',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      donationid: rowData[0],
      foodtype: foodtype,
      status: status,
      deleted: deleted,
      
      // quantity: '',
      // locationdescription: '',
      // donatedby: '',  
      // location: ''
    })
  })
  .then(response => response.json())
  .then(function(response){
    console.log("Updated donations");
    
  })
  .catch(err => console.error(err))  

}

function updateUser(rowData, newValue, toUpdate) {
  console.log(newValue);
  console.log(rowData);
  var usergroup = rowData[2];
  var locked = rowData[7];
  var active = rowData[8];
  var trials = rowData[9];
 
   switch (toUpdate){
     case 'usergroup':
      usergroup = newValue;
       break;
     case 'active':
      active = newValue == "Yes" ? 1 : 0;
       break;
     case 'locked':
      locked = newValue === "Yes" ? 1 : 0;
       break;
      case 'trials':
       trials = newValue;// === "Yes" ? 1 : 0;
        break;
     default:
       break;
   }
 
   fetch('http://localhost:3030/api/updateUser',{
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       userid: rowData[0],
       modifiedby: localStorage.getItem("userid"),
       usergroup: usergroup,
       active: active,
       locked: locked,
       trials: trials,
       
       // quantity: '',
       // locationdescription: '',
       // donatedby: '',  
       // location: ''
     })
   })
   .then(response => response.json())
   .then(function(response){
     console.log("Updated users");
     
   })
   .catch(err => console.error(err))  
 
 }


// function  getDataFromAPI(specificPath) {
//     var userInfo;
//     userInfo =  fetch(`http://localhost:3030${specificPath}`)
//     .then(response => response.json())
//     .then(function(response){
//       console.log("Maybe?");
//       userInfo = response;
//           console.log(userInfo);
//     })
//     .catch(err => console.error(err))
//     return userInfo;
// }

function signOut(dispatch, history) {
  window.sessionStorage.clear();
  localStorage.clear();

  // localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
