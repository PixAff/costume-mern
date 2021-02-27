import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Container, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import Scripts from "./components/Script/Scripts";
import Form from "./components/Script/Form";
import Nav from "./components/main/Nav";
import { getScripts } from "./actions/scripts";
import SingleScript from "./components/Script/SingleScript";

const Main = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    dispatch(getScripts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Grid container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={7}>
          <Scripts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={7}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      </Grid>
    </Grow>
  );
};

const App = () => {
  return (
    <>
      <Nav />
      <Container maxWidth="lg">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route
            exact
            path="/scripts/:id"
            render={(props) => <SingleScript {...props} />}
          />
        </Switch>
      </Container>
    </>
  );
};

export default App;
