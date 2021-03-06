import { Route, Switch } from "react-router-dom";

import Nav from "./components/main/Nav";
import SingleScript from "./components/script/SingleScript";
import HomePage from "./components/main/Homepage";
import ScriptsPage from "./components/main/ScriptsPage";
import ErrorNotification from "./components/main/ErrorNotification";
import RolesPage from "./components/main/RolesPage";

const App = () => {
  return (
    <>
      <Nav />
      <ErrorNotification />
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/scripts" component={ScriptsPage} />
          <Route
            exact
            path="/scripts/:id/scenes"
            render={(props) => <SingleScript {...props} />}
          />
          <Route
            exact
            path="/scripts/:id/roles"
            render={(props) => <RolesPage {...props} />}
          />
        </Switch>
      </div>
    </>
  );
};

export default App;
