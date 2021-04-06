import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//
import GoogleLogin from "./Components/GoogleLogin";
import SignUp from "./Components/SignUp";
import EmailLogin from "./Components/EmailLogin";
import Home from "./Components/Home";
//
import "./App.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/email">
          <EmailLogin />
        </Route>
        <Route path="/google">
          <GoogleLogin />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
