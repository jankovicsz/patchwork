import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//
import Auction from "./components/Auction";
import AuctionNew from "./components/AuctionNew";
import "./App.scss";

function App() {
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path="/">
            <Auction />
          </Route>
          <Route path="/auction/new">
            <AuctionNew />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
