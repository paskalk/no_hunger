import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "LOGIN_FAILURE":
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

export { UserProvider, useUserState, useUserDispatch, loginUser, registerUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  // var userInfo = getDataFromAPI(`/user/${login}/${password}`);

  fetch(`http://localhost:3030/user/${login}/${password}`)
  .then(response => response.json())
  .then(function(response){
    console.log(response[0]);

    if (response[0]){
      
      console.log(response[0]["Email"]);
      
      console.log("logging in " + login + " --" + password );
  
      
        localStorage.setItem("id_token", "1");
        dispatch({ type: "LOGIN_SUCCESS" });
        setError(null);
        setIsLoading(false);
  
        history.push("/app/dashboard");
        
      
    } else {
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

  // var userInfo = getDataFromAPI(`/user/${login}/${password}`);

  fetch('http://localhost:3030/api/userCreate',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin' : '*'
      // 'Content-Type': 'x-www-form-urlencoded'
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
    console.log(response[0]);

    if (response[0]){
      
        // console.log(response[0]["Email"]);
      
        localStorage.setItem("id_token", "1");
        dispatch({ type: "LOGIN_SUCCESS" });
        setError(null);
        setIsLoading(false);
  
        history.push("/app/dashboard");
        
    } else {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
      setIsLoading(false);
    }
  })
  .catch(err => console.error(err))  



}

function  getDataFromAPI(specificPath) {
    var userInfo;
    userInfo =  fetch(`http://localhost:3030${specificPath}`)
    .then(response => response.json())
    .then(function(response){
      console.log("Maybe?");
      userInfo = response;
          console.log(userInfo);
    })
    .catch(err => console.error(err))
    return userInfo;
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
