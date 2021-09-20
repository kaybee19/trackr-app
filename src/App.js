import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useAuth, AuthProvider } from "./Auth";
import { DbProvider } from './context/DbContext'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import appTheme from './util/theme'

// Comps
import Navbar from './components/layout/Navbar';

// Pages
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Dash from './pages/Dash';
import Fitness from './pages/Fitness';

const theme = createTheme(appTheme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <DbProvider>
            <Switch>
              <RouteWrapper path="/login" page={Login} />
              <RouteWrapper path="/register" page={Register} />
              <Route component={container} />
            </Switch>
          </DbProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function RouteWrapper({ page: Page, privateRoute, ...rest }) {

  const anonCheck = localStorage.getItem("anonymous");
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={
        (props) => (anonCheck === null) && (privateRoute && !user) ? <Redirect to="/login" /> : <Page {...props} />
      }
    />
  );
}

const container = () => {

  const anonCheck = localStorage.getItem("anonymous");

  return (
    <div>
      <Navbar auth={useAuth} />
      <RouteWrapper privateRoute exact path="/" page={Dash} />
      <Route exact path="/profile" render={() => JSON.parse(anonCheck) === true ? <Redirect to='/login' /> : <Profile />} />
      <Route exact path='/fitness' component={Fitness} />
    </div>
    )
  };

export default App;
