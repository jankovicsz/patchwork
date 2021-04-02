import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import EmailReg from "./components/EmailReg";
import GoogleLogin from "./components/GoogleLogin";
import HomeContent from "./components/HomeContent";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/content">
          <HomeContent />
        </Route>
        <Route path="/email">
          <EmailReg />
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
