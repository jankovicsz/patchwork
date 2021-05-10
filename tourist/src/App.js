import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
//
import Home from "./components/Home";
import AttractionNew from "./components/AttractionNew";
import AttractionEdit from "./components/AttractionEdit";
//
import './App.scss';


function App() {
  return (
<main>
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/attraction/new">
        <AttractionNew />
      </Route>
      <Route path="/attraction/edit/:id">
        <AttractionEdit />
      </Route>
    </Switch>
  </Router>
</main>
  );
}

export default App;
