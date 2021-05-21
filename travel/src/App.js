import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//
import Home from "./components/Home";
import NewTrip from "./components/NewTrip";
//
import "./App.scss";

function App() {
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/newtrip">
            <NewTrip />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
