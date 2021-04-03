import { Route, Switch } from "react-router-dom";

import Nav from "./components/main/Nav";
import SingleScript from "./components/script/SingleScript";
import HomePage from "./components/main/Homepage";
import ScriptsPage from "./components/main/ScriptsPage";
import ErrorNotification from "./components/main/ErrorNotification";
import RolesPage from "./components/main/RolesPage";
import SingleRole from "./components/role/SingleRole";
import CostumesPage from "./components/main/CostumesPage";

const App = () => {
  return (
    <>
      <ErrorNotification />

      {/* <Nav /> */}
      <Switch>
        <Route path="/:page?/:id?" component={Nav} />
      </Switch>
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
        <Route
          exact
          path="/scripts/:id/role/:id"
          render={(props) => <SingleRole {...props} />}
        />
        <Route
          exact
          path="/scripts/:id/costumes"
          render={(props) => <CostumesPage {...props} />}
        />
      </Switch>
    </>
  );
};

export default App;
