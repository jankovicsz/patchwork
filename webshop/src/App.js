import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import NewForm from "./components/NewForm";

import "./App.scss";

function App() {
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/new">
            <NewForm />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
