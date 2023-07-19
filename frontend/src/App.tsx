import React, { useEffect, useState } from "react";
import "./App.css";
import Routes from "./Routes";
import NavBar from "./containers/NavBar";
import { AppContext } from "./lib/contextLib";
import { Auth } from "aws-amplify";
import CircularProgress from "@mui/material/CircularProgress";
import MainContainer from "./containers/MainContainer";
import { onError } from "./lib/errorLib";

function App(): JSX.Element {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }
    setIsAuthenticating(false);
  }

  return (
    <div>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <NavBar />
        <MainContainer>
          {isAuthenticating ? <CircularProgress /> : <Routes />}
        </MainContainer>
      </AppContext.Provider>
    </div>
  );
}

export default App;
