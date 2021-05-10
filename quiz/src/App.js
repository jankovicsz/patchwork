import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import QuizApp from "./components/QuizApp";
import EditQuiz from "./components/EditQuiz";
import NewQuiz from "./components/NewQuiz";
import EditOne from "./components/EditOne";

import "./App.scss";

function App() {
  return (
    <main>
      <Router>
        <Switch>
        <Route path="/edit/:id">
            <EditOne />
          </Route>
          <Route path="/edit">
            <EditQuiz />
          </Route>
          <Route path="/new">
            <NewQuiz />
          </Route>
          <Route exact path="/">
            <QuizApp />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
