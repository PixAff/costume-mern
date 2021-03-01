import { CircularProgress, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearRoles } from "../../actions/roles";
import { clearScenes } from "../../actions/scenes";
import useStyles from "../styles";

import Script from "./ScriptCard";

export default function Scripts({ setCurrentId }) {
  const scripts = useSelector((state) => state.scripts);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearScenes());
    dispatch(clearRoles());
  }, []);

  return !scripts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {scripts.map((script) => (
        <Grid key={script._id} item xs={12} sm={6} md={6}>
          <Script script={script} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}
