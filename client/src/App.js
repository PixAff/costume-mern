import { Route, Switch } from "react-router-dom";

import Nav from "./components/main/Nav";
import SingleScript from "./components/script/SingleScript";
import HomePage from "./components/main/Homepage";
import ScriptsPage from "./components/main/ScriptsPage";

const App = () => {
  return (
    <>
      <Nav />
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/scripts" component={ScriptsPage} />
          <Route
            exact
            path="/scripts/:id"
            render={(props) => <SingleScript {...props} />}
          />
        </Switch>
      </div>
    </>
  );
};

export default App;
