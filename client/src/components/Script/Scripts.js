import { Box, CircularProgress, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearRoles } from "../../actions/roles";
import { clearScenes } from "../../actions/scenes";
import TheButton from "../pdf/PdfTest";
import useStyles from "../styles";

import ScriptCard from "./ScriptCard";

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
      justify="center"
      alignItems="stretch"
      spacing={3}
    >
      {scripts.map((script) => (
        <Grid key={script._id} item xs={12}>
          <ScriptCard script={script} setCurrentId={setCurrentId} />
        </Grid>
      ))}
      <Box mx={2}>
        <TheButton script={scripts} />
      </Box>
    </Grid>
  );
}
