import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./components/Home";
import Redirector from "./components/Redirector";
import Remover from "./components/Remover";
import RemoveForm from "./components/RemoveForm";

import './App.scss';

function App() {
  return (
<main>
<Router>
  <Switch>
    <Route path={"/remove/:alias/:secretCode"}>
      <Remover />
    </Route>
    <Route path={"/remove"}>
      <RemoveForm />
    </Route>
    <Route path={"/a/:alias"}>
      <Redirector />
    </Route>
    <Route path={"/"}>
      <Home />
    </Route>
  </Switch>
</Router>
</main>
  );
}

export default App;
