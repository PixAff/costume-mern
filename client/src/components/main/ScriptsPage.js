import { Grid, Grow } from "@material-ui/core";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { getScripts } from "../../actions/scripts";
import Form from "../script/Form";
import Scripts from "../script/Scripts";

export default function ScriptsPage() {
  // const dispatch = useDispatch();
  // const [currentId, setCurrentId] = useState(0);

  // useEffect(() => {
  //   dispatch(getScripts());
  //   console.log("scriptsPage");
  // }, [currentId, dispatch]);

  return (
    <Grow in>
      <Grid
        container
        alignContent="center"
        justify="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12} sm={8}>
          {/* <Scripts setCurrentId={setCurrentId} /> */}
          <Scripts />
        </Grid>
        <Grid item xs={12} sm={8}>
          {/* <Form currentId={currentId} setCurrentId={setCurrentId} /> */}
          <Form />
        </Grid>
      </Grid>
    </Grow>
  );
}
